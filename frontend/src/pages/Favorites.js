import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl, ConfigUrl } from '../base';
import { Heart, 
  Trash2, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Phone, 
  Mail,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import AuthWrapper from '../components/auth/AuthWrapper';

function Favorites() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    // Fetch favorites for current user
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        
        // Build API URL with pagination
        const apiUrl = new URL(`${baseUrl}favorites/`);
        apiUrl.searchParams.append('page', currentPage.toString());
        apiUrl.searchParams.append('page_size', itemsPerPage.toString());
        
        const res = await fetch(apiUrl.toString(), {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        const data = await res.json();
        
        const favoritesData = Array.isArray(data.data) ? data.data : (Array.isArray(data.results) ? data.results : []);
        setItems(favoritesData);
        setTotalCount(data.count || 0);
        setTotalPages(Math.ceil((data.count || 0) / itemsPerPage));
      } catch (e) {
        setItems([]);
        setTotalCount(0);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${baseUrl}favorites/${id}/`, { method: 'DELETE', headers: token ? { Authorization: `Bearer ${token}` } : {} });
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e) {}
  };

  // Pagination functions
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}> 
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🏢</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">RealEstate</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <AuthWrapper />
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium" onClick={() => navigate('/post-property')}>Đăng tin</button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Bất động sản yêu thích</h1>
                <p className="text-white/80 mt-1">Danh sách những bất động sản bạn đã lưu</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{totalCount}</div>
              <div className="text-white/80 text-sm">Bất động sản đã lưu</div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-gray-600">Đang tải...</div>
        ) : items.length === 0 ? (
          <div className="text-gray-600">Chưa có bất động sản nào.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group" onClick={() => navigate(`/property/${item.property?.id || item.id}`)} style={{cursor:'pointer'}}>
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={ConfigUrl(item.thumbnail || item.property?.thumbnail)} 
                    alt={item.title || item.property?.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                  />
                  <div className="absolute top-3 right-3">
                    <button 
                      className="bg-white/90 hover:bg-red-500 hover:text-white text-gray-600 p-2 rounded-full transition-all duration-300" 
                      onClick={(e)=>{e.stopPropagation(); removeItem(item.id);}}
                    >
                      <Trash2 className="h-4 w-4"/>
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Yêu thích
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
                    {item.title || item.property?.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0"/>
                    <span className="line-clamp-1">{item.address || item.property?.address}</span>
                  </div>
                  
                  {/* Price and Area */}
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-red-600">
                      {item.price || item.property?.price ? `${parseFloat(item.price || item.property?.price).toLocaleString()} triệu` : 'Liên hệ'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.area_m2 || item.property?.area_m2 ? `${item.area_m2 || item.property?.area_m2} m²` : ''}
                    </div>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span>Đang bán</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {item.created_at || item.property?.created_at ? 
                        new Date(item.created_at || item.property?.created_at).toLocaleDateString('vi-VN') : 
                        'Mới đăng'
                      }
                    </div>
                  </div>
                </div>
              </div>
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

      {/* Footer (match App.js) */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-sm">🏢</span>
                </div>
                <h3 className="text-xl font-bold">RealEstate</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Nền tảng bất động sản hàng đầu Việt Nam, kết nối người mua và người bán một cách hiệu quả.
              </p>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Dịch vụ</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Mua bán nhà đất</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cho thuê nhà đất</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dự án bất động sản</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tư vấn đầu tư</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Trung tâm trợ giúp</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>1900 1234</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@realestate.vn</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>123 Đường ABC, Quận 1, TP.HCM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RealEstate. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Favorites;
