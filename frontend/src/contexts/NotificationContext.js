import React, { createContext, useContext, useState, useEffect } from 'react';
import webSocketService from '../services/WebSocketService';

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
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    const savedUnreadCount = localStorage.getItem('unreadCount');
    
    if (savedNotifications) {
      try {
        const parsedNotifications = JSON.parse(savedNotifications);
        setNotifications(parsedNotifications);
      } catch (error) {
        console.error('Error parsing saved notifications:', error);
      }
    }
    
    if (savedUnreadCount) {
      setUnreadCount(parseInt(savedUnreadCount, 10) || 0);
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('unreadCount', unreadCount.toString());
  }, [unreadCount]);

  // Connect to WebSocket using global service
  const connectWebSocket = () => {
    webSocketService.connect();
  };

  const disconnectWebSocket = () => {
    webSocketService.disconnect();
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
    setUnreadCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem('notifications');
    localStorage.removeItem('unreadCount');
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  };

  useEffect(() => {
    // Request notification permission on mount
    requestNotificationPermission();
    
    // Listen for test notification events (development only)
    const handleTestNotification = (event) => {
      console.log('Test notification event received:', event.detail);
      // Simulate WebSocket message
      const testData = event.detail;
      if (testData.type === 'contact_request') {
        // Process the test notification the same way as real WebSocket messages
        const newNotification = {
          id: testData.id || Date.now(),
          type: 'contact_request',
          property: testData.property,
          message: testData.message,
          from_username: testData.from_username,
          timestamp: testData.timestamp || new Date().toISOString(),
          isRead: false,
          title: `Yêu cầu liên hệ từ ${testData.from_username}`,
          property_id: testData.property?.id
        };
        
        setNotifications(prev => [newNotification, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        // Show browser notification
        if (Notification.permission === 'granted') {
          const notification = new Notification('Yêu cầu liên hệ mới (Test)', {
            body: `${testData.from_username} muốn liên hệ về: ${testData.property.title}`,
            icon: '/favicon.ico',
            tag: `test_contact_request_${testData.property.id}_${testData.from_username}`
          });
          
          setTimeout(() => {
            notification.close();
          }, 5000);
        }
        
        // Play notification sound
        try {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
          console.log('Web Audio API not available:', e);
        }
      }
    };

    if (process.env.NODE_ENV === 'development') {
      window.addEventListener('test-notification', handleTestNotification);
    }
    
    // Set up WebSocket event listeners
    const unsubscribeMessage = webSocketService.onMessage((data) => {
      console.log('🔔 NotificationContext - Received WebSocket message:', data);
      console.log('🔔 Message type:', data.type);
      console.log('🔔 Full data:', JSON.stringify(data, null, 2));
      
      if (data.type === 'contact_request') {
        console.log('📞 Processing contact_request notification...');
        
        // Tạo notification object với đầy đủ thông tin từ server
        const newNotification = {
          id: data.id || `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: 'contact_request',
          property: data.property,
          message: data.message,
          from_username: data.from_username,
          timestamp: data.timestamp || new Date().toISOString(),
          isRead: false,
          // Thêm các trường khác từ server response
          title: `Yêu cầu liên hệ từ ${data.from_username}`,
          property_id: data.property?.id,
          created_at: data.timestamp || new Date().toISOString()
        };
        
        console.log('📞 Created notification object:', newNotification);
        
        // Kiểm tra xem notification đã tồn tại chưa để tránh duplicate
        setNotifications(prev => {
          const exists = prev.some(notif => 
            notif.type === 'contact_request' && 
            notif.property?.id === data.property?.id &&
            notif.from_username === data.from_username &&
            Math.abs(new Date(notif.timestamp) - new Date(data.timestamp)) < 10000 // 10 giây
          );
          
          if (exists) {
            console.log('⚠️ Duplicate notification detected, skipping...');
            return prev;
          }
          
          console.log('✅ Adding new notification to list');
          const updatedNotifications = [newNotification, ...prev];
          console.log('📊 Total notifications after add:', updatedNotifications.length);
          return updatedNotifications;
        });
        
        setUnreadCount(prev => {
          const newCount = prev + 1;
          console.log('📊 Unread count updated:', prev, '->', newCount);
          return newCount;
        });
        
        // Show browser notification if permission is granted
        if (Notification.permission === 'granted') {
          console.log('🔔 Showing browser notification...');
          const notification = new Notification('Yêu cầu liên hệ mới', {
            body: `${data.from_username} muốn liên hệ về: ${data.property.title}`,
            icon: '/favicon.ico',
            tag: `contact_request_${data.property.id}_${data.from_username}`,
            requireInteraction: false
          });
          
          // Auto close notification after 5 seconds
          setTimeout(() => {
            notification.close();
          }, 5000);
        } else {
          console.log('⚠️ Browser notification permission not granted');
        }
        
        // Phát âm thanh thông báo sử dụng Web Audio API
        try {
          console.log('🔊 Playing notification sound...');
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
          console.log('⚠️ Web Audio API not available:', e);
        }
      } else {
        console.log('ℹ️ Unknown notification type:', data.type);
      }
    });

    const unsubscribeConnect = webSocketService.onConnect(() => {
      console.log('WebSocket connected');
      setIsConnected(true);
    });

    const unsubscribeDisconnect = webSocketService.onDisconnect(() => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    });

    // Connect to WebSocket
    connectWebSocket();

    // Cleanup on unmount
    return () => {
      unsubscribeMessage();
      unsubscribeConnect();
      unsubscribeDisconnect();
      disconnectWebSocket();
      
      // Remove test event listener
      if (process.env.NODE_ENV === 'development') {
        window.removeEventListener('test-notification', handleTestNotification);
      }
    };
  }, []);

  // Reconnect when token changes (user logs in/out)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      if (token) {
        // User logged in, connect WebSocket
        connectWebSocket();
      } else {
        // User logged out, disconnect WebSocket and clear notifications
        disconnectWebSocket();
        clearNotifications();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const value = {
    notifications,
    unreadCount,
    isConnected,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    requestNotificationPermission
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
