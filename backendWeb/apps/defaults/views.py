from datetime import timezone
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from .serializer import PropertyTypeSerializer, ProvinceSerializer, DistrictSerializer
from .models import PropertyType, Province, District
from django.http import Http404
from apps.permission import IsAdminOrReadOnly
# Create your views here.


class PropertyTypeListView(APIView):
    permission_classes = [IsAdminOrReadOnly]

    @method_decorator(cache_page(60 * 40))  # Cache for 40 minutes
    def get(self, request):
        property_types = PropertyType.objects.all()
        serializer = PropertyTypeSerializer(property_types, many=True)
        return Response({'message': 'Property types retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        self.permission_classes = [IsAdminUser]
        serializer = PropertyTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Property type created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'message': 'Property type creation failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
class PropertyTypeDetailView(APIView):

    permission_classes = [IsAdminOrReadOnly]

    def get_object(self, pk):
        try:
            return PropertyType.objects.get(pk=pk)
        except PropertyType.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        property_type = self.get_object(pk)
        serializer = PropertyTypeSerializer(property_type)
        return Response({'message': 'Property type retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk):
        property_type = self.get_object(pk)
        serializer = PropertyTypeSerializer(property_type, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Property type updated successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'message': 'Property type update failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        property_type = self.get_object(pk)
        property_type.is_active = False
        property_type.deleted_at = timezone.now()
        property_type.save()
        return Response({'message': 'Property type deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    


class ProvinceListView(APIView):
    permission_classes = [IsAdminOrReadOnly]


    @method_decorator(cache_page(60 * 40))  # Cache for 40 minutes
    def get(self, request):
        provinces = Province.objects.all()
        serializer = ProvinceSerializer(provinces, many=True)
        return Response({'message': 'Provinces retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ProvinceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Province created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'message': 'Province creation failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ProvinceDetailView(APIView):

    permission_classes = [IsAdminOrReadOnly]

    def get_object(self, pk):
        try:
            return Province.objects.get(pk=pk)
        except Province.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        province = self.get_object(pk)
        serializer = ProvinceSerializer(province)
        return Response({'message': 'Province retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk):
        province = self.get_object(pk)
        serializer = ProvinceSerializer(province, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Province updated successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'message': 'Province update failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        province = self.get_object(pk)
        province.is_active = False
        province.deleted_at = timezone.now()
        province.save()
        return Response({'message': 'Province deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


class DistrictListView(APIView):
    permission_classes = [IsAdminOrReadOnly]

    def get_province(self, province_pk):
        try:
            return Province.objects.get(pk=province_pk, is_active=True)
        except Province.DoesNotExist:
            raise Http404

    @method_decorator(cache_page(60 * 40))  # Cache for 40 minutes
    def get(self, request, province_pk):
        province = self.get_province(province_pk)
        districts = District.objects.filter(province=province, is_active=True)
        serializer = DistrictSerializer(districts, many=True)
        return Response({'message': 'Districts retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request, province_pk):
        province = self.get_province(province_pk)
        serializer = DistrictSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(province=province)
            return Response({'message': 'District created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'message': 'District creation failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class DistrictDetailView(APIView):
    permission_classes = [IsAdminOrReadOnly]

    def get_object(self, pk):
        try:
            return District.objects.get(pk=pk)
        except District.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        district = self.get_object(pk)
        serializer = DistrictSerializer(district)
        return Response({'message': 'District retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk):
        district = self.get_object(pk)
        serializer = DistrictSerializer(district, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'District updated successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'message': 'District update failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        district = self.get_object(pk)
        district.is_active = False
        district.deleted_at = timezone.now()
        district.save()
        return Response({'message': 'District deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
