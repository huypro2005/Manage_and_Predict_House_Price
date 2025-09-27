from django.db import models
from apps.accounts.models import CustomUser
from apps.properties.models import Property


class FavouriteProperty(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='favourite_properties', blank=True, null=True)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='favourite_properties')
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    

    class Meta:
        unique_together = ('user', 'property')
        ordering = ['-created_at']
        db_table = 'FavouriteProperties'

    
