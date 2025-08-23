# Hướng dẫn Phân trang PropertyList

## Tổng quan

PropertyList đã được cập nhật với hệ thống phân trang hoàn chỉnh:
- **12 items/trang** (có thể tùy chỉnh)
- **Thanh chuyển trang** với nút Previous/Next và số trang
- **Hiển thị thông tin** về tổng số kết quả và trang hiện tại
- **Tự động scroll** lên đầu trang khi chuyển trang

## Cấu trúc API

### Request Parameters
```javascript
// URL: /api/v1/properties/
{
  page: 1,           // Trang hiện tại (bắt đầu từ 1)
  page_size: 12,     // Số items trên mỗi trang
  // ... các tham số tìm kiếm khác
}
```

### Response Format
```javascript
{
  data: [...],       // Array các property items
  count: 150,        // Tổng số items (không phân trang)
  next: "http://...", // URL trang tiếp theo (null nếu là trang cuối)
  previous: "http://..." // URL trang trước (null nếu là trang đầu)
}
```

## Cấu hình hiện tại

### State Management
```javascript
const [currentPage, setCurrentPage] = useState(1);
const [totalCount, setTotalCount] = useState(0);
const [totalPages, setTotalPages] = useState(0);
const itemsPerPage = 12; // Có thể thay đổi
```

### Logic phân trang
```javascript
// Tính tổng số trang
setTotalPages(Math.ceil((data.count || 0) / itemsPerPage));

// Tính range hiển thị
const startItem = ((currentPage - 1) * itemsPerPage) + 1;
const endItem = Math.min(currentPage * itemsPerPage, totalCount);
```

## Tùy chỉnh

### 1. Thay đổi số items/trang
```javascript
// Trong PropertyList.js, thay đổi:
const itemsPerPage = 12; // Thành số mong muốn
```

**Các tùy chọn phổ biến:**
- `itemsPerPage = 8`: Ít items, load nhanh
- `itemsPerPage = 12`: Cân bằng (hiện tại)
- `itemsPerPage = 16`: Nhiều items hơn
- `itemsPerPage = 20`: Rất nhiều items

### 2. Thay đổi số trang hiển thị trong thanh phân trang
```javascript
// Trong hàm getPageNumbers()
const maxVisiblePages = 5; // Thay đổi số này
```

**Các tùy chọn:**
- `maxVisiblePages = 3`: Ít nút, gọn gàng
- `maxVisiblePages = 5`: Cân bằng (hiện tại)
- `maxVisiblePages = 7`: Nhiều nút, dễ điều hướng

### 3. Thay đổi style thanh phân trang

#### Màu sắc
```javascript
// Nút trang hiện tại
className={`px-3 py-2 rounded-lg font-medium transition-colors ${
  currentPage === page
    ? 'bg-red-600 text-white'  // Thay đổi màu này
    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
}`}
```

#### Kích thước
```javascript
// Nút Previous/Next
<ChevronLeft className="h-5 w-5" /> // Thay đổi h-5 w-5

// Nút số trang
className="px-3 py-2" // Thay đổi padding
```

### 4. Thay đổi thông tin hiển thị
```javascript
// Thông tin phân trang
<div className="text-center mt-4 text-sm text-gray-600">
  Hiển thị {startItem} - {endItem} trong tổng số {totalCount} bất động sản
</div>
```

**Các tùy chọn:**
```javascript
// Hiển thị đơn giản
`Trang ${currentPage} / ${totalPages}`

// Hiển thị chi tiết
`Hiển thị ${startItem}-${endItem} của ${totalCount} kết quả`

// Hiển thị với phần trăm
`Hiển thị ${startItem}-${endItem} (${Math.round((endItem/totalCount)*100)}%)`
```

## Xử lý lỗi và Fallback

### 1. API không trả về count
```javascript
// Fallback về mock data với phân trang
if (!data.count) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMockData = mockProperties.slice(startIndex, endIndex);
  
  setProperties(paginatedMockData);
  setTotalCount(mockProperties.length);
  setTotalPages(Math.ceil(mockProperties.length / itemsPerPage));
}
```

### 2. Lỗi network
```javascript
catch (error) {
  console.error('Error fetching properties:', error);
  // Fallback về mock data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMockData = mockProperties.slice(startIndex, endIndex);
  
  setProperties(paginatedMockData);
  setTotalCount(mockProperties.length);
  setTotalPages(Math.ceil(mockProperties.length / itemsPerPage));
}
```

## Tối ưu hiệu suất

### 1. Debounce API calls
```javascript
// Thêm debounce để tránh gọi API quá nhiều
const debouncedFetch = useCallback(
  debounce((page, params) => {
    fetchProperties(page, params);
  }, 300),
  []
);
```

### 2. Caching
```javascript
// Cache kết quả theo page
const [cachedData, setCachedData] = useState({});

// Kiểm tra cache trước khi gọi API
if (cachedData[currentPage]) {
  setProperties(cachedData[currentPage]);
  return;
}
```

### 3. Loading states
```javascript
// Loading cho từng trang
const [pageLoading, setPageLoading] = useState({});

// Hiển thị loading cho trang cụ thể
{pageLoading[currentPage] && <LoadingSpinner />}
```

## Responsive Design

### Mobile
```javascript
// Ẩn một số nút trên mobile
{window.innerWidth > 768 && (
  <span className="px-3 py-2 text-gray-500">...</span>
)}

// Chỉ hiển thị Previous/Next + trang hiện tại
const getMobilePageNumbers = () => {
  if (window.innerWidth <= 768) {
    return [currentPage];
  }
  return getPageNumbers();
};
```

### Tablet
```javascript
// Giảm số items/trang trên tablet
const getItemsPerPage = () => {
  if (window.innerWidth <= 1024) {
    return 8; // Ít hơn trên tablet
  }
  return 12; // Desktop
};
```

## Testing

### Test cases cần kiểm tra:
1. **Chuyển trang**: Click các nút số trang
2. **Previous/Next**: Click nút mũi tên
3. **Edge cases**: Trang đầu, trang cuối
4. **API errors**: Xử lý khi API lỗi
5. **Empty results**: Khi không có kết quả
6. **URL params**: Giữ nguyên search params khi chuyển trang
7. **Scroll behavior**: Tự động scroll lên đầu
8. **Loading states**: Hiển thị loading khi chuyển trang

### Mock data cho testing:
```javascript
// Tạo nhiều mock data để test
const generateMockData = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Property ${i + 1}`,
    // ... other properties
  }));
};

const mockProperties = generateMockData(50); // 50 items để test
```

## Troubleshooting

### Vấn đề thường gặp:

1. **Phân trang không hoạt động**
   - Kiểm tra API response format
   - Kiểm tra `data.count` có tồn tại không
   - Kiểm tra `page` và `page_size` parameters

2. **Số trang không đúng**
   - Kiểm tra công thức tính `totalPages`
   - Kiểm tra `itemsPerPage` có đúng không

3. **Loading không dừng**
   - Kiểm tra `setLoading(false)` trong finally block
   - Kiểm tra error handling

4. **URL không cập nhật**
   - Kiểm tra `useEffect` dependencies
   - Kiểm tra `location.search` parsing
