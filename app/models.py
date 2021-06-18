# -*- encoding: utf-8 -*-
"""
License: MIT
Copyright (c) 2019 - present AppSeed.us
"""

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
import os
from uuid import uuid4


def profilePictureFilename(instance, filename):
    ext = filename.split('.')[-1]
    name = os.path.splitext(filename)
    username = instance.user.username

    finalname = getGenerateProfileFilename(filename, username)

    return 'profiles/{}.{}'.format(finalname, ext)

def getGenerateProfileFilename(filename, username):
    return '{}-{}'.format(username, 'profile')

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    address = models.CharField(null=True, max_length=200, blank=True)
    city = models.CharField(null=True, max_length=100, blank=True)
    country = models.CharField(null=True, max_length=100, blank=True)
    postalCode = models.IntegerField(null=True, blank=True)
    aboutMe = models.CharField(null=True, max_length=300, blank=True)
    profilePicture = models.ImageField(default="default-profile.jpg", null=True, blank=True, upload_to=profilePictureFilename)

    @property
    def profilePictureUrl(self):
        if self.profilePicture:
            return self.profilePicture.url
        else: return settings.MEDIA_URL + "profiles/default-profile.jpg"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

# Create your models here.

