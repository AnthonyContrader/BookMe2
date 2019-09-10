from django.contrib import user
from .models import User

user.site.register(User)