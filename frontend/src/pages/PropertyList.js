import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { baseUrl, baseUrlImage } from '../base';
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  DollarSign, 
  Square, 
  Heart, 
  Star,
  Filter,
  Grid,
  List,
  ChevronDown
} from 'lucide-react';

function PropertyList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useState({});
  const hasFetched = useRef(false);

  // Parse URL parameters and fetch data in one useEffect
  useEffect(() => {
    console.log('PropertyList useEffect triggered, location.search:', location.search);
    
    // Prevent multiple API calls
    if (hasFetched.current) {
      console.log('Already fetched, skipping...');
      return;
    }
    
    const params = new URLSearchParams(location.search);
    const searchParamsObj = {};
    
    // Convert URLSearchParams to object
    for (const [key, value] of params.entries()) {
      searchParamsObj[key] = value;
    }
    
    console.log('Parsed searchParamsObj:', searchParamsObj);
    setSearchParams(searchParamsObj);
    
    // Fetch properties from API
    const fetchProperties = async () => {
      console.log('Starting fetchProperties...');
      hasFetched.current = true;
      setLoading(true);
      try {
        // Build API URL with search parameters
        const apiUrl = new URL(`${baseUrl}properties/`);
        
        // Add search parameters to API URL
        Object.entries(searchParamsObj).forEach(([key, value]) => {
          if (value && value !== '') {
            apiUrl.searchParams.append(key, value);
          }
        });

        console.log('Fetching from API:', apiUrl.toString());
        
        const response = await fetch(apiUrl.toString());
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data.data);
        
        // Use mock data for now if API doesn't return expected format
        if (data && data.data) {
          setProperties(data.data);
          console.log('Properties:', properties);
        } else {
          setProperties(mockProperties);
          console.error('No data found');
          console.log('Properties:', properties);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        // Fallback to mock data
        setProperties(mockProperties);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [location.search]);

  // Mock data for demonstration
  const mockProperties = [
    {
      id: 1,
      title: 'Elysian - Giỏ hàng trực tiếp CĐT, CK 9%',
      description: 'TT 50% nhận nhà, CĐT hỗ trợ trả chậm đến 2029',
      price: '9',
      area_m2: '50',
      address: 'Quận 7, Thành phố Hồ Chí Minh',
      time: '9 giờ trước',
      thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      views: 1247
    },
    {
      id: 2,
      title: 'Căn hộ cao cấp tại Quận 1',
      description: 'Vị trí đắc địa, view sông Sài Gòn',
      price: '15',
      area_m2: '80',
      address: 'Quận 1, Thành phố Hồ Chí Minh',
      time: '2 giờ trước',
      thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      views: 2156
    },
    {
      id: 3,
      title: 'Nhà riêng 4 tầng tại Thủ Đức',
      description: "Penthouse sky villa Elysian by Gamuda Land.\r\nVà nhiều siêu phẩm 1 2 3PN.\r\nSiêu phẩm giới hạn diện tích khủng 207 - 332m.\r\n\r\n* Vị trí: 170 đường Lò Lu, Phường Trường Thạnh, TP. Thủ Đức.\r\n- Chủ đầu tư: Gamuda Land Đơn vị phát triển BĐS quốc tế.\r\n- Thiết kế & xây dựng: Hòa Bình Landscape.\r\n\r\n* Thông tin nổi bật:\r\n- Loại hình: Penthouse / Sky Villa.\r\n- Diện tích: 207 - 288 - 332m thiết kế thông tầng cực kỳ đẳng cấp.\r\n- Tầng cao nhất view sông + toàn khu biệt lập cực thoáng.\r\n- Pháp lý: Sở hữu lâu dài cho người Việt.\r\n- Dự kiến bàn giao: 2027.\r\n\r\n- 4 phương án thanh toán linh hoạt tạo nên cách mạng về thanh toán cục giãn như sau:\r\nKí hợp đồng chỉ 5%, 8 tháng sau thanh toán 10%, 8 tháng tiếp theo 15%, Nhận nhà vào quý 3/2027.\r\n\r\n* Ưu đãi miễn phí quản lý đến 5 năm.\r\n* Ký HĐMB trong tháng 8 chiết khấu 5%.\r\n* Chiết khấu tốt nhất dành cho khách thanh toán chuẩn.\r\n* Ngân hàng hỗ trợ tối đa 70% giá trị căn hộ.\r\n* BIDV, Hongleong Bank, MBV Bank, Public Bank, Vietcombank, Vietin Bank.\r\n\r\n- Đặc quyền sống xanh sống chất:\r\nCông viên nội khu lớn hồ bơi dài 50m sky garden trên cao.\r\nKhu trung tâm thương mại nhà trẻ quốc tế gym spa.\r\nQuần thể khép kín, an ninh 3 lớp.",
      price: '25',
      area_m2: '200',
      address: 'Thủ Đức, Thành phố Hồ Chí Minh',
      time: '1 ngày trước',
      thumbnail: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      views: 892
    },
    {
      id: 4,
      title: 'Văn phòng cho thuê tại Quận 3',
      description: 'Văn phòng A, tầng 15, view toàn cảnh',
      price: '50',
      area_m2: '120',
      address: 'Quận 3, Thành phố Hồ Chí Minh',
      time: '3 giờ trước',
      thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      views: 567
    }
  ];



  const handleBack = () => {
    navigate('/');
  };

  const PropertyCard = ({ property }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/property/${property.id}`)}
    >
      {/* Property Image */}
      <div className="relative h-48">
        <img
          src={baseUrlImage + property.thumbnail}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        

        {/* Favorite Button */}
        <button 
          className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="h-6 w-6" />
        </button>


        {/* Views */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <span className="text-sm text-gray-700">{property.views} lượt xem</span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {property.title || ''}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-1">
          {/* limit 1 line */}
          {property.description ? property.description.slice(0, 100) : ''}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-4">
            <div className="text-lg font-bold text-red-600">{property.price || 0}</div>
            <div className="text-gray-600 flex items-center">
              <Square className="h-4 w-4 mr-1" />
              {property.area_m2 || 0} m²
            </div>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">{property.address || ''}</span>
        </div>

                  <div className="text-xs text-gray-500 mb-3">
            {property.time || ''}
          </div>

    
      </div>
    </motion.div>
  );

  const PropertyListItem = ({ property }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/property/${property.id}`)}
    >
      <div className="flex">
        {/* Property Image */}
        <div className="relative w-48 h-32 flex-shrink-0">
          <img
            src={baseUrlImage + property.thumbnail}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <button 
              className="text-white hover:text-red-500 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {property.title || ''}
              </h3>
                             <p className="text-gray-600 text-sm mb-2">
                 {property.description ? property.description.slice(0, 150) : ''}
               </p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-red-600">{property.price || 0}</div>
              <div className="text-sm text-gray-500">{property.area_m2 || 0} m²</div>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property.address || ''}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{property.time || ''}</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                <span>{property.rating || 0}</span>
              </div>
              <span>{property.views || 0} lượt xem</span>
            </div>
            <div className="text-xs text-gray-500">
              {property.brand || ''}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải danh sách bất động sản...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Kết quả tìm kiếm</h1>
                <p className="text-sm text-gray-500">
                  {properties.length} bất động sản được tìm thấy
                </p>
              </div>
            </div>

            {/* Search Summary */}
            <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
              {searchParams?.province && (
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {searchParams.province}
                </span>
              )}
              {searchParams?.districts?.length > 0 && (
                <span>{searchParams.districts.length} quận/huyện</span>
              )}
              {searchParams?.propertyTypes?.length > 0 && (
                <span>{searchParams.propertyTypes.length} loại nhà đất</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4 mr-2" />
              Bộ lọc
            </button>

            <div className="flex items-center bg-white border border-gray-300 rounded-lg">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-transparent border-none focus:ring-0 text-sm"
              >
                <option value="newest">Mới nhất</option>
                <option value="price-low">Giá thấp đến cao</option>
                <option value="price-high">Giá cao đến thấp</option>
                <option value="area-low">Diện tích nhỏ đến lớn</option>
                <option value="area-high">Diện tích lớn đến nhỏ</option>
              </select>
              <ChevronDown className="h-4 w-4 text-gray-400 mr-3" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-white text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-white text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Property List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {properties.map((property) => (
              <PropertyListItem key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        <div className="flex justify-center mt-8">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyList;
