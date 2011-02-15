import json

from django.contrib.auth.decorators import login_required
from django.http import Response
from django.shortcuts import render_to_response

from friendstream.models import UserStream


@login_required
def home(request):
    return render_to_response('home.html', {},
        context_instance=RequestContext(request))


@login_required
def videos(request):
    # TODO: handle paging parameters
    videos = UserStream.objects.filter(user=request.user).order_by('-posted')[:10]

    body = json.dumps(list({'service': v.service, 'id': v.ident} for v in videos))
    return Response(body, content_type='application/json')
