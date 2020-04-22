from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    birthday = models.DateField(blank=True, null=True, verbose_name="Birthday")
    profile_pict = models.ImageField(upload_to='profile_picts/', verbose_name="Profile Pict", blank=True, null=True)