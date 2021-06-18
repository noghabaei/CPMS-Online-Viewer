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
    user = User.objects.get(username = request.user.username)

    form = ProfileForm(get_profile_data_from_user(user))

    msg = None

    if request.method == "POST":
        form = ProfileForm(request.POST, request.FILES)
        if form.is_valid():
            bio = form.cleaned_data['bio']
            location = form.cleaned_data['location']
            msg = 'User is updated'

            #user = request.user
            
            user.profile.bio = bio
            user.profile.location = location

            user = populate_user_profile(user, form)

            print('Saving USER:')
            print(user)

            user.save()
         
   

    return render(request, "profile.html", {"form": form, "msg": msg})

def get_profile_data_from_user(user):
    if not user: return None

    formDataDict = dict()
    formDataDict["username"] = user.username
    formDataDict["email"] = user.email
    formDataDict["firstName"] = user.first_name
    formDataDict["lastName"] = user.last_name
    formDataDict["address"] = user.profile.address
    formDataDict["city"] = user.profile.city
    formDataDict["country"] = user.profile.country
    formDataDict["postalCode"] = user.profile.postalCode
    formDataDict["aboutMe"] = user.profile.aboutMe
    
    userProfilePicture = user.profile.profilePicture
    formDataDict["profilePicture"] = user.profile.profilePicture

    return formDataDict

def populate_user_profile(user, profileForm):
    if not user or not profileForm: return user

    formDataDict = get_cleaned_profile_form_data(profileForm)

    user.first_name = formDataDict['firstName']
    user.last_name = formDataDict['lastName']

    user.profile.address = formDataDict['address']
    user.profile.city = formDataDict['city']
    user.profile.country = formDataDict['country']
    user.profile.postalCode = formDataDict['postalCode']
    user.profile.aboutMe = formDataDict['aboutMe']
    user.profile.profilePicture = formDataDict['profilePicture']

    return user

def get_cleaned_profile_form_data(profileForm):
    dataDict = dict()

    if not profileForm: return dataDict

    dataDict["username"] = profileForm.cleaned_data["username"]
    dataDict["email"] = profileForm.cleaned_data["email"]
    dataDict["firstName"] = profileForm.cleaned_data["firstName"]
    dataDict["lastName"] = profileForm.cleaned_data["lastName"]
    dataDict["address"] = profileForm.cleaned_data["address"]
    dataDict["city"] = profileForm.cleaned_data["city"]
    dataDict["country"] = profileForm.cleaned_data["country"]
    dataDict["postalCode"] = profileForm.cleaned_data["postalCode"]
    dataDict["aboutMe"] = profileForm.cleaned_data["aboutMe"]
    dataDict["profilePicture"] = profileForm.cleaned_data["profilePicture"]

    return dataDict