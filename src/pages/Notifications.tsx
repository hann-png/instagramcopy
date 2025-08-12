import React from 'react';
import { Heart, MessageCircle, UserPlus, Clock } from 'lucide-react';

const Notifications: React.FC = () => {
  const mockNotifications = [
    {
      id: '1',
      type: 'like',
      user: 'John Doe',
      message: 'liked your post',
      time: '2 minutes ago',
      read: false,
    },
    {
      id: '2',
      type: 'comment',
      user: 'Jane Smith',
      message: 'commented on your post: "Great shot!"',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: '3',
      type: 'follow',
      user: 'Mike Johnson',
      message: 'started following you',
      time: '1 hour ago',
      read: true,
    },
    {
      id: '4',
      type: 'like',
      user: 'Sarah Wilson',
      message: 'liked your post',
      time: '2 hours ago',
      read: true,
    },
    {
      id: '5',
      type: 'comment',
      user: 'Alex Brown',
      message: 'commented on your post: "Amazing!"',
      time: '1 day ago',
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart size={20} className="text-red-500" />;
      case 'comment':
        return <MessageCircle size={20} className="text-blue-500" />;
      case 'follow':
        return <UserPlus size={20} className="text-green-500" />;
      default:
        return <Clock size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>
        
        <div className="space-y-4">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
                notification.read 
                  ? 'glass hover:bg-white/15' 
                  : 'bg-blue-50/50 border border-blue-200/50 hover:bg-blue-50/70'
              }`}
            >
              {/* User Avatar */}
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium">
                  {notification.user.charAt(0)}
                </span>
              </div>

              {/* Notification Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  {getIcon(notification.type)}
                  <p className="text-gray-800">
                    <span className="font-medium">{notification.user}</span>{' '}
                    {notification.message}
                  </p>
                </div>
                <p className="text-sm text-gray-500">{notification.time}</p>
              </div>

              {/* Unread Indicator */}
              {!notification.read && (
                <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
              )}
            </div>
          ))}
        </div>

        {/* Mark All as Read */}
        <div className="mt-6 text-center">
          <button className="px-6 py-2 glass-button rounded-xl font-medium hover:bg-white/20 transition-all duration-200">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
