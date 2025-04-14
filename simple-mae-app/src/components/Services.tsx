import React, { useState } from 'react';
import './Services.css';
import { FaPlus, FaCog, FaChartBar, FaTags } from 'react-icons/fa';

interface ServicesProps {
  onNavigate?: (page: string) => void;
}

interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  duration: number;
  status: 'Active' | 'Inactive';
  icon: string;
  tag?: string;
  salesPercentage?: number;
}

const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>('Services');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('All');

  // Mock services data
  const services: Service[] = [
    {
      id: '001',
      name: 'Basic Wash',
      price: 15,
      description: 'Exterior wash, wheel cleaning, and basic interior vacuum. Quick but thorough clean for your vehicle.',
      category: 'Wash',
      duration: 15,
      status: 'Active',
      icon: '🧽',
      tag: 'Most Popular',
      salesPercentage: 31
    },
    {
      id: '002',
      name: 'Premium Wash',
      price: 25,
      description: 'Basic wash plus waxing, tire shine, and interior detailing. Makes your car look and feel like new.',
      category: 'Wash',
      duration: 25,
      status: 'Active',
      icon: '🚗',
      tag: 'Trending',
      salesPercentage: 24
    },
    {
      id: '003',
      name: 'Deluxe Package',
      price: 45,
      description: 'Premium wash plus hand polish, paint protection, and deep interior cleaning. The ultimate car care package.',
      category: 'Package',
      duration: 45,
      status: 'Active',
      icon: '✨',
      tag: 'Featured',
      salesPercentage: 20
    },
    {
      id: '004',
      name: 'Interior Detail',
      price: 35,
      description: 'Deep cleaning of all interior surfaces, including seats, dashboard, and carpets.',
      category: 'Detail',
      duration: 45,
      status: 'Active',
      icon: '🧹',
      tag: '',
      salesPercentage: 15
    },
    {
      id: '005',
      name: 'Glass Cleaner',
      price: 10,
      description: 'Professional cleaning of all windows and mirrors, interior and exterior.',
      category: 'Add-on',
      duration: 10,
      status: 'Active',
      icon: '🧪',
      tag: '',
      salesPercentage: 0
    },
    {
      id: '006',
      name: 'Tire Shine',
      price: 5,
      description: 'Professional application of tire shine product for a fresh, clean look.',
      category: 'Add-on',
      duration: 5,
      status: 'Active',
      icon: '🛞',
      tag: '',
      salesPercentage: 0
    }
  ];

  // Format currency
  const formatCurrency = (amount: number) => {
    return `£${amount}`;
  };

  // Filter services based on search query and filter type
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'All' || service.status === filterType;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="services-container">
      <div className="services-header">
        <div className="services-title-section">
          <h1 className="services-title">Services Management</h1>
        </div>
        <button className="add-service-btn">
          <FaPlus /> Add New Service
        </button>
      </div>

      <div className="services-tabs">
        <button 
          className={`services-tab ${activeTab === 'Services' ? 'active' : ''}`}
          onClick={() => setActiveTab('Services')}
        >
          Services
        </button>
        <button 
          className={`services-tab ${activeTab === 'Packages' ? 'active' : ''}`}
          onClick={() => setActiveTab('Packages')}
        >
          Packages
        </button>
        <button 
          className={`services-tab ${activeTab === 'Analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('Analytics')}
        >
          Analytics
        </button>
        <button 
          className={`services-tab ${activeTab === 'Settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('Settings')}
        >
          Settings
        </button>
      </div>

      <div className="services-grid">
        {filteredServices.map(service => (
          <div key={service.id} className="service-card">
            {service.tag && (
              <div className={`service-tag ${service.tag.toLowerCase().replace(/\s+/g, '-')}`}>
                {service.tag}
              </div>
            )}
            <div className="service-status-label">
              <span className={`status-indicator ${service.status.toLowerCase()}`}></span>
              {service.status}
            </div>
            <div className="service-icon">
              {service.icon}
            </div>
            <div className="service-details">
              <h3 className="service-name">{service.name}</h3>
              <div className="service-category">{service.category}</div>
              <p className="service-description">{service.description}</p>
              <div className="service-meta">
                <div className="service-price">{formatCurrency(service.price)}</div>
                <div className="service-duration">{service.duration} mins</div>
              </div>
              <div className="service-actions">
                <button className="service-action-btn">
                  <FaCog />
                </button>
                {service.salesPercentage && service.salesPercentage > 0 && (
                  <div className="service-stats">
                    <FaChartBar />
                    <span>{service.salesPercentage}% of sales</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services; 