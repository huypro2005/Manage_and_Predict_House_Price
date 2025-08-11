from django.urls import path
from .views import DashboardView, PredictRequestView, ListPredictRequestsView

urlpatterns = [
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('predict-requests/', ListPredictRequestsView.as_view(), name='predict-requests'),
    path('predict-requests/<int:pk>/', PredictRequestView.as_view(), name='predict-request'),   
]