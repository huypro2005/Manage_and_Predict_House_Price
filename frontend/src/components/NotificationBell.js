import React from 'react';
import { Bell } from 'lucide-react';
import { useNotificationCount } from '../hooks/useNotificationCount';

const NotificationBell = ({ 
  onClick, 
  className = "p-2 text-gray-400 hover:text-gray-600 transition-colors",
  iconClassName = "h-5 w-5",
  badgeClassName = "absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center animate-pulse"
}) => {
  const { notificationCount } = useNotificationCount();

  return (
    <button 
      className={`relative ${className} group`}
      onClick={onClick}
      aria-label={`Thông báo${notificationCount > 0 ? ` (${notificationCount} chưa đọc)` : ''}`}
    >
      <Bell className={`${iconClassName} transition-transform group-hover:scale-110`} />
      {notificationCount > 0 && (
        <div className={badgeClassName}>
          {notificationCount > 99 ? '99+' : notificationCount}
        </div>
      )}
      
      {/* Ripple effect khi có thông báo mới */}
      {notificationCount > 0 && (
        <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 animate-ping"></div>
      )}
    </button>
  );
};

export default NotificationBell;
