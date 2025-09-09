from django.test import TestCase
from rest_framework.test import APIClient
from django.db import IntegrityError
from .models import CustomUser, ContactRequest, Property
from apps.notifications.models import Notification
from unittest.mock import patch
from django.db import transaction

class ContactRequestTestCase(TestCase):
    
    def setUp(self):
        # Tạo người dùng giả
        self.user = CustomUser.objects.create_user(username='testuser', password='password')

        # Tạo các đối tượng phụ thuộc như Province và PropertyType


        # Tạo Property
        self.property = Property.objects.get(id=1)  # Giả sử Property với id=1 đã tồn tại trong fixture
        # Khởi tạo client API
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_create_contact_request_success(self):
        # Test trường hợp tạo contact request thành công
        data = {
            "property": self.property.id,
            "message": "Test contact request message"
        }
        response = self.client.post('/contact-request/', data, format='json')

        self.assertEqual(response.status_code, 201)  # Kiểm tra response status code

        # Kiểm tra xem contact request có được tạo trong cơ sở dữ liệu
        contact_request = ContactRequest.objects.last()
        self.assertEqual(contact_request.user, self.user)  # Kiểm tra user của contact request

        # Kiểm tra xem notification có được tạo không
        notification = Notification.objects.last()
        self.assertIsNotNone(notification)
        self.assertEqual(notification.type, "contact_request")  # Kiểm tra loại notification

    @patch('yourapp.views.create_notification')  # Mock create_notification để kiểm tra lỗi
    def test_create_contact_request_notification_failure(self, mock_create_notification):
        # Test trường hợp tạo notification thất bại
        mock_create_notification.side_effect = Exception("Notification creation failed")

        data = {
            "property": self.property.id,
            "message": "Test contact request message"
        }

        # Gửi yêu cầu tạo contact request
        response = self.client.post('/contact-request/', data, format='json')

        # Kiểm tra status code và lỗi
        self.assertEqual(response.status_code, 400)

        # Kiểm tra xem contact request có bị rollback không
        contact_requests_count = ContactRequest.objects.count()
        self.assertEqual(contact_requests_count, 0)  # Contact request không được tạo

    def test_create_contact_request_with_invalid_data(self):
        # Test trường hợp dữ liệu không hợp lệ
        data = {
            "property": self.property.id,
            "message": ""  # Tin nhắn trống
        }

        response = self.client.post('/contact-request/', data, format='json')

        # Kiểm tra rằng yêu cầu tạo contact request thất bại
        self.assertEqual(response.status_code, 400)
        self.assertIn('errors', response.data)  # Kiểm tra lỗi từ response

    def test_create_contact_request_transaction_rollback_on_error(self):
        # Kiểm tra rollback trong trường hợp lỗi xảy ra khi tạo contact request
        with self.assertRaises(IntegrityError):  # Lỗi khi tạo contact request
            with transaction.atomic():
                contact_request = ContactRequest.objects.create(user=None)  # Gây lỗi (user=None)
                contact_request.save()

            # Kiểm tra contact request không được lưu
            self.assertEqual(ContactRequest.objects.count(), 0)
