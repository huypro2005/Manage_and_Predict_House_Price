import { useState, useEffect } from 'react';
import { useNotifications } from '../contexts/NotificationContext';

/**
 * Hook để quản lý số lượng thông báo chưa đọc
 * Tích hợp với NotificationContext và localStorage
 */
export const useNotificationCount = () => {
  const { unreadCount } = useNotifications();
  const [notificationCount, setNotificationCount] = useState(0);

  // Sync với NotificationContext
  useEffect(() => {
    setNotificationCount(unreadCount);
  }, [unreadCount]);

  // Lưu vào localStorage để persist
  useEffect(() => {
    localStorage.setItem('notificationCount', notificationCount.toString());
  }, [notificationCount]);

  // Load từ localStorage khi component mount
  useEffect(() => {
    const savedCount = localStorage.getItem('notificationCount');
    if (savedCount) {
      setNotificationCount(parseInt(savedCount, 10) || 0);
    }
  }, []);

  const updateCount = (newCount) => {
    setNotificationCount(Math.max(0, newCount));
  };

  const incrementCount = () => {
    setNotificationCount(prev => prev + 1);
  };

  const decrementCount = () => {
    setNotificationCount(prev => Math.max(0, prev - 1));
  };

  const resetCount = () => {
    setNotificationCount(0);
  };

  return {
    notificationCount,
    updateCount,
    incrementCount,
    decrementCount,
    resetCount
  };
};

export default useNotificationCount;