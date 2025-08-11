from django.db import models
from apps.accounts.models import CustomUser
# Create your models here.

class Dashboard(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    # Add any additional fields you need for the dashboard
    countRemain = models.IntegerField(default=10)
    Is_premium = models.BooleanField(default=False)
    expired = models.DateTimeField(null=True, blank=True)


class PredictRequest(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='predict_requests')
    dashboard = models.ForeignKey(Dashboard, on_delete=models.CASCADE, related_name='predict_requests', null=True, blank=True)
    input_data = models.JSONField()
    predict_result = models.FloatField(null=True, blank=True)
    predict_price_per_m2 = models.FloatField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

