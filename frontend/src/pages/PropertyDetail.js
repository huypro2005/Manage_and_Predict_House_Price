import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl, baseUrlImage } from '../base';
import { 
  ArrowLeft, 
  MapPin, 
  DollarSign, 
  Square, 
  Heart, 
  Star,
  Bed,
  Home,
  Ruler,
  Calendar,
  Phone,
  Mail,
  Share2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Clock,
  User,
  Bell,
  Youtube,
  FileText,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';

function PropertyDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const navigationItems = [
        { id: 'ban', label: 'Nhà đất bán' },
        { id: 'thue', label: 'Nhà đất thuê' },
        { id: 'tintuc', label: 'Tin tức' },
    ];

  useEffect(() => {
    const fetchPropertyDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}properties/${id}/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Property Detail API Response:', data);
        
        if (data && data.data) {
          setProperty(data.data);
        } else {
          throw new Error('No property data found');
        }
      } catch (error) {
        console.error('Error fetching property detail:', error);
        // Navigate back if property not found
        navigate('/property-list');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPropertyDetail();
    }
  }, [id, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const nextImage = () => {
    if (property?.images && property.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property?.images && property.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  const formatPrice = (price) => {
    if (!price) return '0';
    const numPrice = parseFloat(price);
    if (numPrice >= 1000) {
      return `${(numPrice / 1000).toFixed(1)} tỷ`;
    }
    return `${numPrice.toFixed(0)} triệu`;
  };

  const formatArea = (area) => {
    if (!area) return '0';
    return `${parseFloat(area).toFixed(0)} m²`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin bất động sản...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Không tìm thấy thông tin bất động sản</p>
          <button 
            onClick={handleBack}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header (match App.js style) */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🏢</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">RealEstate</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  onClick={() => navigate('/property-list')}
                >
                  {item.label}
                </button>
              ))}
            </nav>

         {/* Header Actions (match App.js) */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="text-gray-600 hover:text-gray-900 font-medium">
                Đăng Nhập
              </button>
              <button className="text-gray-600 hover:text-gray-900 font-medium">
                Đăng Ký
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Đăng tin
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Dự đoán giá
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-96">
                {property.images && property.images.length > 0 ? (
                  <>
                    <img
                      src={baseUrlImage + property.images[currentImageIndex].image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Navigation Arrows */}
                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-colors"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-colors"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {property.images.length}
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">Không có hình ảnh</p>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {property.images && property.images.length > 1 && (
                <div className="p-4 border-t border-gray-100">
                  <div className="flex space-x-2 overflow-x-auto">
                    {property.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex 
                            ? 'border-red-500' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={baseUrlImage + image.image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Property Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {property.title || 'Không có tiêu đề'}
              </h2>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.address || 'Không có địa chỉ'}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{property.views || 0} lượt xem</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Cập nhật {new Date(property.updated_at).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>

                             {/* Key Features */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                 {property.price && (
                   <div className="text-center p-4 bg-gray-50 rounded-lg">
                     <div className="text-sm text-gray-500 mb-1">Mức giá</div>
                     <div className="text-2xl font-bold text-red-600">
                       {formatPrice(property.price)}
                     </div>
                   </div>
                 )}
                 {property.area_m2 && (
                   <div className="text-center p-4 bg-gray-50 rounded-lg">
                     <div className="text-sm text-gray-500 mb-1">Mức diện tích</div>
                     <div className="text-2xl font-bold text-gray-900">
                       {formatArea(property.area_m2)}
                     </div>
                   </div>
                 )}
                 {property.bedrooms && (
                   <div className="text-center p-4 bg-gray-50 rounded-lg">
                     <div className="text-2xl font-bold text-gray-900">
                       {property.bedrooms}
                     </div>
                     <div className="text-sm text-gray-500">Phòng ngủ</div>
                   </div>
                 )}
                 {property.floors && (
                   <div className="text-center p-4 bg-gray-50 rounded-lg">
                     <div className="text-2xl font-bold text-gray-900">
                       {property.floors}
                     </div>
                     <div className="text-sm text-gray-500">Tầng</div>
                   </div>
                 )}
               </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Mô tả</h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description || 'Không có mô tả'}
                </div>
              </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Thông tin chi tiết</h3>
                <div className="space-y-2 text-sm">
                {property.price && (
                    <div className="flex justify-between">
                    <span className="text-gray-600">Giá:</span>
                    <span className="font-medium">{formatPrice(property.price)}</span>
                    </div>
                )}
                {property.area_m2 && (
                    <div className="flex justify-between">
                    <span className="text-gray-600">Diện tích:</span>
                    <span className="font-medium">{formatArea(property.area_m2)}</span>
                    </div>
                )}
                {property.bedrooms && (
                    <div className="flex justify-between">
                    <span className="text-gray-600">Phòng ngủ:</span>
                    <span className="font-medium">{property.bedrooms}</span>
                    </div>
                )}
                {property.price_per_m2 && (
                    <div className="flex justify-between">
                    <span className="text-gray-600">Giá/m²:</span>
                    <span className="font-medium">{parseFloat(property.price_per_m2).toLocaleString()} triệu</span>
                    </div>
                )}
                </div>
            </div>

            <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">&nbsp;</h3>
                <div className="space-y-2 text-sm">
                {property.legal_status && (
                    <div className="flex justify-between">
                    <span className="text-gray-600">Pháp lý:</span>
                    <span className="font-medium">{property.legal_status === 1 ? 'Sổ đỏ' : 'Khác'}</span>
                    </div>
                )}
                {property.floors && (
                    <div className="flex justify-between">
                    <span className="text-gray-600">Số tầng:</span>
                    <span className="font-medium">{property.floors}</span>
                    </div>
                )}
                {property.frontage && (
                    <div className="flex justify-between">
                    <span className="text-gray-600">Mặt tiền:</span>
                    <span className="font-medium">{property.frontage}m</span>
                    </div>
                )}
                </div>
            </div>
            </div>
              </div>

              {/* Map section moved to left column */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Xem trên bản đồ</h3>
                <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Bản đồ sẽ được hiển thị tại đây</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact and Actions (Sticky) */}
            <div className="lg:sticky lg:top-0 space-y-6 h-fit">
            {/* Agent Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin liên hệ</h3>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-500" />
                </div>
                <div className="font-medium text-gray-900 mb-1">Chủ sở hữu</div>
                <div className="text-sm text-gray-500 mb-4">{property.user_fullname}</div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">{property.user_phone || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">{property.user_email || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        
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

export default PropertyDetail;
