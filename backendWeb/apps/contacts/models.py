from django.db import models
from apps.accounts.models import CustomUser
# Create your models here.

class ContactRequest(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='contact_requests')
    property = models.ForeignKey('properties.Property', on_delete=models.CASCADE, related_name='contact_requests')
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'ContactRequest'

    def __str__(self):
        return f'Contact Request from {self.user.username} for {self.property.id} at {self.created_at}'