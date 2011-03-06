from datetime import datetime

from django.db import models
from social_auth.signals import pre_update
from social_auth.backends.twitter import TwitterBackend


class Account(models.Model):

    service = models.CharField(max_length=30)
    ident = models.CharField(max_length=255)
    display_name = models.CharField(max_length=255)
    permalink_url = models.CharField(max_length=255)
    avatar_url = models.CharField(max_length=255)

    user = models.ForeignKey('auth.User', blank=True, null=True)
    authinfo = models.CharField(max_length=255, blank=True)
    last_updated = models.DateTimeField(default=datetime(2001, 1, 1))
    last_success = models.DateTimeField(default=datetime.now)


def update_twitter_account(sender, user, response, details, **kwargs):
    logging.getLogger(__name__).debug('Making twitter account with response %r and details %r and kwargs %r', response, details, kwargs)
    return True

    try:
        account = Account.objects.get(user=user)
    except Account.DoesNotExist:
        account, created = Account.objects.get_or_create(service='twitter.com', ident='moo')
    user.gender = response.get('gender')
    return True

pre_update.connect(update_twitter_account, sender=TwitterBackend)


class Video(models.Model):

    service = models.CharField(max_length=30)
    ident = models.CharField(max_length=100)

    width = models.IntegerField(blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    embed_code = models.TextField(blank=True)


class UserStream(models.Model):

    user = models.ForeignKey('auth.User')
    video = models.ForeignKey(Video)
    posted = models.DateTimeField()
    poster = models.ForeignKey(Account)
    message = models.TextField(blank=True)
