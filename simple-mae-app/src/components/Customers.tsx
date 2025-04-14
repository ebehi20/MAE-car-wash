import React, { useState } from 'react';
import './Customers.css';

interface CustomersProps {
  onNavigate: (page: string) => void;
}

// Mock customer data
const mockCustomers = [
  {
    id: 'EMP001',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    phone: '07712 345678',
    vehicles: [
      {
        model: 'BMW X5',
        color: 'Black',
        type: 'SUV',
        regNumber: 'KL20 XYZ'
      },
      {
        model: 'Audi A4',
        color: 'Silver',
        type: 'Sedan',
        regNumber: 'JW19 AUD'
      }
    ],
    recentServices: [
      {
        service: 'Premium Wash',
        date: 'Feb 15, 2025'
      },
      {
        service: 'Basic Wash',
        date: 'Jan 22, 2025'
      }
    ],
    status: 'active',
    avatar: 'JW',
    totalSpend: 238.50,
    joinDate: 'Jan 10, 2023',
    lastVisit: 'Feb 15, 2025',
    loyaltyPoints: 120
  },
  {
    id: 'EMP002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '07798 765432',
    vehicles: [
      {
        model: 'Audi A4',
        color: 'Silver',
        type: 'Sedan',
        regNumber: 'AB21 CDE'
      }
    ],
    recentServices: [
      {
        service: 'Deluxe Package',
        date: 'Feb 20, 2025'
      },
      {
        service: 'Premium Wash',
        date: 'Feb 05, 2025'
      },
      {
        service: 'Deluxe Package',
        date: 'Jan 18, 2025'
      }
    ],
    status: 'active',
    avatar: 'SJ',
    totalSpend: 345.75,
    joinDate: 'Mar 5, 2023',
    lastVisit: 'Feb 20, 2025',
    loyaltyPoints: 180
  },
  {
    id: 'EMP003',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '07734 123456',
    vehicles: [
      {
        model: 'Tesla Model 3',
        color: 'White',
        type: 'Electric',
        regNumber: 'TR22 ESL'
      }
    ],
    recentServices: [
      {
        service: 'Premium Wash',
        date: 'Feb 18, 2025'
      },
      {
        service: 'Premium Wash',
        date: 'Jan 29, 2025'
      },
      {
        service: 'Basic Wash',
        date: 'Jan 10, 2025'
      }
    ],
    status: 'active',
    avatar: 'MB',
    totalSpend: 189.90,
    joinDate: 'Apr 22, 2023',
    lastVisit: 'Feb 18, 2025',
    loyaltyPoints: 95
  },
  {
    id: 'EMP004',
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    phone: '07756 987654',
    vehicles: [
      {
        model: 'Ford Focus',
        color: 'Blue',
        type: 'Hatchback',
        regNumber: 'ED19 FOR'
      }
    ],
    recentServices: [
      {
        service: 'Premium Wash',
        date: 'Feb 10, 2025'
      },
      {
        service: 'Deluxe Package',
        date: 'Jan 15, 2025'
      }
    ],
    status: 'active',
    avatar: 'ED',
    totalSpend: 154.25,
    joinDate: 'Sep 15, 2023',
    lastVisit: 'Feb 10, 2025',
    loyaltyPoints: 65
  },
  {
    id: 'EMP005',
    name: 'David Thompson',
    email: 'david.thompson@example.com',
    phone: '07725 456789',
    vehicles: [
      {
        model: 'Range Rover Sport',
        color: 'Black',
        type: 'SUV',
        regNumber: 'DT21 RRS'
      }
    ],
    recentServices: [
      {
        service: 'Deluxe Package',
        date: 'Feb 22, 2025'
      },
      {
        service: 'Interior Detail',
        date: 'Jan 25, 2025'
      }
    ],
    status: 'inactive',
    avatar: 'DT',
    totalSpend: 420.00,
    joinDate: 'Dec 3, 2022',
    lastVisit: 'Feb 22, 2025',
    loyaltyPoints: 210
  }
];

const Customers: React.FC<CustomersProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Filter customers based on search and filter type
  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.vehicles.some(v => 
        v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.regNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesFilter = 
      filterType === 'All' || 
      (filterType === 'Active' && customer.status === 'active') ||
      (filterType === 'Inactive' && customer.status === 'inactive') ||
      (filterType === 'VIP' && customer.loyaltyPoints > 150); // VIP status based on loyalty points
    
    return matchesSearch && matchesFilter;
  });

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    let comparisonResult = 0;
    
    switch(sortBy) {
      case 'name':
        comparisonResult = a.name.localeCompare(b.name);
        break;
      case 'lastVisit':
        comparisonResult = new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
        break;
      case 'joinDate':
        comparisonResult = new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
        break;
      case 'spend':
        comparisonResult = b.totalSpend - a.totalSpend;
        break;
      case 'loyalty':
        comparisonResult = b.loyaltyPoints - a.loyaltyPoints;
        break;
      default:
        comparisonResult = a.name.localeCompare(b.name);
    }
    
    return sortOrder === 'asc' ? comparisonResult : -comparisonResult;
  });
  
  // Handle sort change
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  
  // Handle schedule appointment
  const handleScheduleAppointment = (customerId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNavigate) {
      // You could store the customer ID in local storage or context to pre-fill the appointment form
      onNavigate('newappointment');
    }
  };
  
  // Stats calculations
  const totalCustomers = mockCustomers.length;
  const activeCustomers = mockCustomers.filter(c => c.status === 'active').length;
  const vipCustomers = mockCustomers.filter(c => c.loyaltyPoints > 150).length;
  const averageSpend = Math.round(mockCustomers.reduce((sum, customer) => sum + customer.totalSpend, 0) / totalCustomers);
  
  return (
    <div className="customer-management-container">
      {/* Header */}
      <div className="section-header">
        <div className="section-title-area">
          <h1>Customer Management</h1>
          <p className="section-subtitle">Manage your customer database and appointments</p>
        </div>
        <div className="header-actions">
          <button className="add-new-button">
            <span className="add-icon">+</span> Add New Customer
          </button>
          <div className="view-toggle">
            <button 
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <i className="fas fa-th"></i>
            </button>
            <button 
              className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-icon customers-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stats-content">
            <div className="stats-value blue-text">{totalCustomers}</div>
            <div className="stats-title">Total Customers</div>
          </div>
        </div>
        
        <div className="stats-card">
          <div className="stats-icon active-icon">
            <i className="fas fa-user-check"></i>
          </div>
          <div className="stats-content">
            <div className="stats-value green-text">{activeCustomers}</div>
            <div className="stats-title">Active Customers</div>
          </div>
        </div>
        
        <div className="stats-card">
          <div className="stats-icon vip-icon">
            <i className="fas fa-crown"></i>
          </div>
          <div className="stats-content">
            <div className="stats-value orange-text">{vipCustomers}</div>
            <div className="stats-title">VIP Customers</div>
          </div>
        </div>
        
        <div className="stats-card">
          <div className="stats-icon spend-icon">
            <i className="fas fa-pound-sign"></i>
          </div>
          <div className="stats-content">
            <div className="stats-value red-text">£{averageSpend}</div>
            <div className="stats-title">Avg. Spend</div>
          </div>
        </div>
      </div>
      
      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button 
          className={`filter-tab ${filterType === 'All' ? 'active' : ''}`}
          onClick={() => setFilterType('All')}
        >
          <i className="fas fa-users"></i> All Customers
        </button>
        <button 
          className={`filter-tab ${filterType === 'Active' ? 'active' : ''}`}
          onClick={() => setFilterType('Active')}
        >
          <i className="fas fa-user-check"></i> Active
        </button>
        <button 
          className={`filter-tab ${filterType === 'VIP' ? 'active' : ''}`}
          onClick={() => setFilterType('VIP')}
        >
          <i className="fas fa-crown"></i> VIP
        </button>
        <button 
          className={`filter-tab ${filterType === 'Inactive' ? 'active' : ''}`}
          onClick={() => setFilterType('Inactive')}
        >
          <i className="fas fa-user-slash"></i> Inactive
        </button>
        
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search customers by name, email, phone or vehicle..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      
      {/* Sort Options */}
      <div className="sort-options">
        <span className="sort-label">Sort by:</span>
        <button 
          className={`sort-option ${sortBy === 'name' ? 'active' : ''}`} 
          onClick={() => handleSort('name')}
        >
          Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          className={`sort-option ${sortBy === 'lastVisit' ? 'active' : ''}`} 
          onClick={() => handleSort('lastVisit')}
        >
          Last Visit {sortBy === 'lastVisit' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          className={`sort-option ${sortBy === 'spend' ? 'active' : ''}`} 
          onClick={() => handleSort('spend')}
        >
          Total Spend {sortBy === 'spend' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          className={`sort-option ${sortBy === 'loyalty' ? 'active' : ''}`} 
          onClick={() => handleSort('loyalty')}
        >
          Loyalty {sortBy === 'loyalty' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>
      
      {/* Customer List Display */}
      {viewMode === 'grid' ? (
        /* Grid View */
        <div className="customer-card-grid">
          {sortedCustomers.length === 0 ? (
            <div className="no-customers-found">
              <i className="fas fa-user-slash no-results-icon"></i>
              <p>No customers found matching your criteria.</p>
              <button className="reset-filters-btn" onClick={() => {
                setSearchQuery('');
                setFilterType('All');
              }}>Reset Filters</button>
            </div>
          ) : (
            sortedCustomers.map(customer => (
              <div 
                key={customer.id} 
                className={`customer-card ${selectedCustomer === customer.id ? 'selected' : ''}`}
                onClick={() => setSelectedCustomer(customer.id === selectedCustomer ? null : customer.id)}
              >
                <div className="customer-card-header">
                  <div className={`customer-avatar ${customer.status === 'inactive' ? 'inactive' : customer.loyaltyPoints > 150 ? 'vip' : ''}`}>
                    {customer.avatar}
                  </div>
                  <div className="customer-info">
                    <h3 className="customer-name">{customer.name}</h3>
                    <div className="customer-contact">
                      <div className="customer-phone"><i className="fas fa-phone-alt"></i> {customer.phone}</div>
                      <div className="customer-email"><i className="fas fa-envelope"></i> {customer.email}</div>
                    </div>
                    <div className="customer-badges">
                      <span className={`customer-status ${customer.status}`}>
                        {customer.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                      {customer.loyaltyPoints > 150 && (
                        <span className="vip-badge">
                          <i className="fas fa-crown"></i> VIP
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="customer-stats">
                  <div className="customer-stat">
                    <div className="stat-label"><i className="fas fa-calendar-alt"></i> Joined</div>
                    <div className="stat-value">{customer.joinDate}</div>
                  </div>
                  <div className="customer-stat">
                    <div className="stat-label"><i className="fas fa-clock"></i> Last Visit</div>
                    <div className="stat-value">{customer.lastVisit}</div>
                  </div>
                  <div className="customer-stat">
                    <div className="stat-label"><i className="fas fa-pound-sign"></i> Total Spend</div>
                    <div className="stat-value">£{customer.totalSpend.toFixed(2)}</div>
                  </div>
                  <div className="customer-stat">
                    <div className="stat-label"><i className="fas fa-star"></i> Loyalty</div>
                    <div className="stat-value">{customer.loyaltyPoints} pts</div>
                  </div>
                </div>
                
                <div className="customer-section">
                  <h4 className="section-title">
                    <i className="fas fa-car vehicles-icon"></i> VEHICLES
                  </h4>
                  <div className="vehicles-list">
                    {customer.vehicles.map((vehicle, idx) => (
                      <div key={idx} className="vehicle-item">
                        <div className="vehicle-info">
                          <span className="vehicle-model">{vehicle.model}</span>
                          <span className="vehicle-details">{vehicle.color}, {vehicle.type}</span>
                        </div>
                        <div className="vehicle-reg">{vehicle.regNumber}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="customer-section">
                  <h4 className="section-title">
                    <i className="fas fa-history services-icon"></i> RECENT SERVICES
                  </h4>
                  <div className="services-list">
                    {customer.recentServices.map((service, idx) => (
                      <div key={idx} className="service-item">
                        <div className="service-name">{service.service}</div>
                        <div className="service-date">{service.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="customer-actions">
                  <button className="action-btn edit-btn" title="Edit customer details">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    className="action-btn schedule-btn"
                    title="Schedule appointment"
                    onClick={(e) => handleScheduleAppointment(customer.id, e)}
                  >
                    <i className="fas fa-calendar-plus"></i>
                  </button>
                  <button className="action-btn message-btn" title="Send message">
                    <i className="fas fa-comment-alt"></i>
                  </button>
                  {customer.status === 'active' ? (
                    <button className="action-btn deactivate-btn" title="Deactivate customer">
                      <i className="fas fa-user-slash"></i>
                    </button>
                  ) : (
                    <button className="action-btn activate-btn" title="Activate customer">
                      <i className="fas fa-user-check"></i>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Table View */
        <div className="customer-table-container">
          <table className="customer-table">
            <thead>
              <tr>
                <th className={sortBy === 'name' ? 'active-sort' : ''} onClick={() => handleSort('name')}>
                  Customer {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>Contact</th>
                <th>Vehicles</th>
                <th className={sortBy === 'lastVisit' ? 'active-sort' : ''} onClick={() => handleSort('lastVisit')}>
                  Last Visit {sortBy === 'lastVisit' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className={sortBy === 'spend' ? 'active-sort' : ''} onClick={() => handleSort('spend')}>
                  Total Spend {sortBy === 'spend' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className={sortBy === 'loyalty' ? 'active-sort' : ''} onClick={() => handleSort('loyalty')}>
                  Loyalty {sortBy === 'loyalty' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="no-data-cell">
                    <div className="no-customers-found">
                      <i className="fas fa-user-slash no-results-icon"></i>
                      <p>No customers found matching your criteria.</p>
                      <button className="reset-filters-btn" onClick={() => {
                        setSearchQuery('');
                        setFilterType('All');
                      }}>Reset Filters</button>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedCustomers.map(customer => (
                  <tr 
                    key={customer.id} 
                    className={`customer-row ${selectedCustomer === customer.id ? 'selected' : ''} ${customer.status}`}
                    onClick={() => setSelectedCustomer(customer.id === selectedCustomer ? null : customer.id)}
                  >
                    <td className="customer-name-cell">
                      <div className="customer-name-with-avatar">
                        <div className={`table-avatar ${customer.status === 'inactive' ? 'inactive' : customer.loyaltyPoints > 150 ? 'vip' : ''}`}>
                          {customer.avatar}
                        </div>
                        <div>
                          <div className="customer-name">{customer.name}</div>
                          <div className="customer-id">{customer.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="contact-cell">
                      <div>{customer.email}</div>
                      <div>{customer.phone}</div>
                    </td>
                    <td className="vehicles-cell">
                      {customer.vehicles.map((vehicle, idx) => (
                        <div key={idx} className="table-vehicle">
                          {vehicle.model} ({vehicle.regNumber})
                        </div>
                      ))}
                    </td>
                    <td className="last-visit-cell">{customer.lastVisit}</td>
                    <td className="spend-cell">£{customer.totalSpend.toFixed(2)}</td>
                    <td className="loyalty-cell">
                      <div className="loyalty-display">
                        <span className="loyalty-points">{customer.loyaltyPoints}</span>
                        {customer.loyaltyPoints > 150 && <i className="fas fa-crown vip-icon"></i>}
                      </div>
                    </td>
                    <td className="status-cell">
                      <span className={`table-status ${customer.status}`}>
                        {customer.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <div className="table-actions">
                        <button className="table-action-btn edit-btn" title="Edit customer details">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          className="table-action-btn schedule-btn" 
                          title="Schedule appointment"
                          onClick={(e) => handleScheduleAppointment(customer.id, e)}
                        >
                          <i className="fas fa-calendar-plus"></i>
                        </button>
                        <button className="table-action-btn message-btn" title="Send message">
                          <i className="fas fa-comment-alt"></i>
                        </button>
                        {customer.status === 'active' ? (
                          <button className="table-action-btn deactivate-btn" title="Deactivate customer">
                            <i className="fas fa-user-slash"></i>
                          </button>
                        ) : (
                          <button className="table-action-btn activate-btn" title="Activate customer">
                            <i className="fas fa-user-check"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Customers; 