import { baseUrlWebsocket } from '../base';

class WebSocketService {
  constructor() {
    this.ws = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000; // 1 second
    this.listeners = new Set();
    this.onMessageCallbacks = new Set();
    this.onConnectCallbacks = new Set();
    this.onDisconnectCallbacks = new Set();
  }

  // Kết nối WebSocket
  connect() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connected');
      return;
    }

    if (this.ws && this.ws.readyState === WebSocket.CONNECTING) {
      console.log('WebSocket is already connecting...');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, cannot connect WebSocket');
      return;
    }

    try {
      const wsUrl = `${baseUrlWebsocket}notifications/?token=${encodeURIComponent(token)}`;
      console.log('🔌 Connecting to WebSocket:', wsUrl);
      
      // Đóng connection cũ nếu có
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
      
      this.ws = new WebSocket(wsUrl);
      this.setupEventHandlers();
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      this.handleReconnect();
    }
  }

  // Thiết lập event handlers
  setupEventHandlers() {
    this.ws.onopen = () => {
      console.log('WebSocket connected successfully');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.notifyConnectCallbacks();
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('📨 WebSocket message received:', data);
        console.log('📨 Message type:', data.type);
        console.log('📨 Message data:', JSON.stringify(data, null, 2));
        this.notifyMessageCallbacks(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.ws.onclose = (event) => {
      console.log('WebSocket connection closed:', event.code, event.reason);
      this.isConnected = false;
      this.notifyDisconnectCallbacks();
      
      // Tự động reconnect nếu không phải do lỗi authentication
      if (event.code !== 1000 && event.code !== 1001) {
        this.handleReconnect();
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.isConnected = false;
    };
  }

  // Xử lý reconnect
  handleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
    
    setTimeout(() => {
      this.connect();
    }, this.reconnectDelay * this.reconnectAttempts);
  }

  // Gửi message
  send(message) {
    console.log('📤 Sending WebSocket message:', message);
    console.log('📤 Message type:', message.type);
    console.log('📤 WebSocket state:', this.ws ? this.ws.readyState : 'No WebSocket instance');
    
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const messageString = JSON.stringify(message);
      console.log('📤 Sending message string:', messageString);
      this.ws.send(messageString);
      console.log('✅ Message sent successfully');
      return true;
    } else {
      console.warn('❌ WebSocket is not connected, cannot send message');
      console.warn('❌ WebSocket state:', this.ws ? this.ws.readyState : 'No WebSocket instance');
      return false;
    }
  }

  // Ngắt kết nối
  disconnect() {
    if (this.ws) {
      this.ws.close(1000, 'User logout');
      this.ws = null;
      this.isConnected = false;
      this.reconnectAttempts = 0;
    }
  }

  // Kiểm tra trạng thái kết nối
  getConnectionStatus() {
    if (!this.ws) return 'disconnected';
    
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return 'connecting';
      case WebSocket.OPEN:
        return 'connected';
      case WebSocket.CLOSING:
        return 'closing';
      case WebSocket.CLOSED:
        return 'disconnected';
      default:
        return 'unknown';
    }
  }

  // Callback listeners
  onMessage(callback) {
    this.onMessageCallbacks.add(callback);
    return () => this.onMessageCallbacks.delete(callback);
  }

  onConnect(callback) {
    this.onConnectCallbacks.add(callback);
    return () => this.onConnectCallbacks.delete(callback);
  }

  onDisconnect(callback) {
    this.onDisconnectCallbacks.add(callback);
    return () => this.onDisconnectCallbacks.delete(callback);
  }

  // Notify callbacks
  notifyMessageCallbacks(data) {
    this.onMessageCallbacks.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error in message callback:', error);
      }
    });
  }

  notifyConnectCallbacks() {
    this.onConnectCallbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Error in connect callback:', error);
      }
    });
  }

  notifyDisconnectCallbacks() {
    this.onDisconnectCallbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Error in disconnect callback:', error);
      }
    });
  }
}

// Tạo singleton instance
const webSocketService = new WebSocketService();

export default webSocketService;
