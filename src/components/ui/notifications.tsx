import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface AppNotification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
}

interface NotificationsProps {
  notifications: AppNotification[];
  onRemove: (id: string) => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ notifications, onRemove }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'error': return 'bg-red-50 border-red-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={onRemove}
          getIcon={getIcon}
          getBackgroundColor={getBackgroundColor}
        />
      ))}
    </div>
  );
};

const NotificationItem: React.FC<{
  notification: AppNotification;
  onRemove: (id: string) => void;
  getIcon: (type: string) => React.ReactNode;
  getBackgroundColor: (type: string) => string;
}> = ({ notification, onRemove, getIcon, getBackgroundColor }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onRemove(notification.id), 300);
    }, notification.duration || 5000);

    return () => clearTimeout(timer);
  }, [notification.id, notification.duration, onRemove]);

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg transition-all duration-300 min-w-[320px] ${
        getBackgroundColor(notification.type)
      } ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
      {getIcon(notification.type)}
      <span className="flex-1 text-sm font-medium text-gray-800">
        {notification.message}
      </span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onRemove(notification.id), 300);
        }}
        className="text-gray-400 hover:text-gray-600"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
