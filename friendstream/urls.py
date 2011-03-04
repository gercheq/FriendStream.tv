from django.conf.urls.defaults import *


urlpatterns = patterns('friendstream.views',
    url(r'^$', 'home', name='home'),
    url(r'^videos$', 'videos', name='videos'),
)
