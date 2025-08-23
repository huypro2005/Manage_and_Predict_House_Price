from django.contrib import admin
from .models import FavouriteProperty

@admin.register(FavouriteProperty)
class FavouritePropertyAdmin(admin.ModelAdmin):
    list_display = ('user', 'property', 'created_at')
    search_fields = ('user__username', 'property__title')
    list_filter = ('created_at',)