from django.contrib import admin
from .models import Dashboard, PredictRequest
# Register your models here.

admin.site.register(PredictRequest)

class PredictInlines(admin.TabularInline):
    model = PredictRequest
    extra = 1
    fields = ('user', 'countRemain', 'Is_premium', 'expired')

@admin.register(Dashboard)
class DashboardAdmin(admin.ModelAdmin):
    inlines = [PredictInlines]
    list_display = ('user', 'countRemain', 'Is_premium', 'expired')