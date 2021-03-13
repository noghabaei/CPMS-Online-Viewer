# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from django.template import loader
from django.http import HttpResponse
from django import template
from app.forms import ProfileForm
from django.contrib.auth.models import User

@login_required(login_url="/login/")
def index(request):
    
    context = {}
    context['segment'] = 'index'

    html_template = loader.get_template( 'index.html' )
    return HttpResponse(html_template.render(context, request))

@login_required(login_url="/login/")
def pages(request):
    context = {}
    # All resource paths end in .html.
    # Pick out the html file name from the url. And load that template.
    try:
        
        load_template = request.path.split('/')[-1]
        context['segment'] = load_template
        
        html_template = loader.get_template( load_template )
        return HttpResponse(html_template.render(context, request))
        
    except template.TemplateDoesNotExist:
        
        
        html_template = loader.get_template( 'error-404.html' )
        return HttpResponse(html_template.render(context, request))

    except:
    
        html_template = loader.get_template( 'error-500.html' )
        return HttpResponse(html_template.render(context, request))

@login_required(login_url="/login/")
def profile_page(request):
    form = ProfileForm(request.POST or None)

    msg = None

    if request.method == "POST":

        if form.is_valid():
            bio = form.cleaned_data['bio']
            location = form.cleaned_data['location']
            msg = 'User is updated'

            #user = request.user
            
            user = User.objects.get(username = request.user.username)
            #request.user.profile.bio = bio
            #request.user.profile.location = location
            
            user.profile.bio = bio
            user.profile.location = location
            user.save()
         
   

    return render(request, "profile.html", {"form": form, "msg" : msg})
