from django.db import models
from apps.utils import upload_to_app_model
from apps.accounts.models import CustomUser

class Notification(models.Model):
    TYPES_FIELD = [
        ('contact_request', 'Contact Request'),
        ('property_view', 'Property View'),
        ('new_message', 'New Message'),
        ('system_alert', 'System Alert'),
        ('promotion', 'Promotion'),
    ]
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notifications', default=None)
    type = models.CharField(max_length=100, choices=TYPES_FIELD)
    message = models.CharField(max_length=255)
    is_read = models.BooleanField(default=False)
    url = models.URLField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)
    image_representation = models.ImageField(upload_to=upload_to_app_model, blank=True, null=True, default=None)

    class Meta:
        db_table = 'Notification'
    def __str__(self):
        return self.message[:50] + '...' if len(self.message) > 50 else self.message
    
class Range(models.Model):
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE, related_name='highlight_ranges')
    offset = models.IntegerField()
    length = models.IntegerField()

    class Meta:
        db_table = 'Range'