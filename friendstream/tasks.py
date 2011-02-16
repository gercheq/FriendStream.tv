from datetime import datetime
import logging
import re

from celery.task import task
from django.conf import settings
import httplib2
import twitter

from friendstream.models import Account, Video, UserStream


log = logging.getLogger(__name__)

YOUTUBE_URL_RE = re.compile(r'http://[^/]*youtube\.com/watch\?v=(?P<ident>[^&%]*)')


@task
def poll_all_accounts():
    all_accounts = Account.objects.exclude(user=None).exclude(authinfo='')
    for account in all_accounts:
        log.debug('Posting job to poll for %s:%s', account.service, account.ident)
        poll_account.delay(account)
    log.debug('Done posting polls for all accounts')


@task
def poll_account(account):
    if not account.authinfo:
        return

    if account.service == 'twitter.com':
        return poll_twitter(account)
    # TODO: vimeo, youtube, facebook accounts


def poll_twitter(account):
    # Fetch the Twitter user's neighborhood.
    access_key, access_secret = account.authinfo.split(':', 1)
    api = twitter.Api(settings.TWITTER_CONSUMER[0], settings.TWITTER_CONSUMER[1], access_key, access_secret)

    tl = api.GetFriendsTimeline(count=100, retweets=False, include_entities=True)  # MAXIMAL
    for status in tl:
        log.debug('Checking URLs in status %r: %r', status, status.urls)
        for url_obj in status.urls:
            url = url_obj.expanded_url or url_obj.url
            log.debug('Scanning url %s', url)
            url = expand_url(url)
            video = video_for_url(url)
            if not video:
                log.debug("Well, %s isn't a video, skip it", url)
                continue

            try:
                us = UserStream.objects.get(user=account.user, video=video)
            except UserStream.DoesNotExist:
                log.debug("Adding video %s to %s's stream", url, account.user.username)
                poster, created = Account.objects.get_or_create(service='twitter.com', ident=status.user.id,
                    defaults={'display_name': status.user.name})
                created_at = datetime.utcfromtimestamp(status.created_at_in_seconds)
                log.debug("Saving UserStream for user %r video %r poster %r posted %r", account.user, video, poster, created_at)
                us = UserStream(
                    user=account.user,
                    video=video,
                    poster=poster,
                    posted=created_at,
                )
                us.save()
            else:
                log.debug("Video for %s already in %s's stream", url, account.user.username)

    log.debug('Done scanning statuses for %s', account.user.username)


def expand_url(url):
    h = httplib2.Http()
    # TODO: don't grab the whole resource if we can help it
    resp, cont = h.request(url)
    try:
        return resp['content-location']
    except KeyError:
        return url


def video_for_url(url):
    mo = YOUTUBE_URL_RE.match(url)
    if mo:
        video_id = mo.group('ident')
        video, created = Video.objects.get_or_create(service='youtube.com', ident=video_id)
        return video
