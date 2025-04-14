import React, { useState } from 'react';

interface ReportsProps {
  onNavigate: (page: string) => void;
}

const Reports: React.FC<ReportsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [reportName, setReportName] = useState('Daily Sales Report - Feb 26, 2025');
  const [reportFormat, setReportFormat] = useState('PDF Document');
  
  // Selected report types
  const [selectedReportTypes, setSelectedReportTypes] = useState({
    salesAndRevenue: {
      totalSales: true,
      revenue: false,
      averageSale: false,
      paymentMethods: false
    },
    servicesPerformance: {
      serviceBreakdown: true,
      popularTimes: false,
      duration: false,
      packageAnalysis: false
    },
    customerInsights: {
      newCustomers: true,
      returningCustomers: false,
      visitFrequency: false,
      customerSatisfaction: false
    },
    promotionsMarketing: {
      promotionUsage: true,
      discountImpact: false,
      campaignROI: false,
      conversionRate: false
    }
  });
  
  const handleReportTypeSelection = (category: string, type: string) => {
    setSelectedReportTypes({
      ...selectedReportTypes,
      [category]: {
        ...selectedReportTypes[category as keyof typeof selectedReportTypes],
        [type]: !selectedReportTypes[category as keyof typeof selectedReportTypes][type as keyof typeof selectedReportTypes[keyof typeof selectedReportTypes]]
      }
    });
  };
  
  return (
    <div className="reports-container">
      <div className="section-header">
        <h1>Generate Reports</h1>
      </div>
      
      <div className="report-type-selector">
        <div className={`report-type-card ${activeTab === 'daily' ? 'active' : ''}`} onClick={() => setActiveTab('daily')}>
          <div className="report-icon daily-icon">
            <i className="fas fa-calendar-day"></i>
          </div>
          <div className="report-type-name">Daily</div>
        </div>
        
        <div className={`report-type-card ${activeTab === 'weekly' ? 'active' : ''}`} onClick={() => setActiveTab('weekly')}>
          <div className="report-icon weekly-icon">
            <i className="fas fa-calendar-week"></i>
          </div>
          <div className="report-type-name">Weekly</div>
        </div>
        
        <div className={`report-type-card ${activeTab === 'monthly' ? 'active' : ''}`} onClick={() => setActiveTab('monthly')}>
          <div className="report-icon monthly-icon">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="report-type-name">Monthly</div>
        </div>
        
        <div className={`report-type-card ${activeTab === 'yearly' ? 'active' : ''}`} onClick={() => setActiveTab('yearly')}>
          <div className="report-icon yearly-icon">
            <i className="fas fa-calendar"></i>
          </div>
          <div className="report-type-name">Yearly</div>
        </div>
        
        <div className={`report-type-card ${activeTab === 'custom' ? 'active' : ''}`} onClick={() => setActiveTab('custom')}>
          <div className="report-icon custom-icon">
            <i className="fas fa-sliders-h"></i>
          </div>
          <div className="report-type-name">Custom</div>
        </div>
      </div>
      
      <div className="report-configuration">
        <h2>Configure Report</h2>
        
        <div className="report-tabs">
          <div 
            className={`report-tab ${activeTab === 'general' ? 'active' : ''}`} 
            onClick={() => setActiveTab('general')}
          >
            General
          </div>
          <div 
            className={`report-tab ${activeTab === 'timeframe' ? 'active' : ''}`} 
            onClick={() => setActiveTab('timeframe')}
          >
            Time Frame
          </div>
          <div 
            className={`report-tab ${activeTab === 'comparison' ? 'active' : ''}`} 
            onClick={() => setActiveTab('comparison')}
          >
            Comparison
          </div>
          <div 
            className={`report-tab ${activeTab === 'preview' ? 'active' : ''}`} 
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </div>
        </div>
        
        <div className="tab-content">
          <p className="tab-description">Select the metrics and content to include in your report</p>
          
          <div className="report-metrics-grid">
            {/* Sales & Revenue */}
            <div className="report-metric-card">
              <div className="metric-header">
                <div className="metric-icon sales-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="metric-title">
                  <h3>Sales & Revenue</h3>
                  <p>Track financial performance and sales trends</p>
                </div>
              </div>
              
              <div className="metric-options">
                <div 
                  className={`metric-option ${selectedReportTypes.salesAndRevenue.totalSales ? 'selected' : ''}`}
                  onClick={() => handleReportTypeSelection('salesAndRevenue', 'totalSales')}
                >
                  Total Sales
                </div>
                <div 
                  className={`metric-option ${selectedReportTypes.salesAndRevenue.revenue ? 'selected' : ''}`}
                  onClick={() => handleReportTypeSelection('salesAndRevenue', 'revenue')}
                >
                  Revenue
                </div>
                <div 
                  className={`metric-option ${selectedReportTypes.salesAndRevenue.averageSale ? 'selected' : ''}`}
                  onClick={() => handleReportTypeSelection('salesAndRevenue', 'averageSale')}
                >
                  Average Sale
                </div>
                <div 
                  className={`metric-option ${selectedReportTypes.salesAndRevenue.paymentMethods ? 'selected' : ''}`}
                  onClick={() => handleReportTypeSelection('salesAndRevenue', 'paymentMethods')}
                >
                  Payment Methods
                </div>
              </div>
            </div>
            
            {/* Services Performance */}
            <div className="report-metric-card">
              <div className="metric-header">
                <div className="metric-icon services-icon">
                  <i className="fas fa-chart-pie"></i>
                </div>
                <div className="metric-title">
                  <h3>Services Performance</h3>
                  <p>Analyze service popularity and performance</p>
                </div>
              </div>
              
              <div className="metric-options">
                <div 
                  className={`metric-option ${selectedReportTypes.servicesPerformance.serviceBreakdown ? 'selected' : ''}`}
                  onClick={() => handleReportTypeSelection('servicesPerformance', 'serviceBreakdown')}
                >
                  Service Breakdown
                </div>
                <div 
                  className={`metric-option ${selectedReportTypes.servicesPerformance.popularTimes ? 'selected' : ''}`}
                  onClick={() => handleReportTypeSelection('servicesPerformance', 'popularTimes')}
                >
                  Popular Times
                </div>
                <div 
                  className={`metric-option ${selectedReportTypes.servicesPerformance.duration ? 'selected' : ''}`}
                  onClick={() => handleReportTypeSelection('servicesPerformance', 'duration')}
                >
                  Duration
                </div>
                <div 
                  className={`metric-option ${selectedReportTypes.servicesPerformance.packageAnalysis ? 'selected' : ''}`}
                  onClick={() => handleReportTypeSelection('servicesPerformance', 'packageAnalysis')}
                >
                  Package Analysis
                </div>
              </div>
            </div>
            
            {/* Customer Insights */}
            <div className="report-metric-card">
              <div className="metric-header">
                <div className="metric-icon customers-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="metric-title">
                  <h3>Customer Insights</h3>
                  <p>Understand customer behavior and loyalty</p>
                </div>
              </div>
              
              <div className="metric-options">
                <div 
                  className={`metric-option ${selectedReportTypes.customerInsights.newCustomers ? 'selected' : ''}`}
                  onClick={() => handleReportTypeSelection('customerInsights', 'newCustomers')}
                >
                  New Customers
                </div>
                <div 
                  className={`metric-option ${selectedReportTypes.customerInsights.returningCustomers ? 'selected' : ''}`}
                  onClick={() => handleReportTypeSelection('customerInsights', 'returningCustomers')}
                >
                  Returning Customers
                </div>
                <div 
                  className={`metric-option ${selectedReportTypes.customerInsights.visitFrequency ? 'selected' : ''}`}
                  onClick={() => handleReportTypeSelection('customerInsights', 'visitFrequency')}
                >
                  Visit Frequency
                </div>
                <div 
                  className={`metric-option ${selectedReportTypes.customerInsights.customerSatisfaction ? 'selected' : ''}`}
                  onClick={() => handleReportTypeSelection('customerInsights', 'customerSatisfaction')}
                >
                  Customer Satisfaction
                </div>
              </div>
            </div>
            
            {/* Promotions & Marketing */}
            <div className="report-metric-card">
              <div className="metric-header">
                <div className="metric-icon promotions-icon">
                  <i className="fas fa-bullhorn"></i>
                </div>
                <div className="metric-title">
                  <h3>Promotions & Marketing</h3>
                  <p>Measure marketing effectiveness and ROI</p>
                </div>
              </div>
              
              <div className="metric-options">
                <div 
                  className={`metric-option ${selectedReportTypes.promotionsMarketing.promotionUsage ? 'selected' : ''}`}
                  onClick={() => handleReportTypeSelection('promotionsMarketing', 'promotionUsage')}
                >
                  Promotion Usage
                </div>
                <div 
                  className={`metric-option ${selectedReportTypes.promotionsMarketing.discountImpact ? 'selected' : ''}`}
                  onClick={() => handleReportTypeSelection('promotionsMarketing', 'discountImpact')}
                >
                  Discount Impact
                </div>
                <div 
                  className={`metric-option ${selectedReportTypes.promotionsMarketing.campaignROI ? 'selected' : ''}`}
                  onClick={() => handleReportTypeSelection('promotionsMarketing', 'campaignROI')}
                >
                  Campaign ROI
                </div>
                <div 
                  className={`metric-option ${selectedReportTypes.promotionsMarketing.conversionRate ? 'selected' : ''}`}
                  onClick={() => handleReportTypeSelection('promotionsMarketing', 'conversionRate')}
                >
                  Conversion Rate
                </div>
              </div>
            </div>
          </div>
          
          <div className="report-form">
            <div className="form-group">
              <label>Report Name</label>
              <input 
                type="text" 
                value={reportName} 
                onChange={(e) => setReportName(e.target.value)} 
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label>Report Format</label>
              <select 
                value={reportFormat} 
                onChange={(e) => setReportFormat(e.target.value)} 
                className="form-control"
              >
                <option value="PDF Document">PDF Document</option>
                <option value="Excel Spreadsheet">Excel Spreadsheet</option>
                <option value="CSV File">CSV File</option>
              </select>
            </div>
          </div>
          
          <div className="report-actions">
            <button className="btn btn-secondary">
              <i className="fas fa-save"></i> Save Settings
            </button>
            <button className="btn btn-primary">
              Next: Time Frame <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 