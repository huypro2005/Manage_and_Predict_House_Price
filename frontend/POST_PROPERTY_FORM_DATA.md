# Hướng dẫn FormData và Input Số Tầng - PostProperty

## Tổng quan

PostProperty đã được cập nhật để:
- **Thêm input số tầng** vào form
- **Gửi dữ liệu dưới dạng FormData** thay vì JSON
- **Hỗ trợ upload file** cùng với dữ liệu text

## Thay đổi chính

### 1. Thêm State cho Số Tầng
```javascript
const [floor, setFloor] = useState(''); // số tầng
```

### 2. Thêm Input Số Tầng vào Form
```jsx
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">Số tầng</label>
  <div className="relative">
    <input
      type="number"
      min="0"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-10"
      placeholder="Ví dụ: 2"
      value={floor}
      onChange={(e) => setFloor(e.target.value)}
    />
    <Landmark className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
  </div>
</div>
```

### 3. Cập nhật Layout Grid
```jsx
// Trước: grid-cols-1 md:grid-cols-3
// Sau: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
```

## FormData Implementation

### 1. Tạo FormData
```javascript
const formData = new FormData();

// Add text fields
formData.append('title', title.trim());
formData.append('description', description.trim());
formData.append('tab', listingType);
formData.append('province', provinceId);
formData.append('district', districtIds[0]);
formData.append('address', fullAddress);
formData.append('price', Number(price));
formData.append('area_m2', Number(area));
formData.append('price_per_m2', Number(price) / Number(area));
formData.append('coord_x', position?.lng ?? '');
formData.append('coord_y', position?.lat ?? '');
formData.append('property_type', selectedPropertyTypeIds[0] || '');
formData.append('bedrooms', bedrooms ? Number(bedrooms) : '');
formData.append('frontage', frontage ? Number(frontage) : '');
formData.append('legal_status', legalStatus ? Number(legalStatus) : '');
formData.append('floors', floor ? Number(floor) : '');

// Add files
if (thumbnailFile) {
  formData.append('thumbnail', thumbnailFile);
}

if (galleryFiles && galleryFiles.length > 0) {
  galleryFiles.forEach((file, index) => {
    formData.append('images', file);
  });
}
```

### 2. API Service Method
```javascript
// POST FormData request
async postFormData(endpoint, formData) {
  const token = localStorage.getItem('token');
  const url = `${this.baseUrl}${endpoint}`;
  
  const config = {
    method: 'POST',
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` })
      // Don't set Content-Type for FormData, let browser set it with boundary
    },
    body: formData
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API FormData request failed:', error);
    throw error;
  }
}
```

## Dữ liệu gửi lên API

### Cấu trúc FormData
```javascript
// Text fields
title: string
description: string
tab: 'ban' | 'thue'
province: number (ID)
district: number (ID)
address: string
price: number (triệu)
area_m2: number
price_per_m2: number
coord_x: number (longitude)
coord_y: number (latitude)
property_type: number (ID)
bedrooms: number | ''
frontage: number | ''
legal_status: number | ''
floors: number | ''

// Files
thumbnail: File (optional)
images: File[] (optional)
```

### Ví dụ Request
```javascript
// FormData sẽ được gửi với Content-Type: multipart/form-data
// Boundary sẽ được browser tự động tạo

// Text fields
------WebKitFormBoundaryABC123
Content-Disposition: form-data; name="title"

Căn hộ cao cấp tại Quận 1
------WebKitFormBoundaryABC123
Content-Disposition: form-data; name="price"

1500
------WebKitFormBoundaryABC123
Content-Disposition: form-data; name="floors"

2

// File fields
------WebKitFormBoundaryABC123
Content-Disposition: form-data; name="thumbnail"; filename="image1.jpg"
Content-Type: image/jpeg

[Binary data]
------WebKitFormBoundaryABC123--
```

## Lợi ích của FormData

### 1. Upload File và Text cùng lúc
- Không cần gửi riêng file và text
- Giảm số lượng request
- Đảm bảo tính nhất quán dữ liệu

### 2. Hỗ trợ File lớn
- Browser tự động xử lý chunked upload
- Progress tracking có sẵn
- Memory efficient

### 3. Tương thích với Backend
- Django REST Framework hỗ trợ tốt
- Flask, FastAPI cũng hỗ trợ
- Không cần parse JSON

## Validation

### Frontend Validation
```javascript
// Kiểm tra số tầng hợp lệ
if (floor && (isNaN(Number(floor)) || Number(floor) < 0)) {
  return 'Số tầng phải là số dương';
}
```

### Backend Validation (Django)
```python
# models.py
class Property(models.Model):
    floors = models.PositiveIntegerField(null=True, blank=True)
    
# serializers.py
class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'
    
    def validate_floors(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("Số tầng phải là số dương")
        return value
```

## Error Handling

### Frontend
```javascript
try {
  const res = await apiService.postFormData('properties/', formData);
  // Success
} catch (e) {
  console.error('Finalize submit error:', e);
  alert('Có lỗi khi gửi dữ liệu hoặc tải ảnh. Vui lòng thử lại.');
}
```

### Backend Response
```json
{
  "error": "Validation failed",
  "details": {
    "floors": ["Số tầng phải là số dương"],
    "price": ["Giá phải lớn hơn 0"]
  }
}
```

## Testing

### Test Cases
1. **Input validation**: Số tầng âm, không phải số
2. **FormData creation**: Kiểm tra tất cả fields được append
3. **File upload**: Thumbnail và gallery images
4. **API response**: Success và error cases
5. **Empty values**: Số tầng để trống

### Manual Testing
```javascript
// Console log để debug
console.log('FormData contents:');
for (let [key, value] of formData.entries()) {
  console.log(key, value);
}
```

## Troubleshooting

### Vấn đề thường gặp:

1. **Content-Type header**
   - Không set Content-Type cho FormData
   - Browser sẽ tự động set với boundary

2. **File size limit**
   - Kiểm tra server config (nginx, apache)
   - Kiểm tra Django settings

3. **CORS issues**
   - Đảm bảo server cho phép multipart/form-data
   - Kiểm tra CORS headers

4. **Validation errors**
   - Kiểm tra field names match với backend
   - Kiểm tra data types (string vs number)

### Debug Tips
```javascript
// Log FormData contents
formData.forEach((value, key) => {
  console.log(`${key}:`, value);
});

// Check file sizes
if (thumbnailFile) {
  console.log('Thumbnail size:', thumbnailFile.size);
}
```
