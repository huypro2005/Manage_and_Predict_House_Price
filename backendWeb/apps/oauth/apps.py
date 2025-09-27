from django.apps import AppConfig
import firebase_admin
from firebase_admin import credentials, auth
from django.conf import settings
import json


class OAuthConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.oauth'

    def ready(self):
        if not firebase_admin._apps:  # Kiểm tra nếu Firebase chưa được khởi tạo
            cred = credentials.Certificate(json.loads(settings.PATH_ACCOUNT_FIREBASE_SERVICE))
            firebase_admin.initialize_app(cred)