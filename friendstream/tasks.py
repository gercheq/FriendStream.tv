from datetime import datetime, timedelta
import httplib
import logging
from pprint import pformat
import re
import socket
from urlparse import urljoin

from celery.signals import task_failure
from celery.task import task
from django.conf import settings
import iso8601
import facebook
import httplib
import httplib2
import twitter

from friendstream.models import Account, Video, UserStream, Url


log = logging.getLogger(__name__)

YOUTUBE_URL_RE = re.compile(r'http://[^/]*youtube\.com/watch\?v=(?P<ident>[^&%]*)')
VIMEO_URL_RE = re.compile(r'http://vimeo\.com/(?P<ident>\d+)')


@task
def raise_error():
    raise NotImplementedError


@task
def poll_all_accounts():
    all_accounts = Account.objects.exclude(user=None).exclude(authinfo='')
    for account in all_accounts:
        log.debug('Posting job to poll for %s:%s', account.service, account.ident)
        poll_account.delay(account.pk, limited=True)
    log.debug('Done posting polls for all accounts')


@task
def poll_account(account_pk, limited=False):
    try:
        account = Account.objects.get(pk=account_pk)
    except Account.DoesNotExist:
        return
    if not account.authinfo:
        return
    if account.error:
        # Don't try to scan accounts that have errors until they're saved again.
        return
    if account.user is None:
        log.debug("Oops, account %r has no user?", account)
        return

    if limited and account.last_updated > datetime.now() - timedelta(minutes=14):
        log.debug("Skipping %s's %s stream (updated too soon)", account.user.username, account.service)
        return

    if account.service == 'twitter.com':
        poll_twitter(account)
    elif account.service == 'facebook.com':
        poll_facebook(account)
    # TODO: vimeo, youtube, facebook accounts

    account.last_updated = datetime.now()
    account.save()


def poll_twitter(account):
    # Fetch the Twitter user's neighborhood.
    access_key, access_secret = account.authinfo.split(':', 1)
    api = twitter.Api(settings.TWITTER_CONSUMER_KEY, settings.TWITTER_CONSUMER_SECRET, access_key, access_secret)

    try:
        tl = api.GetFriendsTimeline(count=100, retweets=True, include_entities=True)  # MAXIMAL
    except twitter.TwitterError, exc:
        # TODO: ugh use a code or something, not an error message (but the twitter library hides that from us)
        if str(exc) == 'Could not authenticate with OAuth.':
            log.debug("Oops, twitter user %s (%s) has a bad key", account.display_name, account.ident)
            account.error = True
            account.save()
            return
        raise

    for status in tl:
        for url_obj in status.urls:
            url = url_obj.expanded_url or url_obj.url
            url = expand_url(url)
            if not url:
                continue
            video = video_for_url(url)
            if not video:
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
        if exc.type == 'OAuthException':
            # mark account as busted
            log.debug("Oops, facebook user %s (%s) has a bad key", account.display_name, account.ident)
            account.error = True
            account.save()
            return
        raise

    for link in home.get('data', ()):
        if link['type'] != 'video':
            continue
        try:
            url = link['link']
        except KeyError:
            continue

        url = expand_url(url)
        if not url:
            continue
        video = video_for_url(url)
        if not video:
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


def expand_url(orig_url):
    try:
        url_obj = Url.objects.get(original=orig_url)
    except Url.DoesNotExist:
        pass
    else:
        return url_obj.target

    log.debug('Scanning url %s', orig_url)
    h = httplib2.Http(timeout=10)
    # We don't get a content-location header when httplib2 follows redirects
    # for a HEAD, so let's track it ourselves I guess.
    h.follow_redirects = False

    redirects = 5
    url = orig_url
    while True:
        try:
            resp, cont = h.request(url, method='HEAD', headers={'User-Agent': 'friendstream/1.0'})
        except httplib.InvalidURL:
            log.debug("Oops, %s isn't really an URL at all, skipping", url)
            return None
        # TODO: what does httplib2 raise when there's no Location header? (does it raise anything when follow_redirects=False?)
        except (httplib2.ServerNotFoundError, httplib.BadStatusLine, socket.timeout), exc:
            log.debug("Oops, %s for URL %s (use it for now): %s", type(exc).__name__, url, str(exc))
            return url

        if resp.status in (301, 302, 303, 307):
            url = urljoin(url, resp['location'])

            redirects -= 1
            if redirects <= 0:
                log.debug("Oops, hit redirect limit for %s (use it for now)", url)
                return url
            continue
        break

    # Only save the result if it was an uneventful one.
    Url.objects.get_or_create(original=orig_url, defaults={'target': url})
    return url


def video_for_url(url):
    mo = YOUTUBE_URL_RE.match(url)
    if mo:
        video_id = mo.group('ident')

        h = httplib2.Http(timeout=10)
        url = ('http://gdata.youtube.com/feeds/api/videos/%s?v=2&alt=json' % video_id)
        response, video_data = h.request(url, headers={'User-Agent': 'friendstream/1.0'})
        if response.status != 200:
            raise ValueError("Unexpected response %d %s getting data for YouTube video %s"
                % (response.status, response.reason, video_id))

        video, created = Video.objects.get_or_create(service='youtube.com', ident=video_id, data=video_data)
        return video

    mo = VIMEO_URL_RE.match(url)
    if mo:
        video_id = mo.group('ident')

        h = httplib2.Http(timeout=10)
        url = ('http://vimeo.com/api/v2/video/%s.json' % video_id)
        response, video_data = h.request(url, headers={'User-Agent': 'friendstream/1.0'})
        if response.status != 200:
            raise ValueError("Unexpected response %d %s getting data for Vimeo video %s"
                % (response.status, response.reason, video_id))

        video, created = Video.objects.get_or_create(service='vimeo.com', ident=video_id, data=video_data)
        return video

    # nope!
    log.debug("Well, %s isn't a video, skip it", url)


def task_failed(exception, traceback, sender, task_id, signal, args, kwargs, einfo, **kw):
    exc_info = (type(exception), exception, traceback)
    log.error('%s: %s', exception.__class__.__name__, str(exception),
        exc_info=exc_info,
        extra={
            'data': {'task_id': task_id, 'sender': sender, 'args': args, 'kwargs': kwargs},
        },
    )

task_failure.connect(task_failed)
