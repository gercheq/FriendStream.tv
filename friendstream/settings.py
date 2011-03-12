# INSTALLED_APPS = (
#     ...
#     'djcelery',
#     'south',
#     'social_auth',
#     'friendstream',
# )

AUTHENTICATION_BACKENDS = (
    'social_auth.backends.twitter.TwitterBackend',
    'social_auth.backends.facebook.FacebookBackend',
    'social_auth.backends.google.GoogleOAuthBackend',
    'django.contrib.auth.backends.ModelBackend',
)

BROKER_BACKEND = 'redis'
BROKER_HOST = 'localhost'
BROKER_PORT = 6379
BROKER_VHOST = '0'

from datetime import timedelta

CELERYBEAT_SCHEDULE = {
    'scan-accounts': {
        'task': 'friendstream.tasks.poll_all_accounts',
        'schedule': timedelta(minutes=15),
    },
}

LOGIN_URL = '/accounts/login'
LOGIN_REDIRECT_URL = '/'
LOGIN_ERROR_URL = '/accounts/login-error'
SOCIAL_AUTH_COMPLETE_URL_NAME  = 'complete'
SOCIAL_AUTH_ASSOCIATE_URL_NAME = 'associate_complete'

TWITTER_CONSUMER_KEY = ''
TWITTER_CONSUMER_SECRET = ''
FACEBOOK_APP_ID = ''
FACEBOOK_API_SECRET = ''
GOOGLE_CONSUMER_KEY = ''
GOOGLE_CONSUMER_SECRET = ''

GOOGLE_OAUTH_EXTRA_SCOPE = ['http://gdata.youtube.com']
FACEBOOK_EXTENDED_PERMISSIONS = ['offline_access']
