from django.shortcuts import render
from apps.properties.serializer import PropertyDetailV1Serializer
from .serializer import FavouriteProperty, FavouritePropertyV1Serializer, FavouritePropertyV2Serializer
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.properties.models import Property
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.core.cache import cache
from apps.permission import IsAdminOrIsAuthenticated
from apps.accounts.models import CustomUser
from .favouritePropertyCaches import (
    fav_list_key,
    fav_set_key,
    add_to_cache,
    remove_from_cache,
    get_ids_from_cache,
    set_serialized_list_cache,
    get_serialized_list_cache,
    seed_set_if_empty
)
from django.db import transaction

    
class FavouritePropertyListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        # Kiểm tra cache list đã serialize
        cached = get_serialized_list_cache(user.id)
        if cached is not None:
            print('ids:', get_ids_from_cache(user.id))
            return Response({'data': cached, 'message': 'Success (from cache)'}, status=status.HTTP_200_OK)

        ids = get_ids_from_cache(user.id)
      

        if ids:
            print(list(ids))
            qs = (
                FavouriteProperty.objects
                .select_related('property')
                .filter(property_id__in=list(ids), user=user, is_active=True)
                .order_by('-created_at')
            )
        else:
            qs = (
                FavouriteProperty.objects
                .select_related('property')
                .filter(user=user, is_active=True)
                .order_by('-created_at')
            )
            ids_list = [fav.property.id for fav in qs]
            print('ids_list:', ids_list)
            seed_set_if_empty(user.id, ids_list)
        
        data = FavouritePropertyV1Serializer(qs, many=True).data
        set_serialized_list_cache(user.id, data)
        return Response({'data': data, 'message': 'Success (from DB)'}, status=status.HTTP_200_OK)

    @transaction.atomic
    def post(self, request):
        user = request.user
        property_id = request.data.get('property_id')
        if not property_id:
            return Response({'message': 'Property ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            property = Property.objects.get(id=property_id)
        except Property.DoesNotExist:
            return Response({'message': 'Property not found.'}, status=status.HTTP_404_NOT_FOUND)

        # GHI DB TRƯỚC
        fav, created = FavouriteProperty.objects.get_or_create(user=request.user, property=property)
        if created:
            # Sau khi DB OK -> update cache
            try: add_to_cache(request.user.id, property.id)
            except Exception: pass
            return Response({"message": "Added to favourites"}, status=201)
        else:
            if not fav.is_active:
                fav.is_active = True
                fav.save()
                try: add_to_cache(request.user.id, property.id)
                except Exception: pass
            else:
                fav.is_active = False
                fav.save()
                try: remove_from_cache(request.user.id, property.id)
                except Exception: pass

            return Response({"message": "Restored to favourites"}, status=200)

    @transaction.atomic
    def delete(self, request):
        user = request.user
        property_id = request.data.get('property_id')
        if not property_id:
            return Response({'message': 'Property ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
        fav = FavouriteProperty.objects.filter(user=user, property_id=property_id, is_active=True)
        if fav.exists():
            fav.is_active = False
            fav.save()
            try: remove_from_cache(user.id, property_id)
            except Exception: pass
            return Response({'message': 'Favourite property removed successfully.'}, status=status.HTTP_200_OK)

        return Response({'message': 'Favourite property not found.'}, status=status.HTTP_404_NOT_FOUND)



class FavouritePropertyV2View(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        cached = get_ids_from_cache(user.id)
        if cached is not None:
            return Response({'data': cached, 'message': 'Success (from cache)'}, status=status.HTTP_200_OK)

        qs = (
            FavouriteProperty.objects
            .select_related('property')
            .filter(user=user, is_active=True)
            .order_by('-created_at')
        )
        ids_list = [fav.property.id for fav in qs]
        seed_set_if_empty(user.id, ids_list)
        return Response({'data': ids_list, 'message': 'Success (from DB)'}, status=status.HTTP_200_OK)

    
class AddFavouritePropertyView(APIView):

    permission_classes = [IsAuthenticated]
    @transaction.atomic
    def post(self, request):
        user = request.user
        property_id = request.data.get('property_id')

        if not property_id:
            return Response({'message': 'Property ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            property = Property.objects.get(id=property_id)
        except Property.DoesNotExist:
            return Response({'message': 'Property not found.'}, status=status.HTTP_404_NOT_FOUND)

        fav, created = FavouriteProperty.objects.get_or_create(user=user, property=property)
        if created:
            add_to_cache(user.id, property_id)
            return Response({'message': 'Favourite property added successfully.'}, status=status.HTTP_201_CREATED)

        return Response({'message': 'Favourite property already exists.'}, status=status.HTTP_200_OK)

