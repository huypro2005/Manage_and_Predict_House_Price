"""
ASGI config for backendWeb project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backendWeb.settings')
django_asgi_app = get_asgi_application()

from channels.routing import ProtocolTypeRouter, URLRouter
from apps.common.jwt_auth import JWTAuthMiddlewareStack
from apps.accounts.routings import websocket_urlpatterns as account_ws
from apps.contacts.routings import websocket_urlpatterns as contact_ws
application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': JWTAuthMiddlewareStack(
        URLRouter(
            account_ws + contact_ws
        )
    ),
})