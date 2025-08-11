from .accounts import urls as accounts_urls
from .contacts import urls as contacts_urls
from .defaults import urls as defaults_urls
from .properties import urls as properties_urls
from django.urls import path, include

urlpatterns = [
    path('api/v1/', include(accounts_urls)),
    path('api/v1/', include(contacts_urls)),
    path('api/v1/', include(defaults_urls)),
    path('api/v1/', include(properties_urls)),
    path('api/v1/', include('apps.predicts.urls')),  # Include predicts app URLs
]
