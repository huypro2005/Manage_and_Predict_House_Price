import apiService from '../utils/api';

class AppInitializationService {
  constructor() {
    this.isInitialized = false;
    this.callbacks = {
      onUnreadCountUpdate: null,
      onFavoriteCountUpdate: null,
      onPollingStatusChange: null
    };
    this.longPollingHook = null;
  }

  // Set callbacks for updates
  setCallbacks(callbacks) {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  // Initialize app services when user is authenticated
  async initialize() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('🚀 No token found, skipping app initialization');
      return false;
    }

    if (this.isInitialized) {
      console.log('🚀 App already initialized');
      return true;
    }

    try {
      console.log('🚀 Initializing app services...');
      
      // Fetch initial data in parallel
      await Promise.all([
        this.fetchUnreadCount(),
        this.fetchFavoriteCount()
      ]);

      // Start long polling for notifications
      this.startLongPolling();

      this.isInitialized = true;
      console.log('🚀 App initialization completed');
      return true;
    } catch (error) {
      console.error('🚀 App initialization failed:', error);
      return false;
    }
  }

  // Fetch unread notifications count
  async fetchUnreadCount() {
    try {
      const data = await apiService.authenticatedGet('notifications/not-read-count/', {}, false);
      const count = Number(data?.not_readed) || 0;
      console.log('🔔 Unread count:', count);
      
      if (this.callbacks.onUnreadCountUpdate) {
        this.callbacks.onUnreadCountUpdate(count);
      }
      
      return count;
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
      return 0;
    }
  }

  // Fetch favorite properties count
  async fetchFavoriteCount() {
    try {
      const data = await apiService.authenticatedGet('favourites/listID/', {}, false);
      const count = Array.isArray(data?.data) ? data.data.length : 0;
      console.log('❤️ Favorite count:', count);
      
      if (this.callbacks.onFavoriteCountUpdate) {
        this.callbacks.onFavoriteCountUpdate(count);
      }
      
      return count;
    } catch (error) {
      console.error('Failed to fetch favorite count:', error);
      return 0;
    }
  }

  // Start long polling for notifications
  startLongPolling() {
    if (this.longPollingHook) {
      console.log('🔄 Long polling already started');
      return;
    }

    console.log('🔄 Starting long polling...');
    
    // Create long polling hook with callback to update unread count
    this.longPollingHook = useLongPollingNotifications(() => {
      this.fetchUnreadCount();
    });

    // Start polling
    this.longPollingHook.startPolling();

    // Set up polling status callback
    if (this.callbacks.onPollingStatusChange) {
      this.callbacks.onPollingStatusChange(true);
    }
  }

  // Stop long polling
  stopLongPolling() {
    if (this.longPollingHook) {
      console.log('🔄 Stopping long polling...');
      this.longPollingHook.stopPolling();
      this.longPollingHook = null;
      
      if (this.callbacks.onPollingStatusChange) {
        this.callbacks.onPollingStatusChange(false);
      }
    }
  }

  // Cleanup when user logs out
  cleanup() {
    console.log('🚀 Cleaning up app services...');
    this.stopLongPolling();
    this.isInitialized = false;
    
    // Reset callbacks
    if (this.callbacks.onUnreadCountUpdate) {
      this.callbacks.onUnreadCountUpdate(0);
    }
    if (this.callbacks.onFavoriteCountUpdate) {
      this.callbacks.onFavoriteCountUpdate(0);
    }
    if (this.callbacks.onPollingStatusChange) {
      this.callbacks.onPollingStatusChange(false);
    }
  }

  // Get current polling status
  getPollingStatus() {
    return this.longPollingHook ? this.longPollingHook.isPolling : false;
  }

  // Refresh all data
  async refresh() {
    if (!this.isInitialized) {
      return await this.initialize();
    }

    try {
      await Promise.all([
        this.fetchUnreadCount(),
        this.fetchFavoriteCount()
      ]);
      return true;
    } catch (error) {
      console.error('Failed to refresh app data:', error);
      return false;
    }
  }
}

// Create singleton instance
const appInitializationService = new AppInitializationService();

export default appInitializationService;
