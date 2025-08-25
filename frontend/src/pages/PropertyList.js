import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { baseUrl, ConfigUrl } from '../base';
import AuthWrapper from '../components/auth/AuthWrapper';
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
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Bell
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
  const [favoriteIds, setFavoriteIds] = useState([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 12;

  // Fetch favorite IDs
  useEffect(() => {
    const fetchFavoriteIds = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch(`${baseUrl}favourites/listID/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setFavoriteIds(data.data || []);
        }
      } catch (error) {
        console.error('Error fetching favorite IDs:', error);
      }
    };

    fetchFavoriteIds();
  }, []);

  // Toggle favorite function
  const toggleFavorite = async (propertyId, e) => {
    e.stopPropagation();
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login or show login modal
        navigate('/login');
        return;
      }

      const response = await fetch(`${baseUrl}favourites/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ property_id: propertyId })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Toggle favorite response:', data);
        
        // Update favorite IDs state
        setFavoriteIds(prev => {
          if (prev.includes(propertyId)) {
            return prev.filter(id => id !== propertyId);
          } else {
            return [...prev, propertyId];
          }
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  // Parse URL parameters and fetch data in one useEffect
  useEffect(() => {
    console.log('PropertyList useEffect triggered, location.search:', location.search);
    
    const params = new URLSearchParams(location.search);
    const searchParamsObj = {};
    
    // Convert URLSearchParams to object
    for (const [key, value] of params.entries()) {
      searchParamsObj[key] = value;
    }
    
    console.log('Parsed searchParamsObj:', searchParamsObj);
    setSearchParams(searchParamsObj);
    
    // Reset pagination when search params change
    setCurrentPage(1);
  }, [location.search]);

  // Fetch properties with pagination
  useEffect(() => {
    const fetchProperties = async () => {
      console.log('Starting fetchProperties for page:', currentPage);
      setLoading(true);
      try {
        // Build API URL with search parameters and pagination
        const apiUrl = new URL(`${baseUrl}properties/`);
        
        // Add search parameters to API URL
        Object.entries(searchParams).forEach(([key, value]) => {
          if (value && value !== '') {
            apiUrl.searchParams.append(key, value);
          }
        });

        // Add pagination parameters
        apiUrl.searchParams.append('page', currentPage.toString());
        apiUrl.searchParams.append('page_size', itemsPerPage.toString());

        console.log('Fetching from API:', apiUrl.toString());
        
        const response = await fetch(apiUrl.toString());
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        // Handle API response with pagination
        if (data && data.data) {
          setProperties(data.data);
          setTotalCount(data.count || 0);
          setTotalPages(Math.ceil((data.count || 0) / itemsPerPage));
          console.log('Properties:', data.data);
          console.log('Total count:', data.count);
          console.log('Total pages:', Math.ceil((data.count || 0) / itemsPerPage));
        } else {
          // Fallback to mock data with pagination simulation
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const mockData = [
            {
              id: 1,
              title: 'Căn hộ cao cấp tại Quận 1',
              description: 'Căn hộ 2 phòng ngủ, view hồ bơi, gần trung tâm thương mại',
              price: '15',
              area_m2: '85',
              address: 'Quận 1, Thành phố Hồ Chí Minh',
              time: '2 giờ trước',
              thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
              views: 1234
            },
            {
              id: 2,
              title: 'Nhà phố 3 tầng tại Quận 7',
              description: 'Nhà phố mặt tiền, 4 phòng ngủ, gara ô tô',
              price: '45',
              area_m2: '150',
              address: 'Quận 7, Thành phố Hồ Chí Minh',
              time: '5 giờ trước',
              thumbnail: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
              views: 892
            },
            {
              id: 3,
              title: 'Nhà riêng 4 tầng tại Thủ Đức',
              description: 'Penthouse sky villa Elysian by Gamuda Land với diện tích 207-332m²',
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

          const paginatedData = mockData.slice(startIndex, endIndex);
          setProperties(paginatedData);
          setTotalCount(mockData.length);
          setTotalPages(Math.ceil(mockData.length / itemsPerPage));
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
        setTotalCount(0);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [currentPage, searchParams]);

  // Mock data for demonstration (extended for pagination testing)
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
      description: 'Penthouse sky villa Elysian by Gamuda Land với diện tích 207-332m²',
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

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show limited pages with ellipsis
      if (currentPage <= 3) {
        // Near start
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near end
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Middle
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const PropertyCard = ({ property }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer h-full flex flex-col"
      onClick={() => navigate(`/property/${property.id}`)}
    >
      {/* Property Image */}
      <div className="relative h-48 flex-shrink-0">
        <img
          src={ConfigUrl(property.thumbnail)}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Favorite Button */}
         <button 
           className={`absolute top-3 right-3 z-10 transition-all duration-300 ${favoriteIds.includes(property.id) ? 'text-red-500 scale-110' : 'text-white hover:text-red-500'}`}
           onClick={(e) => toggleFavorite(property.id, e)}
         >
           <Heart className={`h-5 w-5 transition-all duration-300 ${favoriteIds.includes(property.id) ? 'fill-current scale-110' : ''}`} />
         </button>
         

        {/* Views */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <span className="text-xs text-gray-700 font-medium">{property.views} lượt xem</span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
          {property.title || ''}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-[2rem] flex-shrink-0">
          {property.description ? property.description.slice(0, 60) : ''}
        </p>
        
        <div className="flex justify-between items-center mb-3 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="text-base font-bold text-red-600">{property.price || 0}</div>
            <div className="text-gray-600 flex items-center text-sm">
              <Square className="h-4 w-4 mr-1" />
              {property.area_m2 || 0} m²
            </div>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-2 flex-shrink-0">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{property.address || ''}</span>
        </div>

        <div className="text-xs text-gray-500 mt-auto">
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
        <div className="relative w-36 h-24 md:w-48 md:h-32 flex-shrink-0">
          <img
            src={ConfigUrl(property.thumbnail)}
            alt={property.title}
            className="w-full h-full object-cover"
          />
                     <button 
             className={`absolute top-2 right-2 transition-all duration-300 ${favoriteIds.includes(property.id) ? 'text-red-500 scale-110' : 'text-white hover:text-red-500'}`}
             onClick={(e) => toggleFavorite(property.id, e)}
           >
             <Heart className={`h-5 w-5 transition-all duration-300 ${favoriteIds.includes(property.id) ? 'fill-current scale-110' : ''}`} />
           </button>
        </div>

        {/* Property Details */}
        <div className="flex-1 p-4">
          <div className="flex justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                {property.title || ''}
              </h3>
              <p className="text-gray-600 text-sm md:text-[15px] mb-2 line-clamp-2">
                {property.description || ''}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">{property.address || ''}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-lg md:text-xl font-bold text-red-600">{property.price || 0}</div>
              <div className="text-xs md:text-sm text-gray-500 flex items-center justify-end"><Square className="h-4 w-4 mr-1" />{property.area_m2 || 0} m²</div>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs md:text-sm text-gray-500">
            <div className="flex items-center space-x-3">
              <span>{property.time || ''}</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                <span>{property.rating || 0}</span>
              </div>
              <span>{property.views || 0} lượt xem</span>
            </div>
            <div className="hidden sm:block text-xs text-gray-500">
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
                   {totalCount > 0 ? `${totalCount} bất động sản được tìm thấy` : 'Đang tải...'}
                 </p>
               </div>
             </div>

             {/* Header Actions */}
             <div className="flex items-center space-x-2">
               {/* Desktop Actions */}
               <div className="hidden sm:flex items-center space-x-3">
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

                 {/* Heart Icon with Count */}
                 <button 
                   className="p-2 text-gray-400 hover:text-red-500 transition-colors relative"
                   onClick={() => navigate('/favorites')}
                 >
                   <Heart className="h-5 w-5" />
                   {favoriteIds.length > 0 && (
                     <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                       {favoriteIds.length > 9 ? '9+' : favoriteIds.length}
                     </div>
                   )}
                 </button>
               </div>
               
               {/* Mobile Actions */}
               <div className="flex sm:hidden items-center space-x-2">
                 {/* Bell Icon */}
                 <button
                   className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                   aria-label="Thông báo"
                 >
                   <Bell className="h-5 w-5" />
                 </button>
                 
                 {/* Heart Icon */}
                 <button 
                   className="p-2 text-gray-600 hover:text-red-500 transition-colors relative"
                   onClick={() => navigate('/favorites')}
                   aria-label="Yêu thích"
                 >
                   <Heart className="h-5 w-5" />
                   {favoriteIds.length > 0 && (
                     <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                       {favoriteIds.length > 9 ? '9+' : favoriteIds.length}
                     </div>
                   )}
                 </button>
                 
                 {/* User Avatar - Always visible on mobile */}
                 <div className="flex items-center">
                   <AuthWrapper />
                 </div>
               </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2 bg-white rounded-lg shadow-md px-4 py-2">
              {/* Previous Button */}
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === '...' ? (
                    <span className="px-3 py-2 text-gray-500">...</span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-red-600 text-white'
                          : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}

              {/* Next Button */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Pagination Info */}
        {totalCount > 0 && (
          <div className="text-center mt-4 text-sm text-gray-600">
            Hiển thị {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalCount)} trong tổng số {totalCount} bất động sản
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyList;
