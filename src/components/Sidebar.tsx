import React from 'react'

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-icon">⚙️</span>
        MAE
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-title">MANAGEMENT</div>
        <ul className="sidebar-menu">
          <li className="sidebar-menu-item active">
            <span className="sidebar-icon">📊</span>
            Dashboard
          </li>
          <li className="sidebar-menu-item">
            <span className="sidebar-icon">📈</span>
            Sales
          </li>
          <li className="sidebar-menu-item">
            <span className="sidebar-icon">🤖</span>
            June AI
          </li>
          <li className="sidebar-menu-item">
            <span className="sidebar-icon">📝</span>
            Reports
          </li>
          <li className="sidebar-menu-item">
            <span className="sidebar-icon">👥</span>
            Customers
          </li>
        </ul>
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-title">OPERATIONS</div>
        <ul className="sidebar-menu">
          <li className="sidebar-menu-item">
            <span className="sidebar-icon">🚿</span>
            Services
          </li>
          <li className="sidebar-menu-item">
            <span className="sidebar-icon">📅</span>
            Appointments
          </li>
        </ul>
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-title">SYSTEM</div>
        <ul className="sidebar-menu">
          <li className="sidebar-menu-item">
            <span className="sidebar-icon">⚙️</span>
            Settings
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar 