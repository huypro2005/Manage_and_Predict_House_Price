import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl, ConfigUrl } from '../base';
import PropertyMap from '../components/PropertyMap';
import AuthWrapper from '../components/auth/AuthWrapper';
import UserDropdown from '../components/auth/UserDropdown';
import { useAuth } from '../contexts/AuthContext';
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
  Twitter,
  Send,
  Search
} from 'lucide-react';

function PropertyDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated, handleApiResponse } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Image modal (lightbox) state
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: '',
    content: ''
  });

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

  // Check if property is in favorites
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch(`${baseUrl}favourites/listID/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Check for token expiration
        const apiCheck = await handleApiResponse(response);
        if (apiCheck.expired) {
          return; // handleApiResponse already redirected
        }
        
        if (response.ok) {
          const data = await response.json();
          const favoriteIdsList = data.data || [];
          setFavoriteIds(favoriteIdsList);
          setIsFavorite(favoriteIdsList.includes(parseInt(id)));
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavoriteStatus();
  }, [id]);

  // Toggle favorite function
  const toggleFavorite = async () => {
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
        body: JSON.stringify({ property_id: parseInt(id) })
      });

      // Check for token expiration
      const apiCheck = await handleApiResponse(response);
      if (apiCheck.expired) {
        return; // handleApiResponse already redirected
      }

      if (response.ok) {
        const data = await response.json();
        console.log('Toggle favorite response:', data);
        setIsFavorite(!isFavorite);
        
        // Update favoriteIds list
        setFavoriteIds(prev => {
          if (isFavorite) {
            return prev.filter(favId => favId !== parseInt(id));
          } else {
            return [...prev, parseInt(id)];
          }
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleUserClick = () => {
    if (property?.username) {
      navigate(`/my-properties?username=${property.username}`);
    }
  };
  
  const handelNavigateToPostProperty = () => {
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để đăng tin!');
      return;
    }
    navigate('/post-property');
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

  // Lightbox helpers
  const openImageModal = (index) => {
    setModalImageIndex(index);
    setZoomScale(1);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setZoomScale(1);
  };

  const modalNext = () => {
    if (!property?.images?.length) return;
    setModalImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
    setZoomScale(1);
  };

  const modalPrev = () => {
    if (!property?.images?.length) return;
    setModalImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
    setZoomScale(1);
  };

  const zoomIn = () => setZoomScale((z) => Math.min(3, +(z + 0.25).toFixed(2)));
  const zoomOut = () => setZoomScale((z) => Math.max(1, +(z - 0.25).toFixed(2)));
  const resetZoom = () => setZoomScale(1);

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

  // Xử lý nút liên hệ
  const handleContactClick = () => {
    if (!isAuthenticated) {
      // Nếu chưa đăng nhập, chuyển đến trang đăng nhập
      alert('Vui lòng đăng nhập để liên hệ!');
      return;
    }
    // Nếu đã đăng nhập, hiển thị form liên hệ
    setShowContactForm(true);
  };

  // Xử lý gửi tin nhắn liên hệ
  const handleSendMessage = async () => {
    // Kiểm tra các trường bắt buộc
    if (!contactInfo.name.trim()) {
      alert('Vui lòng nhập tên của bạn!');
      return;
    }
    if (!contactInfo.phone.trim()) {
      alert('Vui lòng nhập số điện thoại!');
      return;
    }
    if (!contactInfo.content.trim()) {
      alert('Vui lòng nhập nội dung tin nhắn!');
      return;
    }

    // Tạo message tổng hợp
    const fullMessage = `
Thông tin liên hệ:
- Tên: ${contactInfo.name}
- Số điện thoại: ${contactInfo.phone}
- Email: ${contactInfo.email || 'Không có'}

Nội dung tin nhắn:
${contactInfo.content}
    `.trim();

    setSendingMessage(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Vui lòng đăng nhập để liên hệ!');
        return;
      }
      
      console.log('Token:', token);
      console.log('Property ID:', id);
      console.log('Full Message:', fullMessage);
      
      const response = await fetch(`${baseUrl}contact-requests/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          property: id,
          message: fullMessage
        })
      });

      // Check for token expiration
      const apiCheck = await handleApiResponse(response);
      if (apiCheck.expired) {
        return; // handleApiResponse already redirected
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Contact request sent:', data);
      
      alert('Tin nhắn đã được gửi thành công!');
      setContactInfo({ name: '', phone: '', email: '', content: '' });
      setShowContactForm(false);
    } catch (error) {
      console.error('Error sending contact request:', error);
      alert('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại!');
    } finally {
      setSendingMessage(false);
    }
  };

  // Đóng form liên hệ
  const handleCloseContactForm = () => {
    setShowContactForm(false);
    setContactInfo({ name: '', phone: '', email: '', content: '' });
  };

  // Xử lý thay đổi thông tin liên hệ
  const handleContactInfoChange = (field, value) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
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

         {/* Header Actions - desktop vs mobile */}
            <div className="flex items-center space-x-2">
              {/* Desktop Actions */}
              <div className="hidden sm:flex items-center space-x-3">
                <button 
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors relative"
                  onClick={() => navigate('/favorites')}
                >
                  <Heart className="h-5 w-5" />
                  {favoriteIds && favoriteIds.length > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                      {favoriteIds.length > 9 ? '9+' : favoriteIds.length}
                    </div>
                  )}
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Bell className="h-5 w-5" />
                </button>
                <AuthWrapper />
                <button className="hidden md:inline-flex bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors" onClick={handelNavigateToPostProperty}>
                  Đăng tin
                </button>
                <button className="hidden lg:inline-flex bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Dự đoán giá
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
                  {favoriteIds && favoriteIds.length > 0 && (
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-96">
                {property.images && property.images.length > 0 ? (
                  <>
                    <img
                      src={ConfigUrl(property.images[currentImageIndex].image)}
                      alt={property.title}
                      className="w-full h-full object-cover cursor-zoom-in"
                      onClick={() => openImageModal(currentImageIndex)}
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
                          src={ConfigUrl(image.image)}
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
              
                             <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                 <div className="flex items-center space-x-4">
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
                     <span>Đăng ngày {new Date(property.created_at).toLocaleDateString('vi-VN')}</span>
                   </div>
                 </div>
                                   <button 
                    className={`p-2 rounded-full transition-all duration-300 ${isFavorite ? 'text-red-500 bg-red-50 scale-110' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
                    onClick={toggleFavorite}
                  >
                    <Heart className={`h-5 w-5 transition-all duration-300 ${isFavorite ? 'fill-current scale-110' : ''}`} />
                  </button>
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

              {/* Map section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Xem trên bản đồ</h3>
                <PropertyMap property={property} formatPrice={formatPrice} />
              </div>
            </div>

            {/* Right Column - Contact and Actions (Sticky) */}
            <div className="lg:sticky lg:top-0 space-y-6 h-fit">
              {/* Agent Info */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin liên hệ</h3>
                <div className="flex items-center sm:flex-col sm:text-center gap-3">
                  <div 
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full ring-2 ring-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center text-gray-600 cursor-pointer hover:ring-gray-300 transition-all"
                    onClick={handleUserClick}
                  >
                    <User className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900">Chủ sở hữu</div>
                    <div 
                      className="text-sm text-gray-500 truncate cursor-pointer hover:text-gray-700 transition-colors"
                      onClick={handleUserClick}
                    >
                      {property.user_fullname}
                    </div>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex items-center sm:justify-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="truncate">{property.user_phone || 'N/A'}</span>
                      </div>
                      <div className="flex items-center sm:justify-center text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="truncate">{property.user_email || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <button 
                    onClick={handleContactClick}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    <span>Liên hệ</span>
                  </button>
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

             {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Gửi tin nhắn liên hệ</h3>
              <button
                onClick={handleCloseContactForm}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Bất động sản:</span> {property?.title}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Chủ sở hữu:</span> {property?.user_fullname}
              </p>
            </div>

            <div className="space-y-4">
              {/* Thông tin cá nhân */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên của bạn *
                </label>
                <input
                  type="text"
                  value={contactInfo.name}
                  onChange={(e) => handleContactInfoChange('name', e.target.value)}
                  placeholder="Nhập tên của bạn"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={sendingMessage}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                  placeholder="Nhập số điện thoại"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={sendingMessage}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (tùy chọn)
                </label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => handleContactInfoChange('email', e.target.value)}
                  placeholder="Nhập email của bạn"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={sendingMessage}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung tin nhắn *
                </label>
                <textarea
                  value={contactInfo.content}
                  onChange={(e) => handleContactInfoChange('content', e.target.value)}
                  placeholder="Nhập nội dung tin nhắn bạn muốn gửi đến chủ sở hữu..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  rows={4}
                  disabled={sendingMessage}
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCloseContactForm}
                disabled={sendingMessage}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                onClick={handleSendMessage}
                disabled={sendingMessage || !contactInfo.name.trim() || !contactInfo.phone.trim() || !contactInfo.content.trim()}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {sendingMessage ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Đang gửi...
                  </>
                ) : (
                  'Gửi tin nhắn'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal (Lightbox with Zoom) */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={closeImageModal}>
          <div className="relative w-full max-w-5xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={ConfigUrl(property.images[modalImageIndex].image)}
              alt={`Image ${modalImageIndex + 1}`}
              className="w-full h-full object-contain select-none"
              style={{ transform: `scale(${zoomScale})`, transition: 'transform 150ms ease' }}
            />
            {/* Controls */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/10 rounded-full px-3 py-2">
              <button onClick={zoomOut} className="px-3 py-1 text-white hover:text-yellow-300">-</button>
              <span className="text-white text-sm w-10 text-center">{Math.round(zoomScale * 100)}%</span>
              <button onClick={zoomIn} className="px-3 py-1 text-white hover:text-yellow-300">+</button>
              <button onClick={resetZoom} className="ml-2 px-2 py-1 text-white/80 hover:text-white text-xs">Reset</button>
            </div>
            {property.images.length > 1 && (
              <>
                <button onClick={modalPrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button onClick={modalNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full">
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            <button onClick={closeImageModal} className="absolute top-4 right-4 text-white/80 hover:text-white">Đóng</button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {modalImageIndex + 1} / {property.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyDetail;
