# 📚 Tài Liệu Chức Năng Dự Án - Hệ Thống Quản Lý Bất Động Sản

## 📋 Mục Lục
1. [Tổng Quan Dự Án](#tổng-quan-dự-án)
2. [Quản Lý Tài Khoản (Accounts)](#1-quản-lý-tài-khoản-accounts)
3. [Xác Thực JWT (AuthenticationJWT)](#2-xác-thực-jwt-authenticationjwt)
4. [OAuth2 với Google (OAuth)](#3-oauth2-với-google-oauth)
5. [Quản Lý Bất Động Sản (Properties)](#4-quản-lý-bất-động-sản-properties)
6. [Dự Đoán Giá Bất Động Sản (Predicts)](#5-dự-đoán-giá-bất-động-sản-predicts)
7. [Hệ Thống Tin Tức (News)](#6-hệ-thống-tin-tức-news)
8. [Hệ Thống Comment (Comments)](#7-hệ-thống-comment-comments)
9. [Thông Báo (Notifications)](#8-thông-báo-notifications)
10. [Yêu Thích (Love Cart)](#9-yêu-thích-love-cart)
11. [Liên Hệ (Contacts)](#10-liên-hệ-contacts)
12. [Chat Real-time (Conversations & Chat Message)](#11-chat-real-time-conversations--chat-message)
13. [Dữ Liệu Mặc Định (Defaults)](#12-dữ-liệu-mặc-định-defaults)

---

## Tổng Quan Dự Án

Đây là một hệ thống backend Django RESTful API cho việc quản lý và dự đoán giá bất động sản. Hệ thống cung cấp các tính năng quản lý tài khoản, đăng tin bất động sản, dự đoán giá nhà, tin tức, thông báo, chat real-time và nhiều tính năng khác.

### Công Nghệ Sử Dụng
- **Backend**: Django 5.2.5, Django REST Framework
- **WebSocket**: Django Channels
- **Database**: MySQL
- **Cache**: Redis
- **Authentication**: JWT (Simple JWT), OAuth2
- **Machine Learning**: Scikit-learn, Joblib
- **Real-time**: WebSocket với Redis Channel Layer

---

## 1. Quản Lý Tài Khoản (Accounts)

### 1.1. Model: CustomUser

**Mô tả**: Model người dùng tùy chỉnh kế thừa từ AbstractUser

**Các trường chính**:
- `email`: Email duy nhất
- `auth_provider`: Nhà cung cấp xác thực (local/google)
- `google_id`: ID từ Google OAuth
- `avatar`: Ảnh đại diện
- `phone`: Số điện thoại (unique)
- `first_name`, `last_name`: Tên người dùng
- `birth_date`: Ngày sinh
- `is_active`: Trạng thái hoạt động
- `is_verified`: Trạng thái xác thực
- `status`: Trạng thái online/offline
- `description`: Mô tả cá nhân

### 1.2. API Endpoints

#### 1.2.1. Danh Sách Người Dùng
- **URL**: `GET /api/v1/users/`
- **Mô tả**: Lấy danh sách tất cả người dùng
- **Permission**: AllowAny
- **Response**: Danh sách người dùng với thông tin cơ bản

#### 1.2.2. Tạo Người Dùng Mới
- **URL**: `POST /api/v1/users/`
- **Mô tả**: Đăng ký tài khoản mới
- **Permission**: AllowAny
- **Request Body**: 
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "first_name": "string",
    "last_name": "string"
  }
  ```
- **Response**: Thông tin người dùng vừa tạo + tự động tạo Dashboard

#### 1.2.3. Chi Tiết Người Dùng
- **URL**: `GET /api/v1/users/{id}/`
- **Mô tả**: Lấy thông tin chi tiết của một người dùng
- **Permission**: AllowAny
- **Response**: Thông tin đầy đủ của người dùng

#### 1.2.4. Cập Nhật Người Dùng
- **URL**: `PUT /api/v1/users/{id}/`
- **Mô tả**: Cập nhật thông tin người dùng
- **Permission**: IsAuthenticated (chỉ chủ tài khoản hoặc admin)
- **Response**: Thông tin người dùng đã cập nhật + xóa cache

#### 1.2.5. Xóa Người Dùng (Soft Delete)
- **URL**: `DELETE /api/v1/users/{id}/`
- **Mô tả**: Vô hiệu hóa tài khoản (soft delete)
- **Permission**: IsAuthenticated (chỉ chủ tài khoản hoặc admin)
- **Response**: Thông báo thành công

#### 1.2.6. Thay Đổi Avatar
- **URL**: `PUT /api/v1/me/change_avatar/`
- **Mô tả**: Cập nhật ảnh đại diện
- **Permission**: IsAuthenticated
- **Request**: Form-data với file ảnh
- **Response**: URL ảnh đại diện mới + xóa cache

#### 1.2.7. Thông Tin Tài Khoản Hiện Tại
- **URL**: `GET /api/v1/me/`
- **Mô tả**: Lấy thông tin tài khoản đang đăng nhập
- **Permission**: IsAuthenticated
- **Response**: Thông tin đầy đủ của user hiện tại

#### 1.2.8. Cập Nhật Thông Tin Tài Khoản Hiện Tại
- **URL**: `PUT /api/v1/me/`
- **Mô tả**: Cập nhật thông tin tài khoản của chính mình
- **Permission**: IsAuthenticated
- **Response**: Thông tin đã cập nhật + xóa cache

#### 1.2.9. Danh Sách Bạn Bè
- **URL**: `GET /api/v1/users/friends/`
- **Mô tả**: Lấy danh sách tất cả người dùng (trừ chính mình)
- **Permission**: IsAuthenticated
- **Response**: Danh sách người dùng có thể kết bạn

### 1.3. Tính Năng Đặc Biệt
- **Cache**: Sử dụng Redis để cache thông tin người dùng
- **Soft Delete**: Xóa tài khoản bằng cách set `is_active = False`
- **Auto Create Dashboard**: Tự động tạo Dashboard khi tạo user mới

---

## 2. Xác Thực JWT (AuthenticationJWT)

### 2.1. API Endpoints

#### 2.1.1. Đăng Ký
- **URL**: `POST /api/v1/auth/register/`
- **Mô tả**: Đăng ký tài khoản mới với JWT
- **Permission**: AllowAny
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "first_name": "string",
    "last_name": "string"
  }
  ```
- **Response**: Access token + Refresh token + Thông tin user + Tự động tạo Dashboard

#### 2.1.2. Đăng Nhập
- **URL**: `POST /api/v1/auth/login/`
- **Mô tả**: Đăng nhập và nhận JWT token
- **Permission**: AllowAny
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**: 
  ```json
  {
    "access": "jwt_access_token",
    "refresh": "jwt_refresh_token",
    "user": {...}
  }
  ```

#### 2.1.3. Refresh Token
- **URL**: `POST /api/v1/auth/refresh/`
- **Mô tả**: Làm mới access token
- **Permission**: AllowAny
- **Request Body**:
  ```json
  {
    "refresh": "refresh_token"
  }
  ```
- **Response**: Access token mới

#### 2.1.4. Quên Mật Khẩu
- **URL**: `POST /api/v1/auth/forgot-password/`
- **Mô tả**: Gửi email chứa mật khẩu mới
- **Permission**: AllowAny
- **Request Body**:
  ```json
  {
    "email": "string"
  }
  ```
- **Response**: Thông báo email đã được gửi

#### 2.1.5. Đổi Mật Khẩu
- **URL**: `POST /api/v1/auth/change-password/`
- **Mô tả**: Đổi mật khẩu cho tài khoản đang đăng nhập
- **Permission**: IsAuthenticated
- **Request Body**:
  ```json
  {
    "old_password": "string",
    "new_password": "string"
  }
  ```
- **Response**: Thông báo thành công

### 2.2. Cấu Hình JWT
- **Access Token Lifetime**: 60 phút
- **Refresh Token Lifetime**: 7 ngày
- **Algorithm**: HS256
- **Token Type**: Bearer

---

## 3. OAuth2 với Google (OAuth)

### 3.1. API Endpoints

#### 3.1.1. Xác Thực Google
- **URL**: `POST /api/v1/oauth/firebase-auth/`
- **Mô tả**: Xác thực với Google qua Firebase ID Token
- **Permission**: AllowAny
- **Request Body**:
  ```json
  {
    "token": "firebase_id_token"
  }
  ```
- **Response**: 
  ```json
  {
    "access": "jwt_access_token",
    "refresh": "jwt_refresh_token",
    "user": {
      "username": "string",
      "email": "string",
      "full_name": "string",
      "id": "int",
      "is_active": "bool",
      "avatar": "url",
      "is_verified": "bool"
    }
  }
  ```

### 3.2. Quy Trình Xử Lý
1. Client gửi Firebase ID Token
2. Server verify token với Firebase Admin SDK
3. Lấy thông tin từ token (uid, email, name)
4. Tìm hoặc tạo user:
   - Tìm theo `google_id`
   - Nếu không có, tìm theo `email`
   - Nếu không có, tạo user mới với `auth_provider='google'`
5. Tự động tạo Dashboard cho user mới
6. Trả về JWT tokens

### 3.3. Tính Năng Đặc Biệt
- **Auto Create User**: Tự động tạo user nếu chưa tồn tại
- **Link Account**: Nếu user đã có email, link với Google ID
- **Retry Logic**: Có retry logic khi token chưa sẵn sàng

---

## 4. Quản Lý Bất Động Sản (Properties)

### 4.1. Model: Property

**Mô tả**: Model chứa thông tin bất động sản

**Các trường chính**:
- `user`: Chủ sở hữu (ForeignKey)
- `province`, `district`: Vị trí địa lý
- `property_type`: Loại bất động sản
- `title`: Tiêu đề
- `description`: Mô tả
- `price`: Giá
- `area_m2`: Diện tích (m²)
- `price_per_m2`: Giá trên m² (tự động tính)
- `address`: Địa chỉ
- `coord_x`, `coord_y`: Tọa độ GPS
- `bedrooms`: Số phòng ngủ
- `floors`: Số tầng
- `frontage`: Mặt tiền
- `legal_status`: Tình trạng pháp lý (sổ đỏ/sổ hồng/hợp đồng)
- `thumbnail`: Ảnh đại diện
- `status`: Trạng thái (pending/approved/rejected)
- `tab`: Loại giao dịch (ban/thue)
- `is_active`: Trạng thái hoạt động

**Lưu ý**: Trường `views` (số lượt xem) đã được tách riêng vào model `ViewsProperty` để tránh cập nhật liên tục bảng `Property` mỗi khi có lượt xem, giúp tối ưu hiệu suất database.

### 4.2. Model: ViewsProperty

**Mô tả**: Model riêng để quản lý số lượt xem của bất động sản, tách biệt khỏi model Property để tối ưu hiệu suất.

**Lý do tách riêng**:
- Tránh cập nhật liên tục bảng `Property` mỗi khi có lượt xem
- Giảm lock contention trên bảng Property
- Tối ưu hiệu suất database khi có nhiều lượt xem đồng thời
- Dễ dàng mở rộng thêm các thống kê khác (views theo ngày, theo user, etc.)

**Các trường**:
- `property`: Bất động sản (OneToOneField với Property, related_name='viewed_property')
- `views`: Số lượt xem (IntegerField, default=0)

**Quan hệ**:
- Mỗi Property có một ViewsProperty duy nhất (OneToOne)
- Truy cập qua: `property.viewed_property.views`

**Cách sử dụng**:
```python
# Tăng lượt xem
property.viewed_property.views += 1
property.viewed_property.save()

# Lấy số lượt xem
views_count = property.viewed_property.views
```

### 4.3. Model: PropertyImage

**Mô tả**: Ảnh của bất động sản

**Các trường**:
- `property`: Bất động sản (ForeignKey)
- `image`: File ảnh

### 4.4. Model: PropertyAttributeValue

**Mô tả**: Giá trị thuộc tính động của bất động sản

**Các trường**:
- `property`: Bất động sản (ForeignKey)
- `attribute`: Thuộc tính (ForeignKey)
- `value`: Giá trị

### 4.4. API Endpoints

#### 4.5.1. Danh Sách Bất Động Sản
- **URL**: `GET /api/v1/properties/`
- **Mô tả**: Lấy danh sách bất động sản với filter và pagination
- **Permission**: IsAuthenticatedOrReadOnly
- **Query Parameters**:
  - `username`: Lọc theo username người đăng
  - `start_post`, `end_post`: Lọc theo khoảng thời gian
  - `province`: Lọc theo tỉnh
  - `district`: Lọc theo quận/huyện (có thể nhiều: `district=1,2,3`)
  - `area_min`, `area_max`: Lọc theo diện tích
  - `price_min`, `price_max`: Lọc theo giá
  - `property_type`: Lọc theo loại BDS (có thể nhiều: `property_type=1,2,3`)
  - `tab`: Lọc theo loại giao dịch (ban/thue)
  - `is_active`: Lọc theo trạng thái (chỉ admin)
  - `page`: Số trang
  - `limit`: Số lượng mỗi trang
- **Response**: Danh sách bất động sản + tổng số + Cache 3 phút

#### 4.5.2. Tạo Bất Động Sản Mới
- **URL**: `POST /api/v1/properties/`
- **Mô tả**: Tạo bất động sản mới
- **Permission**: IsAuthenticated
- **Request**: Form-data với:
  - Thông tin bất động sản
  - `images`: Nhiều file ảnh
  - `attributes`: JSON string chứa thuộc tính động
- **Response**: Thông tin bất động sản vừa tạo + Tự động tạo ViewsProperty

#### 4.5.3. Chi Tiết Bất Động Sản
- **URL**: `GET /api/v1/properties/{id}/`
- **Mô tả**: Lấy thông tin chi tiết bất động sản
- **Permission**: IsAuthenticatedOrReadOnly
- **Response**: Thông tin đầy đủ + Tự động tăng lượt xem

#### 4.5.4. Cập Nhật Bất Động Sản
- **URL**: `PUT /api/v1/properties/{id}/`
- **Mô tả**: Cập nhật thông tin bất động sản
- **Permission**: IsAuthenticated (chủ sở hữu hoặc admin)
- **Response**: Thông tin đã cập nhật + Set status về PENDING + Xóa cache

#### 4.5.5. Cập Nhật Một Phần
- **URL**: `PATCH /api/v1/properties/{id}/`
- **Mô tả**: Cập nhật một số trường của bất động sản
- **Permission**: IsAuthenticated (chủ sở hữu hoặc admin)
- **Response**: Thông tin đã cập nhật + Tự động tính `price_per_m2` + Set status về PENDING

#### 4.5.6. Xóa Bất Động Sản (Soft Delete)
- **URL**: `DELETE /api/v1/properties/{id}/`
- **Mô tả**: Xóa bất động sản (soft delete)
- **Permission**: IsAuthenticated (chủ sở hữu hoặc admin)
- **Response**: Thông báo thành công + Xóa cache

#### 4.5.7. Danh Sách Bất Động Sản Của Tôi
- **URL**: `GET /api/v1/properties/my/`
- **Mô tả**: Lấy danh sách bất động sản của user đang đăng nhập
- **Permission**: IsAuthenticated
- **Response**: Danh sách bất động sản của user

#### 4.5.8. Danh Sách Ảnh Bất Động Sản
- **URL**: `GET /api/v1/properties/{id}/images/`
- **Mô tả**: Lấy danh sách ảnh của bất động sản
- **Permission**: IsAuthenticatedOrReadOnly
- **Response**: Danh sách ảnh

#### 4.5.9. Thêm Ảnh Bất Động Sản
- **URL**: `POST /api/v1/properties/{id}/images/`
- **Mô tả**: Thêm ảnh cho bất động sản
- **Permission**: IsAuthenticated
- **Request**: Form-data với file ảnh
- **Response**: Thông tin ảnh vừa thêm

#### 4.5.10. Chi Tiết Ảnh
- **URL**: `GET /api/v1/properties/images/{image_id}/`
- **Mô tả**: Lấy thông tin một ảnh
- **Permission**: IsAuthenticatedOrReadOnly
- **Response**: Thông tin ảnh

#### 4.5.11. Cập Nhật Ảnh
- **URL**: `PUT /api/v1/properties/images/{image_id}/`
- **Mô tả**: Cập nhật ảnh
- **Permission**: IsAuthenticated (chủ sở hữu hoặc admin)
- **Response**: Thông tin ảnh đã cập nhật

#### 4.5.12. Xóa Ảnh
- **URL**: `DELETE /api/v1/properties/images/{image_id}/`
- **Mô tả**: Xóa ảnh
- **Permission**: IsAuthenticated (chủ sở hữu hoặc admin)
- **Response**: Thông báo thành công

### 4.6. Tính Năng Đặc Biệt
- **Cache**: Cache danh sách bất động sản 3 phút
- **Auto Calculate**: Tự động tính `price_per_m2`
- **Status Management**: Quản lý trạng thái duyệt (pending/approved/rejected)
- **View Counter**: Tự động tăng lượt xem khi xem chi tiết (qua ViewsProperty, tối ưu hiệu suất)
- **ViewsProperty Separation**: Tách riêng số lượt xem vào model riêng để tránh cập nhật liên tục bảng Property
- **Soft Delete**: Xóa bằng cách set `is_active = False`
- **Dynamic Attributes**: Hỗ trợ thuộc tính động theo loại BDS

---

## 5. Dự Đoán Giá Bất Động Sản (Predicts)

### 5.1. Model: Dashboard

**Mô tả**: Dashboard quản lý lượt dự đoán của user

**Các trường**:
- `user`: Người dùng (OneToOne)
- `countRemain`: Số lượt dự đoán còn lại
- `Is_premium`: Trạng thái premium
- `expired`: Ngày hết hạn premium

### 5.2. Model: PredictRequest

**Mô tả**: Lịch sử dự đoán giá

**Các trường**:
- `user`: Người dùng (ForeignKey)
- `dashboard`: Dashboard (ForeignKey)
- `input_data`: Dữ liệu đầu vào (JSON)
- `predict_result`: Giá dự đoán tổng
- `predict_price_per_m2`: Giá dự đoán trên m²
- `timestamp`: Thời gian dự đoán

### 5.3. API Endpoints

#### 5.3.1. Dashboard
- **URL**: `GET /api/v1/predicts/dashboard/`
- **Mô tả**: Lấy thông tin dashboard của user
- **Permission**: IsAuthenticated
- **Response**: 
  ```json
  {
    "countRemain": "int",
    "Is_premium": "bool",
    "expired": "datetime"
  }
  ```

#### 5.3.2. Cập Nhật Dashboard
- **URL**: `PUT /api/v1/predicts/dashboard/`
- **Mô tả**: Cập nhật thông tin dashboard (thường dùng cho admin)
- **Permission**: IsAuthenticated
- **Response**: Thông tin dashboard đã cập nhật

#### 5.3.3. Danh Sách Lịch Sử Dự Đoán
- **URL**: `GET /api/v1/predicts/predict-requests/`
- **Mô tả**: Lấy lịch sử dự đoán của user
- **Permission**: IsAuthenticated
- **Response**: Danh sách các lần dự đoán

#### 5.3.4. Tạo Dự Đoán Mới
- **URL**: `POST /api/v1/predicts/predict-requests/`
- **Mô tả**: Thực hiện dự đoán giá bất động sản
- **Permission**: IsAuthenticated
- **Request Body**:
  ```json
  {
    "input_data": {
      "loại nhà đất": "int",
      "mã huyện": "int",
      "diện tích": "float",
      "mặt tiền": "float",
      "phòng ngủ": "int",
      "pháp lý": "int",
      "tọa độ x": "float",
      "tọa độ y": "float",
      "số tầng": "int",
      "mã tỉnh": "int"
    }
  }
  ```
- **Response**: 
  ```json
  {
    "predict_result": "float",
    "predict_price_per_m2": "float",
    "input_data": {...},
    "timestamp": "datetime"
  }
  ```

#### 5.3.5. Chi Tiết Dự Đoán
- **URL**: `GET /api/v1/predicts/predict-requests/{id}/`
- **Mô tả**: Lấy thông tin chi tiết một lần dự đoán
- **Permission**: IsAuthenticated (chỉ của chính user)
- **Response**: Thông tin đầy đủ lần dự đoán

#### 5.3.6. Xóa Dự Đoán
- **URL**: `DELETE /api/v1/predicts/predict-requests/{id}/`
- **Mô tả**: Xóa một lần dự đoán khỏi lịch sử
- **Permission**: IsAuthenticated (chỉ của chính user)
- **Response**: Thông báo thành công

### 5.4. Tính Năng Đặc Biệt
- **Machine Learning**: Sử dụng model Scikit-learn để dự đoán
- **Model File**: `apps/predicts/model_ai/model1.pkl`
- **Auto Calculate**: Tự động tính giá tổng từ giá trên m²
- **History Tracking**: Lưu lịch sử tất cả các lần dự đoán
- **Premium Feature**: Hỗ trợ giới hạn lượt dự đoán (hiện tại chưa áp dụng)

---

## 6. Hệ Thống Tin Tức (News)

### 6.1. Model: NewsArticle

**Mô tả**: Bài viết tin tức

**Các trường**:
- `title`: Tiêu đề
- `content`: Nội dung (RichTextField với CKEditor)
- `author`: Tác giả (ForeignKey)
- `thumbnail`: Ảnh đại diện
- `created_at`, `updated_at`: Thời gian
- `is_checked`: Đã kiểm tra
- `is_approved`: Đã duyệt
- `is_deleted`: Đã xóa
- `province`: Tỉnh liên quan
- `introduction`: Giới thiệu ngắn
- `views`: Số lượt xem

### 6.2. Model: Source

**Mô tả**: Nguồn tham khảo của bài viết

**Các trường**:
- `article`: Bài viết (ForeignKey)
- `url`: URL nguồn
- `name`: Tên nguồn

### 6.3. API Endpoints

#### 6.3.1. Danh Sách Tin Tức
- **URL**: `GET /api/v1/news/`
- **Mô tả**: Lấy danh sách tin tức đã duyệt
- **Permission**: AllowAny
- **Query Parameters**:
  - `limit`: Giới hạn số lượng
  - `page`: Số trang
- **Response**: Danh sách tin tức + Pagination + Cache 10 phút

#### 6.3.2. Chi Tiết Tin Tức
- **URL**: `GET /api/v1/news/{id}/`
- **Mô tả**: Lấy chi tiết một bài viết
- **Permission**: AllowAny
- **Response**: Thông tin đầy đủ bài viết + Tự động tăng lượt xem + Cache 10 phút

#### 6.3.3. Cập Nhật Tin Tức
- **URL**: `PUT /api/v1/news/{id}/`
- **Mô tả**: Cập nhật bài viết
- **Permission**: IsAuthenticated (tác giả hoặc admin)
- **Response**: Thông tin bài viết đã cập nhật

#### 6.3.4. Tin Tức Đề Xuất
- **URL**: `GET /api/v1/news/recommended/`
- **Mô tả**: Lấy danh sách tin tức đề xuất
- **Permission**: AllowAny
- **Query Parameters**:
  - `province`: ID tỉnh (ưu tiên tin cùng tỉnh)
  - `limit`: Số lượng (mặc định 5)
  - `current_article_id`: ID bài viết hiện tại (để loại trừ)
- **Response**: Danh sách tin tức đề xuất

### 6.4. Tính Năng Đặc Biệt
- **Rich Text Editor**: Sử dụng CKEditor cho nội dung
- **Approval System**: Hệ thống duyệt bài (is_approved)
- **View Counter**: Tự động tăng lượt xem
- **Province Priority**: Ưu tiên tin cùng tỉnh trong đề xuất
- **Cache**: Cache danh sách và chi tiết 10 phút

---

## 7. Hệ Thống Comment (Comments)

### 7.1. Model: Comment

**Mô tả**: Comment trên bài viết tin tức

**Các trường**:
- `article`: Bài viết (ForeignKey)
- `author`: Người comment (ForeignKey)
- `content`: Nội dung comment
- `created_at`, `updated_at`: Thời gian
- `answer`: Comment cha (ForeignKey self, cho reply)
- `is_deleted`: Đã xóa

### 7.2. API Endpoints

#### 7.2.1. Danh Sách Comment
- **URL**: `GET /api/v1/comments/`
- **Mô tả**: Lấy danh sách comment của một bài viết
- **Permission**: IsAuthenticatedOrReadOnly
- **Query Parameters**:
  - `article_id`: ID bài viết (bắt buộc)
  - `limit`: Số lượng (mặc định 10)
  - `page`: Số trang
- **Response**: Danh sách comment (chỉ comment gốc, không có reply) + Pagination

#### 7.2.2. Tạo Comment
- **URL**: `POST /api/v1/comments/`
- **Mô tả**: Tạo comment mới hoặc reply
- **Permission**: IsAuthenticated
- **Request Body**:
  ```json
  {
    "article": "int",
    "content": "string",
    "answer": "int (optional, ID comment cha nếu là reply)"
  }
  ```
- **Response**: Thông tin comment vừa tạo

#### 7.2.3. Xóa Comment
- **URL**: `DELETE /api/v1/comments/`
- **Mô tả**: Xóa comment
- **Permission**: IsAuthenticated (tác giả hoặc admin)
- **Query Parameters**:
  - `comment_id`: ID comment (bắt buộc)
  - `article_id`: ID bài viết (bắt buộc)
- **Response**: Thông báo thành công

### 7.3. Tính Năng Đặc Biệt
- **Nested Comments**: Hỗ trợ reply comment (comment con)
- **Soft Delete**: Xóa bằng cách set `is_deleted = True`
- **Permission Check**: Chỉ tác giả hoặc admin mới xóa được

---

## 8. Thông Báo (Notifications)

### 8.1. Model: Notification

**Mô tả**: Thông báo cho người dùng. Hiện tại chỉ thông báo khi có sự thay đổi của property (Khi trạng thái bài viết property được admin duyệt hoặc mới đăng thì có thông báo về người dùng đã duyệt hay đợi duyệt)

**Các trường**:
- `user`: Người nhận (ForeignKey)
- `type`: Loại thông báo (contact_request/property_view/new_message/system_alert/promotion)
- `message`: Nội dung thông báo
- `is_read`: Đã đọc
- `url`: URL liên kết
- `created_at`: Thời gian tạo
- `is_deleted`: Đã xóa
- `image_representation`: Ảnh đại diện

### 8.2. Model: Range

**Mô tả**: Vùng highlight trong message

**Các trường**:
- `notification`: Thông báo (ForeignKey)
- `offset`: Vị trí bắt đầu
- `length`: Độ dài

### 8.3. API Endpoints

#### 8.3.1. Danh Sách Thông Báo
- **URL**: `GET /api/v1/notifications/`
- **Mô tả**: Lấy danh sách thông báo của user
- **Permission**: IsAuthenticated
- **Query Parameters**:
  - `page`: Số trang (mặc định 1)
- **Response**: 
  ```json
  {
    "count": "int",
    "not_readed": "int",
    "next": "int hoặc null",
    "results": [...],
    "status_code": "int"
  }
  ```
- **Cache**: Sử dụng Redis để cache danh sách ID thông báo

#### 8.3.2. Đánh Dấu Đã Đọc / Xóa
- **URL**: `PUT /api/v1/notifications/{id}/`
- **Mô tả**: Đánh dấu đã đọc hoặc xóa thông báo
- **Permission**: IsAuthenticated
- **Request Body**:
  ```json
  {
    "action": "readed" hoặc "deleted"
  }
  ```
- **Response**: Thông tin thông báo đã cập nhật + Cập nhật cache

#### 8.3.3. Số Lượng Thông Báo Chưa Đọc
- **URL**: `GET /api/v1/notifications/not-read-count/`
- **Mô tả**: Lấy số lượng thông báo chưa đọc
- **Permission**: IsAuthenticated
- **Response**: 
  ```json
  {
    "not_readed": "int",
    "message": "string"
  }
  ```
- **Cache**: Lấy từ cache nếu có

### 8.4. Hàm Helper: create_notification

**Mô tả**: Hàm tạo thông báo (được sử dụng bởi các module khác)

**Tham số**:
- `user`: Người nhận
- `type`: Loại thông báo
- `message`: Nội dung
- `url`: URL (optional)
- `ranges`: Danh sách vùng highlight (optional)
- `image_representation`: Ảnh (optional)

**Tính năng**:
- Tạo thông báo trong DB
- Tạo Range nếu có
- Cập nhật cache (thêm vào danh sách, tăng số chưa đọc, tăng tổng số)

### 8.5. Tính Năng Đặc Biệt
- **Redis Cache**: Cache danh sách ID thông báo, số lượng chưa đọc, tổng số
- **Highlight Ranges**: Hỗ trợ highlight một phần trong message
- **Real-time**: Có thể kết hợp với WebSocket để push real-time
- **Version Tracking**: Theo dõi version thông báo mới nhất

---

## 9. Yêu Thích (Love Cart)

### 9.1. Model: FavouriteProperty

**Mô tả**: Bất động sản yêu thích của user

**Các trường**:
- `user`: Người dùng (ForeignKey)
- `property`: Bất động sản (ForeignKey)
- `created_at`: Thời gian thêm
- `is_active`: Trạng thái hoạt động

**Unique Constraint**: (user, property)

### 9.2. API Endpoints

#### 9.2.1. Danh Sách Yêu Thích
- **URL**: `GET /api/love-cart/favourites/`
- **Mô tả**: Lấy danh sách bất động sản yêu thích
- **Permission**: IsAuthenticated
- **Response**: Danh sách bất động sản yêu thích + Cache từ Redis

#### 9.2.2. Thêm/Xóa Yêu Thích
- **URL**: `POST /api/love-cart/favourites/`
- **Mô tả**: Thêm hoặc xóa bất động sản khỏi yêu thích (toggle)
- **Permission**: IsAuthenticated
- **Request Body**:
  ```json
  {
    "property_id": "int"
  }
  ```
- **Response**: 
  - Nếu thêm: `{"message": "Added to favourites"}`
  - Nếu xóa: `{"message": "Restored to favourites"}`

#### 9.2.3. Xóa Yêu Thích
- **URL**: `DELETE /api/love-cart/favourites/`
- **Mô tả**: Xóa bất động sản khỏi yêu thích
- **Permission**: IsAuthenticated
- **Request Body**:
  ```json
  {
    "property_id": "int"
  }
  ```
- **Response**: Thông báo thành công

#### 9.2.4. Danh Sách ID Yêu Thích (V2)
- **URL**: `GET /api/love-cart/favourites/v2/`
- **Mô tả**: Lấy danh sách ID bất động sản yêu thích (chỉ ID)
- **Permission**: IsAuthenticated
- **Response**: Danh sách ID + Cache

#### 9.2.5. Số Lượng Yêu Thích
- **URL**: `GET /api/love-cart/favourites/count/`
- **Mô tả**: Lấy số lượng bất động sản yêu thích
- **Permission**: IsAuthenticated
- **Response**: 
  ```json
  {
    "count": "int",
    "message": "Success"
  }
  ```

### 9.3. Tính Năng Đặc Biệt
- **Redis Cache**: Cache danh sách ID yêu thích
- **Toggle Function**: Thêm/xóa bằng một endpoint
- **Soft Delete**: Sử dụng `is_active` để xóa
- **Filter Active**: Chỉ lấy bất động sản active và đã duyệt

---

## 10. Liên Hệ (Contacts)

**⚠️ Lưu ý quan trọng**: Module ContactRequest là phiên bản đầu tiên của tính năng liên hệ, hiện tại **KHÔNG CÒN ĐƯỢC SỬ DỤNG** trong giao diện mới. 

**Cách hoạt động hiện tại**: Trên giao diện, khi người dùng muốn liên lạc với chủ bất động sản, hệ thống sẽ tự động tạo hoặc mở cuộc trò chuyện (conversation) và chuyển hướng trực tiếp sang WebSocket chat để hai bên có thể nhắn tin với nhau ngay lập tức. Xem chi tiết tại [Chat Real-time (Conversations & Chat Message)](#11-chat-real-time-conversations--chat-message).

**Lý do giữ lại**: Module này vẫn được giữ lại trong codebase để tương thích ngược và có thể được sử dụng lại trong tương lai nếu cần.

### 10.1. Model: ContactRequest

**Mô tả**: Yêu cầu liên hệ từ người dùng đến chủ bất động sản (Phiên bản cũ - không còn sử dụng trong giao diện mới)

**Các trường**:
- `user`: Người gửi (ForeignKey)
- `property`: Bất động sản (ForeignKey)
- `message`: Tin nhắn
- `created_at`: Thời gian tạo

### 10.2. API Endpoints

**⚠️ Lưu ý**: Các API endpoints dưới đây vẫn hoạt động nhưng không được sử dụng trong giao diện mới. Thay vào đó, hệ thống sử dụng WebSocket chat trực tiếp.

#### 10.2.1. Danh Sách Yêu Cầu Liên Hệ
- **URL**: `GET /api/v1/contacts/contact-requests/`
- **Mô tả**: Lấy danh sách yêu cầu liên hệ
- **Permission**: IsAuthenticated
- **Query Parameters**:
  - `property_id`: Lọc theo bất động sản (optional)
  - `page`: Số trang
  - `limit`: Số lượng mỗi trang
- **Response**: 
  - Nếu có `property_id`: Danh sách yêu cầu của bất động sản đó (chỉ chủ sở hữu)
  - Nếu không: Tất cả yêu cầu đến các bất động sản của user

#### 10.2.2. Tạo Yêu Cầu Liên Hệ
- **URL**: `POST /api/v1/contacts/contact-requests/`
- **Mô tả**: Gửi yêu cầu liên hệ cho chủ bất động sản
- **Permission**: IsAuthenticated
- **Request Body**:
  ```json
  {
    "property": "int",
    "message": "string (optional)"
  }
  ```
- **Response**: Thông tin yêu cầu vừa tạo + Tự động tạo thông báo cho chủ BDS

#### 10.2.3. Chi Tiết Yêu Cầu Liên Hệ
- **URL**: `GET /api/v1/contacts/contact-requests/{id}/`
- **Mô tả**: Lấy thông tin chi tiết một yêu cầu
- **Permission**: IsAuthenticated
- **Response**: Thông tin đầy đủ yêu cầu

#### 10.2.4. Cập Nhật Yêu Cầu Liên Hệ
- **URL**: `PUT /api/v1/contacts/contact-requests/{id}/`
- **Mô tả**: Cập nhật yêu cầu liên hệ
- **Permission**: IsAuthenticated
- **Response**: Thông tin đã cập nhật

#### 10.2.5. Xóa Yêu Cầu Liên Hệ
- **URL**: `DELETE /api/v1/contacts/contact-requests/{id}/`
- **Mô tả**: Xóa yêu cầu liên hệ (soft delete)
- **Permission**: IsAuthenticated
- **Response**: Thông báo thành công

#### 10.2.6. Yêu Cầu Liên Hệ Theo Bất Động Sản
- **URL**: `GET /api/v1/contacts/contact-requests/property/{property_id}/`
- **Mô tả**: Lấy danh sách yêu cầu liên hệ của một bất động sản
- **Permission**: IsAuthenticated (chỉ chủ sở hữu)
- **Query Parameters**:
  - `page`: Số trang
- **Response**: Danh sách yêu cầu + Pagination

### 10.3. Tính Năng Đặc Biệt (Phiên bản cũ)

**Lưu ý**: Các tính năng dưới đây thuộc phiên bản cũ, hiện tại không còn được sử dụng.

- **Auto Notification**: Tự động tạo thông báo cho chủ BDS khi có yêu cầu mới
- **Permission Check**: Chỉ chủ sở hữu mới xem được yêu cầu của BDS mình
- **Transaction**: Sử dụng transaction để đảm bảo tính nhất quán

### 10.4. Thay Thế Bằng WebSocket Chat

**Cách hoạt động mới**: 
- Khi người dùng muốn liên lạc với chủ bất động sản từ trang chi tiết property, hệ thống sẽ:
  1. Tự động tìm hoặc tạo conversation 1-1 giữa hai người dùng
  2. Chuyển hướng người dùng sang giao diện chat WebSocket
  3. Hai bên có thể nhắn tin trực tiếp với nhau ngay lập tức

**Ưu điểm của cách mới**:
- Real-time communication: Nhắn tin tức thời qua WebSocket
- Không cần tạo request trung gian: Liên lạc trực tiếp
- Trải nghiệm người dùng tốt hơn: Chat ngay không cần chờ phản hồi
- Lưu lịch sử chat: Tất cả tin nhắn được lưu trong database

Xem chi tiết cách sử dụng WebSocket chat tại [mục 11. Chat Real-time](#11-chat-real-time-conversations--chat-message).

---

## 11. Chat Real-time (Conversations & Chat Message)

**✨ Tính năng chính**: Đây là cách liên lạc hiện tại được sử dụng trong giao diện mới, thay thế cho ContactRequest (phiên bản cũ). Khi người dùng muốn liên lạc với chủ bất động sản, hệ thống sẽ tự động tạo hoặc mở conversation và chuyển sang giao diện chat WebSocket để nhắn tin trực tiếp.

### 11.1. Model: Conversation

**Mô tả**: Cuộc trò chuyện giữa các người dùng

**Các trường**:
- `type`: Loại (private/group)
- `created_at`, `updated_at`: Thời gian
- `unique_1_to_1_index`: Index duy nhất cho chat 1-1 (format: `user1_id:user2_id`)

### 11.2. Model: Message

**Mô tả**: Tin nhắn trong cuộc trò chuyện

**Các trường**:
- `conversation`: Cuộc trò chuyện (ForeignKey)
- `sender`: Người gửi (ForeignKey)
- `content`: Nội dung
- `type`: Loại (text/image/system)
- `created_at`: Thời gian tạo
- `edit_at`: Thời gian chỉnh sửa
- `reply_message_id`: Tin nhắn được reply (ForeignKey self)
- `metadata`: Dữ liệu bổ sung (JSON)

### 11.3. Model: ConversationParticipants

**Mô tả**: Người tham gia cuộc trò chuyện

**Các trường**:
- `conversation`: Cuộc trò chuyện (ForeignKey)
- `user`: Người dùng (ForeignKey)
- `role`: Vai trò (owner/member)
- `last_read_message`: Tin nhắn đọc cuối cùng
- `last_read_at`: Thời gian đọc cuối
- `delete_for_user_at`: Thời gian user xóa tin nhắn

**Unique Constraint**: (conversation, user)

### 11.4. WebSocket Consumer: ChatConsumer

**Mô tả**: Xử lý WebSocket cho chat real-time

**URL**: `ws/chat/`

#### 11.4.1. Kết Nối (connect)
- Xác thực user (JWT)
- Thêm vào group `user_{user_id}`
- Gửi event `presence.event` (online)

#### 11.4.2. Ngắt Kết Nối (disconnect)
- Xóa khỏi group

#### 11.4.3. Nhận Tin Nhắn (receive_json)

**Các action hỗ trợ**:

##### a. send_message
Gửi tin nhắn trong cuộc trò chuyện
```json
{
  "action": "send_message",
  "conversation_id": 123,
  "content": "Hello",
  "reply": null (hoặc message_id nếu reply)
}
```

**Xử lý**:
- Kiểm tra user có trong conversation
- Tạo message
- Cập nhật `last_read_message` cho người gửi
- Gửi đến tất cả người tham gia qua WebSocket
- Cập nhật `updated_at` của conversation

##### b. dm (Direct Message)
Gửi tin nhắn trực tiếp đến user
```json
{
  "action": "dm",
  "to_user_id": 12,
  "content": "Hi",
  "reply": null
}
```

**Xử lý**:
- Tìm hoặc tạo conversation 1-1
- Tạo message
- Gửi đến cả 2 user

##### c. read_up_to
Đánh dấu đã đọc đến tin nhắn
```json
{
  "action": "read_up_to",
  "conversation_id": 1,
  "message_id": 12
}
```

**Xử lý**:
- Cập nhật `last_read_message` và `last_read_at`
- Gửi event `chat.read` cho người khác
- Gửi event `chat.read_by_me` cho chính mình

##### d. find_friend_conversation
Tìm bạn bè để chat
```json
{
  "action": "find_friend_conversation",
  "user_filter": "string"
}
```

**Xử lý**:
- Tìm user theo username (icontains)
- Loại trừ chính mình
- Gửi kết quả qua event `friend_found`

#### 11.4.4. Các Event Nhận Được

##### presence_event
Event hiện diện (online/offline)
```json
{
  "type": "presence",
  "event": "online",
  "at": "datetime"
}
```

##### chat_message
Nhận tin nhắn mới
```json
{
  "type": "message",
  "data": {
    "id": "int",
    "content": "string",
    "sender": {...},
    "conversation": "int",
    "created_at": "datetime",
    ...
  }
}
```

##### chat_read
Người khác đã đọc tin nhắn
```json
{
  "type": "read",
  "data": {
    "conversation_id": "int",
    "user_id": "int",
    "last_read_message_id": "int",
    "at": "datetime"
  }
}
```

##### chat_read_by_me
Bản thân đã đọc tin nhắn
```json
{
  "type": "read_by_me",
  "data": {...}
}
```

##### friend_found
Kết quả tìm bạn
```json
{
  "type": "friend_found",
  "data": [
    {
      "id": "int",
      "username": "string",
      "first_name": "string",
      "last_name": "string",
      "email": "string"
    }
  ]
}
```

### 11.5. API Endpoints (REST)

#### 11.5.1. Danh Sách Cuộc Trò Chuyện
- **URL**: `GET /api/v1/conversations/`
- **Mô tả**: Lấy danh sách cuộc trò chuyện của user
- **Permission**: IsAuthenticated
- **Response**: Danh sách conversation với thông tin người tham gia

#### 11.5.2. Chi Tiết Cuộc Trò Chuyện
- **URL**: `GET /api/v1/conversations/user/`
- **Mô tả**: Lấy thông tin cuộc trò chuyện với một user
- **Permission**: IsAuthenticated
- **Query Parameters**:
  - `user_id`: ID user
- **Response**: Thông tin conversation (tạo mới nếu chưa có)

#### 11.5.3. Danh Sách Tin Nhắn
- **URL**: `GET /api/v1/messages/`
- **Mô tả**: Lấy danh sách tin nhắn của conversation
- **Permission**: IsAuthenticated
- **Query Parameters**:
  - `conversation_id`: ID conversation
  - `page`: Số trang
  - `limit`: Số lượng
- **Response**: Danh sách tin nhắn + Pagination

### 11.6. Tính Năng Đặc Biệt
- **Real-time**: Sử dụng WebSocket với Django Channels
- **Auto Create Conversation**: Tự động tạo conversation 1-1 khi cần
- **Read Receipt**: Theo dõi tin nhắn đã đọc
- **Reply Message**: Hỗ trợ reply tin nhắn
- **HTML Escape**: Tự động escape HTML trong nội dung
- **User Groups**: Mỗi user có group riêng để nhận tin nhắn
- **Presence**: Theo dõi trạng thái online/offline

---

## 12. Dữ Liệu Mặc Định (Defaults)

### 12.1. Model: Province

**Mô tả**: Tỉnh/Thành phố

**Các trường**:
- `name`: Tên tỉnh
- `code`: Mã tỉnh
- `is_active`: Trạng thái hoạt động
- `created_at`, `updated_at`: Thời gian
- `deleted_at`: Thời gian xóa

### 12.2. Model: District

**Mô tả**: Quận/Huyện

**Các trường**:
- `province`: Tỉnh (ForeignKey)
- `name`: Tên quận/huyện
- `code`: Mã quận/huyện
- `is_active`: Trạng thái hoạt động
- `created_at`, `updated_at`: Thời gian
- `deleted_at`: Thời gian xóa

### 12.3. Model: PropertyType

**Mô tả**: Loại bất động sản

**Các trường**:
- `name`: Tên loại
- `code`: Mã loại (unique)
- `tab`: Tab hiển thị (ban/thue)
- `is_active`: Trạng thái hoạt động
- `created_at`, `updated_at`: Thời gian
- `deleted_at`: Thời gian xóa

### 12.4. Model: Attribute

**Mô tả**: Thuộc tính động của bất động sản

**Các trường**:
- `name`: Tên thuộc tính
- `unit`: Đơn vị
- `is_active`: Trạng thái hoạt động
- `created_at`, `updated_at`: Thời gian
- `deleted_at`: Thời gian xóa

### 12.5. Model: PropertyType_Attribute

**Mô tả**: Liên kết giữa PropertyType và Attribute

**Các trường**:
- `property_type`: Loại BDS (ForeignKey)
- `attribute`: Thuộc tính (ForeignKey)
- `is_active`: Trạng thái hoạt động
- `created_at`, `updated_at`: Thời gian
- `deleted_at`: Thời gian xóa

**Unique Constraint**: (property_type, attribute)

### 12.6. API Endpoints

#### 12.6.1. Danh Sách Loại Bất Động Sản
- **URL**: `GET /api/v1/property-types/`
- **Mô tả**: Lấy danh sách loại bất động sản
- **Permission**: IsAdminOrReadOnly
- **Query Parameters**:
  - `tab`: Lọc theo tab (ban/thue)
- **Response**: Danh sách loại BDS + Cache 5 phút

#### 12.6.2. Tạo Loại Bất Động Sản
- **URL**: `POST /api/v1/property-types/`
- **Mô tả**: Tạo loại BDS mới
- **Permission**: IsAdminUser
- **Response**: Thông tin loại BDS vừa tạo

#### 12.6.3. Chi Tiết Loại Bất Động Sản
- **URL**: `GET /api/v1/property-types/{id}/`
- **Mô tả**: Lấy thông tin một loại BDS
- **Permission**: IsAdminOrReadOnly
- **Response**: Thông tin loại BDS

#### 12.6.4. Cập Nhật Loại Bất Động Sản
- **URL**: `PUT /api/v1/property-types/{id}/`
- **Mô tả**: Cập nhật loại BDS
- **Permission**: IsAdminUser
- **Response**: Thông tin đã cập nhật

#### 12.6.5. Xóa Loại Bất Động Sản
- **URL**: `DELETE /api/v1/property-types/{id}/`
- **Mô tả**: Xóa loại BDS (soft delete)
- **Permission**: IsAdminUser
- **Response**: Thông báo thành công

#### 12.6.6. Danh Sách Tỉnh
- **URL**: `GET /api/v1/provinces/`
- **Mô tả**: Lấy danh sách tỉnh/thành phố
- **Permission**: IsAdminOrReadOnly
- **Response**: Danh sách tỉnh + Cache 5 phút

#### 12.6.7. Tạo Tỉnh
- **URL**: `POST /api/v1/provinces/`
- **Mô tả**: Tạo tỉnh mới
- **Permission**: IsAdminUser
- **Response**: Thông tin tỉnh vừa tạo

#### 12.6.8. Chi Tiết Tỉnh
- **URL**: `GET /api/v1/provinces/{id}/`
- **Mô tả**: Lấy thông tin một tỉnh
- **Permission**: IsAdminOrReadOnly
- **Response**: Thông tin tỉnh

#### 12.6.9. Cập Nhật Tỉnh
- **URL**: `PUT /api/v1/provinces/{id}/`
- **Mô tả**: Cập nhật tỉnh
- **Permission**: IsAdminUser
- **Response**: Thông tin đã cập nhật

#### 12.6.10. Xóa Tỉnh
- **URL**: `DELETE /api/v1/provinces/{id}/`
- **Mô tả**: Xóa tỉnh (soft delete)
- **Permission**: IsAdminUser
- **Response**: Thông báo thành công

#### 12.6.11. Danh Sách Quận/Huyện
- **URL**: `GET /api/v1/provinces/{province_id}/districts/`
- **Mô tả**: Lấy danh sách quận/huyện của một tỉnh
- **Permission**: IsAdminOrReadOnly
- **Response**: Danh sách quận/huyện + Cache 5 phút

#### 12.6.12. Tạo Quận/Huyện
- **URL**: `POST /api/v1/provinces/{province_id}/districts/`
- **Mô tả**: Tạo quận/huyện mới
- **Permission**: IsAdminUser
- **Response**: Thông tin quận/huyện vừa tạo

#### 12.6.13. Chi Tiết Quận/Huyện
- **URL**: `GET /api/v1/districts/{id}/`
- **Mô tả**: Lấy thông tin một quận/huyện
- **Permission**: IsAdminOrReadOnly
- **Response**: Thông tin quận/huyện

#### 12.6.14. Cập Nhật Quận/Huyện
- **URL**: `PUT /api/v1/districts/{id}/`
- **Mô tả**: Cập nhật quận/huyện
- **Permission**: IsAdminUser
- **Response**: Thông tin đã cập nhật

#### 12.6.15. Xóa Quận/Huyện
- **URL**: `DELETE /api/v1/districts/{id}/`
- **Mô tả**: Xóa quận/huyện (soft delete)
- **Permission**: IsAdminUser
- **Response**: Thông báo thành công

#### 12.6.16. Danh Sách Thuộc Tính
- **URL**: `GET /api/v1/attributes/`
- **Mô tả**: Lấy danh sách thuộc tính
- **Permission**: IsAdminOrReadOnly
- **Query Parameters**:
  - `property_type_id`: Lọc theo loại BDS
  - `property_type`: Tìm kiếm theo tên loại BDS
- **Response**: Danh sách thuộc tính + Cache 5 phút

#### 12.6.17. Tạo Thuộc Tính
- **URL**: `POST /api/v1/attributes/`
- **Mô tả**: Tạo thuộc tính mới
- **Permission**: IsAdminUser
- **Response**: Thông tin thuộc tính vừa tạo

### 12.7. Tính Năng Đặc Biệt
- **Cache**: Cache danh sách 5 phút
- **Soft Delete**: Xóa bằng cách set `is_active = False` và `deleted_at`
- **Hierarchical Data**: Tỉnh -> Quận/Huyện
- **Dynamic Attributes**: Thuộc tính động theo loại BDS
- **Tab Filter**: Lọc loại BDS theo tab (ban/thue)

---

## 📝 Ghi Chú Bổ Sung

### Caching Strategy
- **Properties**: Cache 3 phút
- **News**: Cache 10 phút
- **Defaults**: Cache 5 phút
- **Notifications**: Cache trong Redis với cấu trúc phức tạp
- **Favourites**: Cache danh sách ID trong Redis

### Authentication & Authorization
- **JWT**: Access token 60 phút, Refresh token 7 ngày
- **OAuth2**: Hỗ trợ Google qua Firebase
- **Permissions**: 
  - `AllowAny`: Không cần đăng nhập
  - `IsAuthenticated`: Cần đăng nhập
  - `IsAdminUser`: Chỉ admin
  - `IsAuthenticatedOrReadOnly`: Đọc không cần đăng nhập, ghi cần đăng nhập
  - `IsAdminOrReadOnly`: Đọc không cần đăng nhập, ghi cần admin

### WebSocket
- **Protocol**: WebSocket qua Django Channels
- **Authentication**: JWT qua middleware
- **Channel Layer**: Redis
- **Groups**: Mỗi user có group `user_{user_id}`

### Database
- **Engine**: MySQL
- **Charset**: utf8mb4
- **Connection Pooling**: CONN_MAX_AGE = 6

### File Upload
- **Media Root**: `media/`
- **Upload To**: Tự động tạo path theo app và model
- **Image Processing**: Pillow

### Pagination
- **Default Page Size**: 12 (properties), 10 (comments, notifications, contacts), 15 (news)
- **Max Page Size**: 100-1000 tùy module

---

## 🔗 Liên Kết API

### Base URL
- **Development**: `http://localhost:8000`
- **Production**: `https://api.restate-housing-day.store`

### Swagger Documentation
- **URL**: `http://localhost:8000/` (Swagger UI)

---

## 📞 Hỗ Trợ

Nếu có thắc mắc hoặc cần hỗ trợ, vui lòng liên hệ:
- **Developer**: [Tên developer]
- **Email**: [email@example.com]
- **GitHub**: [github.com/username]

---

**Tài liệu được tạo tự động từ codebase - Cập nhật lần cuối: 2024**

