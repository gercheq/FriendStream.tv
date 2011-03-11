from datetime import datetime
import logging
from pprint import pformat
import re
from urlparse import urljoin

from celery.signals import task_failure
from celery.task import task
from django.conf import settings
import iso8601
import facebook
import httplib2
import twitter

from friendstream.models import Account, Video, UserStream


log = logging.getLogger(__name__)

YOUTUBE_URL_RE = re.compile(r'http://[^/]*youtube\.com/watch\?v=(?P<ident>[^&%]*)')
VIMEO_URL_RE = re.compile(r'http://vimeo\.com/(?P<ident>\d+)')


@task
def poll_all_accounts():
    all_accounts = Account.objects.exclude(user=None).exclude(authinfo='')
    for account in all_accounts:
        log.debug('Posting job to poll for %s:%s', account.service, account.ident)
        poll_account.delay(account.pk)
    log.debug('Done posting polls for all accounts')


@task
def poll_account(account_pk):
    try:
        account = Account.objects.get(pk=account_pk)
    except Account.DoesNotExist:
        return
    if not account.authinfo:
        return

    if account.service == 'twitter.com':
        return poll_twitter(account)
    if account.service == 'facebook.com':
        return poll_facebook(account)
    # TODO: vimeo, youtube, facebook accounts


def poll_twitter(account):
    # Fetch the Twitter user's neighborhood.
    access_key, access_secret = account.authinfo.split(':', 1)
    api = twitter.Api(settings.TWITTER_CONSUMER_KEY, settings.TWITTER_CONSUMER_SECRET, access_key, access_secret)

    tl = api.GetFriendsTimeline(count=100, retweets=True, include_entities=True)  # MAXIMAL
    for status in tl:
        log.debug('Checking URLs in status %r: %r', status, status.urls)
        for url_obj in status.urls:
            url = url_obj.expanded_url or url_obj.url
            log.debug('Scanning url %s', url)

            try:
                url = expand_url(url)
            except httplib2.RedirectLimit:
                continue
            # TODO: what does httplib2 raise when there's no Location header? (does it raise anything when follow_redirects=False?)

            video = video_for_url(url)
            if not video:
                log.debug("Well, %s isn't a video, skip it", url)
                continue

            try:
                us = UserStream.objects.get(user=account.user, video=video)
            except UserStream.DoesNotExist:
                log.debug("Adding video %s to %s's stream", url, account.user.username)
                poster, created = Account.objects.get_or_create(service='twitter.com', ident=status.user.id,
                    defaults={
                        'display_name': status.user.name,
                        'avatar_url': status.user.profile_image_url,
                        'permalink_url': 'http://twitter.com/%s' % status.user.screen_name,
                    })
                created_at = datetime.utcfromtimestamp(status.created_at_in_seconds)
                log.debug("Saving UserStream for user %r video %r poster %r posted %r", account.user, video, poster, created_at)
                us = UserStream(
                    user=account.user,
                    video=video,
                    poster=poster,
                    posted=created_at,
                    message=status.text,
                )
                us.save()
            else:
                log.debug("Video for %s already in %s's stream", url, account.user.username)

    log.debug('Done scanning statuses for %s', account.user.username)


def poll_facebook(account):
    facepi = facebook.GraphAPI(account.authinfo)

    try:
        home = facepi.get_object('me/home', limit=100)
    except facebook.GraphAPIError, exc:
        raise ValueError("Error reading news feed for facebook user %s (%s): %s" % (account.display_name, account.ident, str(exc)))

    for link in home['data']:
        if link['type'] != 'video':
            continue
        try:
            url = link['link']
        except KeyError:
            continue

        try:
            url = expand_url(url)
        except httplib2.RedirectLimit:
            continue
        # TODO: what does httplib2 raise when there's no Location header? (does it raise anything when follow_redirects=False?)

        video = video_for_url(url)
        if not video:
            log.debug("Well, %s isn't a video, skip it", url)
            continue

        try:
            us = UserStream.objects.get(user=account.user, video=video)
        except UserStream.DoesNotExist:
            log.debug("Adding video %s to %s's stream", url, account.user.username)

            ident = link['from']['id']
            poster, created = Account.objects.get_or_create(service='facebook.com', ident=ident,
                defaults={
                    'display_name': link['from']['name'],
                    'permalink_url': 'http://www.facebook.com/profile.php?id=%s' % ident,
                    'avatar_url': '',
                })

            created_at = iso8601.parse_date(link['created_time']).replace(tzinfo=None)

            log.debug("Saving UserStream for user %r video %r poster %r posted %r", account.user, video, poster, created_at)
            us = UserStream(
                user=account.user,
                video=video,
                poster=poster,
                posted=created_at,
                message=link.get('message', ''),
            )
            us.save()
        else:
            log.debug("Video for %s already in %s's stream", url, account.user.username)

    log.debug('Done scanning facebook home for %s', account.user.username)


def expand_url(url):
    h = httplib2.Http()
    # We don't get a content-location header when httplib2 follows redirects
    # for a HEAD, so let's track it ourselves I guess.
    h.follow_redirects = False

    redirects = 5
    while True:
        resp, cont = h.request(url, method='HEAD', headers={'User-Agent': 'friendstream/1.0'})
        if resp.status in (301, 302, 303, 307):
            url = urljoin(url, resp['location'])

            redirects -= 1
            if redirects <= 0:
                raise httplib2.RedirectLimit('', resp, cont)
            continue
        break

    return url


def video_for_url(url):
    mo = YOUTUBE_URL_RE.match(url)
    if mo:
        video_id = mo.group('ident')
        video, created = Video.objects.get_or_create(service='youtube.com', ident=video_id)
        return video

    mo = VIMEO_URL_RE.match(url)
    if mo:
        video_id = mo.group('ident')
        video, created = Video.objects.get_or_create(service='vimeo.com', ident=video_id)
        return video

    # nope!


def task_failed(exception, traceback, sender, task_id, signal, args, kwargs, einfo, **kw):
    exc_info = (type(exception), exception, traceback)
    log.error('Job failed: %s: %s', exception.__class__.__name__, str(exception),
        exc_info=exc_info,
        extra={
            'data': {'task_id': task_id, 'sender': sender, 'args': args, 'kwargs': kwargs},
        },
    )

task_failure.connect(task_failed)
