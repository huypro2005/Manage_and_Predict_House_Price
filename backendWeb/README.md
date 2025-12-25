# 🏠 Hệ thống Quản lý và Dự đoán Giá Bất động sản

## 📋 Tổng quan

Đây là một hệ thống backend Django RESTful API cho việc quản lý và dự đoán giá bất động sản. Hệ thống cung cấp các tính năng quản lý tài khoản, đăng tin bất động sản, dự đoán giá nhà, tin tức, thông báo và nhiều tính năng khác.

## 🚀 Tính năng chính

### 👤 Quản lý tài khoản
- Đăng ký/đăng nhập với JWT authentication
- OAuth2 với Google
- Quản lý profile người dùng
- Upload avatar
- Xác thực email

### 🏘️ Quản lý bất động sản
- Đăng tin bán/cho thuê bất động sản
- Upload nhiều hình ảnh cho mỗi tin
- Tìm kiếm và lọc bất động sản theo nhiều tiêu chí
- Quản lý địa điểm (tỉnh/thành phố, quận/huyện)
- Phân loại loại hình bất động sản

### 🤖 Dự đoán giá bất động sản
- Sử dụng Machine Learning để dự đoán giá nhà
- Dashboard cho người dùng premium
- Lưu lịch sử dự đoán
- Giới hạn số lần dự đoán cho user thường

### 📰 Hệ thống tin tức
- Đăng bài viết tin tức
- Quản lý nội dung với CKEditor
- Hệ thống comment
- Upload thumbnail cho bài viết

### 🔔 Thông báo
- Thông báo real-time với WebSocket
- Thông báo email
- Quản lý trạng thái đã đọc/chưa đọc
- Cache thông báo với Redis

### 💝 Yêu thích
- Lưu danh sách bất động sản yêu thích
- Quản lý wishlist

### 📞 Liên hệ
- Gửi yêu cầu liên hệ cho chủ bất động sản
- WebSocket cho chat real-time

## 🛠️ Công nghệ sử dụng

### Backend Framework
- **Django 5.2.5** - Web framework chính
- **Django REST Framework** - API framework
- **Django Channels** - WebSocket support
- **Celery** - Background tasks
- **Redis** - Caching và message broker

### Database
- **MySQL** - Database chính
- **Redis** - Cache và session storage

### Authentication & Security
- **JWT (Simple JWT)** - Token authentication
- **OAuth2** - OAuth2 provider
- **Django Allauth** - Social authentication
- **CORS** - Cross-origin resource sharing

### Machine Learning
- **Scikit-learn** - ML framework
- **Joblib** - Model serialization
- **Pandas** - Data processing
- **NumPy** - Numerical computing

### Other Libraries
- **CKEditor** - Rich text editor
- **Pillow** - Image processing
- **Firebase Admin** - Firebase integration
- **Mapbox** - Maps integration
- **Gunicorn** - WSGI server

## 📁 Cấu trúc dự án

```
backendWeb/
├── apps/                          # Django apps
│   ├── accounts/                  # Quản lý tài khoản
│   ├── authenticationJWT/        # JWT authentication
│   ├── comments/                 # Hệ thống comment
│   ├── contacts/                 # Liên hệ và chat
│   ├── defaults/                 # Dữ liệu mặc định (tỉnh, quận, loại BDS)
│   ├── love_cart/                # Yêu thích
│   ├── news/                     # Tin tức
│   ├── notifications/            # Thông báo
│   ├── oauth/                    # OAuth2
│   ├── predicts/                 # Dự đoán giá
│   └── properties/               # Bất động sản
├── backendWeb/                   # Django project settings
├── media/                        # Media files
├── static/                       # Static files
└── requirements.txt              # Dependencies
```

## 🗄️ Cơ sở dữ liệu

### Models chính:

#### CustomUser (Tài khoản)
- Thông tin cá nhân (tên, email, phone, avatar)
- Xác thực (local, Google OAuth)
- Trạng thái tài khoản

#### Property (Bất động sản)
- Thông tin cơ bản (tiêu đề, mô tả, giá, diện tích)
- Vị trí (tọa độ, địa chỉ, tỉnh, quận)
- Đặc điểm (số phòng, tầng, mặt tiền)
- Trạng thái pháp lý và loại hình

#### NewsArticle (Tin tức)
- Nội dung bài viết với CKEditor
- Thumbnail và metadata
- Phân quyền duyệt bài

#### Notification (Thông báo)
- Hệ thống thông báo đa dạng
- Real-time với WebSocket
- Cache với Redis

#### Dashboard (Dự đoán)
- Quản lý lượt dự đoán
- Trạng thái premium
- Lịch sử dự đoán

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- **Docker** và **Docker Compose** (đã cài đặt)
- **MySQL 8.0+** (đã cài đặt và đang chạy trên máy host)
- **File backup database** (file `.sql`)

### Bước 1: Clone repository

```bash
git clone <repository-url>
cd backendWeb
```

### Bước 2: Tạo file .env

Tạo file `.env` trong thư mục gốc của project (cùng cấp với `compose.yaml`) với nội dung sau:

```env
# Database Configuration
DB_NAME=BATDONGSAN
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=host.docker.internal
DB_PORT=3306

# Redis Configuration
USERNAME_REDIS=
PASSWORD_REDIS=
HOST_REDIS=redis
PORT_REDIS=6379

# Django Configuration
DJANGO_SECRET_KEY=django-insecure-1uv@@ml1x1_6&yzuh!l@&%so)h5noqgz)mtry==n(aj-jmc)74
DJANGO_DEBUG=True

# Mapbox Token (Optional - chỉ cần nếu sử dụng tính năng map)
MAPBOX_TOKEN=your_mapbox_token_here

# Firebase Configuration (Optional - chỉ cần nếu sử dụng OAuth Google)
PATH_FIREBASE_ACCOUNT=path/to/firebase-service-account.json
```

**Lưu ý**: 
- Thay `your_mysql_password` bằng mật khẩu MySQL của bạn
- `DB_HOST=host.docker.internal` để container có thể kết nối đến MySQL trên máy host
- `HOST_REDIS=redis` để kết nối đến Redis container trong docker-compose
- `MAPBOX_TOKEN` và `PATH_FIREBASE_ACCOUNT` là tùy chọn

### Bước 3: Tạo Database và Import dữ liệu

#### 3.1. Tạo database trong MySQL

```bash
# Đăng nhập vào MySQL
mysql -u root -p

# Tạo database
CREATE DATABASE batdongsan;

# Thoát MySQL
exit;
```

#### 3.2. Import dữ liệu backup

Import file backup database vào MySQL:

```bash
# Import từ file backup
mysql -u root -p BATDONGSAN < path/to/backup.sql

# Hoặc sử dụng MySQL Workbench để import trực tiếp
link: https://dev.mysql.com/doc/workbench/en/wb-admin-export-import-management.html
```

### Bước 4: Chạy ứng dụng với Docker Compose

```bash
# Build và chạy tất cả services
docker compose up --build

# Hoặc chạy ở background
docker compose up --build -d
```

**Lưu ý**: 
- Lần đầu tiên chạy sẽ mất thời gian để build image
- Server sẽ tự động chạy tại: http://localhost:8000
- Redis sẽ tự động được khởi động cùng với ứng dụng

### ✅ Kiểm tra cài đặt

Sau khi container đã chạy, truy cập các URL sau:

- **Swagger UI (API Documentation)**: http://localhost:8000/
- **Admin Panel**: http://localhost:8000/admin/ (cần tạo superuser trước)

### 🔧 Các lệnh Docker Compose hữu ích

```bash
# Xem logs
docker compose logs -f

# Dừng containers
docker compose down

# Dừng và xóa volumes
docker compose down -v

# Rebuild và restart
docker compose up --build

# Tạo superuser (chạy trong container)
docker compose exec server python manage.py createsuperuser
```

### 📝 Lưu ý quan trọng

1. **File .env**: Đảm bảo file `.env` nằm trong thư mục gốc (cùng cấp với `compose.yaml`)
2. **Database**: Đảm bảo MySQL đang chạy trên máy host và database đã được tạo + import dữ liệu
3. **Ports**: Đảm bảo port 8000 không bị chiếm dụng
4. **Docker**: Đảm bảo Docker và Docker Compose đã được cài đặt và đang chạy

## 📚 API Documentation

API được document với Swagger UI tại: `http://localhost:8000/`

### Endpoints chính:

#### Authentication
- `POST /api/v1/auth/register/` - Đăng ký
- `POST /api/v1/auth/login/` - Đăng nhập
- `POST /api/v1/auth/refresh/` - Refresh token

#### Properties
- `GET /api/v1/properties/` - Danh sách bất động sản
- `POST /api/v1/properties/` - Tạo bất động sản mới
- `GET /api/v1/properties/{id}/` - Chi tiết bất động sản

#### Users
- `GET /api/v1/users/` - Danh sách người dùng
- `GET /api/v1/users/{id}/` - Chi tiết người dùng
- `PUT /api/v1/users/{id}/` - Cập nhật thông tin

#### Predictions
- `POST /api/v1/predicts/predict/` - Dự đoán giá
- `GET /api/v1/predicts/dashboard/` - Dashboard người dùng

## 🔧 Cấu hình nâng cao

### Redis Configuration
```python
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://localhost:6379/0',
    }
}
```

### Celery Configuration
```python
CELERY_BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
```

### WebSocket Configuration
```python
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [("localhost", 6379)],
        },
    },
}
```

## 🧪 Testing

```bash
# Chạy tất cả tests
python manage.py test

# Chạy test cho app cụ thể
python manage.py test apps.accounts
```

## 📦 Deployment

### Docker (Recommended)
```bash
# Build image
docker build -t backend-web .

# Run container
docker run -p 8000:8000 backend-web
```

### Manual Deployment
1. Cài đặt dependencies production
2. Cấu hình database production
3. Thiết lập static files
4. Cấu hình reverse proxy (Nginx)
5. Sử dụng Gunicorn + Supervisor

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Dự án này được phân phối dưới MIT License. Xem file `LICENSE` để biết thêm chi tiết.

## 📞 Liên hệ

- **Developer**: [Tên developer]
- **Email**: [email@example.com]
- **GitHub**: [github.com/username]

## 🙏 Acknowledgments

- Django community
- Django REST Framework
- Redis team
- Celery team
- Tất cả contributors của các thư viện open source được sử dụng