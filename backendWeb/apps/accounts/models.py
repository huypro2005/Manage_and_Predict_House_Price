from django.db import models
from django.contrib.auth.models import AbstractUser
from apps.utils import upload_to_app_model
# Create your models here.

class CustomUser(AbstractUser):

    AUTH_PROVIDERS = [
        ('local', 'Local'),
        ('google', 'Google'),
    ]

    email = models.EmailField(unique=True)
    auth_provider = models.CharField(max_length=20, choices=AUTH_PROVIDERS, default='local')
    google_id = models.CharField(max_length=255, blank=True, null=True)
    avatar = models.ImageField(upload_to=upload_to_app_model, blank=True, null=True, default='/accounts/default/user_avatar.png')
    phone = models.CharField(max_length=10, blank=True, null=True, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=50)
    birth_date = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=False)
    description = models.TextField(blank=True, null=True, max_length=500, default='')


    REQUIRED_FIELDS = ['email']

    class Meta:
        db_table = 'CustomUser'

    def __str__(self):
        return self.username
    
    def avatar_tag(self):
        if self.avatar:
            return f'<img src="{self.avatar.url}" alt="{self.username}" width="50" height="50"/>'
        return
    
    avatar_tag.allow_tags = True
    avatar_tag.short_description = 'Avatar'

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"