from django.urls import path
from .views import ContactRequestListView, ContactRequestDetailView

urlpatterns = [
    path('contact-requests/', ContactRequestListView.as_view(), name='contact-request-list'),
    path('contact-requests/<int:pk>/', ContactRequestDetailView.as_view(), name='contact-request-detail'),
]
