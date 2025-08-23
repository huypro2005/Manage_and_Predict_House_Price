from django.urls import path, include
from .views import FirebaseAuthView

urlpatterns = [
    path('firebase/google/', FirebaseAuthView.as_view(), name='firebase-auth'),
]
