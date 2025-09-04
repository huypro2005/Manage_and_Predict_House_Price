import React, { useState, useEffect } from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import NotificationToast from './NotificationToast';

const NotificationManager = () => {
  const { notifications, markAsRead } = useNotifications();
  const [activeToasts, setActiveToasts] = useState([]);
  const [processedNotifications, setProcessedNotifications] = useState(new Set());

  // Track new notifications and show toasts
  useEffect(() => {
    const newNotifications = notifications.filter(
      notification => 
        !notification.isRead && 
        !processedNotifications.has(notification.id)
    );

    if (newNotifications.length > 0) {
      // Show toast for the most recent notification
      const latestNotification = newNotifications[0];
      
      setActiveToasts(prev => [...prev, latestNotification]);
      setProcessedNotifications(prev => new Set([...prev, latestNotification.id]));
    }
  }, [notifications, processedNotifications]);

  const handleToastClose = (notificationId) => {
    setActiveToasts(prev => prev.filter(toast => toast.id !== notificationId));
  };

  const handleMarkAsRead = (notificationId) => {
    markAsRead(notificationId);
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {activeToasts.map((notification) => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onClose={() => handleToastClose(notification.id)}
          onMarkAsRead={handleMarkAsRead}
        />
      ))}
    </div>
  );
};

export default NotificationManager;
