from time import timezone
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.http import Http404
from .serializer import PropertyImageSerializer, PropertyV1Serializer, PropertyDetailV1Serializer
from .models import Property, PropertyImage
from django.utils.dateparse import parse_datetime
# Create your views here.


class PropertyListView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_params(self, request):
        return {
            'user_id': request.GET.get('user_id'),
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
        }

    def get(self, request):
        params = self.get_params(request)
        filters = {}

        if params['user_id']:
            if int(params['user_id']) == request.user.id:
                filters['user_id'] = params['user_id']
            else:
                return Response({'message': 'You are not authorized to view this property'}, status=status.HTTP_403_FORBIDDEN)

        if params['start_post']:
            filters['created_at__gte'] = params['start_post']
        if params['end_post']:
            filters['created_at__lte'] = params['end_post']
        if params['area_min']:
            filters['area_m2__gte'] = params['area_min']
        if params['area_max']:
            filters['area_m2__lte'] = params['area_max']
        if params['price_min']:
            filters['price__gte'] = params['price_min']
        if params['price_max']:
            filters['price__lte'] = params['price_max']
        if params['property_type']:
            filters['property_type'] = params['property_type']
        if params['province']:
            filters['province'] = params['province']
        if params['district']:
            filters['district'] = params['district']
        if params['is_active'] and request.user.is_authenticated:
            filters['is_active'] = params['is_active']

        properties = Property.objects.filter(**filters).order_by('-created_at') # trả về danh sách bất động sản sắp xếp theo thời gian tạo gần nhất
        serializer = PropertyV1Serializer(properties, many=True)
        return Response({'message': 'Properties retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PropertyV1Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Property created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'message': 'Property creation failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class PropertyDetailView(APIView): 
    # retrieve a property with all its images
    def get_object(self, pk):
        try:
            return Property.objects.get(pk=pk, is_active=True)
        except Property.DoesNotExist:
            raise Http404('Property not found')

    def get(self, request, pk):
        prop = self.get_object(pk)
        serializer = PropertyDetailV1Serializer(prop)
        return Response({'message': 'Property retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk):
        prop = self.get_object(pk)
        serializer = PropertyDetailV1Serializer(prop, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Property updated successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'message': 'Property update failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        property = self.get_object(pk)
        property.is_active = False
        property.deleted_at = timezone.now()
        property.save()
        return Response({'message': 'Property deleted successfully'}, status=status.HTTP_204_NO_CONTENT)



class PropertyImageListView(APIView):
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
        serializer = PropertyImageSerializer(property_image, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Property image updated successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'message': 'Property image update failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        property_image = self.get_object(pk)
        property_image.delete()
        return Response({'message': 'Property image deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
