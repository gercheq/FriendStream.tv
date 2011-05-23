from datetime import datetime
import json
import logging
from urllib import quote
from urlparse import parse_qsl

from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
import django.contrib.auth.views
from django.conf import settings
from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt
import oauth2 as oauth
import social_auth.views

from friendstream.models import UserStream, Account, InterestedEmail
from friendstream.tasks import poll_account


log = logging.getLogger(__name__)


def root(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse('home'))
    return django.contrib.auth.views.login(request)


@login_required
def home(request):
    accounts = dict((acc.service.split('.')[0], acc) for acc in request.user.accounts.all())

    had_stale_accounts = False
    for acc in accounts.values():
        if acc.stale:
            had_stale_accounts = True
            log.debug("Reviving %s's stale %s account (they logged in)", request.user.username, acc.service)
            acc.stale = False
            acc.save()
            poll_account.delay(acc.pk)

    return render_to_response('home.html', {'accounts': accounts, 'had_stale_accounts': had_stale_accounts},
        context_instance=RequestContext(request))


@csrf_exempt
def save_email(request):
    if request.method != 'POST':
        return HttpResponse('requires POST', status=405, content_type='text/plain')

    try:
        email_address = request.POST['email']
    except KeyError:
        return HttpResponse('requires parameter', status=400, content_type='text/plain')

    InterestedEmail.objects.create(email=email_address)

    return HttpResponse('OK', content_type='text/plain')


def signout(request):
    logout(request)
    return HttpResponseRedirect(reverse('root'))


class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super(DateTimeEncoder, self).default(obj)


def videos_old(request):
    return HttpResponseRedirect(reverse('videos'))


@login_required
def videos(request):
    # TODO: handle paging parameters
    stream = UserStream.objects.filter(user=request.user).order_by('-posted').select_related()[:40]

    stream_data = ({
        'posted': us.posted,
        'video': {
            'service': us.video.service,
            'ident': us.video.ident,
            'data': us.video.data,
        },
        'poster': {
            'service': us.poster.service,
            'ident': us.poster.ident,
            'display_name': us.poster.display_name,
            'avatar_url': us.poster.avatar_url,
        },
        'message': us.message,
        'id': us.pk,
    } for us in stream)

    body = json.dumps(list(stream_data), cls=DateTimeEncoder)
    return HttpResponse(body, content_type='application/json')


@login_required
def disconnect(request, backend):
    ret = social_auth.views.disconnect(request, backend)

    # Detach any Accounts we have for this user too.
    try:
        acc = request.user.accounts.get(service='%s.com' % backend)
    except Account.DoesNotExist:
        pass
    else:
        acc.user = None
        acc.save()

    return ret
