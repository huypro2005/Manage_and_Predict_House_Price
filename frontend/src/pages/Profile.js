import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { baseUrl, ConfigUrl } from '../base';
import ProfileTest from '../components/ProfileTest';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Camera, 
  Save, 
  Edit3, 
  CheckCircle, 
  XCircle,
  Upload,
  AlertCircle,
  Shield,
  ShieldCheck
} from 'lucide-react';

const Profile = () => {
  const { user, updateUser, handleApiResponse } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    date_of_birth: '',
    bio: ''
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Load user data on mount
  useEffect(() => {
    if (user) {
      setProfileData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        date_of_birth: user.date_of_birth || '',
        bio: user.bio || ''
      });
      setAvatarPreview(user.avatar ? ConfigUrl(user.avatar) : null);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file hình ảnh');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Kích thước file không được vượt quá 5MB');
        return;
      }

      setAvatar(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async () => {
    if (!avatar) return null;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', avatar);

      const token = localStorage.getItem('token');
      const response = await fetch(`${baseUrl}users/upload-avatar/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const apiCheck = await handleApiResponse(response);
      if (apiCheck.expired) {
        return null;
      }

      if (response.ok) {
        const data = await response.json();
        return data.avatar_url;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Lỗi khi upload avatar');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Upload avatar first if changed
      let avatarUrl = null;
      if (avatar) {
        avatarUrl = await uploadAvatar();
        if (!avatarUrl) {
          setLoading(false);
          return;
        }
      }

      // Update profile data
      const token = localStorage.getItem('token');
      const response = await fetch(`${baseUrl}users/profile/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...profileData,
          ...(avatarUrl && { avatar: avatarUrl })
        })
      });

      const apiCheck = await handleApiResponse(response);
      if (apiCheck.expired) {
        return;
      }

      if (response.ok) {
        const data = await response.json();
        updateUser(data.user);
        setIsEditing(false);
        setAvatar(null);
        alert('Cập nhật hồ sơ thành công!');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Có lỗi xảy ra khi cập nhật hồ sơ');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Có lỗi xảy ra khi cập nhật hồ sơ');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setProfileData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        date_of_birth: user.date_of_birth || '',
        bio: user.bio || ''
      });
      setAvatarPreview(user.avatar ? ConfigUrl(user.avatar) : null);
      setAvatar(null);
    }
    setIsEditing(false);
  };

  const getVerificationStatus = () => {
    if (user?.is_verified) {
      return {
        status: 'verified',
        icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
        text: 'Đã xác thực',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      };
    } else {
      return {
        status: 'unverified',
        icon: <Shield className="h-5 w-5 text-orange-500" />,
        text: 'Chưa xác thực',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200'
      };
    }
  };

  const verificationStatus = getVerificationStatus();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin người dùng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Hồ sơ cá nhân
                </h1>
                <p className="text-sm text-gray-500">
                  Quản lý thông tin tài khoản của bạn
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading || uploading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading || uploading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    {uploading ? 'Đang upload...' : 'Lưu thay đổi'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Test Component - Only show in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6">
            <ProfileTest />
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Avatar Section */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mx-auto">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  {isEditing && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-gray-600">@{user.username}</p>
                
                {/* Verification Status */}
                <div className={`mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${verificationStatus.bgColor} ${verificationStatus.borderColor} ${verificationStatus.color}`}>
                  {verificationStatus.icon}
                  <span className="ml-2">{verificationStatus.text}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-600">Bất động sản</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-600">Yêu thích</div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Thông tin cá nhân
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={profileData.first_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="Nhập họ của bạn"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={profileData.last_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="Nhập tên của bạn"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="Nhập email của bạn"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày sinh
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      name="date_of_birth"
                      value={profileData.date_of_birth}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="Nhập địa chỉ của bạn"
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giới thiệu bản thân
                </label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="Viết một vài dòng giới thiệu về bản thân..."
                />
              </div>

              {/* Verification Notice */}
              {!user.is_verified && (
                <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-md">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium text-orange-800">
                        Tài khoản chưa được xác thực
                      </h4>
                      <p className="text-sm text-orange-700 mt-1">
                        Để sử dụng đầy đủ các tính năng, vui lòng xác thực tài khoản của bạn.
                      </p>
                      <button className="mt-2 text-sm text-orange-600 hover:text-orange-800 font-medium">
                        Xác thực ngay →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
