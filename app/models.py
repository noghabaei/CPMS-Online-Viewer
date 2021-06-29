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
from base64 import b64encode
import os
from uuid import uuid4
from PIL import Image

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
    dbProfilePicture = models.BinaryField(blank=True)

    # Override the save method of the model
    def save(self, *args, **kwargs):
        super().save()

    @property
    def profilePictureUrl(self):
        if self.dbProfilePicture and len(self.dbProfilePicture):
            return b64encode(self.dbProfilePicture).decode('utf8')
        else: return settings.MEDIA_URL + "profiles/default-profile.jpg"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

# Create your models here.

