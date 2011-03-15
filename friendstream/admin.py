from django.contrib import admin

from friendstream.models import *


class AccountAdmin(admin.ModelAdmin):
    list_display = ('display_name', 'service', 'ident', 'user', 'last_updated')

admin.site.register(Account, AccountAdmin)


class VideoAdmin(admin.ModelAdmin):
    list_display = ('service', 'ident')

admin.site.register(Video, VideoAdmin)


class UserStreamAdmin(admin.ModelAdmin):
    list_display = ('user', 'video_ident', 'poster_ident', 'posted')

    def video_ident(self, meh):
        return ':'.join((meh.video.service, meh.video.ident))

    def poster_ident(self, meh):
        return u'%s (%s:%s)' % (meh.poster.display_name, meh.poster.service, meh.poster.ident)

admin.site.register(UserStream, UserStreamAdmin)


class InterestedEmailAdmin(admin.ModelAdmin):
    list_display = ('email', 'created')

admin.site.register(InterestedEmail, InterestedEmailAdmin)


class UrlAdmin(admin.ModelAdmin):
    list_display = ('original', 'target', 'added')

admin.site.register(Url, UrlAdmin)
