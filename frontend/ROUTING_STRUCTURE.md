# Cấu Trúc Routing - Hệ Thống Bất Động Sản

## Tổng Quan
Hệ thống routing được tổ chức với `index.js` là nơi định nghĩa tất cả routes và `App.js` là trang chủ.

## Cấu Trúc Routing

### 📁 `src/index.js` - Định Nghĩa Routes
```jsx
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

root.render(
  <AuthProvider>
    <Router>
      <Routes>
        {/* Trang chủ */}
        <Route path='/' element={<App />} />
        
        {/* Trang tìm kiếm */}
        <Route path='/search' element={<SearchPage />} />
        
        {/* Trang danh sách bất động sản */}
        <Route path='/property-list' element={<PropertyList />} />
        
        {/* Trang chi tiết bất động sản */}
        <Route path='/property/:id' element={<PropertyDetail />} />
        
        {/* Các trang yêu cầu đăng nhập */}
        <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/favorites' element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
        <Route path='/messages' element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
        <Route path='/post-property' element={<ProtectedRoute><PostPropertyPage /></ProtectedRoute>} />
        <Route path='/settings' element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  </AuthProvider>
);
```

### 🏠 `src/App.js` - Trang Chủ
- **Chức năng**: Trang chủ với form tìm kiếm bất động sản
- **Tính năng**:
  - Form tìm kiếm với location, property type, price, area
  - Banner hero
  - Tin tức nổi bật
  - Danh sách bất động sản nổi bật
  - Footer
  - Hệ thống authentication (đăng nhập/đăng ký)

## Các Trang Chính

### 1. **Trang Chủ** (`/`)
- **Component**: `App.js`
- **Mô tả**: Trang chính với form tìm kiếm và nội dung giới thiệu

### 2. **Trang Tìm Kiếm** (`/search`)
- **Component**: `SearchPage.js`
- **Mô tả**: Trang tìm kiếm nâng cao với các bộ lọc

### 3. **Danh Sách Bất Động Sản** (`/property-list`)
- **Component**: `PropertyList.js`
- **Mô tả**: Hiển thị danh sách bất động sản theo kết quả tìm kiếm

### 4. **Chi Tiết Bất Động Sản** (`/property/:id`)
- **Component**: `PropertyDetail.js`
- **Mô tả**: Trang chi tiết thông tin bất động sản

## Các Trang Yêu Cầu Đăng Nhập

### 5. **Hồ Sơ Cá Nhân** (`/profile`)
- **Bảo vệ**: `ProtectedRoute`
- **Mô tả**: Quản lý thông tin cá nhân

### 6. **Bất Động Sản Yêu Thích** (`/favorites`)
- **Bảo vệ**: `ProtectedRoute`
- **Mô tả**: Danh sách bất động sản đã yêu thích

### 7. **Tin Nhắn** (`/messages`)
- **Bảo vệ**: `ProtectedRoute`
- **Mô tả**: Hệ thống tin nhắn với chủ bất động sản

### 8. **Đăng Tin** (`/post-property`)
- **Bảo vệ**: `ProtectedRoute`
- **Mô tả**: Form đăng tin bán/cho thuê bất động sản

### 9. **Cài Đặt** (`/settings`)
- **Bảo vệ**: `ProtectedRoute`
- **Mô tả**: Cài đặt tài khoản và thông báo

## Hệ Thống Authentication

### 🔐 AuthProvider
- **Vị trí**: `src/contexts/AuthContext.js`
- **Chức năng**: Quản lý trạng thái đăng nhập toàn cục
- **Tính năng**:
  - JWT token management
  - Auto-login
  - Token validation
  - User state management

### 🛡️ ProtectedRoute
- **Vị trí**: `src/components/auth/ProtectedRoute.js`
- **Chức năng**: Bảo vệ các trang yêu cầu đăng nhập
- **Hành động**: Redirect về trang chủ nếu chưa đăng nhập

### 🎨 AuthWrapper
- **Vị trí**: `src/components/auth/AuthWrapper.js`
- **Chức năng**: Hiển thị nút đăng nhập/đăng ký hoặc menu người dùng
- **Tích hợp**: Trong header của `App.js`

## Luồng Hoạt Động

### 1. **Khởi Động Ứng Dụng**
```
index.js → AuthProvider → Router → Routes → App.js (trang chủ)
```

### 2. **Đăng Nhập**
```
User click "Đăng Nhập" → LoginModal → AuthContext.login() → Update state → Show UserDropdown
```

### 3. **Truy Cập Trang Bảo Vệ**
```
User navigate to /profile → ProtectedRoute check auth → Allow/Redirect
```

### 4. **Tìm Kiếm Bất Động Sản**
```
User fill form → Click "Tìm kiếm" → Navigate to /property-list with params
```

## Tích Hợp API

### 🔗 API Service
- **Vị trí**: `src/utils/api.js`
- **Chức năng**: Service để gọi API với authentication headers
- **Tính năng**:
  - GET, POST, PUT, DELETE requests
  - File upload với progress
  - Automatic token inclusion
  - Error handling

### 📡 Endpoints Chính
```javascript
// Bất động sản
GET /api/v1/properties/          // Danh sách bất động sản
GET /api/v1/properties/:id/      // Chi tiết bất động sản
POST /api/v1/properties/         // Đăng tin mới

// Xác thực
POST /api/v1/auth/login/         // Đăng nhập
POST /api/v1/auth/register/      // Đăng ký
POST /api/v1/auth/verify/        // Xác thực token
POST /api/v1/auth/google/        // Đăng nhập Google
```

## Responsive Design

### 📱 Mobile First
- Tất cả components được thiết kế responsive
- Sử dụng Tailwind CSS breakpoints
- Mobile navigation menu
- Touch-friendly interactions

### 🖥️ Desktop
- Full-width layout
- Hover effects
- Keyboard navigation
- Advanced filtering options

## Performance

### ⚡ Optimization
- Lazy loading cho các trang
- Image optimization
- Code splitting
- Memoization cho components

### 🔄 State Management
- React Context cho authentication
- Local state cho forms
- URL state cho search parameters
- localStorage cho user preferences

## Security

### 🔒 Bảo Mật
- JWT token validation
- Protected routes
- Input sanitization
- CORS configuration
- HTTPS enforcement

### 🛡️ Error Handling
- Graceful error messages
- Fallback UI
- Network error recovery
- Validation feedback
