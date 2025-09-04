from django.db import models
from apps.utils import upload_to_app_model

class Notification(models.Model):
    TYPES_FIELD = [
        ('contact_request', 'Contact Request'),
        ('property_view', 'Property View'),
        ('new_message', 'New Message'),
        ('system_alert', 'System Alert'),
        ('promotion', 'Promotion'),
    ]

    type = models.CharField(max_length=100, choices=TYPES_FIELD)
    message = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to=upload_to_app_model, null=True, blank=True)
    is_read = models.BooleanField(default=False)
    url = models.URLField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        db_table = 'Notification'
    def __str__(self):
        return self.message[:50] + '...' if len(self.message) > 50 else self.message