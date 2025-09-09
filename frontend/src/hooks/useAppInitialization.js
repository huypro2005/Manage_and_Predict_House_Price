import { useState, useEffect, useCallback } from 'react';
import appInitializationService from '../services/AppInitializationService';

/**
 * Hook để quản lý khởi tạo app và các service
 * - Tự động gọi khi có token
 * - Quản lý unread count, favorite count
 * - Thiết lập long-polling
 */
export const useAppInitialization = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [isPolling, setIsPolling] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize app services
  const initialize = useCallback(async () => {
    setLoading(true);
    try {
      const success = await appInitializationService.initialize();
      setIsInitialized(success);
      return success;
    } catch (error) {
      console.error('Failed to initialize app:', error);
      setIsInitialized(false);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cleanup when component unmounts or user logs out
  const cleanup = useCallback(() => {
    appInitializationService.cleanup();
    setIsInitialized(false);
    setUnreadCount(0);
    setFavoriteCount(0);
    setIsPolling(false);
  }, []);

  // Refresh all data
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const success = await appInitializationService.refresh();
      return success;
    } catch (error) {
      console.error('Failed to refresh app data:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Set up callbacks and initialize on mount
  useEffect(() => {
    // Set up callbacks
    appInitializationService.setCallbacks({
      onUnreadCountUpdate: setUnreadCount,
      onFavoriteCountUpdate: setFavoriteCount,
      onPollingStatusChange: setIsPolling
    });

    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      initialize();
    }

    // Listen for storage changes (login/logout in other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        if (e.newValue) {
          // User logged in
          initialize();
        } else {
          // User logged out
          cleanup();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      cleanup();
    };
  }, [initialize, cleanup]);

  return {
    // State
    unreadCount,
    favoriteCount,
    isPolling,
    isInitialized,
    loading,
    
    // Actions
    initialize,
    cleanup,
    refresh,
    
    // Service methods
    fetchUnreadCount: () => appInitializationService.fetchUnreadCount(),
    fetchFavoriteCount: () => appInitializationService.fetchFavoriteCount(),
    getPollingStatus: () => appInitializationService.getPollingStatus()
  };
};

export default useAppInitialization;
