import React, { useState, useEffect } from 'react';
import { Customer, customerService } from '../firebase';

interface CustomersWithFirebaseProps {
  onNavigate?: (page: string) => void;
}

const CustomersWithFirebase: React.FC<CustomersWithFirebaseProps> = ({ onNavigate }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Fetch customers from Firebase
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const fetchedCustomers = await customerService.getAllCustomers();
        setCustomers(fetchedCustomers);
        setLoading(false);
      } catch (err) {
        setError('Failed to load customers. Please try again later.');
        setLoading(false);
        console.error('Error fetching customers:', err);
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers based on search query and filter type
  const filteredCustomers = customers.filter(customer => {
    // Apply search filter
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
      
    // Apply status filter
    const matchesFilter = 
      filterType === 'all' || 
      customer.status === filterType;
      
    return matchesSearch && matchesFilter;
  });

  // Handle adding a new customer
  const handleAddCustomer = async () => {
    try {
      // This would normally open a form modal
      const newCustomer: Customer = {
        name: 'New Customer',
        email: 'new.customer@example.com',
        phone: '555-000-0000',
        joinDate: new Date(),
        status: 'active',
        vehicles: []
      };
      
      const customerId = await customerService.createCustomer(newCustomer);
      
      // Refresh customer list
      const updatedCustomers = await customerService.getAllCustomers();
      setCustomers(updatedCustomers);
      
      alert(`Customer added with ID: ${customerId}`);
    } catch (err) {
      alert('Failed to add customer');
      console.error('Error adding customer:', err);
    }
  };

  // Handle customer deletion
  const handleDeleteCustomer = async (id: string) => {
    if (!id) return;
    
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await customerService.deleteCustomer(id);
        
        // Refresh customer list
        const updatedCustomers = await customerService.getAllCustomers();
        setCustomers(updatedCustomers);
        
        alert('Customer deleted successfully');
      } catch (err) {
        alert('Failed to delete customer');
        console.error('Error deleting customer:', err);
      }
    }
  };

  // Customer statistics
  const stats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.status === 'active').length,
    vipCustomers: customers.filter(c => c.status === 'vip').length,
    newThisMonth: customers.filter(c => {
      const joinDate = c.joinDate instanceof Date ? c.joinDate : new Date(c.joinDate);
      const now = new Date();
      return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
    }).length
  };

  if (loading) {
    return <div className="loading-spinner">Loading customers...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="customers-container">
      <div className="section-header">
        <div className="section-title-area">
          <h1>Customers</h1>
          <p>{customers.length} customers total</p>
        </div>
        <div className="header-actions">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          <button className="add-btn" onClick={handleAddCustomer}>
            Add Customer
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-card-title">Total Customers</div>
          <div className="stats-card-value">{stats.totalCustomers}</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-title">Active Customers</div>
          <div className="stats-card-value">{stats.activeCustomers}</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-title">VIP Customers</div>
          <div className="stats-card-value">{stats.vipCustomers}</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-title">New This Month</div>
          <div className="stats-card-value">{stats.newThisMonth}</div>
        </div>
      </div>

      <div className="filter-tabs">
        <div
          className={`filter-tab ${filterType === 'all' ? 'active' : ''}`}
          onClick={() => setFilterType('all')}
        >
          All
        </div>
        <div
          className={`filter-tab ${filterType === 'active' ? 'active' : ''}`}
          onClick={() => setFilterType('active')}
        >
          Active
        </div>
        <div
          className={`filter-tab ${filterType === 'vip' ? 'active' : ''}`}
          onClick={() => setFilterType('vip')}
        >
          VIP
        </div>
        <div
          className={`filter-tab ${filterType === 'inactive' ? 'active' : ''}`}
          onClick={() => setFilterType('inactive')}
        >
          Inactive
        </div>
      </div>

      {filteredCustomers.length === 0 ? (
        <div className="no-customers">
          <p>No customers found matching your criteria.</p>
        </div>
      ) : (
        <div className="customer-cards">
          {filteredCustomers.map(customer => (
            <div key={customer.id} className="customer-card">
              <div className="customer-info">
                <div className="customer-avatar">{customer.name.charAt(0)}</div>
                <div className="customer-details">
                  <div className="customer-name">{customer.name}</div>
                  <div className="customer-email">{customer.email}</div>
                  <div className="customer-phone">{customer.phone}</div>
                </div>
                <div className={`customer-status status-${customer.status}`}>
                  {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                </div>
              </div>
              <div className="customer-vehicles">
                <div className="section-label">Vehicles</div>
                {customer.vehicles.length === 0 ? (
                  <div className="no-data">No vehicles registered</div>
                ) : (
                  <div className="vehicle-list">
                    {customer.vehicles.map((vehicle, index) => (
                      <div key={index} className="vehicle-item">
                        {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="customer-services">
                <div className="section-label">Recent Services</div>
                {!customer.recentServices || customer.recentServices.length === 0 ? (
                  <div className="no-data">No recent services</div>
                ) : (
                  <div className="service-list">
                    {customer.recentServices.map((service, index) => (
                      <div key={index} className="service-item">
                        <div className="service-date">
                          {service.date instanceof Date 
                            ? service.date.toLocaleDateString() 
                            : new Date(service.date).toLocaleDateString()}
                        </div>
                        <div className="service-name">{service.serviceType}</div>
                        <div className="service-price">${service.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="customer-actions">
                <button className="action-btn edit-btn" onClick={() => setSelectedCustomer(customer)}>
                  Edit
                </button>
                <button className="action-btn schedule-btn" onClick={() => onNavigate && onNavigate('appointments')}>
                  Schedule
                </button>
                <button className="action-btn message-btn">
                  Message
                </button>
                <button 
                  className="action-btn delete-btn" 
                  onClick={() => customer.id && handleDeleteCustomer(customer.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomersWithFirebase; 