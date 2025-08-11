from django.contrib import admin
from .models import PropertyType, Province, District
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


@admin.register(PropertyType)
class PropertyTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'is_active')
    search_fields = ('name', 'code')
