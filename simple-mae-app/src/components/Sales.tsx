import React, { useState } from 'react';
import './Sales.css';
import { FaCalendarAlt, FaFileExport, FaChevronUp, FaChevronDown, FaSearch } from 'react-icons/fa';
import { MdAttachMoney, MdCarCrash, MdShowChart, MdFlag } from 'react-icons/md';

interface SalesProps {
  onNavigate?: (page: string) => void;
}

const Sales: React.FC<SalesProps> = ({ onNavigate }) => {
  const [activeTimeFilter, setActiveTimeFilter] = useState<string>('weekly');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data for sales statistics
  const salesStats = {
    totalRevenue: 74800.50,
    totalServices: 910,
    averageTicket: 82.20,
    targetAchievement: 106.7
  };

  // Mock data for revenue trend
  const revenueData = [
    { month: 'Jan', revenue: 62000 },
    { month: 'Feb', revenue: 58000 },
    { month: 'Mar', revenue: 72000 },
    { month: 'Apr', revenue: 68000 },
    { month: 'May', revenue: 78000 },
    { month: 'Jun', revenue: 81000 },
    { month: 'Jul', revenue: 75000 },
    { month: 'Aug', revenue: 85000 },
    { month: 'Sep', revenue: 93000 },
    { month: 'Oct', revenue: 98000 },
    { month: 'Nov', revenue: 105000 },
    { month: 'Dec', revenue: 112000 }
  ];

  // Mock data for popular services
  const popularServices = [
    { 
      name: 'Basic Wash', 
      icon: '🚿', 
      count: 320, 
      revenue: 9599.80, 
      avgPrice: 30.00,
      percentage: 80 
    },
    { 
      name: 'Premium Wash', 
      icon: '💦', 
      count: 280, 
      revenue: 16797.20, 
      avgPrice: 59.99,
      percentage: 70 
    },
    { 
      name: 'Deluxe Package', 
      icon: '🚘', 
      count: 165, 
      revenue: 24748.35, 
      avgPrice: 149.99,
      percentage: 90 
    },
    { 
      name: 'Interior Detail', 
      icon: '🧹', 
      count: 145, 
      revenue: 13049.55, 
      avgPrice: 90.00,
      percentage: 60 
    },
    {
      name: 'Full Detail',
      icon: '✨',
      count: 90,
      revenue: 17999.10,
      avgPrice: 199.90,
      percentage: 45
    },
    {
      name: 'Tire Shine',
      icon: '🛞',
      count: 210,
      revenue: 4197.90,
      avgPrice: 19.99,
      percentage: 75
    },
    {
      name: 'Window Treatment',
      icon: '🪟',
      count: 170,
      revenue: 5948.30,
      avgPrice: 34.99,
      percentage: 65
    },
    {
      name: 'Odor Elimination',
      icon: '💨',
      count: 85,
      revenue: 8499.15,
      avgPrice: 99.99,
      percentage: 40
    }
  ];

  // Mock transactions data
  const transactions = [
    { 
      id: 'INV-2025-001', 
      date: '15/03/2025', 
      customer: 'James Wilson', 
      service: 'Premium Wash + Interior Detail', 
      amount: 89.99, 
      method: 'Credit Card',
      status: 'Completed' 
    },
    { 
      id: 'INV-2025-002', 
      date: '15/03/2025', 
      customer: 'Sarah Johnson', 
      service: 'Deluxe Package', 
      amount: 149.99, 
      method: 'PayPal',
      status: 'Completed' 
    },
    { 
      id: 'INV-2025-003', 
      date: '14/03/2025', 
      customer: 'Michael Brown', 
      service: 'Basic Wash + Tire Shine', 
      amount: 49.99, 
      method: 'Credit Card',
      status: 'Pending' 
    },
    { 
      id: 'INV-2025-004', 
      date: '14/03/2025', 
      customer: 'Emma Davis', 
      service: 'Full Detail', 
      amount: 199.90, 
      method: 'Apple Pay',
      status: 'Completed' 
    },
    { 
      id: 'INV-2025-005', 
      date: '13/03/2025', 
      customer: 'Robert Miller', 
      service: 'Window Treatment', 
      amount: 34.99, 
      method: 'Cash',
      status: 'Completed' 
    }
  ];

  // Filter transactions based on search query and status
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      transaction.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Format currency
  const formatCurrency = (amount: number) => {
    return `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="sales-container">
      {/* Header section */}
      <div className="section-header">
        <div className="section-title-area">
          <h1 className="section-title">Sales & Revenue</h1>
          <p className="section-subtitle">Monitor your sales performance and revenue streams</p>
        </div>
        <div className="header-actions">
          <div className="date-range-picker">
            <FaCalendarAlt className="calendar-icon" />
            <span>March 2025</span>
          </div>
          <button className="export-btn">
            <FaFileExport className="export-icon" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-icon revenue-icon">
            <MdAttachMoney />
          </div>
          <div className="stats-content">
            <div className="stats-value">{formatCurrency(salesStats.totalRevenue)}</div>
            <div className="stats-title">Total Revenue</div>
            <div className="stats-comparison">
              <FaChevronUp /> <span className="positive-note">15.3% vs Feb</span>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon services-icon">
            <MdCarCrash />
          </div>
          <div className="stats-content">
            <div className="stats-value">{salesStats.totalServices}</div>
            <div className="stats-title">Total Services</div>
            <div className="stats-comparison">
              <FaChevronUp /> <span className="positive-note">8.2% vs Feb</span>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon avg-icon">
            <MdShowChart />
          </div>
          <div className="stats-content">
            <div className="stats-value">{formatCurrency(salesStats.averageTicket)}</div>
            <div className="stats-title">Average Ticket</div>
            <div className="stats-comparison">
              <FaChevronUp /> <span className="positive-note">5.7% vs Feb</span>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon target-icon">
            <MdFlag />
          </div>
          <div className="stats-content">
            <div className="stats-value">{salesStats.targetAchievement}%</div>
            <div className="stats-title">Target Achievement</div>
            <div className="stats-comparison">
              <FaChevronUp /> <span className="positive-note">Target exceeded</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="charts-section">
        <div className="chart-container">
          <div className="chart-header">
            <h2>Revenue Trend</h2>
            <div className="chart-controls">
              <button 
                className={`date-range-btn ${activeTimeFilter === 'daily' ? 'active' : ''}`}
                onClick={() => setActiveTimeFilter('daily')}
              >
                Daily
              </button>
              <button 
                className={`date-range-btn ${activeTimeFilter === 'weekly' ? 'active' : ''}`}
                onClick={() => setActiveTimeFilter('weekly')}
              >
                Weekly
              </button>
              <button 
                className={`date-range-btn ${activeTimeFilter === 'monthly' ? 'active' : ''}`}
                onClick={() => setActiveTimeFilter('monthly')}
              >
                Monthly
              </button>
            </div>
          </div>
          <div className="chart-content">
            <div className="chart-bars">
              {revenueData.map((item, index) => (
                <div key={index} className="chart-bar-container">
                  <div className="chart-bar-wrapper">
                    <div 
                      className="chart-bar revenue-bar"
                      style={{ height: `${(item.revenue / 112000) * 100}%` }}
                    ></div>
                  </div>
                  <div className="chart-bar-label">{item.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Most Popular Services */}
      <div className="service-popularity-section">
        <div className="section-header">
          <h2>Most Popular Services</h2>
          <div className="section-actions">
            <button className="view-all-btn">View All Services</button>
          </div>
        </div>
        <div className="service-popularity-grid">
          {popularServices.slice(0, 8).map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-card-header">
                <h3>{service.name}</h3>
                <div className="service-card-icon">{service.icon}</div>
              </div>
              <div className="service-metrics">
                <div className="service-metric">
                  <div className="metric-label">Count</div>
                  <div className="metric-value">{service.count}</div>
                </div>
                <div className="service-metric">
                  <div className="metric-label">Revenue</div>
                  <div className="metric-value">{formatCurrency(service.revenue)}</div>
                </div>
                <div className="service-metric">
                  <div className="metric-label">Avg. Price</div>
                  <div className="metric-value">{formatCurrency(service.avgPrice)}</div>
                </div>
              </div>
              <div className="service-popularity-bar">
                <div 
                  className="popularity-fill"
                  style={{ width: `${service.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="transactions-section">
        <div className="section-header">
          <h2>Recent Transactions</h2>
          <div className="transaction-filters">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-btn">
                <FaSearch />
              </button>
            </div>
            <select 
              className="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>
        <div className="transactions-table-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, index) => (
                  <tr key={index} className="transaction-row">
                    <td>{transaction.id}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.customer}</td>
                    <td>{transaction.service}</td>
                    <td className="amount-cell">{formatCurrency(transaction.amount)}</td>
                    <td>{transaction.method}</td>
                    <td>
                      <span className={`status-badge ${transaction.status.toLowerCase()}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="table-actions">
                      <button className="table-action-btn view-btn" title="View Details">👁️</button>
                      <button className="table-action-btn refund-btn" title="Refund">↩️</button>
                      <button className="table-action-btn print-btn" title="Print">🖨️</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="no-data-cell">
                    <div className="no-transactions-found">
                      <div className="no-results-icon">🔍</div>
                      <p>No transactions found</p>
                      <button 
                        className="reset-filters-btn"
                        onClick={() => {
                          setSearchQuery('');
                          setStatusFilter('all');
                        }}
                      >
                        Reset Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sales; 