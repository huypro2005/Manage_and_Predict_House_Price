from rest_framework import serializers
from .models import Dashboard, PredictRequest


class DashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dashboard
        fields = '__all__'


class PredictRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PredictRequest
        fields = '__all__'