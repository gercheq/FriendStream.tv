from datetime import datetime

from django.db import models


class Account(models.Model):

    service = models.CharField(max_length=30)
    ident = models.CharField(max_length=255)
    display_name = models.CharField(max_length=255)
    # TODO: permalink_url and userpic?

    user = models.ForeignKey('auth.User', blank=True, null=True)
    authinfo = models.CharField(max_length=255, blank=True)
    last_updated = models.DateTimeField(default=datetime(2001, 1, 1))
    last_success = models.DateTimeField(default=datetime.now)


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
