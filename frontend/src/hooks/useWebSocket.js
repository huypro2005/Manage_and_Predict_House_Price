import { useState, useEffect } from 'react';
import webSocketService from '../services/WebSocketService';

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  useEffect(() => {
    // Cập nhật trạng thái ban đầu
    const updateStatus = () => {
      const status = webSocketService.getConnectionStatus();
      setConnectionStatus(status);
      setIsConnected(status === 'connected');
    };

    updateStatus();

    // Theo dõi thay đổi trạng thái
    const unsubscribeConnect = webSocketService.onConnect(() => {
      setIsConnected(true);
      setConnectionStatus('connected');
    });

    const unsubscribeDisconnect = webSocketService.onDisconnect(() => {
      setIsConnected(false);
      setConnectionStatus('disconnected');
    });

    return () => {
      unsubscribeConnect();
      unsubscribeDisconnect();
    };
  }, []);

  const connect = () => {
    webSocketService.connect();
  };

  const disconnect = () => {
    webSocketService.disconnect();
  };

  const send = (message) => {
    return webSocketService.send(message);
  };

  const onMessage = (callback) => {
    return webSocketService.onMessage(callback);
  };

  return {
    isConnected,
    connectionStatus,
    connect,
    disconnect,
    send,
    onMessage
  };
};
