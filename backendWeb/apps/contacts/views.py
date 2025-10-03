from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ContactRequest, Property
from rest_framework.permissions import IsAuthenticated
from .serializer import ContactRequestV1Serializer
from django.http import Http404
from django.db import transaction
from rest_framework.pagination import PageNumberPagination
from apps.notifications.models import Notification
from apps.notifications.views import create_notification
# Create your views here.

class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'limit'
    max_page_size = 100


class ContactRequestListView(APIView):
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination

    def get_params(self, request):
        return {
            'page': int(request.query_params.get('page', 1)),
            'limit': int(request.query_params.get('limit', self.pagination_class.page_size)),
            'property_id': request.query_params.get('property_id', None),
        }

    def get(self, request):
        user = request.user
        params = self.get_params(request)
        if params['property_id']:
            try:
                property = Property.objects.get(id=params['property_id'])
            except Property.DoesNotExist:
                return Response({'message': 'Property not found'}, status=status.HTTP_404_NOT_FOUND)
            if property.user != user:
                return Response({'message': 'You do not have permission to view contact requests for this property'}, status=status.HTTP_403_FORBIDDEN)
            contact_requests = property.contact_requests.all().order_by('-created_at')
        else:
            contact_requests = (
                ContactRequest.objects.filter(property__user=user).order_by('-created_at')
            )
            # print(contact_requests)
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(contact_requests, request)
        serializer = ContactRequestV1Serializer(result_page, many=True)
        return paginator.get_paginated_response({'message': 'Contact requests retrieved successfully', 'data': serializer.data})

    @transaction.atomic
    def post(self, request):
        user = request.user
        serializer = ContactRequestV1Serializer(data=request.data)
        if serializer.is_valid():
            try:
                contact_request = serializer.save(user=user)
                def create_notification_after_commit():
                    try:
                        self.handle_create_notification(
                            to_user=contact_request.property.user,
                            from_user=user,
                            property=contact_request.property,
                            contact_request=contact_request
                        )
                    except Exception as e:
                        raise Exception('Notification creation failed: ' + str(e))
                transaction.on_commit(create_notification_after_commit)
                return Response({'message': 'Contact request created successfully',
                                 'data': serializer.data}, 
                                 status=status.HTTP_201_CREATED)
            except ValueError as ve:
                return Response({'message': 'Contact request creation failed', 'errors': str(ve)}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'message': 'Contact request creation failed', 'errors': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
        return Response({'message': 'Contact request creation failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    


    def handle_create_notification(self, to_user, from_user, property: Property, contact_request):
        notification_message = f'{from_user.username} đã yêu cầu liên lạc từ bài viết {property.title if len(property.title) < 20 else property.title[:17] + "..."}'
        ranges = [
            {
                'offset': 0,
                'length': len(from_user.username)
            },
            {
                'offset': 33+len(from_user.username),
                'length': len(property.title if len(property.title) < 20 else property.title[:17] + "...")
            }
        ]
       
        try:
            create_notification(
                user=to_user,
                type='contact_request',
                message=notification_message,
                url=f'/contact-requests/{contact_request.id}/',
                ranges=ranges,
                image_representation=property.thumbnail if property.thumbnail else None
            )
        except Exception as e:
            raise Exception('Notification creation failed: ' + str(e))
    

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


class ContactRequestFromPropertyView(APIView):
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination

    def get(self, request, property_id):
        user = request.user
        try:
            property = Property.objects.get(id=property_id)
        except Property.DoesNotExist:
            return Response({'message': 'Property not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if property.user != user:
            return Response({'message': 'You do not have permission to view contact requests for this property'}, status=status.HTTP_403_FORBIDDEN)
        
        contact_requests = property.contact_requests.all().order_by('-created_at')
        paginator = self.pagination_class()
        page = request.query_params.get('page', 1)  
        paginated_contact_requests = paginator.paginate_queryset(contact_requests, request)
        serializer = ContactRequestV1Serializer(paginated_contact_requests, many=True)
        return paginator.get_paginated_response({'message': 'Contact requests retrieved successfully', 'data': serializer.data})