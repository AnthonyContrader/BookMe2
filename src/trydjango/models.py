from django.db import models
from django.utils import timezone

class Entity(models.Model):
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    authorities = models.CharField(max_length=200)
    email =  models.CharField(max_length=200)

    def __str__(self):
        return self.username
