from datetime import datetime
import logging
from pprint import pformat

from django.db import models
import oauth2 as oauth
from social_auth.signals import pre_update
from social_auth.backends.facebook import FacebookBackend
from social_auth.backends.twitter import TwitterBackend


class Account(models.Model):

    service = models.CharField(max_length=30)
    ident = models.CharField(max_length=255)
    display_name = models.CharField(max_length=255)
    permalink_url = models.CharField(max_length=255, blank=True)
    avatar_url = models.CharField(max_length=255, blank=True)
    error = models.BooleanField(blank=True)
    stale = models.BooleanField(blank=True)

    user = models.ForeignKey('auth.User', blank=True, null=True, related_name='accounts')
    authinfo = models.CharField(max_length=255, blank=True)
    last_updated = models.DateTimeField(default=datetime(2001, 1, 1))
    last_success = models.DateTimeField(default=datetime.now)

    def __unicode__(self):
        return u'%s (%s on %s)' % (self.display_name, self.ident, self.service)


def update_twitter_account(sender, user, response, details, **kwargs):
    ident = response['id']
    logging.getLogger(__name__).debug('Making twitter account with ident %r', ident)
    account, created = Account.objects.get_or_create(service='twitter.com', ident=ident)

    new_connection = True if not account.user or account.user.pk != user.pk else False
    account.user = user

    screen_name = details['username']
    account.display_name = details.get('fullname', screen_name)
    account.permalink_url = 'http://twitter.com/%s' % screen_name
    account.avatar_url = response.get('profile_image_url', '')

    token = oauth.Token.from_string(response['access_token'])
    account.authinfo = ':'.join((token.key, token.secret))

    # Reset any error it may have had.
    account.error = False
    account.save()

    if new_connection:
        from friendstream.tasks import poll_account
        poll_account.delay(account.pk)

    return True

pre_update.connect(update_twitter_account, sender=TwitterBackend)


def update_facebook_account(sender, user, response, details, **kwargs):
    ident = response['id']
    logging.getLogger(__name__).debug('Making facebook account with ident %r', ident)
    account, created = Account.objects.get_or_create(service='facebook.com', ident=ident)

    new_connection = True if not account.user or account.user.pk != user.pk else False
    account.user = user

    account.display_name = details['fullname']
    account.permalink_url = response.get('link', '')
    account.avatar_url = ''

    account.authinfo = response['access_token']

    # Reset any error it may have had.
    account.error = False
    account.save()

    if new_connection:
        from friendstream.tasks import poll_account
        poll_account.delay(account.pk)

    return True

pre_update.connect(update_facebook_account, sender=FacebookBackend)


class Video(models.Model):

    service = models.CharField(max_length=30)
    ident = models.CharField(max_length=100)
    data = models.TextField(blank=True)

    def __unicode__(self):
        return u'%s on %s' % (self.ident, self.service)

    class Meta:
        unique_together = (('service', 'ident'),)


class UserStream(models.Model):

    user = models.ForeignKey('auth.User')
    video = models.ForeignKey(Video)
    posted = models.DateTimeField()
    poster = models.ForeignKey(Account)
    message = models.TextField(blank=True)
    message_service = models.CharField(max_length=30, blank=True)
    message_ident = models.CharField(max_length=100, blank=True)

    def __unicode__(self):
        return u'%s for %s' % (unicode(self.video), unicode(self.user))


class InterestedEmail(models.Model):

    email = models.CharField(max_length=255)
    created = models.DateTimeField(default=datetime.now)


class Url(models.Model):

    original = models.CharField(max_length=255, unique=True)
    target = models.CharField(max_length=255)
    added = models.DateTimeField(default=datetime.now)

    def __unicode__(self):
        return u'%s > %s' % (self.original, self.target)
