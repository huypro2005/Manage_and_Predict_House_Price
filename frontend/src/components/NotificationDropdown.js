import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, Clock, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../contexts/NotificationContext';
import WebSocketIndicator from './WebSocketIndicator';

const NotificationDropdown = ({
  className = "relative",
  iconClassName = "h-5 w-5",
  badgeClassName = "absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { notifications: contextNotifications, unreadCount, markAsRead: contextMarkAsRead, isConnected } = useNotifications();

  // Close dropdown when clicking outside
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

  // Use notifications from context only (no API calls)
  useEffect(() => {
    if (isOpen) {
      // Only use context notifications from WebSocket
      setNotifications(contextNotifications);
    }
  }, [isOpen, contextNotifications]);

  // Removed fetchNotifications - only using WebSocket notifications now

  const markAsRead = (notificationId) => {
    // Only update context - no API calls
    contextMarkAsRead(notificationId);
    
    // Update local state to reflect the change immediately
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    return `${Math.floor(diffInMinutes / 1440)} ngày trước`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'property_view':
        return '👁️';
      case 'favorite':
        return '❤️';
      case 'message':
        return '💬';
      case 'price_update':
        return '💰';
      case 'contact_request':
        return '📞';
      default:
        return '🔔';
    }
  };

  return (
    <div className={className} ref={dropdownRef}>
      <button
        className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Thông báo"
      >
        <Bell className={iconClassName} />
        {unreadCount > 0 && (
          <div className={badgeClassName}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900">Thông báo</h3>
              <WebSocketIndicator showText={true} />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">Chưa có thông báo nào</p>
                <p className="text-xs text-gray-400 mt-1">
                  {isConnected 
                    ? 'Thông báo sẽ xuất hiện khi có người liên hệ' 
                    : 'Đang kết nối... Thông báo sẽ hiển thị khi online'
                  }
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notification.isRead ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => {
                      if (!notification.isRead) {
                        markAsRead(notification.id);
                      }
                      // Navigate based on notification type
                      if (notification.type === 'contact_request' && notification.property_id) {
                        navigate(`/property/${notification.property_id}`);
                      } else if (notification.property_id) {
                        navigate(`/property/${notification.property_id}`);
                      }
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 text-xl">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 line-clamp-2">
                          {notification.title ? (
                            notification.title
                          ) : (
                            <div 
                              dangerouslySetInnerHTML={{ 
                                __html: notification.message?.replace(/\n/g, '<br>') || 'Thông báo mới' 
                              }} 
                            />
                          )}
                        </div>
                        {notification.type === 'contact_request' && notification.from_username && (
                          <p className="text-xs text-blue-600 mt-1">
                            Từ: {notification.from_username}
                          </p>
                        )}
                        {notification.type === 'contact_request' && notification.property && (
                          <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                            BDS: {notification.property.title}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTimeAgo(notification.timestamp || notification.created_at)}
                          </p>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      {!notification.isRead && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                          className="flex-shrink-0 p-1 text-gray-400 hover:text-green-600"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/notifications');
                }}
                className="w-full text-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                Xem tất cả thông báo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
