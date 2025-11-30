from django.contrib import admin
from .models import Property, PropertyImage, PropertyAttributeValue
from django.utils.html import format_html
from django import forms
# Register your models here.

admin.site.register(PropertyImage)

class PropertyImagesInline(admin.TabularInline):
    model = PropertyImage
    extra = 1


class PropertyAttributeValueInline(admin.TabularInline):
    model = PropertyAttributeValue
    extra = 1
    fields = ('attribute', 'value', 'is_active')


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    inlines = [PropertyImagesInline, PropertyAttributeValueInline]
    list_display = ('thumbnail_tag', 'title', 'price', 'area_m2', 'is_active', 'status')

    def thumbnail_tag(self, obj):
        return format_html(obj.thumbnail_tag())

    thumbnail_tag.short_description = 'Thumbnail'  




