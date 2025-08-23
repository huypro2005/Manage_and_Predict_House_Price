# Hướng Dẫn Khắc Phục Sự Cố Bản Đồ

## Các Vấn Đề Thường Gặp

### 1. Bản Đồ Không Hiển Thị

#### **Nguyên nhân:**
- CSS không được load đúng cách
- Leaflet CSS bị conflict
- Container không có kích thước

#### **Giải pháp:**
```css
/* Đảm bảo container có kích thước */
.property-map-container {
  height: 320px !important;
  width: 100% !important;
}

.property-map-container .leaflet-container {
  height: 100% !important;
  width: 100% !important;
}
```

### 2. Marker Không Hiển Thị

#### **Nguyên nhân:**
- Icon paths không đúng
- Leaflet icon không được load

#### **Giải pháp:**
```javascript
// Sử dụng CDN cho icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});
```

### 3. Tiles Không Load

#### **Nguyên nhân:**
- Network issues
- CORS problems
- OpenStreetMap server down

#### **Giải pháp:**
```javascript
// Thử tile layer khác
<TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  eventHandlers={{
    error: handleMapError
  }}
/>

// Hoặc sử dụng tile layer backup
<TileLayer
  url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
/>
```

### 4. Map Không Responsive

#### **Nguyên nhân:**
- Container không resize
- Map không invalidate size

#### **Giải pháp:**
```javascript
const mapRef = useRef(null);

useEffect(() => {
  if (mapRef.current) {
    setTimeout(() => {
      mapRef.current.invalidateSize();
    }, 100);
  }
}, []);

<MapContainer ref={mapRef} ...>
```

## Test Bản Đồ

### 1. Truy Cập Test Page
```
http://localhost:3000/map-test
```

### 2. Kiểm Tra Console
- Mở Developer Tools (F12)
- Xem tab Console để tìm lỗi
- Xem tab Network để kiểm tra tile requests

### 3. Kiểm Tra Dữ Liệu
```javascript
// Log tọa độ để debug
console.log('Coordinates:', {
  lat: parseFloat(property.coord_y),
  lng: parseFloat(property.coord_x)
});
```

## Các Bước Debug

### 1. Kiểm Tra Dependencies
```bash
npm list leaflet react-leaflet
```

### 2. Kiểm Tra CSS
```bash
# Đảm bảo CSS được import
import 'leaflet/dist/leaflet.css';
```

### 3. Kiểm Tra Network
- Mở Developer Tools > Network
- Tìm các request đến OpenStreetMap
- Kiểm tra status code

### 4. Test Với Dữ Liệu Mẫu
```javascript
const testData = {
  coord_x: "106.6297",
  coord_y: "10.8231",
  title: "Test Property",
  address: "Test Address"
};
```

## Cấu Hình Nâng Cao

### 1. Custom Tile Layer
```javascript
<TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  subdomains={['a', 'b', 'c']}
  maxZoom={18}
  minZoom={1}
/>
```

### 2. Custom Marker Icon
```javascript
const customIcon = L.icon({
  iconUrl: '/path/to/icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

<Marker position={[lat, lng]} icon={customIcon}>
```

### 3. Map Controls
```javascript
<MapContainer
  zoomControl={true}
  attributionControl={true}
  scrollWheelZoom={false}
  doubleClickZoom={false}
  boxZoom={false}
  keyboard={false}
>
```

## Performance Optimization

### 1. Lazy Loading
```javascript
const PropertyMap = React.lazy(() => import('./PropertyMap'));

<Suspense fallback={<div>Loading map...</div>}>
  <PropertyMap property={property} formatPrice={formatPrice} />
</Suspense>
```

### 2. Memoization
```javascript
const PropertyMap = React.memo(({ property, formatPrice }) => {
  // Component logic
});
```

### 3. Debounce Map Updates
```javascript
const debouncedUpdate = useCallback(
  debounce((newCoords) => {
    // Update map
  }, 300),
  []
);
```

## Environment Variables

### 1. Tile Server URL
```env
REACT_APP_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

### 2. Map Attribution
```env
REACT_APP_MAP_ATTRIBUTION=OpenStreetMap contributors
```

## Backup Solutions

### 1. Alternative Tile Servers
```javascript
// CartoDB
url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"

// Stamen
url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png"
```

### 2. Static Map Fallback
```javascript
// Nếu Leaflet không hoạt động, sử dụng static map
const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=400x300&markers=${lat},${lng}&key=${apiKey}`;
```

## Hỗ Trợ

Nếu vẫn gặp vấn đề:
1. Kiểm tra console browser
2. Xem network requests
3. Test với dữ liệu mẫu
4. Kiểm tra CORS settings
5. Xem Leaflet documentation
