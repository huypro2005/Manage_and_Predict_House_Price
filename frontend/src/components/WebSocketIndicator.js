import React from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { Wifi, WifiOff } from 'lucide-react';

const WebSocketIndicator = ({ showText = false, className = '' }) => {
  const { isConnected } = useNotifications();

  const getStatusColor = () => {
    return isConnected ? 'text-green-500' : 'text-red-500';
  };

  const getStatusIcon = () => {
    if (isConnected) {
      return <Wifi className="h-4 w-4" />;
    } else {
      return <WifiOff className="h-4 w-4" />;
    }
  };

  const getStatusText = () => {
    return isConnected ? 'Real-time' : 'Offline';
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

export default WebSocketIndicator;
