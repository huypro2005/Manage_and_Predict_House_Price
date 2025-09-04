import asyncio
from django.shortcuts import render
from firebase_admin import credentials, auth
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
import firebase_admin
from apps.accounts.models import CustomUser as User
from django.utils.timezone import now
from django.contrib.auth.signals import user_logged_in
from apps.predicts.models import Dashboard
import random
from time import sleep



class FirebaseAuthView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        id_token = str(request.data.get("token"))
        if not id_token:
            return Response({"error": "ID token is required"}, status=status.HTTP_400_BAD_REQUEST)
        print(len(id_token))
        try:
            sleep(2)
            decoded = auth.verify_id_token(id_token)
            print(decoded)
            
        except auth.ExpiredIdTokenError:
            return Response({"error": "ID token has expired"}, status=status.HTTP_400_BAD_REQUEST)
        except auth.InvalidIdTokenError as e:
            print(e)
            if "Token used too early" in str(e):
                sleep(8)
                try:
                    decoded = auth.verify_id_token(id_token)
                except Exception as e:
                    return Response({"error": "Failed to verify ID token after retry", "details": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Failed to verify ID token", "details": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        if decoded.get('firebase', {}).get('sign_in_provider') != 'google.com':
            return Response({"error": "Invalid sign-in provider"}, status=status.HTTP_400_BAD_REQUEST)

        uid = decoded.get('uid')
        email = decoded.get('email' or '').strip()

        name = decoded.get('name' or '')

        current_user = User.objects.filter(google_id=uid).first()
        if not current_user and email:
            current_user = User.objects.filter(email__iexact=email).first()
        if not current_user:
            base_username = (email.split('@')[0] if email else f'fb_{uid}')[:30]
            username = base_username
            current_user = User.objects.create(
                username=username,
                email=email,
                google_id=uid,
                first_name=name,
                auth_provider='google',
            )
            random_password = ''.join(random.choices('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', k=10))
            current_user.set_password(random_password)
            k=5
            while k>0:
                try:
                    dashboard = Dashboard.objects.create(user=current_user)
                    dashboard.save()
                    break
                except Exception as e:
                    print(f"Error creating dashboard: {e}")
                    k -= 1
                    continue
            
            if k == 0:
                return Response({"error": "Failed to create dashboard after multiple attempts"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            current_user.save()

        if hasattr(current_user, 'google_id') and not current_user.google_id:
            current_user.google_id = uid

        if current_user:
            user_logged_in.send(sender=User, request=request, user=current_user)
        current_user.save()

        

        refresh = RefreshToken.for_user(current_user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        })