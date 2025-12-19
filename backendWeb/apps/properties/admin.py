from django.contrib import admin
from .models import Property, PropertyImage, PropertyAttributeValue
from django.utils.html import format_html
from django import forms
from django.db.models import Case, When, Value, IntegerField
# Register your models here.

admin.site.register(PropertyImage)

class PropertyImagesInline(admin.TabularInline):
    model = PropertyImage
    extra = 1


class PropertyAttributeValueInline(admin.TabularInline):
    model = PropertyAttributeValue
    extra = 1
    fields = ('attribute', 'value', 'is_active')



'''
    Hiển thị những property với status pending lên đầu tiên trong trang admin
'''
@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    inlines = [PropertyImagesInline, PropertyAttributeValueInline]
    list_display = ('thumbnail_tag', 'title', 'price', 'area_m2', 'is_active', 'status')
    actions = ['mark_as_approved']

    def thumbnail_tag(self, obj):
        return format_html(obj.thumbnail_tag())

    # Override get_queryset to order by pending status
    # ý nghĩa của get_queryset: https://docs.djangoproject.com/en/4.2/ref/contrib/admin/#django.contrib.admin.ModelAdmin.get_queryset
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.annotate(
            pending_first=Case(
                When(status=Property.STATUS.PENDING, then=Value(0)),
                default=Value(1),
                output_field=IntegerField()
            )
        ).order_by('pending_first', '-created_at')

    @admin.action(description='Mark selected properties as Approved')
    def mark_as_approved(self, request, queryset):
        queryset.update(status=Property.STATUS.APPROVED)

    thumbnail_tag.short_description = 'Thumbnail'  



