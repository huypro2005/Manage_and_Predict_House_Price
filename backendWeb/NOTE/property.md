## Khi xử lý gửi tạo property kèm theo tạo loạt ảnh của property đó:

# Quy trình:

- Nhận data json từ frontend
- Tạo property trước, rồi tạo từng image

# Vấn đề:
- Không lấy user_id gửi từ frontend, mà lấy từ user xác thực qua token bằng request.user


# Giải quyết:
- Lấy trực tiếp request.user thông qua self.context['request'].user. Sử dụng nó trong Serializer