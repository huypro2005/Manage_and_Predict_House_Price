# Hướng Dẫn Thiết Lập Biến Môi Trường

## Tổng Quan
Để bảo mật thông tin nhạy cảm, tất cả cấu hình API keys, Firebase config và các thông tin bí mật khác được lưu trong file `.env`.

## Tạo File .env

### 1. Tạo file `.env` trong thư mục gốc của project:

```bash
# Trong thư mục frontend/
touch .env
```

### 2. Thêm các biến môi trường sau vào file `.env`:

```env
# API Configuration
REACT_APP_API_URL=http://127.0.0.1:8000/api/v1/

# Google OAuth Configuration
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=AIzaSyAL7R2-9_wvgrwwLgNknZHvlZbHMqgxZCc
REACT_APP_FIREBASE_AUTH_DOMAIN=auth-e0be2.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=auth-e0be2
REACT_APP_FIREBASE_STORAGE_BUCKET=auth-e0be2.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=301149939517
REACT_APP_FIREBASE_APP_ID=1:301149939517:web:d58f814569025813a80754
REACT_APP_FIREBASE_MEASUREMENT_ID=G-Z7PFZEETT9

# App Configuration
REACT_APP_APP_NAME=RealEstate App
REACT_APP_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=development
```

## Cấu Hình Firebase

### 1. Lấy Firebase Config:
1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Chọn project của bạn
3. Vào Settings > Project settings
4. Scroll xuống phần "Your apps"
5. Copy cấu hình Firebase

### 2. Thay thế các giá trị trong `.env`:
```env
REACT_APP_FIREBASE_API_KEY=your_actual_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Cấu Hình Google OAuth

### 1. Lấy Google Client ID:
1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Chọn project
3. Vào APIs & Services > Credentials
4. Tạo OAuth 2.0 Client ID
5. Copy Client ID

### 2. Thêm vào `.env`:
```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
```

## Bảo Mật

### ⚠️ Quan Trọng:
- **KHÔNG BAO GIỜ** commit file `.env` vào Git
- File `.env` đã được thêm vào `.gitignore`
- Chỉ chia sẻ file `.env.example` với team

### 1. Kiểm tra `.gitignore`:
```gitignore
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 2. Tạo file `.env.example`:
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

## Sử Dụng Trong Code

### 1. Truy cập biến môi trường:
```javascript
// Trong React components
const apiUrl = process.env.REACT_APP_API_URL;
const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;
```

### 2. Validation:
```javascript
// Kiểm tra xem biến môi trường đã được cấu hình chưa
if (!process.env.REACT_APP_FIREBASE_API_KEY) {
  console.error('Firebase API Key is missing!');
}
```

## Môi Trường Khác Nhau

### Development (.env.development):
```env
REACT_APP_API_URL=http://127.0.0.1:8000/api/v1/
REACT_APP_ENVIRONMENT=development
```

### Production (.env.production):
```env
REACT_APP_API_URL=https://your-production-api.com/api/v1/
REACT_APP_ENVIRONMENT=production
```

### Staging (.env.staging):
```env
REACT_APP_API_URL=https://your-staging-api.com/api/v1/
REACT_APP_ENVIRONMENT=staging
```

## Khắc Phục Sự Cố

### 1. Biến môi trường không được load:
- Restart development server: `npm start`
- Kiểm tra tên biến có đúng format `REACT_APP_` không
- Kiểm tra file `.env` có ở thư mục gốc không

### 2. Firebase không hoạt động:
- Kiểm tra tất cả Firebase config đã được cấu hình
- Xem console để tìm lỗi validation
- Đảm bảo Firebase project đã được tạo và cấu hình đúng

### 3. Google OAuth không hoạt động:
- Kiểm tra Google Client ID đã được cấu hình
- Xác minh domain được ủy quyền trong Google Console
- Kiểm tra Google script đã được load

## Lưu Ý

### 🔒 Bảo Mật:
- Không bao giờ expose API keys trong code
- Sử dụng HTTPS trong production
- Rotate keys định kỳ
- Monitor usage của API keys

### 📝 Documentation:
- Cập nhật `.env.example` khi thêm biến mới
- Document tất cả biến môi trường cần thiết
- Chia sẻ setup guide với team members

### 🚀 Deployment:
- Cấu hình biến môi trường trên hosting platform
- Sử dụng secrets management cho production
- Test cấu hình trước khi deploy
