# 🏠 Hệ Thống Quản Lý Bất Động Sản RealEstate

## 📋 Tổng Quan Dự Án

Đây là một hệ thống web quản lý bất động sản toàn diện, bao gồm:
- **Frontend**: Ứng dụng React hiện đại với giao diện người dùng đẹp mắt
- **Backend**: API RESTful với Django, hỗ trợ WebSocket cho chat real-time

---

## 🛠️ Công Nghệ Sử Dụng

### Frontend (`frontend/`)

#### Core Framework
- **React 18.3.1** - Framework JavaScript hiện đại
- **React Router DOM 7.8.0** - Điều hướng trang và quản lý routing
- **React Scripts 5.0.1** - Build tool cho Create React App

#### Styling & UI
- **Tailwind CSS 3.3.0** - Framework CSS utility-first
- **Framer Motion 10.16.4** - Thư viện animation chuyên nghiệp
- **Lucide React 0.292.0** - Bộ icon đẹp và nhất quán

#### Authentication & Services
- **Firebase 12.2.1** - Authentication với Google OAuth
- **JWT** - Token-based authentication

#### Maps & Location
- **Leaflet 1.9.4** - Thư viện bản đồ mã nguồn mở
- **React Leaflet 4.2.1** - React wrapper cho Leaflet

#### Real-time Communication
- **Reconnecting WebSocket 4.4.0** - WebSocket client với auto-reconnect cho chat real-time

#### Development Tools
- **PostCSS 8.4.31** - CSS processing
- **Autoprefixer 10.4.16** - Tự động thêm vendor prefixes

### Backend (`backendWeb/`)

#### Core Framework
- **Django 5.2.5** - Web framework Python mạnh mẽ
- **Django REST Framework 3.16.1** - Framework xây dựng RESTful API
- **Django Channels 4.3.1** - Hỗ trợ WebSocket và async
- **Daphne 4.2.1** - ASGI server cho Django Channels

#### Database & Cache
- **MySQL** - Database chính (qua mysqlclient)
- **Redis 5.2.1** - Cache và message broker cho Celery/Channels
- **Django Redis 6.0.0** - Redis integration cho Django

#### Authentication & Security
- **Django REST Framework Simple JWT 5.5.1** - JWT authentication
- **OAuth2 Provider 3.0.1** - OAuth2 server
- **Django Allauth 65.10.0** - Social authentication (Google)
- **Django CORS Headers 4.7.0** - CORS support
- **Firebase Admin 7.1.0** - Firebase integration

#### Background Tasks
- **Celery 5.5.3** - Distributed task queue
- **Redis** - Message broker cho Celery

#### Machine Learning
- **Scikit-learn 1.7.2** - ML framework cho dự đoán giá
- **Joblib 1.5.1** - Model serialization
- **Pandas 2.3.2** - Data processing
- **NumPy 2.3.2** - Numerical computing

#### Rich Text & Media
- **Django CKEditor 6.7.3** - Rich text editor cho tin tức
- **Pillow 11.3.0** - Image processing

#### API Documentation
- **DRF YASG 1.21.10** - Swagger/OpenAPI documentation

#### Server
- **Gunicorn 23.0.0** - WSGI HTTP server
- **WhiteNoise 6.11.0** - Static file serving

---

## 📋 Yêu Cầu Hệ Thống

### Yêu Cầu Tối Thiểu
- **Docker Desktop** (cho cách chạy Docker)
- **Node.js 14+** (cho cách chạy local frontend)
- **Python 3.8+** (cho cách chạy local backend)
- **MySQL** (cho database)
- **Redis** (cho cache và message broker)

### Yêu Cầu Bổ Sung
- **Firebase Account** - Để cấu hình Google OAuth
- **Mapbox Token** (tùy chọn) - Cho tính năng bản đồ nâng cao

---

## 🚀 Cách Chạy Dự Án

### Cách 1: Chạy Qua Docker (Khuyến Nghị)

#### Yêu Cầu Trước Khi Chạy:
1. **Tạo và import data backup**
   - Import các file SQL trong thư mục `backup/` vào MySQL

2. **Thiết lập biến môi trường**
   - Trong các file chứa biến môi trường, chuyển các biến `'localhost'` sang `'host.docker.internal'`
   - Điều này cho phép container Docker kết nối với services trên host

3. **Mở ứng dụng Docker Desktop**
   - Đảm bảo Docker Desktop đang chạy

#### Bước 1: Chạy Backend
```sh
cd backendWeb
docker compose up --build -d
```

#### Bước 2: Chạy Frontend
```sh
cd frontend
docker compose up --build -d
```

#### Kiểm Tra
- Nếu không có lỗi, 2 docker images đang được chạy trong Docker Desktop
- Backend thường chạy tại: `http://localhost:8000`
- Frontend thường chạy tại: `http://localhost:3000`

### Cách 2: Chạy Local (Development)

#### Backend

1. **Cài đặt dependencies:**
```sh
cd backendWeb
pip install -r requirements.txt
```

2. **Thiết lập database:**
   - Tạo database MySQL
   - Cấu hình trong `backendWeb/settings.py`
   - Chạy migrations:
```sh
python manage.py migrate
```

3. **Import data (nếu cần):**
   - Import các file SQL từ thư mục `backup/`

4. **Chạy Redis:**
```sh
redis-server
```

5. **Chạy Celery worker (nếu cần):**
```sh
celery -A backendWeb worker -l info
```

6. **Chạy Django server:**
```sh
python manage.py runserver
```

#### Frontend

1. **Cài đặt dependencies:**
```sh
cd frontend
npm install
```

2. **Tạo file `.env.local`** (nếu chưa có):
```env
REACT_APP_URL_HTTP=http://localhost:8000
REACT_APP_URL_WEBSOCKET=ws://localhost:8000
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDING_ID=your_firebase_messaging_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
```

3. **Chạy development server:**
```sh
npm start
```

4. **Build production:**
```sh
npm run build
```

---

## 📚 Xem Chi Tiết Chức Năng

Để xem chi tiết về các chức năng và cách hoạt động của hệ thống, vui lòng tham khảo các tài liệu sau:

### Frontend
- **[Tài Liệu Dự Án Frontend](./frontend/TAI_LIEU_DU_AN.md)** - Tài liệu chi tiết về:
  - Kiến trúc hệ thống frontend
  - Các chức năng chính (Authentication, Properties, Chat, Notifications, News, v.v.)
  - API Endpoints
  - Cấu trúc thư mục và components
  - Context và State Management
  - Custom Hooks
  - Cách thức hoạt động

- **[README Frontend](./frontend/README.md)** - Hướng dẫn cơ bản về frontend

### Backend
- **[Tài Liệu Chức Năng Backend](./backendWeb/TAI_LIEU_CHUC_NANG.md)** - Tài liệu chi tiết về:
  - Quản lý tài khoản (Accounts)
  - Xác thực JWT (AuthenticationJWT)
  - OAuth2 với Google
  - Quản lý bất động sản (Properties)
  - Dự đoán giá bất động sản (Predicts)
  - Hệ thống tin tức (News)
  - Hệ thống comment (Comments)
  - Thông báo (Notifications)
  - Yêu thích (Love Cart)
  - Chat real-time (Conversations & Chat Message)
  - Dữ liệu mặc định (Defaults)

- **[README Backend](./backendWeb/README.md)** - Hướng dẫn cơ bản về backend

### API Documentation
- **Swagger UI**: `http://localhost:8000/` (khi backend đang chạy)
  - Xem tất cả API endpoints
  - Test API trực tiếp trên trình duyệt
  - Xem request/response schemas

---

## 🎥 Video Demo

[![Watch the video](https://i.ytimg.com/vi/ufraSdLiqiE/hqdefault.jpg)](https://www.youtube.com/watch?v=ufraSdLiqiE)

---

## 📝 Ghi Chú

- Khi chạy qua Docker, đảm bảo các biến môi trường sử dụng `host.docker.internal` thay vì `localhost`
- Backend sử dụng Redis cho cache và message broker, đảm bảo Redis đang chạy
- Frontend cần cấu hình Firebase để sử dụng Google OAuth
- Database MySQL cần được tạo và import data từ thư mục `backup/`

---

**Tài liệu được cập nhật lần cuối**: 2024
