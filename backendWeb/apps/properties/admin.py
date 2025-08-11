from django.contrib import admin
from .models import Property, PropertyImage
from django.utils.html import format_html
from django import forms
# Register your models here.

admin.site.register(PropertyImage)

class PropertyImagesInline(admin.TabularInline):
    model = PropertyImage
    extra = 1



@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    inlines = [PropertyImagesInline]
    list_display = ('thumbnail_tag', 'title', 'price', 'area_m2', 'is_active')

    def thumbnail_tag(self, obj):
        return format_html(obj.thumbnail_tag())

    thumbnail_tag.short_description = 'Thumbnail'  