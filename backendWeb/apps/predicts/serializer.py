from rest_framework import serializers
from .models import Dashboard, PredictRequest


class DashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dashboard
        fields = '__all__'


class PredictRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PredictRequest
        fields = ['id', 'user', 'dashboard', 'input_data', 'predict_result', 'predict_price_per_m2', 'timestamp']
        read_only_fields = ['id', 'user', 'dashboard', 'timestamp', 'predict_result', 'predict_price_per_m2']

        extra_kwargs = {
            'input_data': {'required': True},
        }

    