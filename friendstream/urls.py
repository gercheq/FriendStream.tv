from django.conf.urls.defaults import *


urlpatterns = patterns('friendstream.views',
    url(r'^$', 'root', name='root'),
    url(r'^home$', 'home', name='home'),
    url(r'^videos\.json$', 'videos', name='videos'),
    url(r'^videos$', 'videos_old'),
    url(r'^save_email$', 'save_email', name='save_email'),

    url(r'^signout$', 'signout', name='signout'),
)
