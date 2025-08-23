# Hướng Dẫn Thiết Lập Hệ Thống Xác Thực

## Tổng Quan
Hệ thống xác thực này bao gồm:
- Đăng nhập và đăng ký bằng Email/Mật khẩu
- Tích hợp Google OAuth
- Quản lý JWT token
- Tự động xác thực token
- Bảo vệ route
- Quản lý hồ sơ người dùng

## Tính Năng

### 🔐 Tính Năng Xác Thực
- **Form Đăng Nhập/Đăng Ký**: Form modal đẹp với validation
- **Google OAuth**: Đăng nhập một click với tài khoản Google
- **Lưu Trữ JWT**: Lưu trữ token an toàn trong localStorage
- **Tự Động Đăng Nhập**: Tự động đăng nhập khi refresh trang nếu token hợp lệ
- **Xác Thực Token**: Tự động xác thực token khi khởi động ứng dụng
- **Menu Người Dùng**: Menu hồ sơ với các hành động của người dùng

### 🎨 Các Component UI
- **LoginModal**: Đăng nhập email/mật khẩu + Google
- **RegisterModal**: Form đăng ký hoàn chỉnh
- **UserDropdown**: Menu hồ sơ người dùng
- **AuthWrapper**: Quản lý trạng thái xác thực
- **ProtectedRoute**: Component bảo vệ route

### 🔧 Tính Năng Kỹ Thuật
- **Context API**: Quản lý trạng thái xác thực toàn cục
- **Validation Form**: Validation thời gian thực với thông báo lỗi
- **Trạng Thái Loading**: Chỉ báo loading mượt mà
- **Xử Lý Lỗi**: Quản lý lỗi toàn diện
- **Tích Hợp API**: Service API sẵn sàng sử dụng với auth headers

## Hướng Dẫn Thiết Lập

### 1. Các Endpoint API Backend Cần Thiết

Backend Django của bạn cần có các endpoint sau:

```python
# Các endpoint xác thực
POST /api/v1/auth/login/          # Đăng nhập email/mật khẩu
POST /api/v1/auth/register/       # Đăng ký người dùng
POST /api/v1/auth/check/         # Xác thực token
POST /api/v1/auth/google/         # Đăng nhập Google OAuth
POST /api/v1/auth/refresh/        # Làm mới token (tùy chọn)
```

### 2. Thiết Lập Google OAuth

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Bật Google+ API
4. Tạo OAuth 2.0 credentials
5. Thêm domain của bạn vào authorized origins
6. Thay thế `YOUR_GOOGLE_CLIENT_ID` trong:
   - `src/components/auth/LoginModal.js` (dòng 47)
   - `src/components/auth/RegisterModal.js` (dòng 89)

### 3. Biến Môi Trường

Tạo file `.env` trong thư mục gốc của project:

```env
# API Configuration
REACT_APP_API_URL=http://127.0.0.1:8000/api/v1/

# Google OAuth Configuration
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id

# App Configuration
REACT_APP_APP_NAME=RealEstate App
REACT_APP_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=development
```

**⚠️ Quan trọng**: 
- File `.env` đã được thêm vào `.gitignore` để bảo mật
- Không bao giờ commit file `.env` vào Git
- Xem file `ENVIRONMENT_SETUP.md` để biết thêm chi tiết

### 4. Định Dạng Phản Hồi Backend

Backend của bạn cần trả về phản hồi theo định dạng sau:

```json
// Đăng nhập/Đăng ký thành công
{
  "access": "jwt_token_here",
  "refresh": "refresh_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "Nguyễn",
    "last_name": "Văn A",
    "phone": "0123456789"
  }
}

// Xác thực token thành công
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "Nguyễn",
    "last_name": "Văn A",
    "phone": "0123456789"
  }
}

// Phản hồi lỗi
{
  "message": "Thông báo lỗi ở đây"
}
```

## Ví Dụ Sử Dụng

### Sử Dụng Protected Routes

```jsx
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
```

### Thực Hiện API Calls Có Xác Thực

```jsx
import { apiService } from './utils/api';

// GET request với auth
const properties = await apiService.get('properties/', { page: 1 });

// POST request với auth
const newProperty = await apiService.post('properties/', propertyData);

// Upload file với progress
const uploadResult = await apiService.uploadFile(
  'upload/', 
  file, 
  (progress) => console.log(`Upload: ${progress}%`)
);
```

### Truy Cập Dữ Liệu Người Dùng

```jsx
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (isAuthenticated) {
    return <div>Chào mừng, {user.first_name}!</div>;
  }
  
  return <div>Vui lòng đăng nhập</div>;
}
```

## Cấu Trúc File

```
src/
├── contexts/
│   └── AuthContext.js          # Context xác thực
├── components/
│   └── auth/
│       ├── LoginModal.js       # Modal form đăng nhập
│       ├── RegisterModal.js    # Modal form đăng ký
│       ├── UserDropdown.js     # Dropdown hồ sơ người dùng
│       ├── AuthWrapper.js      # Quản lý trạng thái auth
│       └── ProtectedRoute.js   # Bảo vệ route
└── utils/
    └── api.js                  # Service API với auth
```

## Tính Năng Bảo Mật

- **Lưu Trữ JWT**: Tokens được lưu trong localStorage
- **Xác Thực Token**: Tự động xác thực khi khởi động ứng dụng
- **Tự Động Đăng Xuất**: Tokens không hợp lệ được tự động xóa
- **Bảo Vệ Route**: Ngăn chặn truy cập trái phép
- **Validation Form**: Validation phía client
- **Xử Lý Lỗi**: Thông báo lỗi an toàn

## Tùy Chỉnh

### Styling
Tất cả components sử dụng Tailwind CSS classes và có thể dễ dàng tùy chỉnh bằng cách sửa đổi props className.

### Quy Tắc Validation
Sửa đổi các hàm validation trong modal components:
- Validation email trong `LoginModal.js` và `RegisterModal.js`
- Yêu cầu mật khẩu trong `RegisterModal.js`
- Validation số điện thoại trong `RegisterModal.js`

### API Endpoints
Cập nhật base URL trong `src/base.js` để khớp với backend API của bạn.

## Khắc Phục Sự Cố

### Các Vấn Đề Thường Gặp

1. **Google OAuth không hoạt động**
   - Kiểm tra Google Client ID có đúng không
   - Xác minh domain được ủy quyền trong Google Console
   - Đảm bảo Google script được tải

2. **Xác thực token thất bại**
   - Kiểm tra endpoint `/auth/verify/` của backend
   - Xác minh định dạng JWT token
   - Kiểm tra cài đặt CORS

3. **API calls thất bại**
   - Xác minh base URL trong `src/base.js`
   - Kiểm tra các endpoint API của backend
   - Đảm bảo cấu hình CORS đúng

### Chế Độ Debug

Bật debug logging bằng cách thêm vào `AuthContext.js`:

```javascript
const DEBUG = true;

if (DEBUG) {
  console.log('Auth state:', { user, token, isAuthenticated });
}
```

## Hỗ Trợ

Đối với các vấn đề hoặc câu hỏi:
1. Kiểm tra console trình duyệt để tìm lỗi
2. Xác minh tất cả API endpoints đang hoạt động
3. Đảm bảo Google OAuth được cấu hình đúng
4. Kiểm tra tab network để tìm các request thất bại
