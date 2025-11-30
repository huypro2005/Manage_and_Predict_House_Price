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
from .favourite_cache import (
    add_fav,
    # set_list_cache,
    get_fav_ids,
    # get_list_cache,
    remove_fav,
    seed_set_if_empty
)
from django.db import transaction

    
class FavouritePropertyListView(APIView):
    permission_classes = [IsAuthenticated]



    '''
        gọi list danh sách các property yêu thích, khi gọi lên, xét xem property đó có active không 

        select *
        from property p join favorite_property fp on p.id = fp.property_id
        where p.
    '''
    def get(self, request):
        user = request.user
        # Kiểm tra cache list đã serialize
        # cached = get_serialized_list_cache(user.id)
        # if cached is not None:
        #     print('ids:', get_ids_from_cache(user.id))
        #     return Response({'data': cached, 'message': 'Success (from cache)'}, status=status.HTTP_200_OK)

        data = get_fav_ids(user.id)
        if data:
            favs = FavouriteProperty.objects.filter(id__in=data, is_active=True).select_related('property').order_by('-created_at')
            serializer = FavouritePropertyV1Serializer(favs, many=True)
            return Response({'data': serializer.data, 'message': 'Success (from cache)'}, status=status.HTTP_200_OK)
        
        favs = FavouriteProperty.objects.filter(
            user=user,
            is_active=True,
            property__is_active=True,
            property__status='approved'
        ).select_related('property').order_by('-created_at')
        serializer = FavouritePropertyV1Serializer(favs, many=True)
        data = serializer.data

        # 3. ghi vào cache
        ids = [fav.property.id for fav in favs]
        seed_set_if_empty(user.id, ids)
        # set_list_cache(user.id, data)

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
        if created or not fav.is_active:
            # Sau khi DB OK -> update cache
            fav.is_active = True
            fav.save(update_fields=['is_active'])
            add_fav(request.user.id, property.id)
            return Response({"message": "Added to favourites"}, status=201)

        fav.is_active = False
        fav.save(update_fields=['is_active'])
        remove_fav(request.user.id, property.id)
        return Response({"message": "Restored to favourites"}, status=200)

    @transaction.atomic
    def delete(self, request):
        user = request.user
        property_id = request.data.get('property_id')
        if not property_id:
            return Response({'message': 'Property ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
        fav = FavouriteProperty.objects.filter(user=user, property_id=property_id, is_active=True).first()
        if fav:
            fav.is_active = False
            fav.save(update_fields=['is_active'])
            remove_fav(user.id, property_id)
            return Response({'message': 'Favourite property removed successfully.'}, status=status.HTTP_200_OK)

        return Response({'message': 'Favourite property not found.'}, status=status.HTTP_404_NOT_FOUND)



class FavouritePropertyV2View(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        cached = get_fav_ids(user.id)
        if cached is not None:
            return Response({'data': cached, 'message': 'Success (from cache)'}, status=status.HTTP_200_OK)

        qs = (
            FavouriteProperty.objects
            .select_related('property')
            .filter(user=user, is_active=True, property__is_active=True)
            .order_by('-created_at')
        )
        # cache.delete(fav_set_key(user.id))
        ids_list = [fav.property.id for fav in qs]
        seed_set_if_empty(user.id, ids_list)

        return Response({'data': ids_list, 'message': 'Success (from DB)'}, status=status.HTTP_200_OK)

    

class CountFavouritePropertyView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        count = FavouriteProperty.objects.filter(user=user, is_active=True).count()
        return Response({'count': count, 'message': 'Success'}, status=status.HTTP_200_OK)