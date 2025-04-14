import React, { useState } from 'react';
import './Notifications.css';

interface NotificationsProps {
  onNavigate: (page: string) => void;
}

interface Notification {
  id: number;
  type: 'appointment' | 'system' | 'marketing' | 'inventory' | 'payment' | 'customer';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority?: 'high' | 'medium' | 'low';
}

const Notifications: React.FC<NotificationsProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'appointment',
      title: 'New Appointment',
      message: 'John Smith scheduled a Premium Wash for tomorrow at 2:00 PM',
      time: '10 minutes ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 2,
      type: 'system',
      title: 'System Update',
      message: 'The system has been updated to version 2.4.0',
      time: '1 hour ago',
      read: false,
      priority: 'low'
    },
    {
      id: 3,
      type: 'marketing',
      title: 'Campaign Results',
      message: 'Summer Special campaign has reached 75% open rate',
      time: '3 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'inventory',
      title: 'Low Stock Alert',
      message: 'Premium Wax is running low (3 units remaining)',
      time: '5 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: 5,
      type: 'appointment',
      title: 'Appointment Cancelled',
      message: 'Emily Johnson cancelled her appointment for today at 4:30 PM',
      time: 'Yesterday',
      read: true
    },
    {
      id: 6,
      type: 'payment',
      title: 'Payment Received',
      message: 'You received a payment of $89.99 for Order #5432',
      time: 'Yesterday',
      read: true
    },
    {
      id: 7,
      type: 'customer',
      title: 'New Customer Registration',
      message: 'Michael Garcia registered as a new customer',
      time: '2 days ago',
      read: true
    },
    {
      id: 8,
      type: 'inventory',
      title: 'Item Restocked',
      message: 'Interior Cleaner has been restocked (+20 units)',
      time: '3 days ago',
      read: true
    }
  ]);

  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : notifications.filter(notification => notification.type === activeFilter);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'appointment':
        return '📅';
      case 'system':
        return '⚙️';
      case 'marketing':
        return '📣';
      case 'inventory':
        return '📦';
      case 'payment':
        return '💵';
      case 'customer':
        return '👤';
      default:
        return '🔔';
    }
  };

  const getPriorityIndicator = (priority?: string) => {
    if (!priority) return null;
    
    return (
      <span className={`priority-indicator ${priority}`}>
        {priority === 'high' ? '!' : priority === 'medium' ? '•' : ''}
      </span>
    );
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <div className="page-title">
          <h1>Notifications</h1>
          <span className="unread-badge">{unreadCount} unread</span>
        </div>
        <div className="header-actions">
          <button 
            className="action-btn mark-all-btn"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </button>
          <button 
            className="action-btn clear-all-btn"
            onClick={clearAllNotifications}
            disabled={notifications.length === 0}
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="notifications-filters">
        <button 
          className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-tab ${activeFilter === 'appointment' ? 'active' : ''}`}
          onClick={() => setActiveFilter('appointment')}
        >
          <span className="filter-icon">📅</span>
          Appointments
        </button>
        <button 
          className={`filter-tab ${activeFilter === 'system' ? 'active' : ''}`}
          onClick={() => setActiveFilter('system')}
        >
          <span className="filter-icon">⚙️</span>
          System
        </button>
        <button 
          className={`filter-tab ${activeFilter === 'marketing' ? 'active' : ''}`}
          onClick={() => setActiveFilter('marketing')}
        >
          <span className="filter-icon">📣</span>
          Marketing
        </button>
        <button 
          className={`filter-tab ${activeFilter === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveFilter('inventory')}
        >
          <span className="filter-icon">📦</span>
          Inventory
        </button>
        <button 
          className={`filter-tab ${activeFilter === 'payment' ? 'active' : ''}`}
          onClick={() => setActiveFilter('payment')}
        >
          <span className="filter-icon">💵</span>
          Payments
        </button>
        <button 
          className={`filter-tab ${activeFilter === 'customer' ? 'active' : ''}`}
          onClick={() => setActiveFilter('customer')}
        >
          <span className="filter-icon">👤</span>
          Customers
        </button>
      </div>

      <div className="notifications-list">
        {filteredNotifications.map(notification => (
          <div 
            key={notification.id} 
            className={`notification-card ${!notification.read ? 'unread' : ''} ${notification.priority ? `priority-${notification.priority}` : ''}`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="notification-icon">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="notification-content">
              <div className="notification-header">
                <h3>{notification.title}</h3>
                <div className="notification-meta">
                  {getPriorityIndicator(notification.priority)}
                  <span className="notification-time">{notification.time}</span>
                </div>
              </div>
              <p className="notification-message">{notification.message}</p>
            </div>
            {!notification.read && <span className="unread-indicator"></span>}
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔔</div>
            <h3>No notifications</h3>
            <p>When you receive notifications, they will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications; 