from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ContactRequest
from rest_framework.permissions import IsAuthenticated
from .serializer import ContactRequestV1Serializer
from django.http import Http404
# Create your views here.


class ContactRequestListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        contact_requests = ContactRequest.objects.all()
        serializer = ContactRequestV1Serializer(contact_requests, many=True)
        return Response({'message': 'Contact requests retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ContactRequestV1Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Contact request created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'message': 'Contact request creation failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ContactRequestDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return ContactRequest.objects.get(pk=pk)
        except ContactRequest.DoesNotExist:
            raise Http404('Contact request not found')

    def get(self, request, pk):
        contact_request = self.get_object(pk)
        serializer = ContactRequestV1Serializer(contact_request)
        return Response({'message': 'Contact request retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk):
        contact_request = self.get_object(pk)
        serializer = ContactRequestV1Serializer(contact_request, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Contact request updated successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'message': 'Contact request update failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        contact_request = self.get_object(pk)
        contact_request.is_active = False
        contact_request.save()
        return Response({'message': 'Contact request deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
