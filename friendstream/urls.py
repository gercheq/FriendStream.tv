from django.conf.urls.defaults import *


urlpatterns = patterns('friendstream.views',
    url(r'^$', 'home', name='home'),
    url(r'^videos$', 'videos', name='videos'),

    url(r'^signin/twitter$', 'signin_twitter', name='signin-twitter'),
    url(r'^complete/twitter$', 'complete_twitter', name='complete-twitter'),
)
