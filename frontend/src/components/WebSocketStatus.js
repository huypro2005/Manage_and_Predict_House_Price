import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { Wifi, WifiOff, Loader } from 'lucide-react';

const WebSocketStatus = ({ showText = false, className = '' }) => {
  const { isConnected, connectionStatus } = useWebSocket();

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-green-500';
      case 'connecting':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="h-4 w-4" />;
      case 'connecting':
        return <Loader className="h-4 w-4 animate-spin" />;
      case 'error':
      case 'disconnected':
      default:
        return <WifiOff className="h-4 w-4" />;
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Real-time';
      case 'connecting':
        return 'Kết nối...';
      case 'error':
        return 'Lỗi';
      case 'disconnected':
      default:
        return 'Offline';
    }
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className={`${getStatusColor()}`}>
        {getStatusIcon()}
      </div>
      {showText && (
        <span className={`text-xs ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      )}
    </div>
  );
};

export default WebSocketStatus;
