from django.db import models
# Create your models here.



class Province(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    code = models.IntegerField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    deleted_at = models.DateTimeField(blank=True, null=True, default=None)

    class Meta:
        db_table = 'province'

    def __str__(self):
        return f'{self.name}'


class District(models.Model):
    province = models.ForeignKey(Province, on_delete=models.CASCADE, related_name='districts')
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    code = models.IntegerField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    deleted_at = models.DateTimeField(blank=True, null=True, default=None)

    class Meta:
        db_table = 'district'

    def __str__(self):
        return f'{self.name} ({self.province.name})'


class PropertyType(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    code = models.IntegerField(unique=True)
    is_active = models.BooleanField(default=True)
    deleted_at = models.DateTimeField(blank=True, null=True, default=None)
    tab = models.CharField(max_length=10, default='', blank=True, null=True)

    class Meta:
        db_table = 'propertytype'

    def __str__(self):
        return f'{self.name}'


# Thêm attributes
class Attribute(models.Model):
    name = models.CharField(max_length=100)
    unit = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    deleted_at = models.DateTimeField(blank=True, null=True, default=None)
    class Meta:
        db_table = 'attribute'

    def __str__(self):
        return f'{self.name}'


# Thêm type cho Attribute
class PropertyType_Attribute(models.Model):
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE, related_name='types')
    property_type = models.ForeignKey(PropertyType, on_delete=models.CASCADE, related_name='attributes')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    deleted_at = models.DateTimeField(blank=True, null=True, default=None)

    class Meta:
        db_table = 'propertytype_attribute'
        unique_together = ('attribute', 'property_type')
    def __str__(self):
        return f'{self.property_type.name} - {self.attribute.name}'