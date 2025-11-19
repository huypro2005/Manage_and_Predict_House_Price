from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.http import Http404
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
from .serializer import PropertyImageSerializer, PropertyV1Serializer, PropertyDetailV1Serializer, PropertyCreateFullV1Serializer
from .models import Property, PropertyImage
from apps.permission import IsAuthenticatedOrReadOnly
from django.utils.dateparse import parse_datetime
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from django.core.cache import cache 
import hashlib
import datetime
from django.db import transaction
from apps.love_cart.models import FavouriteProperty
import json
# Create your views here.


class CustomPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'limit'
    max_page_size = 100

class PropertyListView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = CustomPagination

    def get_params(self, request):
        return {
            'username': request.GET.get('username'),
            'start_post': parse_datetime(request.GET.get('start_post')+'T00:00:00') if request.GET.get('start_post') else None,
            'end_post': parse_datetime(request.GET.get('end_post')+'T23:59:59') if request.GET.get('end_post') else None,
            'province': request.GET.get('province'),
            'district': request.GET.get('district'),
            'area_min': request.GET.get('area_min'),
            'area_max': request.GET.get('area_max'),
            'price_min': request.GET.get('price_min'),
            'price_max': request.GET.get('price_max'),
            'property_type': request.GET.get('property_type'),
            'is_active': request.GET.get('is_active'),
            'tab' : request.GET.get('tab'),
            'page': request.GET.get('page')
        }

    def get(self, request):
        params = self.get_params(request)
        cache_key = 'property_list_'+hashlib.md5(str(params).encode()).hexdigest()
        res = cache.get(cache_key)
        if res:
            print("Cache hit")
            return Response(res, status=status.HTTP_200_OK)

        print("Cache miss")
        filters = {}

        if params['username']:
            filters['user__username'] = params['username']
        if params['tab']:
            filters['tab'] = params['tab']
        if params['start_post']:
            filters['created_at__gte'] = params['start_post']
        if params['end_post']:
            filters['created_at__lte'] = params['end_post']
        if params['area_min']:
            filters['area_m2__gte'] = float(params['area_min'])
        if params['area_max']:
            filters['area_m2__lte'] = float(params['area_max'])
        if params['price_min']:
            filters['price__gte'] = float(params['price_min'])
        if params['price_max']:
            filters['price__lte'] = float(params['price_max'])
        if params['property_type']:
            # try:
            property_type = [int(d) for d in str(params['property_type']).split(',')] if ',' in str(params['property_type']) else [int(params['property_type'])]
            filters['property_type__in'] = property_type
            print(type(params['property_type']))
            # except ValueError:
            #     print(params['property_type'])
        
        if params['province']:
            filters['province'] = params['province']
        if params['district']:
            # ?district=12,5 or district=12
            # try:
            districts = [int(d) for d in str(params['district']).split(',')] if ',' in str(params['district']) else [int(params['district'])]
            filters['district__in'] = districts
            print(params['district'])
            # except ValueError:
            #     print(params['district'])
        if params['is_active'] and request.user.is_authenticated:
            filters['is_active'] = params['is_active']
            print(params['is_active'])
        else:
            filters['is_active'] = 1

        properties = Property.objects.filter(**filters).order_by('-created_at') # trả về danh sách bất động sản sắp xếp theo thời gian tạo gần nhất
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(properties, request)
        serializer = PropertyV1Serializer(page, many=True)
        result = {
            'message': 'Properties retrieved successfully',
            'data': serializer.data,
            'count': properties.count()
        }
        cache.set(cache_key, result, 60)  # Cache for 1 minutes

        return Response(result, status=status.HTTP_200_OK)

    @transaction.atomic
    def post(self, request):
        try:
            user = request.user
            serializer = PropertyCreateFullV1Serializer(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            property = serializer.save(user=user)
            
            if 'attributes' in request.data:
                attributes = json.loads(request.data.get('attributes'))
                # print(attributes)
                for attr in attributes:
                    property.attribute_values.create(
                        attribute_id=attr['attribute_id'],
                        value=attr['value'],
                        is_active=True
                    )

            if 'images' in request.FILES:
                for image in request.FILES.getlist('images'):
                    PropertyImage.objects.create(property=property, image=image)

            return Response({'message': 'Property created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'message': 'Property creation failed', 'errors': str(e)}, status=status.HTTP_400_BAD_REQUEST)



class PropertyDetailView(APIView): 
    permission_classes = [IsAuthenticatedOrReadOnly]
    # retrieve a property with all its images
    def get_object(self, pk):
        try:
            property = Property.objects.get(pk=pk, is_active=True)
            property.views += 1
            property.save()
            return property
        except Property.DoesNotExist:
            raise Http404('Property not found')

    def get(self, request, pk):
        prop = self.get_object(pk)
        serializer = PropertyDetailV1Serializer(prop)
        return Response({'message': 'Property retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk):
        prop = self.get_object(pk)
        if request.user and request.user.is_staff and request.user.is_active:
            pass
        elif request.user.id != prop.user.id:
            return Response({'message': 'You are not authorized to update this property'}, status=status.HTTP_403_FORBIDDEN)
        serializer = PropertyDetailV1Serializer(prop, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Property updated successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'message': 'Property update failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @transaction.atomic
    def delete(self, request, pk):
        property = self.get_object(pk)
        if request.user and request.user.is_staff and request.user.is_active:
            pass
        elif request.user.id != property.user.id:
            return Response({'message': 'You are not authorized to delete this property'}, status=status.HTTP_403_FORBIDDEN)
        property.is_active = False
        property.deleted_at = datetime.datetime.now()
        property.save()
        FavouriteProperty.objects.filter(property=property).update(is_active=True)
        return Response({'message': 'Property deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    

class MyPropertyListView(APIView):
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination

    def get(self, request):
        user = request.user
        properties = Property.objects.filter(user=user, is_active=True).order_by('-created_at')
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(properties, request)
        serializer = PropertyV1Serializer(result_page, many=True)
        return Response({'message': 'Your properties retrieved successfully', 'data': serializer.data, 'count': properties.count()}, status=status.HTTP_200_OK)




class PropertyImageListView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get_property(self, pk):
        try:
            return Property.objects.get(pk=pk)
        except Property.DoesNotExist:
            raise Http404('Property not found')

    def get(self, request, pk):
        prop = self.get_property(pk)
        property_images = prop.images.all()
        serializer = PropertyImageSerializer(property_images, many=True)
        return Response({'message': 'Property images retrieved successfully', 
                         'data': serializer.data,
                         'count': len(serializer.data)}, status=status.HTTP_200_OK)


    def post(self, request, pk):
        prop = self.get_property(pk)
        serializer = PropertyImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(property=prop)
            return Response({'message': 'Property image created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'message': 'Property image creation failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    

class PropertyImageDetailView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self, pk):
        try:
            return PropertyImage.objects.get(pk=pk)
        except PropertyImage.DoesNotExist:
            raise Http404('Property image not found')

    def get(self, request, pk):
        property_image = self.get_object(pk)
        serializer = PropertyImageSerializer(property_image)
        return Response({'message': 'Property image retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk):
        property_image = self.get_object(pk)
        if request.user and request.user.is_staff:
            pass
        elif request.user.id != property_image.property.user.id:
            return Response({'message': 'You are not authorized to update this property image'}, status=status.HTTP_403_FORBIDDEN)
        serializer = PropertyImageSerializer(property_image, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Property image updated successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'message': 'Property image update failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        if request.user and request.user.is_staff:
            pass
        elif request.user.id != self.get_object(pk).property.user.id:
            return Response({'message': 'You are not authorized to delete this property image'}, status=status.HTTP_403_FORBIDDEN)
        property_image = self.get_object(pk)
        property_image.delete()
        return Response({'message': 'Property image deleted successfully'}, status=status.HTTP_204_NO_CONTENT)



