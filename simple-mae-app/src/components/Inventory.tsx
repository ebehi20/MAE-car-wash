import React, { useState } from 'react';
import './Inventory.css';
import { FaBoxOpen, FaSearch, FaChevronUp, FaChevronDown, FaPlus, FaFileImport, FaFileExport, FaPen, FaArrowDown, FaEllipsisH } from 'react-icons/fa';

interface InventoryProps {
  onNavigate?: (page: string) => void;
}

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stockQty: number;
  value: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  reorderLevel: number;
  icon: string;
}

const Inventory: React.FC<InventoryProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>('All Items');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [timeRange, setTimeRange] = useState<string>('Last 30 days');
  const [categoryView, setCategoryView] = useState<string>('By Quantity');

  // Mock inventory stats
  const inventoryStats = {
    totalProducts: 156,
    totalValue: 28450,
    lowStockItems: 8,
    pendingOrders: 5,
    newProductsThisMonth: 12,
    valueIncrease: 6.2,
    lowStockDecrease: 3,
    newOrdersPlaced: 2
  };

  // Mock inventory items
  const inventoryItems: InventoryItem[] = [
    {
      id: '001',
      name: 'Premium Wash Detergent',
      category: 'Cleaning Supplies',
      stockQty: 48,
      value: 960,
      status: 'In Stock',
      reorderLevel: 15,
      icon: '🧴'
    },
    {
      id: '002',
      name: 'Wash Mitts',
      category: 'Tools & Accessories',
      stockQty: 30,
      value: 300,
      status: 'In Stock',
      reorderLevel: 15,
      icon: '🧤'
    },
    {
      id: '003',
      name: 'Clay Bar Kit',
      category: 'Tools & Accessories',
      stockQty: 8,
      value: 320,
      status: 'Low Stock',
      reorderLevel: 10,
      icon: '📏'
    },
    {
      id: '004',
      name: 'Car Wax',
      category: 'Cleaning Supplies',
      stockQty: 22,
      value: 440,
      status: 'In Stock',
      reorderLevel: 12,
      icon: '✨'
    },
    {
      id: '005',
      name: 'Glass Cleaner',
      category: 'Chemicals',
      stockQty: 18,
      value: 180,
      status: 'In Stock',
      reorderLevel: 10,
      icon: '🧪'
    },
    {
      id: '006',
      name: 'Tire Shine',
      category: 'Chemicals',
      stockQty: 5,
      value: 100,
      status: 'Low Stock',
      reorderLevel: 8,
      icon: '🛞'
    }
  ];

  // Filter inventory items based on active tab and search query
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = 
      activeTab === 'All Items' || 
      item.category === activeTab ||
      (activeTab === 'Low Stock' && item.status === 'Low Stock');
    
    return matchesSearch && matchesTab;
  });

  // Mock data for inventory value trend
  const trendData = [
    { date: 'Mar 1', value: 25000 },
    { date: 'Mar 5', value: 25200 },
    { date: 'Mar 10', value: 25800 },
    { date: 'Mar 15', value: 26500 },
    { date: 'Mar 20', value: 27200 },
    { date: 'Mar 25', value: 27800 },
    { date: 'Mar 30', value: 28450 }
  ];

  // Mock data for category distribution
  const categoryData = [
    { category: 'Cleaning Supplies', percentage: 30 },
    { category: 'Chemicals', percentage: 25 },
    { category: 'Equipment', percentage: 20 },
    { category: 'Tools', percentage: 25 }
  ];

  // Format currency
  const formatCurrency = (amount: number) => {
    return `£${amount.toLocaleString('en-GB')}`;
  };

  return (
    <div className="inventory-container">
      {/* Header */}
      <div className="section-header">
        <div className="section-title-area">
          <h1 className="section-title">Inventory Management</h1>
          <p className="section-subtitle">Manage your stock, products and supplies</p>
        </div>
        <div className="header-actions">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-icon products-icon">
            <FaBoxOpen />
          </div>
          <div className="stats-content">
            <div className="stats-value">{inventoryStats.totalProducts}</div>
            <div className="stats-title">Total Products</div>
            <div className="stats-comparison">
              <FaChevronUp /> <span className="positive-note">{inventoryStats.newProductsThisMonth} new this month</span>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon value-icon">
            <span>£</span>
          </div>
          <div className="stats-content">
            <div className="stats-value">{formatCurrency(inventoryStats.totalValue)}</div>
            <div className="stats-title">Total Value</div>
            <div className="stats-comparison">
              <FaChevronUp /> <span className="positive-note">{inventoryStats.valueIncrease}% from last month</span>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon warning-icon">
            <span>!</span>
          </div>
          <div className="stats-content">
            <div className="stats-value">{inventoryStats.lowStockItems}</div>
            <div className="stats-title">Low Stock Items</div>
            <div className="stats-comparison">
              <FaChevronDown /> <span className="positive-note">{inventoryStats.lowStockDecrease} fewer than last week</span>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon orders-icon">
            <span>📦</span>
          </div>
          <div className="stats-content">
            <div className="stats-value">{inventoryStats.pendingOrders}</div>
            <div className="stats-title">Pending Orders</div>
            <div className="stats-comparison">
              <FaChevronUp /> <span className="positive-note">{inventoryStats.newOrdersPlaced} new orders placed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Tabs */}
      <div className="inventory-tabs">
        <button 
          className={`inventory-tab ${activeTab === 'All Items' ? 'active' : ''}`}
          onClick={() => setActiveTab('All Items')}
        >
          All Items
        </button>
        <button 
          className={`inventory-tab ${activeTab === 'Cleaning Supplies' ? 'active' : ''}`}
          onClick={() => setActiveTab('Cleaning Supplies')}
        >
          Cleaning Supplies
        </button>
        <button 
          className={`inventory-tab ${activeTab === 'Chemicals' ? 'active' : ''}`}
          onClick={() => setActiveTab('Chemicals')}
        >
          Chemicals
        </button>
        <button 
          className={`inventory-tab ${activeTab === 'Equipment' ? 'active' : ''}`}
          onClick={() => setActiveTab('Equipment')}
        >
          Equipment
        </button>
        <button 
          className={`inventory-tab ${activeTab === 'Tools & Accessories' ? 'active' : ''}`}
          onClick={() => setActiveTab('Tools & Accessories')}
        >
          Tools & Accessories
        </button>
        <button 
          className={`inventory-tab ${activeTab === 'Low Stock' ? 'active' : ''}`}
          onClick={() => setActiveTab('Low Stock')}
        >
          Low Stock
        </button>
      </div>

      {/* Action Buttons */}
      <div className="inventory-actions">
        <button className="action-btn add-btn">
          <FaPlus /> Add New Item
        </button>
        <button className="action-btn order-btn">
          Place Order
        </button>
        <button className="action-btn import-btn">
          Import Items
        </button>
        <button className="action-btn export-btn">
          Export
        </button>
      </div>

      {/* Inventory Table */}
      <div className="inventory-table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>STOCK QTY</th>
              <th>VALUE</th>
              <th>STATUS</th>
              <th>REORDER LEVEL</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id} className="inventory-row">
                <td className="item-name-cell">
                  <div className="item-icon">{item.icon}</div>
                  <div className="item-details">
                    <div className="item-name">{item.name}</div>
                    <div className="item-category">{item.category}</div>
                  </div>
                </td>
                <td>{item.stockQty} units</td>
                <td>{formatCurrency(item.value)}</td>
                <td>
                  <span className={`status-badge ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {item.status}
                  </span>
                </td>
                <td>{item.reorderLevel} units</td>
                <td>
                  <div className="table-actions">
                    <button className="table-action-btn edit-btn" title="Edit Item">
                      <FaPen />
                    </button>
                    <button className="table-action-btn more-btn" title="More Options">
                      <FaEllipsisH />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Trend Charts */}
      <div className="charts-section">
        <div className="chart-row">
          <div className="chart-container">
            <div className="chart-header">
              <h3>Inventory Value Trend</h3>
              <select 
                className="time-range-selector"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last 6 months</option>
                <option>Last year</option>
              </select>
            </div>
            <div className="value-trend-chart">
              {/* Simple visualization of the line chart */}
              <div className="trend-line-chart">
                {trendData.map((point, index) => (
                  <div key={index} className="trend-point-container">
                    <div 
                      className="trend-point" 
                      style={{ 
                        bottom: `${(point.value / 30000) * 100}%`,
                        left: `${(index / (trendData.length - 1)) * 100}%`
                      }}
                      title={`${point.date}: ${formatCurrency(point.value)}`}
                    />
                    {index > 0 && (
                      <div 
                        className="trend-line"
                        style={{
                          bottom: `${(trendData[index-1].value / 30000) * 100}%`,
                          left: `${((index-1) / (trendData.length - 1)) * 100}%`,
                          width: `${(1 / (trendData.length - 1)) * 100}%`,
                          height: `${Math.abs((point.value - trendData[index-1].value) / 30000) * 100}%`,
                          transform: `rotate(${Math.atan2(
                            (point.value - trendData[index-1].value) / 30000 * 100,
                            (1 / (trendData.length - 1)) * 100
                          )}rad)`
                        }}
                      />
                    )}
                  </div>
                ))}
                {/* Add axis labels */}
                <div className="chart-axis-labels">
                  {trendData.map((point, index) => (
                    index % 2 === 0 && (
                      <div 
                        key={`label-${index}`} 
                        className="axis-label"
                        style={{
                          left: `${(index / (trendData.length - 1)) * 100}%`,
                        }}
                      >
                        {point.date}
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-header">
              <h3>Category Distribution</h3>
              <select
                className="category-view-selector"
                value={categoryView}
                onChange={(e) => setCategoryView(e.target.value)}
              >
                <option>By Quantity</option>
                <option>By Value</option>
              </select>
            </div>
            <div className="category-chart">
              {/* Simple visualization of the donut chart */}
              <div className="donut-chart">
                <div className="donut-hole"></div>
                {categoryData.map((category, index) => {
                  const prevPercent = categoryData
                    .slice(0, index)
                    .reduce((sum, cat) => sum + cat.percentage, 0);
                  
                  return (
                    <div
                      key={index}
                      className={`donut-segment category-${index}`}
                      style={{
                        clipPath: `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 50%)`,
                        transform: `rotate(${prevPercent * 3.6}deg)`,
                        zIndex: categoryData.length - index
                      }}
                    />
                  );
                })}
              </div>
              <div className="chart-legend">
                {categoryData.map((category, index) => (
                  <div key={index} className="legend-item">
                    <div className={`legend-color category-${index}`}></div>
                    <div className="legend-text">
                      {category.category} ({category.percentage}%)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory; 