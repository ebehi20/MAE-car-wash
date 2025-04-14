import React from 'react';

interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  userRole?: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentPage, userRole = 'admin' }) => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-icon">⚙️</span>
        AutoPulse
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-title">MANAGEMENT</div>
        <ul className="sidebar-menu">
          <li 
            className={`sidebar-menu-item ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => onNavigate('dashboard')}
          >
            <span className="sidebar-icon">📊</span>
            Dashboard
          </li>
          <li 
            className={`sidebar-menu-item ${currentPage === 'bookings' ? 'active' : ''}`}
            onClick={() => onNavigate('bookings')}
          >
            <span className="sidebar-icon">📅</span>
            Upcoming Bookings
          </li>
          <li 
            className={`sidebar-menu-item ${currentPage === 'sales' ? 'active' : ''}`}
            onClick={() => onNavigate('sales')}
          >
            <span className="sidebar-icon">💵</span>
            Sales
          </li>
          <li 
            className={`sidebar-menu-item ${currentPage === 'juneai' ? 'active' : ''}`}
            onClick={() => onNavigate('juneai')}
          >
            <span className="sidebar-icon">🤖</span>
            June AI
          </li>
          <li 
            className={`sidebar-menu-item ${currentPage === 'reports' ? 'active' : ''}`}
            onClick={() => onNavigate('reports')}
          >
            <span className="sidebar-icon">📋</span>
            Reports
          </li>
          <li 
            className={`sidebar-menu-item ${currentPage === 'customers' ? 'active' : ''}`}
            onClick={() => onNavigate('customers')}
          >
            <span className="sidebar-icon">🚗</span>
            Customers
          </li>
          {userRole === 'admin' && (
            <li 
              className={`sidebar-menu-item ${currentPage === 'staff' ? 'active' : ''}`}
              onClick={() => onNavigate('staff')}
            >
              <span className="sidebar-icon">👥</span>
              Staff
            </li>
          )}
        </ul>
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-title">OPERATIONS</div>
        <ul className="sidebar-menu">
          {(userRole === 'admin' || userRole === 'staff') && (
            <li 
              className={`sidebar-menu-item ${currentPage === 'inventory' ? 'active' : ''}`}
              onClick={() => onNavigate('inventory')}
            >
              <span className="sidebar-icon">🧴</span>
              Supplies
            </li>
          )}
          <li 
            className={`sidebar-menu-item ${currentPage === 'services' ? 'active' : ''}`}
            onClick={() => onNavigate('services')}
          >
            <span className="sidebar-icon">🚿</span>
            Services
          </li>
          {userRole === 'admin' && (
            <li 
              className={`sidebar-menu-item ${currentPage === 'marketing' ? 'active' : ''}`}
              onClick={() => onNavigate('marketing')}
            >
              <span className="sidebar-icon">📣</span>
              Marketing
            </li>
          )}
        </ul>
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-title">SYSTEM</div>
        <ul className="sidebar-menu">
          {userRole === 'admin' && (
            <li 
              className={`sidebar-menu-item ${currentPage === 'settings' ? 'active' : ''}`}
              onClick={() => onNavigate('settings')}
            >
              <span className="sidebar-icon">⚙️</span>
              Settings
            </li>
          )}
          <li 
            className={`sidebar-menu-item ${currentPage === 'notifications' ? 'active' : ''}`}
            onClick={() => onNavigate('notifications')}
          >
            <span className="sidebar-icon">🔔</span>
            Notifications
          </li>
          <li 
            className="sidebar-menu-item"
            onClick={() => onNavigate('logout')}
          >
            <span className="sidebar-icon">🚪</span>
            Logout
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar; 