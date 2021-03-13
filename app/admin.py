# -*- encoding: utf-8 -*-
"""
License: MIT
Copyright (c) 2019 - present AppSeed.us
"""

from django.contrib import admin
from app.models import Profile

# Register your models here.
class firstModel(admin.ModelAdmin):
      list_display    = ['user', 'bio', 'location', 'birth_date']

admin.site.register(Profile, firstModel)