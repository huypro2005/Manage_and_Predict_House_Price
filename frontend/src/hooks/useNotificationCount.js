import { useState, useEffect } from 'react';
import { useNotifications } from '../contexts/NotificationContext';

/**
 * Hook để quản lý số lượng thông báo chưa đọc
 * Chỉ sử dụng NotificationContext, không dùng localStorage
 */
export const useNotificationCount = () => {
  const { unreadCount } = useNotifications();

  return {
    notificationCount: unreadCount,
    updateCount: () => {}, // Deprecated - use context methods
    incrementCount: () => {}, // Deprecated - use context methods
    decrementCount: () => {}, // Deprecated - use context methods
    resetCount: () => {} // Deprecated - use context methods
  };
};

export default useNotificationCount;