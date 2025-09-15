from django.urls import path
from .views import ContactRequestListView, ContactRequestDetailView, ContactRequestFromPropertyView

urlpatterns = [
    path('contact-requests/', ContactRequestListView.as_view(), name='contact-request-list'),
    path('contact-requests/<int:pk>/', ContactRequestDetailView.as_view(), name='contact-request-detail'),
    path('properties/<int:property_id>/contact-requests/', ContactRequestFromPropertyView.as_view(), name='contact-requests-from-property'),
]
