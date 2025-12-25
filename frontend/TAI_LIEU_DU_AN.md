# 📚 Tài Liệu Dự Án RealEstate Frontend

## 📋 Mục Lục

1. [Tổng Quan Dự Án](#tổng-quan-dự-án)
2. [Kiến Trúc Hệ Thống](#kiến-trúc-hệ-thống)
3. [Các Chức Năng Chính](#các-chức-năng-chính)
4. [API Endpoints](#api-endpoints)
5. [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
6. [Các Component Chính](#các-component-chính)
7. [Context và State Management](#context-và-state-management)
8. [Custom Hooks](#custom-hooks)
9. [Cách Thức Hoạt Động](#cách-thức-hoạt-động)
10. [Cấu Hình và Môi Trường](#cấu-hình-và-môi-trường)

---

## 🎯 Tổng Quan Dự Án

### Mô Tả
Dự án **RealEstate Frontend** là một ứng dụng web bất động sản được xây dựng bằng **React 18**, cung cấp nền tảng cho người dùng tìm kiếm, đăng tin, quản lý bất động sản và tương tác với nhau.

### Công Nghệ Sử Dụng
- **React 18.3.1** - Framework JavaScript
- **React Router DOM 7.8.0** - Điều hướng trang
- **Tailwind CSS 3.3.0** - Styling
- **Framer Motion 10.16.4** - Animations
- **Firebase 12.2.1** - Authentication (Google OAuth)
- **Leaflet 1.9.4** - Bản đồ
- **React Leaflet 4.2.1** - React wrapper cho Leaflet
- **Reconnecting WebSocket 4.4.0** - WebSocket cho chat real-time
- **Lucide React 0.292.0** - Icons

---

## 🏗️ Kiến Trúc Hệ Thống

### Kiến Trúc Tổng Quan
```
┌─────────────────────────────────────────┐
│         React Application               │
├─────────────────────────────────────────┤
│  Context Layer (Auth, Chat, Notification)│
├─────────────────────────────────────────┤
│  Component Layer (Pages, Components)     │
├───────────────────────────────────── ────┤
│  Service Layer (API, Utils)             │
├─────────────────────────────────────────┤
│  Backend API (REST + WebSocket)         │
└─────────────────────────────────────────┘
```

### Luồng Dữ Liệu
1. **User Action** → Component
2. **Component** → Context/Hook
3. **Context/Hook** → API Service
4. **API Service** → Backend API
5. **Response** → Context → Component → UI Update

---

## 🎨 Các Chức Năng Chính

### 1. 🔐 Xác Thực Người Dùng (Authentication)
- **Đăng ký tài khoản**: Form đăng ký với validation
- **Đăng nhập**: Username/Password hoặc Google OAuth
- **Quản lý token**: JWT token với refresh token mechanism
- **Bảo vệ route**: ProtectedRoute component
- **Auto logout**: Khi token hết hạn

**File liên quan:**
- `src/contexts/AuthContext.js`
- `src/components/auth/LoginModal.js`
- `src/components/auth/RegisterModal.js`
- `src/components/auth/ProtectedRoute.js`

### 2. 🏠 Quản Lý Bất Động Sản (Properties)

#### 2.1. Tìm Kiếm Bất Động Sản
- **Bộ lọc đa tiêu chí**:
  - Tỉnh/Thành phố
  - Quận/Huyện (nhiều quận)
  - Loại bất động sản (nhiều loại)
  - Mức giá (min-max)
  - Diện tích (min-max)
  - Tab: Bán/Thuê
- **Kết quả tìm kiếm**: Pagination, Grid/List view, Sort

**File liên quan:**
- `src/App.js` (Search form)
- `src/pages/PropertyList.js`
- `src/useAPI/LocationSelect.js`
- `src/useAPI/PropertyTypeSelect.js`

#### 2.2. Chi Tiết Bất Động Sản
- Hiển thị thông tin đầy đủ
- Gallery ảnh với lightbox
- Bản đồ vị trí (Leaflet)
- Thông tin liên hệ
- Form liên hệ
- Yêu thích (Favorite)
- Bất động sản tương tự

**File liên quan:**
- `src/pages/PropertyDetail.js`
- `src/components/PropertyMap.js`

#### 2.3. Đăng Tin Bất Động Sản
- Form đăng tin với validation
- Upload nhiều ảnh
- Chọn vị trí trên bản đồ
- Chọn loại bất động sản
- Chọn thuộc tính động (attributes)

**File liên quan:**
- `src/pages/PostProperty.js`

#### 2.4. Quản Lý Tin Đã Đăng
- Danh sách tin đã đăng
- Chỉnh sửa tin
- Xóa tin
- Xem trạng thái (pending, approved, rejected)

**File liên quan:**
- `src/pages/MyProperties.js`
- `src/pages/EditProperty.js`

### 3. ❤️ Yêu Thích (Favorites)
- Thêm/Xóa yêu thích
- Danh sách yêu thích
- Đồng bộ real-time

**File liên quan:**
- `src/pages/Favorites.js`
- `src/components/FavoriteHeart.js`
- `src/hooks/useFavoriteCount.js`

### 4. 💬 Chat Real-time
- WebSocket connection
- Danh sách cuộc trò chuyện
- Gửi/Nhận tin nhắn real-time
- Đếm tin nhắn chưa đọc
- Tìm kiếm người dùng
- Đánh dấu đã đọc

**File liên quan:**
- `src/contexts/ChatContext.js`
- `src/pages/ChatMessage.js`
- `src/components/MessageIcon.js`

### 5. 🔔 Thông Báo (Notifications)
- Long polling để nhận thông báo mới
- Đếm thông báo chưa đọc
- Dropdown thông báo
- Trang danh sách thông báo
- Đánh dấu đã đọc (batch)
- Cache localStorage

**File liên quan:**
- `src/contexts/NotificationContext.js`
- `src/components/NotificationBell.js`
- `src/components/NotificationDropdown.js`
- `src/components/NotificationManager.js`
- `src/pages/Notifications.js`
- `src/hooks/useLongPollingNotifications.js`

### 6. 📰 Tin Tức (News)
- Danh sách tin tức với pagination
- Chi tiết tin tức
- Tin tức nổi bật
- Tin tức liên quan
- Lọc theo tỉnh/thành

**File liên quan:**
- `src/pages/News.js`
- `src/pages/NewsDetail.js`

### 7. 👤 Hồ Sơ Người Dùng (Profile)
- Xem thông tin cá nhân
- Chỉnh sửa thông tin
- Đổi avatar
- Xác thực tài khoản (verification badge)

**File liên quan:**
- `src/pages/Profile.js`
- `src/components/VerificationBadge.js`

### 8. 📊 Dự Đoán Giá (Price Prediction)
- Form nhập thông tin
- Chọn vị trí trên bản đồ
- Gửi request dự đoán
- Hiển thị kết quả

**File liên quan:**
- `src/pages/PricePrediction.js`

---

## 🌐 API Endpoints

### Base URL
- **HTTP API**: `{REACT_APP_URL_HTTP}/api/v1/`
- **WebSocket**: `{REACT_APP_URL_WEBSOCKET}/ws/`
- **Images**: `{REACT_APP_URL_HTTP}/`

### Authentication APIs

#### 1. Đăng Ký
```
POST /api/v1/auth/register/
Body: {
  username: string,
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  phone: string
}
Response: {
  access: string (JWT token),
  refresh: string,
  user: object
}
```

#### 2. Đăng Nhập
```
POST /api/v1/auth/login/
Body: {
  username: string,
  password: string
}
Response: {
  access: string,
  refresh: string,
  user: object
}
```

#### 3. Google OAuth
```
POST /api/v1/oauth/firebase/google/
Body: {
  token: string (Firebase ID token)
}
Response: {
  access: string,
  refresh: string,
  user: object
}
```

#### 4. Kiểm Tra Token
```
GET /api/v1/auth/check/
Headers: {
  Authorization: Bearer {token}
}
Response: 200 OK hoặc 401 Unauthorized
```

#### 5. Refresh Token
```
POST /api/v1/auth/token/refresh/
Body: {
  refresh: string
}
Response: {
  access: string
}
```

### Properties APIs

#### 1. Danh Sách Bất Động Sản
```
GET /api/v1/properties/
Query Params:
  - page: number
  - page_size: number
  - tab: 'ban' | 'thue'
  - province: number (province ID)
  - district: string (comma-separated district IDs)
  - property_type: string (comma-separated property type IDs)
  - price_min: number
  - price_max: number
  - area_min: number
  - area_max: number
  - searchQuery: string
  - featured: boolean
  - limit: number
Response: {
  count: number,
  next: string | null,
  previous: string | null,
  results: Array<Property>
}
```

#### 2. Chi Tiết Bất Động Sản
```
GET /api/v1/properties/{id}/
Headers: {
  Authorization: Bearer {token} (optional)
}
Response: {
  data: Property
}
```

#### 3. Đăng Tin Mới
```
POST /api/v1/properties/
Headers: {
  Authorization: Bearer {token},
  Content-Type: multipart/form-data
}
Body: FormData {
  title: string,
  description: string,
  price: number,
  area_m2: number,
  province: number,
  district: number,
  address: string,
  property_type: number,
  tab: 'ban' | 'thue',
  latitude: number,
  longitude: number,
  images: File[],
  attributes: object (JSON string)
}
Response: {
  id: number,
  ...Property
}
```

#### 4. Cập Nhật Bất Động Sản
```
PUT /api/v1/properties/{id}/
Headers: {
  Authorization: Bearer {token},
  Content-Type: multipart/form-data
}
Body: FormData (tương tự POST)
Response: Property
```

#### 5. Xóa Bất Động Sản
```
DELETE /api/v1/properties/{id}/
Headers: {
  Authorization: Bearer {token}
}
Response: 204 No Content
```

#### 6. Bất Động Sản Tương Tự
```
GET /api/v1/properties/{id}/recommendations/
Response: {
  results: Array<Property>
}
```

### Favorites APIs

#### 1. Thêm/Xóa Yêu Thích
```
POST /api/v1/favourites/
Headers: {
  Authorization: Bearer {token},
  Content-Type: application/json
}
Body: {
  property_id: number
}
Response: {
  message: string,
  is_favorite: boolean
}
```

#### 2. Danh Sách ID Yêu Thích
```
GET /api/v1/favourites/listID/
Headers: {
  Authorization: Bearer {token}
}
Response: {
  data: Array<number>
}
```

#### 3. Danh Sách Yêu Thích Chi Tiết
```
GET /api/v1/favourites/
Headers: {
  Authorization: Bearer {token}
}
Query Params:
  - page: number
  - page_size: number
Response: {
  count: number,
  next: string | null,
  results: Array<Property>
}
```

### Location APIs

#### 1. Danh Sách Tỉnh/Thành
```
GET /api/v1/provinces/
Response: Array<Province>
```

#### 2. Danh Sách Quận/Huyện
```
GET /api/v1/provinces/{province_id}/districts/
Response: Array<District>
```

### Property Types APIs

#### 1. Danh Sách Loại Bất Động Sản
```
GET /api/v1/property-types/
Query Params:
  - tab: 'ban' | 'thue' (optional)
Response: Array<PropertyType>
```

#### 2. Thuộc Tính Theo Loại
```
GET /api/v1/attributes/
Query Params:
  - property_type_id: number
Response: Array<Attribute>
```

### News APIs

#### 1. Danh Sách Tin Tức
```
GET /api/v1/news/
Query Params:
  - page: number
  - page_size: number
  - province: number (optional)
  - limit: number (optional)
Response: {
  count: number,
  next: string | null,
  results: Array<News>
}
```

#### 2. Chi Tiết Tin Tức
```
GET /api/v1/news/{id}/
Response: News
```

#### 3. Tin Tức Liên Quan
```
GET /api/v1/news/recommended/
Query Params:
  - current_article_id: number
  - province: number (optional)
  - limit: number
Response: {
  results: Array<News>
}
```

### Notifications APIs

#### 1. Danh Sách Thông Báo
```
GET /api/v1/notifications/
Headers: {
  Authorization: Bearer {token}
}
Query Params:
  - page: number
  - page_size: number
Response: {
  count: number,
  next: string | null,
  results: Array<Notification>
}
```

#### 2. Đếm Thông Báo Chưa Đọc
```
GET /api/v1/notifications/not-read-count/
Headers: {
  Authorization: Bearer {token}
}
Response: {
  not_readed: number
}
```

#### 3. Đánh Dấu Đã Đọc
```
PUT /api/v1/notifications/{id}/
Headers: {
  Authorization: Bearer {token},
  Content-Type: application/json
}
Body: {
  action: 'readed'
}
Response: Notification
```

#### 4. Long Polling
```
GET /api/v1/notifications/long-polling/
Headers: {
  Authorization: Bearer {token}
}
Query Params:
  - from: string (username)
Response: {
  has_new: boolean,
  count: number
}
```

### Chat APIs

#### 1. Danh Sách Cuộc Trò Chuyện
```
GET /api/v1/conversations/
Headers: {
  Authorization: Bearer {token}
}
Response: Array<Conversation>
```

#### 2. Tin Nhắn Chưa Đọc
```
GET /api/v1/messages/unread/
Headers: {
  Authorization: Bearer {token}
}
Response: Array<{
  conversation_id: number,
  unread_count: number
}>
```

#### 3. Tin Nhắn Theo Cuộc Trò Chuyện
```
GET /api/v1/messages/
Headers: {
  Authorization: Bearer {token}
}
Query Params:
  - conversation: number
  - page: number
  - page_size: number
Response: {
  count: number,
  results: Array<Message>
}
```

### WebSocket Chat

#### Connection
```
WS {REACT_APP_URL_WEBSOCKET}/ws/chat/?token={jwt_token}
```

#### Message Types

**Gửi tin nhắn:**
```json
{
  "action": "send_message",
  "conversation_id": number,
  "content": string,
  "type": "text" | "image"
}
```

**Đánh dấu đã đọc:**
```json
{
  "action": "read_up_to",
  "conversation_id": number,
  "message_id": number
}
```

**Tìm kiếm người dùng:**
```json
{
  "action": "search_friend",
  "query": string
}
```

#### Nhận Tin Nhắn
```json
{
  "type": "message",
  "data": {
    "id": number,
    "conversation": number,
    "sender": number,
    "sender_username": string,
    "content": string,
    "type": string,
    "created_at": string
  }
}
```

#### Friend Found
```json
{
  "type": "friend_found",
  "data": Array<User>
}
```

#### Read By Me
```json
{
  "type": "read_by_me",
  "data": {
    "conversation_id": number
  }
}
```

### User APIs

#### 1. Thông Tin Cá Nhân
```
GET /api/v1/me/
Headers: {
  Authorization: Bearer {token}
}
Response: User
```

#### 2. Cập Nhật Thông Tin
```
PUT /api/v1/me/
Headers: {
  Authorization: Bearer {token},
  Content-Type: application/json
}
Body: {
  first_name: string,
  last_name: string,
  email: string,
  phone: string
}
Response: User
```

#### 3. Đổi Avatar
```
POST /api/v1/me/change_avatar/
Headers: {
  Authorization: Bearer {token},
  Content-Type: multipart/form-data
}
Body: FormData {
  avatar: File
}
Response: User
```

### Price Prediction APIs

#### 1. Gửi Request Dự Đoán
```
POST /api/v1/predict-requests/
Headers: {
  Authorization: Bearer {token},
  Content-Type: application/json
}
Body: {
  property_type: number,
  province: number,
  district: number,
  area_m2: number,
  latitude: number,
  longitude: number,
  attributes: object
}
Response: {
  predicted_price: number,
  confidence: number
}
```

### Contact Requests APIs

#### 1. Gửi Yêu Cầu Liên Hệ
```
POST /api/v1/contact-requests/
Headers: {
  Authorization: Bearer {token},
  Content-Type: application/json
}
Body: {
  property: number (property ID),
  message: string
}
Response: {
  id: number,
  ...ContactRequest
}
```

---

## 📁 Cấu Trúc Thư Mục

```
frontend/
├── public/                 # Static files
│   ├── index.html
│   ├── manifest.json
│   └── static/
│       └── logo/
│
├── src/
│   ├── components/         # Reusable components
│   │   ├── auth/          # Authentication components
│   │   │   ├── AuthWrapper.js
│   │   │   ├── LoginModal.js
│   │   │   ├── ProtectedRoute.js
│   │   │   ├── RegisterModal.js
│   │   │   └── UserDropdown.js
│   │   ├── Comments.js
│   │   ├── FavoriteHeart.js
│   │   ├── HeaderActions.js
│   │   ├── Layout.js       # Main layout với header/footer
│   │   ├── NotificationBell.js
│   │   ├── NotificationDropdown.js
│   │   ├── NotificationManager.js
│   │   ├── PropertyMap.js # Bản đồ Leaflet
│   │   └── VerificationBadge.js
│   │
│   ├── contexts/          # React Contexts
│   │   ├── AuthContext.js      # Authentication state
│   │   ├── ChatContext.js      # Chat WebSocket state
│   │   └── NotificationContext.js  # Notifications state
│   │
│   ├── hooks/             # Custom React Hooks
│   │   ├── useFavoriteCount.js
│   │   ├── useFirebaseAuth.js
│   │   ├── useLongPollingNotifications.js
│   │   ├── useNotificationCount.js
│   │   ├── useNotificationSystem.js
│   │   └── useOptimizedAPI.js
│   │
│   ├── pages/             # Page components
│   │   ├── ChatMessage.js
│   │   ├── EditProperty.js
│   │   ├── Favorites.js
│   │   ├── MyProperties.js
│   │   ├── News.js
│   │   ├── NewsDetail.js
│   │   ├── Notifications.js
│   │   ├── PostProperty.js
│   │   ├── PricePrediction.js
│   │   ├── Profile.js
│   │   ├── PropertyDetail.js
│   │   ├── PropertyList.js
│   │   └── SearchPage.js
│   │
│   ├── useAPI/            # API select components
│   │   ├── DistrictSelect.js
│   │   ├── LocationSelect.js
│   │   └── PropertyTypeSelect.js
│   │
│   ├── utils/             # Utility functions
│   │   ├── api.js         # API service với caching
│   │   ├── chromeExtensionHandler.js
│   │   ├── localStorageDebug.js
│   │   └── notificationFormatter.js
│   │
│   ├── config/            # Configuration
│   │   └── firebase.js    # Firebase config
│   │
│   ├── App.js             # Main App component
│   ├── base.js            # Base URLs configuration
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
│
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🧩 Các Component Chính

### 1. Layout Component
**File**: `src/components/Layout.js`

**Chức năng:**
- Header với logo, navigation, actions
- Mobile menu
- Footer
- Wrapper cho tất cả pages

**Props:**
- `children`: React node
- `showNavigation`: boolean (default: true)
- `navigationItems`: Array<{id, label, icon}>

### 2. Auth Components

#### LoginModal
**File**: `src/components/auth/LoginModal.js`

**Chức năng:**
- Modal đăng nhập
- Form validation
- Google OAuth integration
- Chuyển sang đăng ký

#### RegisterModal
**File**: `src/components/auth/RegisterModal.js`

**Chức năng:**
- Modal đăng ký
- Form validation
- Chuyển sang đăng nhập

#### ProtectedRoute
**File**: `src/components/auth/ProtectedRoute.js`

**Chức năng:**
- Bảo vệ route yêu cầu đăng nhập
- Redirect về trang chủ nếu chưa đăng nhập

### 3. PropertyMap Component
**File**: `src/components/PropertyMap.js`

**Chức năng:**
- Hiển thị bản đồ Leaflet
- Marker cho vị trí bất động sản
- Click để chọn vị trí (khi đăng tin)

**Props:**
- `latitude`: number
- `longitude`: number
- `onMapClick`: function (optional)
- `showMarker`: boolean (default: true)
- `centerMap`: boolean (default: false)

### 4. Notification Components

#### NotificationBell
**File**: `src/components/NotificationBell.js`

**Chức năng:**
- Icon chuông với badge số lượng
- Click mở dropdown
- Hiển thị số thông báo chưa đọc

#### NotificationDropdown
**File**: `src/components/NotificationDropdown.js`

**Chức năng:**
- Dropdown danh sách thông báo
- Hiển thị 5-10 thông báo mới nhất
- Click để đánh dấu đã đọc
- Link đến trang thông báo

#### NotificationManager
**File**: `src/components/NotificationManager.js`

**Chức năng:**
- Quản lý toàn bộ notification system
- Toast notifications
- Auto refresh

---

## 🔄 Context và State Management

### 1. AuthContext
**File**: `src/contexts/AuthContext.js`

**State:**
- `user`: User object
- `token`: JWT token
- `loading`: boolean
- `isAuthenticated`: boolean

**Methods:**
- `login(username, password)`: Đăng nhập
- `register(userData)`: Đăng ký
- `googleLogin(googleToken)`: Đăng nhập Google
- `logout()`: Đăng xuất
- `updateUser(userData)`: Cập nhật thông tin user
- `handleApiResponse(response)`: Xử lý response API

**Features:**
- Token validation với cache
- Auto refresh token
- Auto logout khi token hết hạn
- Global fetch interceptor

### 2. ChatContext
**File**: `src/contexts/ChatContext.js`

**State:**
- `isConnected`: boolean
- `unreadCounts`: {conversationId: count}
- `unreadMessages`: Array<Message>

**Methods:**
- `sendMessage(payload)`: Gửi tin nhắn qua WebSocket
- `subscribeToMessages(callback)`: Subscribe tin nhắn mới
- `subscribeToFriendSearch(callback)`: Subscribe kết quả tìm kiếm
- `getUnreadCount(conversationId)`: Lấy số tin chưa đọc
- `getTotalUnreadCount()`: Tổng số tin chưa đọc
- `markConversationAsRead(conversationId)`: Đánh dấu đã đọc
- `markAsRead(conversationId, messageId)`: Gửi event đánh dấu đã đọc
- `setCurrentViewingConversation(conversationId, userId)`: Set conversation đang xem

**Features:**
- WebSocket connection với auto-reconnect
- Message queue khi chưa kết nối
- LocalStorage persistence cho unread counts
- Real-time message updates

### 3. NotificationContext
**File**: `src/contexts/NotificationContext.js`

**State:**
- `notifications`: Array<Notification>
- `unreadCount`: number
- `totalCount`: number
- `loading`: boolean
- `isPolling`: boolean
- `currentPage`: number
- `hasMore`: boolean

**Methods:**
- `fetchNotifications(page, append)`: Lấy danh sách thông báo
- `fetchUnreadCount()`: Lấy số lượng chưa đọc
- `markAsRead(notificationId)`: Đánh dấu đã đọc (batch)
- `markAllAsRead()`: Đánh dấu tất cả đã đọc
- `refreshNotifications()`: Refresh danh sách
- `forceRefreshNotifications()`: Force refresh (bypass cache)
- `loadMoreNotifications()`: Load thêm trang
- `requestNotificationPermission()`: Request browser notification permission

**Features:**
- Long polling để nhận thông báo mới
- LocalStorage cache (3 phút)
- Batch mark-as-read (debounce 800ms)
- Optimistic updates

---

## 🎣 Custom Hooks

### 1. useLongPollingNotifications
**File**: `src/hooks/useLongPollingNotifications.js`

**Chức năng:**
- Long polling để check thông báo mới
- Auto retry khi lỗi
- Cleanup khi unmount

**Returns:**
- `startPolling()`: Bắt đầu polling
- `stopPolling()`: Dừng polling
- `isPolling`: boolean
- `lastStatus`: object
- `error`: Error object

### 2. useFavoriteCount
**File**: `src/hooks/useFavoriteCount.js`

**Chức năng:**
- Lấy số lượng yêu thích
- Auto refresh

**Returns:**
- `favoriteCount`: number
- `loading`: boolean
- `refresh()`: function

### 3. useOptimizedAPI
**File**: `src/hooks/useOptimizedAPI.js`

**Chức năng:**
- Wrapper cho API calls với caching
- Debounce cho search
- Error handling

**Returns:**
- `get(endpoint, params, options)`
- `post(endpoint, data)`
- `put(endpoint, data)`
- `delete(endpoint)`
- `authenticatedGet(endpoint, params, options)`
- `authenticatedPost(endpoint, data)`
- `loading`: boolean
- `error`: Error object

---

## ⚙️ Cách Thức Hoạt Động

### 1. Authentication Flow

```
User Login
  ↓
LoginModal → AuthContext.login()
  ↓
POST /api/v1/auth/login/
  ↓
Response: {access, refresh, user}
  ↓
localStorage.setItem('token', access)
localStorage.setItem('refreshToken', refresh)
localStorage.setItem('user', user)
  ↓
AuthContext.setState({user, token})
  ↓
Component re-render với isAuthenticated = true
```

**Token Refresh Flow:**
```
API Request với expired token
  ↓
Response 401
  ↓
refreshAccessToken()
  ↓
POST /api/v1/auth/token/refresh/
  ↓
Response: {access}
  ↓
localStorage.setItem('token', access)
  ↓
Retry original request với new token
```

### 2. Property Search Flow

```
User nhập search criteria
  ↓
handleSearch() trong App.js
  ↓
Parse và validate params
  ↓
Navigate to /property-list?{params}
  ↓
PropertyList component mount
  ↓
useEffect: Parse URL params
  ↓
Fetch properties: GET /api/v1/properties/?{params}
  ↓
Display results với pagination
```

### 3. Chat Real-time Flow

```
App mount
  ↓
ChatContext useEffect
  ↓
Check token
  ↓
Create WebSocket: ws://.../ws/chat/?token={token}
  ↓
onopen: setIsConnected(true)
  ↓
onmessage: handleIncomingMessage()
  ↓
  - Check if own message
  - Check if viewing conversation
  - Add to unread if needed
  - Notify subscribers
  ↓
onclose: Auto reconnect after 3s
```

**Send Message Flow:**
```
User types message
  ↓
sendMessage() trong ChatContext
  ↓
WebSocket.send({
  action: 'send_message',
  conversation_id: number,
  content: string
})
  ↓
Server broadcasts to recipient
  ↓
Recipient receives via WebSocket
  ↓
Update UI real-time
```

### 4. Notification Flow

```
App mount
  ↓
NotificationContext useEffect
  ↓
Check token
  ↓
Fetch unread count: GET /api/v1/notifications/not-read-count/
  ↓
Fetch notifications: GET /api/v1/notifications/?page=1
  ↓
Start long polling: GET /api/v1/notifications/long-polling/?from={username}
  ↓
Long polling response: {has_new: true}
  ↓
Refresh notifications và unread count
```

**Mark as Read Flow:**
```
User clicks notification
  ↓
markAsRead(notificationId)
  ↓
Optimistic update: setNotifications(prev => ...)
  ↓
Decrement unreadCount
  ↓
Add to pendingMarkIdsRef
  ↓
Schedule flush (debounce 800ms)
  ↓
flushMarkAsReadQueue()
  ↓
PUT /api/v1/notifications/{id}/ với action: 'readed'
  ↓
Refresh unread count
```

### 5. API Caching Flow

```
Component calls apiService.get(endpoint, params)
  ↓
Check cache: getCachedResponse(url, params)
  ↓
If cached and not expired (< 2 minutes):
  → Return cached data
  ↓
Else:
  → Fetch from API
  → Store in cache
  → Return data
```

### 6. Image URL Configuration

```
Property có thumbnail: "/media/property/image.jpg"
  ↓
ConfigUrl(thumbnail)
  ↓
Check if starts with "http"
  → Yes: return as-is
  → No: return baseUrlImage + thumbnail
  ↓
Result: "http://localhost:8000/media/property/image.jpg"
```

---

## 🔧 Cấu Hình và Môi Trường

### Environment Variables

Tạo file `.env.local` trong thư mục gốc:

```env
# Backend URLs
REACT_APP_URL_HTTP=http://localhost:8000
REACT_APP_URL_WEBSOCKET=ws://localhost:8000

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDING_ID=your_messaging_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Mapbox (nếu sử dụng)
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
```

### Base URLs Configuration

**File**: `src/base.js`

```javascript
const url_http = process.env.REACT_APP_URL_HTTP;
const url_websocket = process.env.REACT_APP_URL_WEBSOCKET;

export const baseUrl = url_http + '/api/v1/';
export const baseUrlImage = url_http + '/';
export const baseUrlWebsocket = url_websocket + '/ws/';
```

### API Service Configuration

**File**: `src/utils/api.js`

**Cache Settings:**
- Cache duration: 2 minutes
- Cache key format: `{url}?{params}`

**Token Refresh:**
- Auto refresh khi 401/403
- Retry original request sau khi refresh
- Force logout nếu refresh fail

### Tailwind Configuration

**File**: `tailwind.config.js`

Custom colors và theme có thể được cấu hình tại đây.

---

## 📝 Ghi Chú Quan Trọng

### 1. Token Management
- Token được lưu trong `localStorage`
- Refresh token được tự động sử dụng khi access token hết hạn
- Token validation có cache 5 phút để tránh request liên tục

### 2. Caching Strategy
- GET requests được cache 2 phút
- POST/PUT/DELETE không cache
- Cache key bao gồm URL và query params
- Có thể clear cache thủ công: `apiService.clearCache()`

### 3. WebSocket Connection
- Auto reconnect sau 3 giây khi disconnect
- Message queue khi chưa kết nối
- Token được gửi trong query string

### 4. Long Polling
- Polling interval: 30 giây
- Timeout: 25 giây
- Auto retry khi lỗi

### 5. Error Handling
- API errors được log ra console
- User-friendly error messages
- Auto logout khi token invalid

### 6. Performance Optimizations
- API response caching
- Debounce cho search
- Optimistic updates cho UI
- Lazy loading cho images
- Memoization cho context values

---

## 🚀 Hướng Dẫn Sử Dụng

### Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Production Build

```bash
npm run build
```

Output sẽ ở thư mục `build/`.

### Docker

Xem `Dockerfile` và `compose.yaml` để deploy với Docker.

---

## 📞 Hỗ Trợ

Nếu có câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ team phát triển.

---

**Tài liệu được cập nhật lần cuối**: 2024

