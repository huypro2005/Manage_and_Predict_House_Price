# Hướng dẫn Đồng bộ Khung Property Cards

## Tổng quan

PropertyList đã được cập nhật để có các property cards với chiều cao đồng nhất và layout đẹp hơn. Các thay đổi chính:

- **Chiều cao đồng nhất**: Tất cả cards có cùng chiều cao
- **Layout responsive**: 1-4 cột tùy theo kích thước màn hình
- **Flexbox layout**: Sử dụng flex để căn chỉnh nội dung
- **Text truncation**: Giới hạn độ dài text để tránh overflow

## Thay đổi chính

### 1. Card Container
```jsx
// Trước
className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"

// Sau
className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer h-full flex flex-col"
```

**Giải thích:**
- `h-full`: Card chiếm toàn bộ chiều cao của grid cell
- `flex flex-col`: Sử dụng flexbox để sắp xếp nội dung theo chiều dọc

### 2. Image Container
```jsx
// Trước
<div className="relative h-22"> // Lỗi: h-22 không tồn tại

// Sau
<div className="relative h-48 flex-shrink-0">
```

**Giải thích:**
- `h-48`: Chiều cao cố định 192px cho ảnh
- `flex-shrink-0`: Ảnh không bị co lại khi container nhỏ

### 3. Content Container
```jsx
// Trước
<div className="p-4">

// Sau
<div className="p-4 flex-1 flex flex-col">
```

**Giải thích:**
- `flex-1`: Chiếm phần còn lại của không gian
- `flex flex-col`: Sắp xếp nội dung theo chiều dọc

### 4. Title với Chiều cao Cố định
```jsx
<h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
  {property.title || ''}
</h3>
```

**Giải thích:**
- `line-clamp-2`: Giới hạn 2 dòng
- `min-h-[2.5rem]`: Chiều cao tối thiểu 40px (2.5rem)

### 5. Description với Chiều cao Cố định
```jsx
<p className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-[2rem] flex-shrink-0">
  {property.description ? property.description.slice(0, 60) : ''}
</p>
```

**Giải thích:**
- `line-clamp-2`: Giới hạn 2 dòng
- `min-h-[2rem]`: Chiều cao tối thiểu 32px (2rem)
- `slice(0, 60)`: Giới hạn 60 ký tự

### 6. Time ở Cuối Card
```jsx
<div className="text-xs text-gray-500 mt-auto">
  {property.time || ''}
</div>
```

**Giải thích:**
- `mt-auto`: Đẩy thời gian xuống cuối card

## Grid Layout

### Responsive Grid
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

**Breakpoints:**
- `grid-cols-1`: Mobile (1 cột)
- `sm:grid-cols-2`: Small screens (2 cột)
- `lg:grid-cols-3`: Large screens (3 cột)
- `xl:grid-cols-4`: Extra large screens (4 cột)

### Gap và Spacing
- `gap-6`: Khoảng cách 24px giữa các cards
- `p-4`: Padding 16px bên trong card

## Cải thiện UI/UX

### 1. Icon Sizing
```jsx
// Heart icon nhỏ hơn
<Heart className="h-5 w-5" />

// Views badge nhỏ hơn
<span className="text-xs text-gray-700 font-medium">
```

### 2. Spacing Optimization
```jsx
// Giảm spacing giữa các elements
<div className="flex items-center space-x-3"> // Thay vì space-x-4
<div className="mb-2"> // Thay vì mb-3
```

### 3. Text Sizing
```jsx
// Title nhỏ hơn
<h3 className="text-base"> // Thay vì text-lg

// Price nhỏ hơn
<div className="text-base font-bold text-red-600"> // Thay vì text-lg
```

## Tùy chỉnh

### 1. Thay đổi Chiều cao Ảnh
```jsx
// Tăng chiều cao ảnh
<div className="relative h-56 flex-shrink-0"> // Thay vì h-48

// Giảm chiều cao ảnh
<div className="relative h-40 flex-shrink-0"> // Thay vì h-48
```

### 2. Thay đổi Số Cột
```jsx
// 3 cột trên desktop
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

// 5 cột trên desktop
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
```

### 3. Thay đổi Chiều cao Text
```jsx
// Title cao hơn
<h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">

// Description cao hơn
<p className="text-gray-600 text-sm mb-3 line-clamp-3 min-h-[3rem] flex-shrink-0">
```

### 4. Thay đổi Gap
```jsx
// Gap nhỏ hơn
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

// Gap lớn hơn
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
```

## Best Practices

### 1. Consistent Heights
- Luôn sử dụng `h-full` cho card container
- Sử dụng `flex flex-col` để sắp xếp nội dung
- Đặt `min-h-[...]` cho các text elements

### 2. Text Truncation
- Sử dụng `line-clamp-2` cho title và description
- Giới hạn số ký tự với `slice(0, 60)`
- Đặt `min-h-[...]` để đảm bảo chiều cao tối thiểu

### 3. Responsive Design
- Sử dụng breakpoints phù hợp
- Test trên nhiều kích thước màn hình
- Đảm bảo text không bị overflow

### 4. Performance
- Sử dụng `flex-shrink-0` cho ảnh
- Tránh layout shift với `min-h-[...]`
- Optimize images với `object-cover`

## Troubleshooting

### Vấn đề thường gặp:

1. **Cards không đồng chiều cao**
   - Kiểm tra `h-full` trên card container
   - Đảm bảo grid container có `grid` class

2. **Text bị overflow**
   - Thêm `line-clamp-2` cho text elements
   - Giới hạn số ký tự với `slice()`

3. **Layout không responsive**
   - Kiểm tra breakpoints trong grid classes
   - Test trên các kích thước màn hình khác nhau

4. **Ảnh bị méo**
   - Sử dụng `object-cover` cho ảnh
   - Đặt `flex-shrink-0` cho image container

### Debug Tips
```css
/* Thêm border để debug layout */
.card {
  border: 1px solid red;
}

/* Thêm background để debug flex */
.content {
  background: rgba(0, 255, 0, 0.1);
}
```

## Testing

### Test Cases
1. **Responsive**: Kiểm tra trên mobile, tablet, desktop
2. **Content length**: Test với title/description dài/ngắn
3. **Image aspect ratios**: Test với ảnh vuông, dọc, ngang
4. **Empty content**: Test khi thiếu title, description, price
5. **Performance**: Kiểm tra render time với nhiều cards

### Manual Testing
```javascript
// Console log để debug
console.log('Card heights:', document.querySelectorAll('.card').length);
```
