import React from 'react';
import StatsCard from './StatsCard';
import WashPerformance from './WashPerformance';
import ServiceDistribution from './ServiceDistribution';
import ActivityFeed from './ActivityFeed';

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const handleNewAppointment = () => {
    if (onNavigate) {
      onNavigate('newappointment');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        {/* Header with search and user profile */}
        <div className="header">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input type="text" className="search-input" placeholder="Search..." />
          </div>
          <div className="user-profile">
            <div className="notification-icon">
              🔔
              <span className="notification-badge">5</span>
            </div>
            <div className="avatar">A</div>
            <div className="user-info">
              <div className="user-name">Admin</div>
              <div className="user-role">Manager</div>
            </div>
          </div>
        </div>

        {/* Greeting section */}
        <div className="greeting">
          <h1 className="greeting-title">Good morning, Admin</h1>
          <p className="greeting-subtitle">Here's what's happening with your car wash business today.</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <StatsCard 
            title="Total Washes"
            value="40,689"
            change="+8.5% from yesterday"
            icon="🚗"
            isPositive={true}
          />
          <StatsCard 
            title="Predicted Revenue"
            value="£10,293"
            change="+1.3% from past week"
            icon="📈"
            isPositive={true}
          />
          <StatsCard 
            title="Total Sales"
            value="£89,000"
            change="-4.3% from yesterday"
            icon="💰"
            isPositive={false}
          />
          <StatsCard 
            title="Upcoming Washes"
            value="2,040"
            change="+1.8% from yesterday"
            icon="📅"
            isPositive={true}
          />
        </div>

        {/* Action Cards */}
        <div className="action-grid">
          <div className="action-card" onClick={handleNewAppointment}>
            <div className="action-icon">➕</div>
            <h3 className="action-title">New Wash Appointment</h3>
          </div>
          <div className="action-card">
            <div className="action-icon">🏷️</div>
            <h3 className="action-title">Create Promotion</h3>
          </div>
          <div className="action-card">
            <div className="action-icon">📊</div>
            <h3 className="action-title">Generate Report</h3>
          </div>
        </div>

        {/* Charts Section */}
        <div className="chart-grid">
          <WashPerformance />
          <ServiceDistribution />
        </div>

        {/* Activity Feed */}
        <ActivityFeed />
      </div>
    </div>
  );
};

export default Dashboard; 