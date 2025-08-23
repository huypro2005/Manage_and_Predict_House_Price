# Hướng Dẫn Tích Hợp Bản Đồ Leaflet

## Tổng Quan
Hệ thống đã được tích hợp Leaflet map để hiển thị vị trí bất động sản với tọa độ từ API.

## Cài Đặt

### 1. Dependencies
```bash
npm install leaflet react-leaflet@4.2.1 --legacy-peer-deps
```

### 2. Cấu Trúc File
```
src/
├── components/
│   ├── PropertyMap.js      # Component bản đồ chính
│   └── PropertyMap.css     # Styles cho bản đồ
└── pages/
    └── PropertyDetail.js   # Trang chi tiết sử dụng map
```

## Sử Dụng

### 1. Component PropertyMap
```jsx
import PropertyMap from '../components/PropertyMap';

// Trong component
<PropertyMap property={property} formatPrice={formatPrice} />
```

### 2. Props
- `property`: Object chứa thông tin bất động sản
- `formatPrice`: Function để format giá

### 3. Tọa Độ
Component sử dụng:
- `property.coord_x`: Kinh độ (longitude)
- `property.coord_y`: Vĩ độ (latitude)

## Tính Năng

### 🗺️ Bản Đồ
- **OpenStreetMap**: Sử dụng OpenStreetMap tiles
- **Zoom Control**: Nút zoom in/out
- **Scroll Wheel**: Tắt scroll wheel zoom để tránh zoom không mong muốn
- **Attribution**: Hiển thị attribution theo yêu cầu OpenStreetMap

### 📍 Marker
- **Vị trí chính xác**: Marker đặt tại tọa độ bất động sản
- **Popup thông tin**: Hiển thị thông tin khi click vào marker
- **Custom icon**: Sử dụng icon mặc định của Leaflet

### 🎨 UI/UX
- **Responsive**: Tự động điều chỉnh theo kích thước màn hình
- **Fallback**: Hiển thị thông báo khi không có tọa độ
- **Loading state**: Xử lý trạng thái loading
- **Error handling**: Xử lý tọa độ không hợp lệ

## Xử Lý Lỗi

### 1. Không có tọa độ
```jsx
if (!property.coord_x || !property.coord_y) {
  return <div>Không có tọa độ bản đồ</div>;
}
```

### 2. Tọa độ không hợp lệ
```jsx
const lat = parseFloat(property.coord_y);
const lng = parseFloat(property.coord_x);

if (isNaN(lat) || isNaN(lng)) {
  return <div>Tọa độ không hợp lệ</div>;
}
```

### 3. API Response
Đảm bảo API trả về:
```json
{
  "data": {
    "coord_x": "106.6297",  // Longitude
    "coord_y": "10.8231",   // Latitude
    "title": "Tên bất động sản",
    "address": "Địa chỉ",
    "price": "5000000000",
    "area_m2": "100"
  }
}
```

## Tùy Chỉnh

### 1. Thay đổi Tile Layer
```jsx
<TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
/>
```

### 2. Thay đổi Zoom Level
```jsx
<MapContainer
  center={[lat, lng]}
  zoom={15}  // Thay đổi từ 1-18
  // ...
/>
```

### 3. Custom Marker Icon
```jsx
const customIcon = L.icon({
  iconUrl: '/path/to/icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

<Marker position={[lat, lng]} icon={customIcon}>
```

### 4. Thêm Controls
```jsx
<MapContainer
  zoomControl={true}
  attributionControl={true}
  scrollWheelZoom={false}
  // ...
>
```

## Performance

### 1. Lazy Loading
```jsx
const PropertyMap = React.lazy(() => import('./PropertyMap'));

// Trong component
<Suspense fallback={<div>Loading map...</div>}>
  <PropertyMap property={property} formatPrice={formatPrice} />
</Suspense>
```

### 2. Memoization
```jsx
const PropertyMap = React.memo(({ property, formatPrice }) => {
  // Component logic
});
```

## Troubleshooting

### 1. Map không hiển thị
- Kiểm tra tọa độ có hợp lệ không
- Kiểm tra CSS có được load không
- Kiểm tra console để tìm lỗi

### 2. Marker không hiển thị
- Kiểm tra icon paths
- Kiểm tra tọa độ có đúng format không
- Kiểm tra Leaflet CSS có được load không

### 3. Performance issues
- Sử dụng React.memo cho component
- Lazy load map component
- Tối ưu re-renders

## API Integration

### 1. Backend Response
```python
# Django example
class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = [
            'id', 'title', 'address', 'price', 'area_m2',
            'coord_x', 'coord_y',  # Tọa độ
            # ... other fields
        ]
```

### 2. Validation
```python
# Validate coordinates
def validate_coord_x(self, value):
    try:
        float(value)
        return value
    except ValueError:
        raise serializers.ValidationError("Invalid longitude")

def validate_coord_y(self, value):
    try:
        float(value)
        return value
    except ValueError:
        raise serializers.ValidationError("Invalid latitude")
```

## Security

### 1. Input Validation
- Validate tọa độ trước khi render
- Sanitize input từ API
- Handle edge cases

### 2. CORS
- Đảm bảo CORS được cấu hình đúng
- Kiểm tra domain được phép

## Deployment

### 1. Production
- Sử dụng HTTPS cho map tiles
- Optimize bundle size
- Cache map tiles

### 2. Environment Variables
```env
REACT_APP_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
REACT_APP_MAP_ATTRIBUTION=OpenStreetMap contributors
```

## Hỗ Trợ

Đối với các vấn đề:
1. Kiểm tra console browser
2. Xác minh tọa độ API
3. Kiểm tra network requests
4. Xem Leaflet documentation
