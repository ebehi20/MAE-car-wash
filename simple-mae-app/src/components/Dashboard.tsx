import React, { useState } from 'react';
import StatsCard from './StatsCard';
import WashPerformance from './WashPerformance';
import ServiceDistribution from './ServiceDistribution';
import ActivityFeed from './ActivityFeed';
import './Dashboard.css';

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [activeHeatmapTab, setActiveHeatmapTab] = useState('week');

  const handleNewAppointment = () => {
    if (onNavigate) {
      onNavigate('newappointment');
    }
  };

  const handleGenerateReport = () => {
    if (onNavigate) {
      onNavigate('reports');
    }
  };

  // Mock data for today's appointments
  const todaysAppointments = [
    { id: 1, time: '09:30 AM', customer: 'John Smith', service: 'Premium Wash', status: 'Confirmed' },
    { id: 2, time: '11:15 AM', customer: 'Emma Johnson', service: 'Deluxe Package', status: 'In Progress' },
    { id: 3, time: '01:00 PM', customer: 'Michael Brown', service: 'Interior Cleaning', status: 'Pending' },
    { id: 4, time: '02:45 PM', customer: 'Sarah Davis', service: 'Standard Wash', status: 'Confirmed' },
    { id: 5, time: '04:30 PM', customer: 'Robert Wilson', service: 'Quick Wash', status: 'Pending' }
  ];

  // Mock data for wash service performance
  const servicePerformanceData = [
    { service: 'Premium Wash', rating: 4.8, completionTime: '45 mins', satisfaction: '98%' },
    { service: 'Deluxe Package', rating: 4.6, completionTime: '60 mins', satisfaction: '95%' },
    { service: 'Standard Wash', rating: 4.5, completionTime: '30 mins', satisfaction: '92%' },
    { service: 'Quick Wash', rating: 4.3, completionTime: '15 mins', satisfaction: '88%' }
  ];

  // Mock data for peak hours
  const peakHoursData = [
    { hour: '8AM', value: 30 },
    { hour: '9AM', value: 45 },
    { hour: '10AM', value: 65 },
    { hour: '11AM', value: 80 },
    { hour: '12PM', value: 95 },
    { hour: '1PM', value: 85 },
    { hour: '2PM', value: 75 },
    { hour: '3PM', value: 90 },
    { hour: '4PM', value: 70 },
    { hour: '5PM', value: 55 },
    { hour: '6PM', value: 40 },
    { hour: '7PM', value: 25 }
  ];

  // Weekly heatmap data with rows for each hour and columns for days
  const weeklyHeatmapData = [
    { day: 'Monday', traffic: [
      { hour: '8AM', level: 'low' }, { hour: '9AM', level: 'low' }, { hour: '10AM', level: 'medium' }, 
      { hour: '11AM', level: 'medium' }, { hour: '12PM', level: 'high' }, { hour: '1PM', level: 'medium' },
      { hour: '2PM', level: 'medium' }, { hour: '3PM', level: 'high' }, { hour: '4PM', level: 'medium' },
      { hour: '5PM', level: 'low' }, { hour: '6PM', level: 'low' }, { hour: '7PM', level: 'low' }
    ]},
    { day: 'Tuesday', traffic: [
      { hour: '8AM', level: 'low' }, { hour: '9AM', level: 'medium' }, { hour: '10AM', level: 'medium' }, 
      { hour: '11AM', level: 'medium' }, { hour: '12PM', level: 'high' }, { hour: '1PM', level: 'medium' },
      { hour: '2PM', level: 'low' }, { hour: '3PM', level: 'medium' }, { hour: '4PM', level: 'medium' },
      { hour: '5PM', level: 'medium' }, { hour: '6PM', level: 'low' }, { hour: '7PM', level: 'low' }
    ]},
    { day: 'Wednesday', traffic: [
      { hour: '8AM', level: 'low' }, { hour: '9AM', level: 'medium' }, { hour: '10AM', level: 'medium' }, 
      { hour: '11AM', level: 'high' }, { hour: '12PM', level: 'high' }, { hour: '1PM', level: 'high' },
      { hour: '2PM', level: 'medium' }, { hour: '3PM', level: 'medium' }, { hour: '4PM', level: 'medium' },
      { hour: '5PM', level: 'medium' }, { hour: '6PM', level: 'medium' }, { hour: '7PM', level: 'low' }
    ]},
    { day: 'Thursday', traffic: [
      { hour: '8AM', level: 'low' }, { hour: '9AM', level: 'medium' }, { hour: '10AM', level: 'medium' }, 
      { hour: '11AM', level: 'medium' }, { hour: '12PM', level: 'high' }, { hour: '1PM', level: 'high' },
      { hour: '2PM', level: 'medium' }, { hour: '3PM', level: 'high' }, { hour: '4PM', level: 'medium' },
      { hour: '5PM', level: 'medium' }, { hour: '6PM', level: 'low' }, { hour: '7PM', level: 'low' }
    ]},
    { day: 'Friday', traffic: [
      { hour: '8AM', level: 'medium' }, { hour: '9AM', level: 'medium' }, { hour: '10AM', level: 'high' }, 
      { hour: '11AM', level: 'high' }, { hour: '12PM', level: 'very-high' }, { hour: '1PM', level: 'high' },
      { hour: '2PM', level: 'high' }, { hour: '3PM', level: 'high' }, { hour: '4PM', level: 'high' },
      { hour: '5PM', level: 'medium' }, { hour: '6PM', level: 'medium' }, { hour: '7PM', level: 'low' }
    ]},
    { day: 'Saturday', traffic: [
      { hour: '8AM', level: 'high' }, { hour: '9AM', level: 'high' }, { hour: '10AM', level: 'very-high' }, 
      { hour: '11AM', level: 'very-high' }, { hour: '12PM', level: 'high' }, { hour: '1PM', level: 'high' },
      { hour: '2PM', level: 'high' }, { hour: '3PM', level: 'very-high' }, { hour: '4PM', level: 'high' },
      { hour: '5PM', level: 'medium' }, { hour: '6PM', level: 'medium' }, { hour: '7PM', level: 'medium' }
    ]},
    { day: 'Sunday', traffic: [
      { hour: '8AM', level: 'low' }, { hour: '9AM', level: 'medium' }, { hour: '10AM', level: 'medium' }, 
      { hour: '11AM', level: 'high' }, { hour: '12PM', level: 'high' }, { hour: '1PM', level: 'medium' },
      { hour: '2PM', level: 'medium' }, { hour: '3PM', level: 'medium' }, { hour: '4PM', level: 'medium' },
      { hour: '5PM', level: 'low' }, { hour: '6PM', level: 'low' }, { hour: '7PM', level: 'low' }
    ]}
  ];

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
            <h3 className="action-title">Create Campaign</h3>
          </div>
          <div className="action-card" onClick={handleGenerateReport}>
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

        {/* Today's Appointments */}
        <div className="chart-card today-appointments">
          <div className="chart-header">
            <div className="chart-title">Today's Appointments</div>
            <div className="chart-actions">
              <button className="view-all-btn">View All</button>
            </div>
          </div>
          <div className="appointments-list">
            {todaysAppointments.map(appointment => (
              <div key={appointment.id} className={`appointment-item status-${appointment.status.toLowerCase()}`}>
                <div className="appointment-time">{appointment.time}</div>
                <div className="appointment-details">
                  <div className="appointment-customer">{appointment.customer}</div>
                  <div className="appointment-service">{appointment.service}</div>
                </div>
                <div className={`appointment-status status-${appointment.status.toLowerCase()}`}>
                  {appointment.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Performance Section */}
        <div className="chart-grid">
          {/* Wash Service Performance */}
          <div className="chart-card service-performance">
            <div className="chart-header">
              <div className="chart-title">Wash Service Performance</div>
            </div>
            <div className="performance-table-container">
              <table className="performance-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Rating</th>
                    <th>Avg. Time</th>
                    <th>Satisfaction</th>
                  </tr>
                </thead>
                <tbody>
                  {servicePerformanceData.map((service, index) => (
                    <tr key={index}>
                      <td>{service.service}</td>
                      <td>
                        <div className="rating">
                          <span className="rating-value">{service.rating}</span>
                          <span className="rating-stars">★★★★★</span>
                        </div>
                      </td>
                      <td>{service.completionTime}</td>
                      <td>
                        <div className="satisfaction-bar">
                          <div 
                            className="satisfaction-fill" 
                            style={{ width: service.satisfaction }}
                          ></div>
                          <span className="satisfaction-value">{service.satisfaction}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Peak Hours Heat Map */}
          <div className="chart-card peak-hours">
            <div className="chart-header">
              <div className="chart-title">Peak Hours Heat Map</div>
              <div className="chart-tabs">
                <div 
                  className={`chart-tab ${activeHeatmapTab === 'today' ? 'active' : ''}`}
                  onClick={() => setActiveHeatmapTab('today')}
                >
                  Today
                </div>
                <div 
                  className={`chart-tab ${activeHeatmapTab === 'week' ? 'active' : ''}`}
                  onClick={() => setActiveHeatmapTab('week')}
                >
                  Week
                </div>
                <div 
                  className={`chart-tab ${activeHeatmapTab === 'month' ? 'active' : ''}`}
                  onClick={() => setActiveHeatmapTab('month')}
                >
                  Month
                </div>
              </div>
            </div>
            <div className="heat-map-container">
              {activeHeatmapTab === 'week' && (
                <div className="weekly-heatmap">
                  <div className="heatmap-days">
                    <div className="heatmap-time"></div>
                    {weeklyHeatmapData.map((day, dayIndex) => (
                      <div key={dayIndex} className="heatmap-day">{day.day.substring(0, 3)}</div>
                    ))}
                  </div>
                  
                  <div className="heatmap-grid">
                    {peakHoursData.map((hour, hourIndex) => (
                      <div key={hourIndex} className="heatmap-row">
                        <div className="heatmap-time">{hour.hour}</div>
                        {weeklyHeatmapData.map((day, dayIndex) => {
                          const hourData = day.traffic[hourIndex];
                          return (
                            <div 
                              key={`${dayIndex}-${hourIndex}`} 
                              className={`heatmap-cell ${hourData.level}`}
                            >
                              <div className="cell-tooltip">
                                {day.day} at {hour.hour}: {hourData.level.replace('-', ' ')} traffic
                              </div>
                              {hourData.level === 'very-high' && (
                                <span style={{ color: '#fff', fontSize: '10px' }}>✓</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  
                  <div className="heat-map-legend">
                    <div className="legend-item">
                      <span className="legend-color low"></span>
                      <span>Low</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color medium"></span>
                      <span>Medium</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color high"></span>
                      <span>High</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color very-high"></span>
                      <span>Very High</span>
                    </div>
                  </div>
                </div>
              )}
              
              {activeHeatmapTab === 'today' && (
                <div className="daily-heatmap">
                  <div className="daily-chart">
                    {peakHoursData.map((hour, index) => (
                      <div key={index} className="hour-bar-container">
                        <div className="hour-label">{hour.hour}</div>
                        <div className="hour-bar-wrapper">
                          <div 
                            className="hour-bar" 
                            style={{ 
                              width: `${hour.value}%`,
                              backgroundColor: 
                                hour.value < 40 ? '#edf2f7' : 
                                hour.value < 60 ? '#bae6fd' : 
                                hour.value < 80 ? '#60a5fa' : '#2563eb',
                            }}
                          ></div>
                          <span className="hour-value">{hour.value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="heat-map-legend">
                    <div className="legend-item"><span className="legend-color low"></span>Low (0-40%)</div>
                    <div className="legend-item"><span className="legend-color medium"></span>Medium (40-60%)</div>
                    <div className="legend-item"><span className="legend-color high"></span>High (60-80%)</div>
                    <div className="legend-item"><span className="legend-color very-high"></span>Very High (80-100%)</div>
                  </div>
                </div>
              )}
              
              {activeHeatmapTab === 'month' && (
                <div className="monthly-message">
                  <p>Monthly data visualization is not yet available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 