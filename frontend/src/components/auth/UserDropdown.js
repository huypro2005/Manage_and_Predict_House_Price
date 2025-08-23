import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConfigUrl } from '../../base';
import { 
  User, 
  Settings, 
  LogOut, 
  Heart, 
  MessageCircle, 
  ChevronDown,
  Bell,
  Plus,
  Home
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();

  // Debug: Log user data
  console.log('UserDropdown - User data:', user);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const getInitials = (firstName, lastName) => {
    const first = firstName ? firstName.charAt(0).toUpperCase() : '';
    const last = lastName ? lastName.charAt(0).toUpperCase() : '';
    return first + last;
  };

  const menuItems = [
    {
      icon: User,
      label: 'Hồ sơ cá nhân',
      href: '/profile',
      onClick: () => setIsOpen(false),
      style: {cursor: 'pointer'}
    },
    {
      icon: Heart,
      label: 'Bất động sản yêu thích',
      href: '/favorites',
      onClick: () => setIsOpen(false),
      style: {cursor: 'pointer'}
    },
    {
      icon: Home,
      label: 'Bất động sản của tôi',
      href: '/my-properties',
      onClick: () => setIsOpen(false),
      style: {cursor: 'pointer'}
    },
    {
      icon: MessageCircle,
      label: 'Tin nhắn',
      href: '/messages',
      onClick: () => setIsOpen(false),
      style: {cursor: 'pointer'}
    },
    {
      icon: Plus,
      label: 'Đăng tin bán/cho thuê',
      href: '/post-property',
      onClick: () => setIsOpen(false),
      style: {cursor: 'pointer'}
    },
    {
      icon: Settings,
      label: 'Cài đặt',
      href: '/settings',
      onClick: () => setIsOpen(false),
      style: {cursor: 'pointer'}
    },
    {
      icon: LogOut,
      label: 'Đăng xuất',
      onClick: handleLogout,
      className: 'text-red-600 hover:text-red-700',
      style: {cursor: 'pointer'}
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
      >
        <div className="w-8 h-8 rounded-full ring-2 ring-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-xs">
          {user?.avatar ? (
            <img src={ConfigUrl(user.avatar)} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <span>{user?.username?.charAt(0).toUpperCase() || 'U'}</span>
          )}
        </div>
        <span className="hidden md:block font-medium max-w-[140px] truncate">
          {user?.username || user?.email}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
          >
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full ring-2 ring-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center text-gray-600 font-semibold">
                  {user?.avatar ? (
                    <img src={ConfigUrl(user.avatar)} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span>{user?.username?.charAt(0).toUpperCase() || 'U'}</span>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {user?.username || 'Người dùng'}
                  </p>
                  <p className="text-sm text-gray-500 truncate max-w-[180px]">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={item.onClick}
                  className={`flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${item.className || ''}`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
