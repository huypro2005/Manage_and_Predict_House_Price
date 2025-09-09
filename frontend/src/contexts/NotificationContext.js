import React, { createContext, useContext, useState, useCallback } from 'react';
import apiService from '../utils/api';
import { useAppInitialization } from '../hooks/useAppInitialization';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Use app initialization service for unread count and polling
  const { unreadCount, isPolling, fetchUnreadCount } = useAppInitialization();

  // Fetch notifications via HTTP
  const fetchNotifications = useCallback(async (page = 1, append = false) => {
    try {
      setLoading(true);
      const data = await apiService.authenticatedGet(`notifications/?page=${page}`, {}, false);
      console.log('🔔 API Response:', data);
      
      // Handle nested structure: results[].notification
      const results = Array.isArray(data?.results) ? data.results : [];
      const normalized = results.map((item) => {
        const n = item.notification || item; // Handle both structures
        return {
          id: n.id,
          type: n.type,
          message: n.message,
          isRead: !!n.is_read,
          is_read: !!n.is_read,
          url: n.url,
          created_at: n.created_at,
          timestamp: n.created_at,
          image_representation: n.image_representation,
          ranges: n.ranges,
          user: n.user,
        };
      });
      
      if (append) {
        setNotifications(prev => [...prev, ...normalized]);
      } else {
        setNotifications(normalized);
      }
      
      setNextPage(data?.next);
      console.log('🔔 Processed notifications:', normalized.length);
    } catch (e) {
      console.error('Failed to fetch notifications:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load more notifications
  const loadMoreNotifications = useCallback(async () => {
    if (nextPage && !loading) {
      const pageNumber = new URL(nextPage).searchParams.get('page');
      if (pageNumber) {
        await fetchNotifications(parseInt(pageNumber), true);
      }
    }
  }, [nextPage, loading, fetchNotifications]);

  const markAsRead = async (notificationId) => {
    // Optimistic update
    setNotifications(prev => prev.map(notif => notif.id === notificationId ? { ...notif, isRead: true, is_read: true } : notif));
    
    try {
      await apiService.authenticatedPut(`notifications/${notificationId}/`, { action: 'readed' });
      // App initialization service will handle unread count update via long-polling
    } catch (e) {
      // Revert if failed
      setNotifications(prev => prev.map(notif => notif.id === notificationId ? { ...notif, isRead: false, is_read: false } : notif));
      console.error('Failed to mark notification as read:', e);
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
    setNextPage(null);
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  };

  const sendContactRequest = useCallback(async (propertyId, message) => {
    try {
      await apiService.authenticatedPost('contact-requests/', { property: propertyId, message });
      return { success: true };
    } catch (e) {
      return { success: false, error: e?.message || 'Failed to send contact request' };
    }
  }, []);

  const value = {
    notifications,
    unreadCount,
    isPolling,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    requestNotificationPermission,
    fetchNotifications,
    fetchUnreadCount,
    sendContactRequest,
    loadMoreNotifications,
    hasMore: !!nextPage,
    loading
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};