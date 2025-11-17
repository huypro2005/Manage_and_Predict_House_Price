from django.contrib import admin
from .models import PropertyType, Province, District, Attribute, PropertyType_Attribute
# Register your models here.



class DistrictInline(admin.TabularInline):
    model = District
    extra = 1
    fields = ('name', 'code', 'is_active')


@admin.register(Province)
class ProvinceAdmin(admin.ModelAdmin):
    inlines = [DistrictInline]
    list_display = ('name', 'code', 'is_active')


@admin.register(District)
class DistrictAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'is_active')


class AttributeInline(admin.TabularInline):
    model = PropertyType_Attribute
    extra = 1
    fields = ('attribute', 'is_active')

@admin.register(PropertyType)
class PropertyTypeAdmin(admin.ModelAdmin):
    inlines = [AttributeInline]
    list_display = ('name', 'code', 'is_active', 'tab')
    search_fields = ('name', 'code')


@admin.register(Attribute)
class AttributeAdmin(admin.ModelAdmin):
    list_display = ('name', 'unit', 'is_active')
    search_fields = ('name',)

@admin.register(PropertyType_Attribute)
class PropertyTypeAttributeAdmin(admin.ModelAdmin):
    list_display = ('property_type', 'attribute', 'is_active')
    search_fields = ('property_type__name', 'attribute__name')