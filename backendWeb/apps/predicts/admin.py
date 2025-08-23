from django.contrib import admin
from .models import Dashboard, PredictRequest
# Register your models here.

admin.site.register(PredictRequest)

class PredictInlines(admin.TabularInline):
    model = PredictRequest
    extra = 1
    fields = ('timestamp','input_data', 'predict_price_per_m2')
    readonly_fields = ('timestamp',)  # Hiển thị 'timestamp' dưới dạng chỉ đọc

@admin.register(Dashboard)
class DashboardAdmin(admin.ModelAdmin):
    model = Dashboard
    inlines = [PredictInlines]
    list_display = ('user', 'countRemain', 'Is_premium', 'expired')