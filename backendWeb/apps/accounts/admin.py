from django.contrib import admin
from django.utils.html import format_html
from .models import CustomUser


# Register your models here.
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('avatar_preview', 'username', 'email')

    def avatar_preview(self, obj):
        if obj.avatar:
            # Use format_html to safely render HTML
            return format_html('<img src="{}" alt="{}" width="50" height="50"/>', obj.avatar.url, obj.username)
        return format_html('<img src="{}" alt="{}" width="50" height="50"/>', 'default_avatar_url', obj.username)

    avatar_preview.short_description = 'Avatar'

    def save_model(self, request, obj, form, change):
        if 'password' in form.cleaned_data:
            obj.set_password(form.cleaned_data['password'])
        return super().save_model(request, obj, form, change)