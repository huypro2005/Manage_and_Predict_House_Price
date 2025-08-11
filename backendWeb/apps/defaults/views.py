from datetime import timezone
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import PropertyTypeSerializer, ProvinceSerializer, DistrictSerializer
from .models import PropertyType, Province, District
from django.http import Http404

# Create your views here.


class PropertyTypeListView(APIView):
    def get(self, request):
        property_types = PropertyType.objects.all()
        serializer = PropertyTypeSerializer(property_types, many=True)
        return Response({'message': 'Property types retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PropertyTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Property type created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'message': 'Property type creation failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
class PropertyTypeDetailView(APIView):
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
    def get(self, request):
        districts = District.objects.all()
        serializer = DistrictSerializer(districts, many=True)
        return Response({'message': 'Districts retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = DistrictSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'District created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'message': 'District creation failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class DistrictDetailView(APIView):
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
