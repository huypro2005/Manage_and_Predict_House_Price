from django.db import models
from apps.accounts.models import CustomUser
from apps.defaults.models import Province, District, PropertyType
from apps.utils import upload_to_app_model
# Create your models here.



class Property(models.Model):

    INTERIOR = [
        (1, 'sổ đỏ'),
        (1, 'sổ hồng'),
        (2, 'hợp đồng')
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='properties')
    province = models.ForeignKey(Province, on_delete=models.CASCADE, related_name='properties')
    district = models.ForeignKey(District, on_delete=models.CASCADE, related_name='properties')
    property_type = models.ForeignKey(PropertyType, on_delete=models.CASCADE, related_name='properties')
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    area_m2 = models.DecimalField(max_digits=10, decimal_places=2)
    price_per_m2 = models.DecimalField(max_digits=10, decimal_places=2)
    address = models.CharField(max_length=255)
    coord_x = models.DecimalField(max_digits=20, decimal_places=15)
    coord_y = models.DecimalField(max_digits=20, decimal_places=15)
    bedrooms = models.IntegerField(blank=True, null=True)
    floors = models.IntegerField(blank=True, null=True)
    frontage = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    legal_status = models.IntegerField(choices=INTERIOR, default=1)
    thumbnail = models.ImageField(upload_to=upload_to_app_model, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(blank=True, null=True, default=None)
    is_active = models.BooleanField(default=True)
    views = models.IntegerField(default=0)

    class Meta:
        db_table = 'Property'

    def thumbnail_tag(self):
        if self.thumbnail:
            return f'<img src="{self.thumbnail.url}" alt="{self.title}" width="50" height="50"/>'
        return ''

    thumbnail_tag.allow_tags = True
    thumbnail_tag.short_description = 'Thumbnail'


class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to=upload_to_app_model)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        db_table = 'PropertyImage'

