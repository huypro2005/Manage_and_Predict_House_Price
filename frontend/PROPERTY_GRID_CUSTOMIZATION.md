# Hướng dẫn tùy chỉnh Grid Property

## Cấu trúc Grid hiện tại

Grid property đã được cấu hình để hiển thị:
- **Mobile (mặc định)**: 1 cột
- **Small (sm)**: 2 cột  
- **Large (lg)**: 3 cột
- **Extra Large (xl)**: 4 cột

## Cách tùy chỉnh

### 1. Thay đổi số cột

Trong file `src/App.js`, tìm dòng:
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

**Các tùy chọn:**
- `grid-cols-1`: 1 cột (mobile)
- `sm:grid-cols-2`: 2 cột (từ 640px)
- `md:grid-cols-3`: 3 cột (từ 768px) 
- `lg:grid-cols-4`: 4 cột (từ 1024px)
- `xl:grid-cols-5`: 5 cột (từ 1280px)
- `2xl:grid-cols-6`: 6 cột (từ 1536px)

**Ví dụ tùy chỉnh:**
```jsx
// Hiển thị tối đa 5 cột
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

// Hiển thị tối đa 6 cột  
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
```

### 2. Thay đổi khoảng cách (gap)

Thay đổi `gap-6` thành:
- `gap-2`: Khoảng cách nhỏ (8px)
- `gap-4`: Khoảng cách vừa (16px) 
- `gap-6`: Khoảng cách lớn (24px) - hiện tại
- `gap-8`: Khoảng cách rất lớn (32px)

### 3. Thay đổi chiều cao khung property

#### Chiều cao ảnh
Tìm dòng:
```jsx
<div className="relative h-48">
```

**Các tùy chọn:**
- `h-32`: Thấp (128px)
- `h-40`: Vừa thấp (160px)
- `h-48`: Vừa (192px) - hiện tại
- `h-56`: Vừa cao (224px)
- `h-64`: Cao (256px)

#### Padding nội dung
Tìm dòng:
```jsx
<div className="p-4">
```

**Các tùy chọn:**
- `p-2`: Nhỏ (8px)
- `p-3`: Vừa nhỏ (12px)
- `p-4`: Vừa (16px) - hiện tại
- `p-5`: Vừa lớn (20px)
- `p-6`: Lớn (24px)

### 4. Thay đổi kích thước text

#### Tiêu đề
```jsx
<h4 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
```

**Các tùy chọn:**
- `text-sm`: Nhỏ (14px)
- `text-base`: Vừa (16px) - hiện tại
- `text-lg`: Lớn (18px)
- `text-xl`: Rất lớn (20px)

#### Mô tả
```jsx
<p className="text-gray-600 text-xs mb-3 line-clamp-2">
```

**Các tùy chọn:**
- `text-xs`: Rất nhỏ (12px) - hiện tại
- `text-sm`: Nhỏ (14px)
- `text-base`: Vừa (16px)

#### Giá
```jsx
<div className="text-base font-bold text-red-600">
```

**Các tùy chọn:**
- `text-sm`: Nhỏ (14px)
- `text-base`: Vừa (16px) - hiện tại
- `text-lg`: Lớn (18px)

### 5. Thay đổi số dòng hiển thị

#### Tiêu đề (hiện tại: 2 dòng)
```jsx
<h4 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
```

**Thay đổi:**
- `line-clamp-1`: 1 dòng
- `line-clamp-2`: 2 dòng - hiện tại
- `line-clamp-3`: 3 dòng

#### Mô tả (hiện tại: 2 dòng)
```jsx
<p className="text-gray-600 text-xs mb-3 line-clamp-2">
```

**Thay đổi:**
- `line-clamp-1`: 1 dòng
- `line-clamp-2`: 2 dòng - hiện tại
- `line-clamp-3`: 3 dòng

### 6. Thay đổi độ dài text

#### Tiêu đề (hiện tại: 40 ký tự)
```jsx
{property.title.slice(0, 40)}...
```

**Thay đổi:**
- `slice(0, 30)`: 30 ký tự
- `slice(0, 40)`: 40 ký tự - hiện tại
- `slice(0, 50)`: 50 ký tự

#### Mô tả (hiện tại: 60 ký tự)
```jsx
{property.description?.slice(0, 60) || 'Không có mô tả'}
```

**Thay đổi:**
- `slice(0, 40)`: 40 ký tự
- `slice(0, 60)`: 60 ký tự - hiện tại
- `slice(0, 80)`: 80 ký tự

## Ví dụ tùy chỉnh hoàn chỉnh

### Grid nhỏ gọn (6 cột, chiều cao thấp)
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
  {/* Property card */}
  <div className="relative h-40"> {/* Ảnh thấp hơn */}
  <div className="p-3"> {/* Padding nhỏ hơn */}
    <h4 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1"> {/* Text nhỏ, 1 dòng */}
    <p className="text-gray-600 text-xs mb-2 line-clamp-1"> {/* 1 dòng */}
```

### Grid lớn (3 cột, chiều cao cao)
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Property card */}
  <div className="relative h-64"> {/* Ảnh cao hơn */}
  <div className="p-6"> {/* Padding lớn hơn */}
    <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-3"> {/* Text lớn, 3 dòng */}
    <p className="text-gray-600 text-sm mb-4 line-clamp-3"> {/* 3 dòng */}
```

## Lưu ý

1. **Responsive**: Luôn đảm bảo có breakpoint cho mobile (`grid-cols-1`)
2. **Performance**: Không nên hiển thị quá 6 cột trên màn hình lớn
3. **Readability**: Text không nên quá nhỏ (< 12px) hoặc quá nhiều dòng (> 3 dòng)
4. **Consistency**: Giữ nhất quán về spacing và typography trong toàn bộ ứng dụng
