import json
from urllib import quote
from urlparse import parse_qsl

from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
import oauth2 as oauth
import twitter

from friendstream.models import UserStream, Account


@login_required
def home(request):
    return render_to_response('home.html', {},
        context_instance=RequestContext(request))


@login_required
def videos(request):
    # TODO: handle paging parameters
    videos = UserStream.objects.filter(user=request.user).order_by('-posted')[:10]

    body = json.dumps(list({'service': v.service, 'id': v.ident} for v in videos))
    return HttpResponse(body, content_type='application/json')


@login_required
def signin_twitter(request):
    callback = quote(request.build_absolute_uri(reverse('complete-twitter')))
    request_url = '%s?oauth_callback=%s' % (twitter.REQUEST_TOKEN_URL, callback)

    client = oauth.Client(oauth.Consumer(*settings.TWITTER_CONSUMER))
    resp, cont = client.request(request_url, method='GET')
    if resp.status != 200:
        raise ValueError("Unexpected HTTP response %d %s asking for request token" % (resp.status, resp.reason))
    request.session['twitter_request_token'] = cont
    request_token = dict(parse_qsl(cont))

    return HttpResponseRedirect('%s?oauth_token=%s' % (twitter.AUTHORIZATION_URL, request_token['oauth_token']))


@login_required
def complete_twitter(request):
    verifier = request.GET['oauth_verifier']

    request_token = dict(parse_qsl(request.session['twitter_request_token']))
    token = oauth.Token(request_token['oauth_token'], request_token['oauth_token_secret'])
    token.set_verifier(verifier)

    csr = oauth.Consumer(*settings.TWITTER_CONSUMER)
    client = oauth.Client(csr, token)

    resp, cont = client.request(twitter.ACCESS_TOKEN_URL, method='POST')
    if resp.status != 200:
        raise ValueError("Unexpected HTTP response %d %s asking for access token" % (resp.status, resp.reason))
    access_token = dict(parse_qsl(cont))
    del request.session['twitter_request_token']

    api = twitter.Api(settings.TWITTER_CONSUMER[0], settings.TWITTER_CONSUMER[1],
        access_token['oauth_token'], access_token['oauth_token_secret'])
    dur = api.VerifyCredentials()

    account, created = Account.objects.get_or_create(user=request.user, service='twitter.com')
    account.authinfo = ':'.join((access_token['oauth_token'], access_token['oauth_token_secret']))
    account.save()

    return HttpResponseRedirect(reverse('home'))
