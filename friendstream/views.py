from datetime import datetime
import json
from urllib import quote
from urlparse import parse_qsl

from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt
import oauth2 as oauth

from friendstream.models import UserStream, Account, InterestedEmail


@login_required
def home(request):
    accounts = dict((acc.service.split('.')[0], acc) for acc in request.user.accounts.all())
    return render_to_response('home.html', {'accounts': accounts},
        context_instance=RequestContext(request))


@csrf_exempt
def save_email(request):
    email_address = request.POST['email']
    InterestedEmail.objects.create(email=email_address)

    return HttpResponse('OK', content_type='text/plain')


class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super(DateTimeEncoder, self).default(obj)


@login_required
def videos(request):
    # TODO: handle paging parameters
    stream = UserStream.objects.filter(user=request.user).order_by('-posted').select_related()[:10]

    stream_data = ({
        'posted': us.posted,
        'video': {
            'service': us.video.service,
            'ident': us.video.ident,
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
