# 📐 Phân Tích Thiết Kế Hệ Thống - Hệ Thống Quản Lý và Dự Đoán Giá Bất Động Sản

## 📋 Mục Lục
1. [Kiến Trúc Hệ Thống](#1-kiến-trúc-hệ-thống)
2. [Phân Tích Use Case](#2-phân-tích-use-case)
3. [Phân Tích Nghiệp Vụ](#3-phân-tích-nghiệp-vụ)

---

## 1. Kiến Trúc Hệ Thống

### 1.1. Tổng Quan Kiến Trúc

Hệ thống được xây dựng theo mô hình **3-tier architecture** với các lớp:

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│  (Frontend - React/Vue/Angular hoặc Mobile App)         │
└─────────────────────────────────────────────────────────┘
                        ↕ HTTP/WebSocket
┌─────────────────────────────────────────────────────────┐
│                    Application Layer                     │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Django REST Framework (RESTful API)            │   │
│  │  - REST API Endpoints                            │   │
│  │  - Authentication & Authorization                │   │
│  │  - Request Validation                           │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Django Channels (WebSocket)                    │   │
│  │  - Real-time Chat                               │   │
│  │  - Real-time Notifications                       │   │
│  │  - Presence Management                           │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Business Logic Layer                           │   │
│  │  - Property Management                          │   │
│  │  - Price Prediction (ML)                        │   │
│  │  - Notification System                          │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                        ↕
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │    MySQL     │  │    Redis     │  │   Media     │ │
│  │  (Database)  │  │   (Cache)    │  │   Storage   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 1.2. Kiến Trúc Chi Tiết

#### 1.2.1. Backend Architecture

**Pattern**: **MVC (Model-View-Controller)** với Django REST Framework

```
apps/
├── accounts/              # User Management Module
│   ├── models.py         # CustomUser Model
│   ├── views.py          # API Views (Controller)
│   ├── serializer.py     # Data Serialization
│   └── urls.py           # URL Routing
│
├── properties/            # Property Management Module
│   ├── models.py         # Property, PropertyImage, ViewsProperty
│   ├── views.py          # Property CRUD Operations
│   ├── serializer.py     # Property Serialization
│   └── helpers.py        # Business Logic Helpers
│
├── conversations/         # Chat Module
│   ├── models.py         # Conversation Model
│   ├── consumers.py      # WebSocket Consumer
│   └── routings.py      # WebSocket Routing
│
├── chat_message/         # Message Module
│   ├── models.py         # Message Model
│   └── serializers.py    # Message Serialization
│
├── predicts/             # ML Prediction Module
│   ├── models.py         # Dashboard, PredictRequest
│   ├── views.py          # Prediction API
│   └── model_ai/         # ML Model Files
│
└── notifications/        # Notification Module
    ├── models.py         # Notification Model
    ├── views.py          # Notification API
    └── caches.py         # Redis Cache Helpers
```

#### 1.2.2. Communication Patterns

**1. RESTful API (HTTP)**
- **Protocol**: HTTP/HTTPS
- **Format**: JSON
- **Authentication**: JWT Bearer Token
- **Use Cases**: 
  - CRUD operations
  - Data retrieval
  - File uploads

**2. WebSocket (Real-time)**
- **Protocol**: WebSocket (WS/WSS)
- **Format**: JSON
- **Authentication**: JWT trong query string hoặc header
- **Use Cases**:
  - Real-time chat
  - Real-time notifications
  - Presence (online/offline status)

**3. Channel Layer (Redis)**
- **Purpose**: Message routing cho WebSocket
- **Pattern**: Pub/Sub
- **Groups**: Mỗi user có group riêng `user_{user_id}`

### 1.3. Database Architecture

#### 1.3.1. Database Schema Overview

```
┌─────────────────┐
│   CustomUser    │
│  (accounts)     │
└────────┬────────┘
         │
         ├─────────────────┬──────────────────┐
         │                 │                  │
    ┌────▼────┐      ┌─────▼─────┐      ┌─────▼─────┐
    │Property │      │Dashboard │      │Notification│
    │(properties)│   │(predicts)│      │(notifications)│
    └────┬────┘      └──────────┘      └────────────┘
         │
    ┌────▼────┐      ┌──────────────┐
    │Property │      │Conversation │
    │ Image   │      │(conversations)│
    └─────────┘      └──────┬───────┘
                            │
                       ┌────▼────┐
                       │ Message │
                       │(chat_message)│
                       └──────────┘
```

#### 1.3.2. Key Relationships

1. **User → Property**: One-to-Many (Một user có nhiều properties)
2. **Property → PropertyImage**: One-to-Many (Một property có nhiều ảnh)
3. **Property → ViewsProperty**: One-to-One (Tách riêng để tối ưu)
4. **User → Dashboard**: One-to-One (Mỗi user có một dashboard)
5. **User → Notification**: One-to-Many (Một user có nhiều thông báo)
6. **Conversation → Message**: One-to-Many (Một conversation có nhiều messages)
7. **Conversation → ConversationParticipants**: One-to-Many (Một conversation có nhiều participants)

### 1.4. Caching Strategy

**Redis được sử dụng cho**:

1. **API Response Caching**
   - Properties list: 3 phút
   - News articles: 10 phút
   - Defaults (provinces, districts): 5 phút

2. **Notification Caching**
   - Notification IDs list
   - Unread count
   - Total count
   - Last version timestamp

3. **Favourite Properties Caching**
   - List of favourite property IDs per user

4. **Session Storage**
   - User sessions
   - JWT token blacklist

5. **Channel Layer**
   - WebSocket message routing
   - Pub/Sub for real-time events

### 1.5. Security Architecture

#### 1.5.1. Authentication Methods

1. **JWT (JSON Web Tokens)**
   - Access Token: 60 phút
   - Refresh Token: 7 ngày
   - Algorithm: HS256
   - Storage: HTTP-only cookies hoặc localStorage

2. **OAuth2 (Google)**
   - Firebase ID Token verification
   - Auto account creation/linking

3. **WebSocket Authentication**
   - JWT trong query string hoặc header
   - Custom middleware: `JWTAuthMiddlewareStack`

#### 1.5.2. Authorization

- **Permission Classes**:
  - `AllowAny`: Không cần đăng nhập
  - `IsAuthenticated`: Cần đăng nhập
  - `IsAdminUser`: Chỉ admin
  - `IsAuthenticatedOrReadOnly`: Đọc không cần đăng nhập
  - `IsAdminOrReadOnly`: Đọc không cần đăng nhập, ghi cần admin

- **Object-level Permissions**:
  - User chỉ có thể edit/delete property của chính mình
  - Admin có thể edit/delete tất cả

### 1.6. Deployment Architecture

```
┌─────────────────────────────────────────┐
│         Load Balancer (Nginx)          │
└──────────────┬──────────────────────────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───▼────┐          ┌─────▼────┐
│Server 1│          │ Server 2 │
│(Django)│          │ (Django) │
└───┬────┘          └─────┬────┘
    │                     │
    └──────────┬──────────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───▼────┐          ┌─────▼────┐
│ MySQL  │          │  Redis   │
│(Master)│          │ (Cache)  │
└────────┘          └───────────┘
```

**Docker Compose Services**:
- `server`: Django application (Gunicorn + Uvicorn)
- `redis`: Redis cache và channel layer

---

## 2. Phân Tích Use Case

### 2.1. Actors (Người Dùng)

1. **Guest (Khách)**: Người chưa đăng nhập
2. **User (Người dùng)**: Người đã đăng ký và đăng nhập
3. **Property Owner (Chủ BDS)**: User sở hữu bất động sản
4. **Admin (Quản trị viên)**: Quản lý hệ thống

### 2.2. Use Case Diagram

```
                    ┌─────────────────┐
                    │   Guest User    │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Xem Properties │
                    │  Xem Tin Tức    │
                    │  Đăng Ký        │
                    │  Đăng Nhập      │
                    └─────────────────┘
                             │
                    ┌────────▼────────┐
                    │   User (Base)    │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────▼────────┐  ┌────────▼────────┐  ┌───────▼────────┐
│ Property Owner │  │  Regular User   │  │     Admin      │
└───────┬────────┘  └────────┬────────┘  └───────┬────────┘
        │                    │                    │
        │                    │                    │
┌───────▼────────┐  ┌────────▼────────┐  ┌───────▼────────┐
│ Đăng Property  │  │ Tìm Kiếm BDS    │  │ Duyệt Property │
│ Quản Lý BDS    │  │ Yêu Thích       │  │ Quản Lý User   │
│ Chat với KH    │  │ Dự Đoán Giá     │  │ Quản Lý Tin Tức│
│                │  │ Chat với Owner  │  │                │
└────────────────┘  └─────────────────┘  └────────────────┘
```

### 2.3. Chi Tiết Use Cases

#### 2.3.1. Authentication & Authorization

**UC-01: Đăng Ký Tài Khoản**
- **Actor**: Guest
- **Precondition**: Chưa có tài khoản
- **Main Flow**:
  1. User điền thông tin (username, email, password, first_name, last_name)
  2. System validate dữ liệu
  3. System tạo user mới
  4. System tự động tạo Dashboard cho user
  5. System trả về thông tin user đã tạo
- **Postcondition**: User đã được tạo, Dashboard đã được tạo
- **Alternative Flow**: 
  - Email/username đã tồn tại → Trả về lỗi
  - Dữ liệu không hợp lệ → Trả về lỗi validation

**UC-02: Đăng Nhập**
- **Actor**: Guest
- **Precondition**: Đã có tài khoản
- **Main Flow**:
  1. User nhập username và password
  2. System xác thực thông tin
  3. System tạo JWT tokens (access + refresh)
  4. System trả về tokens và thông tin user
- **Postcondition**: User đã đăng nhập, có tokens để truy cập API
- **Alternative Flow**: 
  - Sai thông tin → Trả về lỗi 401
  - Tài khoản bị vô hiệu hóa → Trả về lỗi

**UC-03: Đăng Nhập với Google**
- **Actor**: Guest
- **Precondition**: Có tài khoản Google
- **Main Flow**:
  1. User chọn đăng nhập Google
  2. User xác thực với Google
  3. Frontend gửi Firebase ID Token
  4. System verify token với Firebase Admin SDK
  5. System tìm hoặc tạo user
  6. System tạo Dashboard nếu user mới
  7. System trả về JWT tokens
- **Postcondition**: User đã đăng nhập hoặc được tạo mới

#### 2.3.2. Property Management

**UC-04: Đăng Tin Bất Động Sản**
- **Actor**: User (Property Owner)
- **Precondition**: User đã đăng nhập
- **Main Flow**:
  1. User điền thông tin property (title, description, price, area, location, ...)
  2. User upload ảnh (nhiều ảnh)
  3. User chọn thuộc tính động (nếu có)
  4. System validate dữ liệu
  5. System tạo Property với status = PENDING
  6. System tạo PropertyImage cho mỗi ảnh
  7. System tạo ViewsProperty với views = 0
  8. System tạo PropertyAttributeValue cho các thuộc tính
  9. System xóa cache properties của user
  10. System trả về thông tin property đã tạo
- **Postcondition**: Property đã được tạo, chờ admin duyệt
- **Alternative Flow**: 
  - Dữ liệu không hợp lệ → Trả về lỗi validation
  - Upload ảnh thất bại → Rollback transaction

**UC-05: Duyệt Tin Bất Động Sản**
- **Actor**: Admin
- **Precondition**: Có property ở trạng thái PENDING
- **Main Flow**:
  1. Admin xem danh sách properties chờ duyệt
  2. Admin xem chi tiết property
  3. Admin duyệt (approved) hoặc từ chối (rejected)
  4. System cập nhật status của property
  5. System tạo notification cho owner nếu được duyệt
  6. System cập nhật cache
- **Postcondition**: Property đã được duyệt/từ chối, owner nhận thông báo

**UC-06: Tìm Kiếm và Lọc Bất Động Sản**
- **Actor**: User, Guest
- **Precondition**: Không (Guest có thể xem)
- **Main Flow**:
  1. User/Guest nhập các tiêu chí tìm kiếm:
     - Tỉnh/Quận
     - Khoảng giá (min-max)
     - Khoảng diện tích (min-max)
     - Loại BDS
     - Loại giao dịch (bán/thuê)
  2. System kiểm tra cache
  3. Nếu có cache → Trả về từ cache
  4. Nếu không → Query database với filters
  5. System paginate kết quả
  6. System cache kết quả (3 phút)
  7. System trả về danh sách properties
- **Postcondition**: User/Guest nhận được danh sách properties phù hợp

**UC-07: Xem Chi Tiết Bất Động Sản**
- **Actor**: User, Guest
- **Precondition**: Property tồn tại và đã được duyệt (hoặc là owner)
- **Main Flow**:
  1. User/Guest click vào property
  2. System kiểm tra quyền truy cập
  3. System tăng lượt xem (ViewsProperty.views += 1)
  4. System lấy thông tin property + images + attributes
  5. System trả về chi tiết property
- **Postcondition**: Lượt xem đã tăng, user đã xem chi tiết

#### 2.3.3. Price Prediction

**UC-08: Dự Đoán Giá Bất Động Sản**
- **Actor**: User
- **Precondition**: User đã đăng nhập, có Dashboard
- **Main Flow**:
  1. User nhập thông tin BDS:
     - Loại nhà đất
     - Mã huyện, mã tỉnh
     - Diện tích
     - Mặt tiền
     - Số phòng ngủ
     - Số tầng
     - Pháp lý
     - Tọa độ x, y
  2. System validate dữ liệu
  3. System load ML model
  4. System chuyển đổi dữ liệu sang DataFrame
  5. System chạy prediction
  6. System tính giá tổng từ giá/m²
  7. System lưu PredictRequest vào database
  8. System trả về kết quả dự đoán
- **Postcondition**: Kết quả dự đoán đã được lưu và trả về
- **Alternative Flow**: 
  - Dữ liệu không hợp lệ → Trả về lỗi
  - Model không load được → Trả về lỗi server

#### 2.3.4. Chat & Communication

**UC-09: Chat Real-time với Chủ BDS**
- **Actor**: User
- **Precondition**: User đã đăng nhập, có WebSocket connection
- **Main Flow**:
  1. User xem chi tiết property
  2. User click "Liên hệ" hoặc "Chat"
  3. Frontend gửi WebSocket message với action = "dm", to_user_id = property owner
  4. System tìm hoặc tạo conversation 1-1
  5. System tạo message
  6. System gửi message đến cả 2 user qua WebSocket
  7. Frontend chuyển sang giao diện chat
- **Postcondition**: Conversation đã được tạo/mở, message đã được gửi

**UC-10: Gửi Tin Nhắn**
- **Actor**: User
- **Precondition**: User đã có conversation, WebSocket connected
- **Main Flow**:
  1. User nhập tin nhắn
  2. User có thể reply một tin nhắn cũ (optional)
  3. Frontend gửi WebSocket message:
     ```json
     {
       "action": "send_message",
       "conversation_id": 123,
       "content": "Hello",
       "reply": null
     }
     ```
  4. System validate user có trong conversation
  5. System tạo Message trong database
  6. System cập nhật last_read_message cho sender
  7. System cập nhật updated_at của conversation
  8. System gửi message đến tất cả participants qua WebSocket
  9. System trả về message đã tạo
- **Postcondition**: Message đã được lưu và gửi đến tất cả participants

**UC-11: Đánh Dấu Đã Đọc**
- **Actor**: User
- **Precondition**: User có conversation, WebSocket connected
- **Main Flow**:
  1. User đọc tin nhắn mới
  2. Frontend gửi WebSocket message:
     ```json
     {
       "action": "read_up_to",
       "conversation_id": 1,
       "message_id": 12
     }
     ```
  3. System cập nhật last_read_message và last_read_at
  4. System gửi event "chat.read" đến người khác
  5. System gửi event "chat.read_by_me" đến chính user
- **Postcondition**: Trạng thái đã đọc đã được cập nhật

#### 2.3.5. Notification System

**UC-12: Nhận Thông Báo Real-time**
- **Actor**: User
- **Precondition**: User đã đăng nhập, WebSocket connected
- **Main Flow**:
  1. Có sự kiện xảy ra (property được duyệt, có tin nhắn mới, ...)
  2. System tạo Notification trong database
  3. System cập nhật Redis cache (tăng unread count, thêm vào list)
  4. System gửi notification qua WebSocket đến user group
  5. Frontend nhận và hiển thị notification
- **Postcondition**: User đã nhận thông báo real-time

**UC-13: Xem Danh Sách Thông Báo**
- **Actor**: User
- **Precondition**: User đã đăng nhập
- **Main Flow**:
  1. User mở trang thông báo
  2. System kiểm tra cache Redis
  3. Nếu có cache đầy đủ → Trả về từ cache
  4. Nếu không → Query database
  5. System paginate kết quả
  6. System cache kết quả
  7. System trả về danh sách notifications
- **Postcondition**: User đã xem danh sách thông báo

#### 2.3.6. Favourite Properties

**UC-14: Thêm/Xóa Yêu Thích**
- **Actor**: User
- **Precondition**: User đã đăng nhập
- **Main Flow**:
  1. User xem chi tiết property
  2. User click nút "Yêu thích"
  3. Frontend gửi POST request với property_id
  4. System tìm hoặc tạo FavouriteProperty
  5. System toggle is_active (nếu đã có thì xóa, chưa có thì thêm)
  6. System cập nhật Redis cache
  7. System trả về trạng thái mới
- **Postcondition**: Property đã được thêm/xóa khỏi yêu thích

#### 2.3.7. News & Comments

**UC-15: Đọc Tin Tức**
- **Actor**: User, Guest
- **Precondition**: Có bài viết đã được duyệt
- **Main Flow**:
  1. User/Guest xem danh sách tin tức
  2. User/Guest click vào một bài viết
  3. System tăng lượt xem (views += 1)
  4. System lấy nội dung bài viết (RichText với CKEditor)
  5. System lấy danh sách comments
  6. System trả về chi tiết bài viết
- **Postcondition**: Lượt xem đã tăng, user đã đọc bài viết

**UC-16: Comment trên Tin Tức**
- **Actor**: User
- **Precondition**: User đã đăng nhập, bài viết tồn tại
- **Main Flow**:
  1. User đọc bài viết
  2. User nhập comment
  3. User có thể reply một comment khác (optional)
  4. System tạo Comment trong database
  5. System trả về comment đã tạo
- **Postcondition**: Comment đã được tạo và hiển thị

---

## 3. Phân Tích Nghiệp Vụ

### 3.1. Domain Model (Mô Hình Nghiệp Vụ)

```
┌─────────────────────────────────────────────────────────┐
│                    Business Domain                        │
└─────────────────────────────────────────────────────────┘

┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│    User      │      │   Property   │      │  Prediction  │
│              │      │              │      │              │
│ - Register   │      │ - Create     │      │ - Predict    │
│ - Login      │◄────►│ - Update     │      │ - History    │
│ - Profile    │      │ - Search     │      │ - Dashboard  │
│ - Auth       │      │ - View       │      │              │
└──────────────┘      └──────┬───────┘      └──────────────┘
                            │
                    ┌───────▼───────┐
                    │  Transaction  │
                    │               │
                    │ - Chat        │
                    │ - Contact    │
                    │ - Favorite   │
                    └───────────────┘
```

### 3.2. Business Rules (Quy Tắc Nghiệp Vụ)

#### 3.2.1. Property Management Rules

1. **Property Status Workflow**:
   ```
   PENDING → APPROVED → ACTIVE (hiển thị công khai)
   PENDING → REJECTED (không hiển thị)
   ```
   - Property mới tạo luôn ở trạng thái PENDING
   - Chỉ admin mới có thể duyệt/từ chối
   - Property đã duyệt mới hiển thị cho user khác
   - Owner có thể xem property của mình dù chưa duyệt

2. **Property Update Rules**:
   - Khi owner cập nhật property → Status tự động về PENDING (cần duyệt lại)
   - Owner chỉ có thể edit property của chính mình
   - Admin có thể edit tất cả properties

3. **Property Deletion Rules**:
   - Soft delete: Set `is_active = False`
   - Không xóa vật lý để giữ lịch sử
   - Favourite properties cũng được đánh dấu inactive

4. **View Counter Rules**:
   - Tách riêng ViewsProperty để tối ưu
   - Mỗi lần xem chi tiết → Tăng views
   - Chỉ tăng khi property đã được duyệt

#### 3.2.2. User Management Rules

1. **Account Creation**:
   - Email phải unique
   - Username phải unique
   - Phone có thể unique (optional)
   - Tự động tạo Dashboard khi tạo user mới

2. **Authentication Rules**:
   - JWT access token: 60 phút
   - JWT refresh token: 7 ngày
   - OAuth Google: Tự động tạo/link account

3. **Profile Management**:
   - User chỉ có thể edit profile của chính mình
   - Admin có thể edit tất cả profiles
   - Cache được invalidate khi update

#### 3.2.3. Price Prediction Rules

1. **Prediction Access**:
   - Tất cả user đã đăng nhập đều có thể dự đoán (hiện tại không giới hạn)
   - Premium user: Không giới hạn (tương lai)
   - Regular user: Có thể giới hạn số lần (tương lai)

2. **Prediction Data**:
   - Lưu tất cả lịch sử dự đoán
   - Lưu input data và output result
   - Tính cả giá tổng và giá/m²

3. **ML Model**:
   - Sử dụng Scikit-learn
   - Model được load một lần khi server start
   - Input: 10 features (loại BDS, vị trí, diện tích, ...)
   - Output: Giá dự đoán trên m²

#### 3.2.4. Chat & Communication Rules

1. **Conversation Creation**:
   - Tự động tạo conversation 1-1 khi cần
   - Unique index: `user1_id:user2_id` (sắp xếp)
   - Mỗi user chỉ có một conversation với một user khác

2. **Message Rules**:
   - Chỉ participants mới có thể gửi message
   - Message được escape HTML để tránh XSS
   - Hỗ trợ reply message
   - Lưu metadata (JSON) cho mở rộng

3. **Read Receipt Rules**:
   - Tự động cập nhật khi user đọc
   - Gửi thông báo cho người khác biết đã đọc
   - Lưu last_read_message và last_read_at

#### 3.2.5. Notification Rules

1. **Notification Types**:
   - `contact_request`: Yêu cầu liên hệ (phiên bản cũ)
   - `property_view`: Property được xem
   - `new_message`: Tin nhắn mới
   - `system_alert`: Thông báo hệ thống
   - `promotion`: Khuyến mãi

2. **Notification Triggers**:
   - Property được duyệt → Thông báo cho owner
   - Property bị từ chối → Thông báo cho owner
   - Có tin nhắn mới → Thông báo cho người nhận

3. **Notification Cache**:
   - Cache notification IDs trong Redis
   - Cache unread count
   - Cache total count
   - Cache last version timestamp

#### 3.2.6. Favourite Properties Rules

1. **Favourite Management**:
   - Mỗi user có thể yêu thích nhiều properties
   - Mỗi property có thể được nhiều user yêu thích
   - Unique constraint: (user, property)
   - Toggle function: Thêm nếu chưa có, xóa nếu đã có

2. **Display Rules**:
   - Chỉ hiển thị properties đã được duyệt và active
   - Cache list IDs trong Redis
   - Sắp xếp theo thời gian thêm mới nhất

### 3.3. Business Processes (Quy Trình Nghiệp Vụ)

#### 3.3.1. Quy Trình Đăng Tin Bất Động Sản

```
[User] → [Điền thông tin] → [Upload ảnh] → [Chọn thuộc tính]
    ↓
[Submit] → [System validate] → [Tạo Property (PENDING)]
    ↓
[Admin xem] → [Duyệt/Từ chối] → [Notification cho Owner]
    ↓
[Property APPROVED] → [Hiển thị công khai]
```

#### 3.3.2. Quy Trình Liên Hệ và Chat

```
[User xem Property] → [Click "Liên hệ"]
    ↓
[System tạo/mở Conversation] → [Chuyển sang Chat UI]
    ↓
[User gửi tin nhắn] → [WebSocket gửi đến Owner]
    ↓
[Owner nhận tin nhắn] → [Owner trả lời]
    ↓
[Real-time chat qua WebSocket]
```

#### 3.3.3. Quy Trình Dự Đoán Giá

```
[User nhập thông tin BDS] → [System validate]
    ↓
[System load ML Model] → [Chạy prediction]
    ↓
[System tính giá tổng] → [Lưu PredictRequest]
    ↓
[Trả về kết quả cho User] → [Hiển thị trên UI]
```

### 3.4. Business Constraints (Ràng Buộc Nghiệp Vụ)

1. **Data Integrity**:
   - Property phải có owner (user)
   - Property phải có province và district
   - Property phải có property_type
   - Message phải có conversation và sender

2. **Performance Constraints**:
   - Cache properties list: 3 phút
   - Cache news: 10 phút
   - Cache defaults: 5 phút
   - Pagination: 12 items/page (properties), 10 items/page (others)

3. **Security Constraints**:
   - JWT token phải hợp lệ
   - User chỉ có thể truy cập dữ liệu của chính mình (trừ admin)
   - WebSocket phải authenticate
   - HTML content phải được escape

4. **Business Logic Constraints**:
   - Property status phải theo workflow
   - Conversation 1-1 phải unique
   - Favourite property phải unique per user
   - Notification phải có user recipient

### 3.5. Integration Points (Điểm Tích Hợp)

1. **External Services**:
   - **Firebase**: OAuth Google authentication
   - **Mapbox**: Maps integration (optional)
   - **Email Service**: Gửi email thông báo (tương lai)

2. **Internal Services**:
   - **MySQL**: Primary database
   - **Redis**: Cache và channel layer
   - **Django Channels**: WebSocket handling
   - **Celery**: Background tasks (tương lai)

### 3.6. Scalability Considerations

1. **Database**:
   - Indexes trên các trường thường query (user_id, property_id, conversation_id)
   - Tách ViewsProperty để giảm lock contention
   - Soft delete để giữ lịch sử

2. **Caching**:
   - Redis cache cho API responses
   - Cache notification IDs thay vì full objects
   - Cache favourite IDs

3. **WebSocket**:
   - User groups để route messages
   - Redis channel layer cho horizontal scaling
   - Async consumers để xử lý concurrent connections

4. **File Storage**:
   - Media files lưu trên filesystem (có thể chuyển sang S3)
   - Static files với WhiteNoise

---

## 4. Tóm Tắt

### 4.1. Kiến Trúc Tổng Quan

- **Pattern**: 3-tier architecture (Presentation, Application, Data)
- **Framework**: Django REST Framework + Django Channels
- **Communication**: RESTful API (HTTP) + WebSocket (Real-time)
- **Database**: MySQL (primary) + Redis (cache/channel layer)

### 4.2. Điểm Mạnh

1. **Separation of Concerns**: Mỗi module độc lập, dễ maintain
2. **Caching Strategy**: Tối ưu hiệu suất với Redis
3. **Real-time Communication**: WebSocket cho chat và notifications
4. **Scalability**: Hỗ trợ horizontal scaling với Redis channel layer
5. **Security**: JWT authentication, permission classes, HTML escaping

### 4.3. Điểm Cần Cải Thiện

1. **Error Handling**: Cần standardize error responses
2. **Logging**: Cần thêm logging system
3. **Testing**: Cần thêm unit tests và integration tests
4. **Documentation**: Cần API documentation chi tiết hơn
5. **Monitoring**: Cần thêm monitoring và alerting

---

**Tài liệu được tạo: 2024**
**Phiên bản: 1.0**

