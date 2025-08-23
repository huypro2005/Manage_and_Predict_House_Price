from django.contrib import admin
from .models import ContactRequest
# Register your models here.


@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    

    list_display = ['id', 'user_send', 'property', 'message_preview', 'created_at']

    search_fields = ['user__username', 'property__title', 'message']


    def message_preview(self, obj):
        return f'{obj.message[:10]}...' if len(obj.message) > 10 else obj.message

    def user_send(self, obj):
        return obj.user.username