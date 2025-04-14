import React, { useState } from 'react';
import './Marketing.css';
import { 
  MdAdd, 
  MdEmail, 
  MdSms, 
  MdSearch, 
  MdCalendarToday, 
  MdPeopleAlt, 
  MdFilterList, 
  MdInsertDriveFile, 
  MdEdit, 
  MdSchedule, 
  MdSend, 
  MdCancel, 
  MdVisibility, 
  MdContentCopy, 
  MdOutlineMailOutline, 
  MdClose, 
  MdAssessment, 
  MdOutlineSmartphone, 
  MdCampaign
} from 'react-icons/md';

// Mock data for campaigns
const mockCampaigns = [
  {
    id: 1,
    name: 'Spring Maintenance Special',
    type: 'email',
    status: 'sent',
    subject: 'Get your vehicle ready for spring with our special maintenance package!',
    created: '2023-05-10',
    scheduled: '2023-05-15',
    sent: '2023-05-15',
    recipients: 357,
    opens: 214,
    clicks: 87,
    conversions: 23,
  },
  {
    id: 2,
    name: 'Summer Road Trip Checkup',
    type: 'email',
    status: 'scheduled',
    subject: 'Planning a summer road trip? Get your car checked first!',
    created: '2023-06-01',
    scheduled: '2023-06-10',
    recipients: 425,
    opens: 0,
    clicks: 0,
    conversions: 0,
  },
  {
    id: 3,
    name: 'VIP Customer Appreciation',
    type: 'sms',
    status: 'draft',
    subject: 'We appreciate your loyalty! Here\'s a special offer just for you.',
    created: '2023-06-05',
    recipients: 0,
    opens: 0,
    clicks: 0,
    conversions: 0,
  },
  {
    id: 4,
    name: 'Winter Tire Special',
    type: 'email',
    status: 'draft',
    subject: 'Prepare for winter with our tire special! Limited time offer.',
    created: '2023-06-08',
    recipients: 0,
    opens: 0,
    clicks: 0,
    conversions: 0,
  }
];

// Email templates
const emailTemplates = [
  { id: 1, name: 'Seasonal Promotion', description: 'Template for seasonal offers and discounts' },
  { id: 2, name: 'Service Reminder', description: 'Remind customers about upcoming service needs' },
  { id: 3, name: 'Welcome Email', description: 'For new customers after their first service' },
  { id: 4, name: 'Feedback Request', description: 'Ask for customer feedback after service' },
  { id: 5, name: 'Special Event', description: 'Announce special events or promotions' },
  { id: 6, name: 'Blank Template', description: 'Start from scratch with a blank template' }
];

// SMS templates
const smsTemplates = [
  { id: 1, name: 'Appointment Reminder', description: 'Remind customers about upcoming appointments' },
  { id: 2, name: 'Special Offer', description: 'Short message with special offer details' },
  { id: 3, name: 'Service Complete', description: 'Notify customers their service is complete' },
  { id: 4, name: 'Blank Template', description: 'Start from scratch with a blank template' }
];

interface MarketingProps {
  onNavigate: (page: string) => void;
}

interface NewCampaign {
  name: string;
  type: 'email' | 'sms';
  selectedTemplate: number | null;
}

const Marketing: React.FC<MarketingProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createStep, setCreateStep] = useState(1);
  const [newCampaign, setNewCampaign] = useState<NewCampaign>({
    name: '',
    type: 'email',
    selectedTemplate: null
  });

  // Filter campaigns based on user selections
  const filteredCampaigns = mockCampaigns.filter(campaign => {
    // Filter by search query
    const matchesSearch = 
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    
    // Filter by type
    const matchesType = typeFilter === 'all' || campaign.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Handle campaign actions
  const handleCampaignAction = (actionType: string, campaignId: number) => {
    console.log(`Action: ${actionType} for campaign ID: ${campaignId}`);
    // In a real app, this would handle the appropriate action
  };

  // Handle new campaign creation
  const handleCreateCampaign = () => {
    console.log('Creating new campaign:', newCampaign);
    setShowCreateModal(false);
    setCreateStep(1);
    setNewCampaign({
      name: '',
      type: 'email',
      selectedTemplate: null
    });
    // In a real app, this would send the new campaign data to your API
  };

  // Reset modal when closed
  const handleCloseModal = () => {
    setShowCreateModal(false);
    setCreateStep(1);
    setNewCampaign({
      name: '',
      type: 'email',
      selectedTemplate: null
    });
  };

  // Next step in creation process
  const handleNextStep = () => {
    setCreateStep(createStep + 1);
  };

  // Previous step in creation process
  const handlePreviousStep = () => {
    setCreateStep(createStep - 1);
  };

  // Select template
  const handleSelectTemplate = (templateId: number) => {
    setNewCampaign({
      ...newCampaign,
      selectedTemplate: templateId
    });
  };

  // Render Campaign Card
  const renderCampaignCard = (campaign: any) => (
    <div key={campaign.id} className={`campaign-card ${campaign.status}`}>
      <div className="campaign-thumbnail">
        {campaign.type === 'email' ? <MdOutlineMailOutline /> : <MdOutlineSmartphone />}
      </div>
      <div className="campaign-details">
        <div className="campaign-header">
          <div className="campaign-name-type">
            <h3 className="campaign-name">{campaign.name}</h3>
            <span className={`campaign-type ${campaign.type}`}>
              {campaign.type === 'email' ? <MdEmail /> : <MdSms />}
              {campaign.type === 'email' ? 'Email Campaign' : 'SMS Campaign'}
            </span>
          </div>
          <span className="campaign-status-badge">
            {campaign.status === 'draft' && 'Draft'}
            {campaign.status === 'scheduled' && 'Scheduled'}
            {campaign.status === 'sent' && 'Sent'}
          </span>
        </div>

        <div className="campaign-subject">{campaign.subject}</div>

        <div className="campaign-dates">
          <div className="date-item">
            <span className="date-icon"><MdCalendarToday /></span>
            <span>Created: {campaign.created}</span>
          </div>
          
          {campaign.scheduled && (
            <div className="date-item">
              <span className="date-icon"><MdSchedule /></span>
              <span>Scheduled: {campaign.scheduled}</span>
            </div>
          )}
          
          {campaign.sent && (
            <div className="date-item">
              <span className="date-icon"><MdSend /></span>
              <span>Sent: {campaign.sent}</span>
            </div>
          )}
          
          <div className="date-item">
            <span className="date-icon"><MdPeopleAlt /></span>
            <span>Recipients: {campaign.recipients}</span>
          </div>
        </div>

        {(campaign.status === 'sent') && (
          <div className="campaign-stats">
            <div className="stat-item">
              <span className="stat-label">Opens</span>
              <span className="stat-value">{campaign.opens}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Clicks</span>
              <span className="stat-value">{campaign.clicks}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Open Rate</span>
              <span className="stat-value">
                {campaign.recipients > 0 ? Math.round((campaign.opens / campaign.recipients) * 100) : 0}%
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Click Rate</span>
              <span className="stat-value">
                {campaign.opens > 0 ? Math.round((campaign.clicks / campaign.opens) * 100) : 0}%
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Conversions</span>
              <span className="stat-value">{campaign.conversions}</span>
            </div>
          </div>
        )}

        <div className="campaign-actions">
          {campaign.status === 'draft' && (
            <>
              <button 
                className="campaign-action-btn edit-btn" 
                onClick={() => handleCampaignAction('edit', campaign.id)}
              >
                <MdEdit /> Edit
              </button>
              <button 
                className="campaign-action-btn schedule-btn" 
                onClick={() => handleCampaignAction('schedule', campaign.id)}
              >
                <MdSchedule /> Schedule
              </button>
              <button 
                className="campaign-action-btn send-btn" 
                onClick={() => handleCampaignAction('send', campaign.id)}
              >
                <MdSend /> Send Now
              </button>
            </>
          )}
          
          {campaign.status === 'scheduled' && (
            <>
              <button 
                className="campaign-action-btn edit-btn" 
                onClick={() => handleCampaignAction('edit', campaign.id)}
              >
                <MdEdit /> Edit
              </button>
              <button 
                className="campaign-action-btn cancel-btn" 
                onClick={() => handleCampaignAction('cancel', campaign.id)}
              >
                <MdCancel /> Cancel
              </button>
            </>
          )}
          
          {campaign.status === 'sent' && (
            <>
              <button 
                className="campaign-action-btn view-btn" 
                onClick={() => handleCampaignAction('view', campaign.id)}
              >
                <MdVisibility /> View Results
              </button>
              <button 
                className="campaign-action-btn duplicate-btn" 
                onClick={() => handleCampaignAction('duplicate', campaign.id)}
              >
                <MdContentCopy /> Duplicate
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // Render Create Campaign Modal
  const renderCreateModal = () => (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{createStep === 1 ? 'Create New Campaign' : createStep === 2 ? 'Select Template' : 'Campaign Details'}</h2>
          <button className="close-btn" onClick={handleCloseModal}>
            <MdClose />
          </button>
        </div>
        
        <div className="modal-body">
          {createStep === 1 && (
            <>
              <div className="form-group">
                <label>Campaign Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter campaign name" 
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Campaign Type</label>
                <div className="campaign-type-options">
                  <div className="campaign-type-option">
                    <input 
                      type="radio" 
                      id="email-type" 
                      name="campaign-type" 
                      checked={newCampaign.type === 'email'}
                      onChange={() => setNewCampaign({...newCampaign, type: 'email'})}
                    />
                    <label htmlFor="email-type">
                      <span className="option-icon"><MdEmail /></span>
                      <span>Email Campaign</span>
                      <p className="option-description">Send an email campaign to your customers</p>
                    </label>
                  </div>
                  
                  <div className="campaign-type-option">
                    <input 
                      type="radio" 
                      id="sms-type" 
                      name="campaign-type" 
                      checked={newCampaign.type === 'sms'}
                      onChange={() => setNewCampaign({...newCampaign, type: 'sms'})}
                    />
                    <label htmlFor="sms-type">
                      <span className="option-icon"><MdSms /></span>
                      <span>SMS Campaign</span>
                      <p className="option-description">Send a text message campaign to your customers</p>
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {createStep === 2 && (
            <div className="form-group">
              <label>Select a Template</label>
              <div className="templates-grid">
                {(newCampaign.type === 'email' ? emailTemplates : smsTemplates).map(template => (
                  <div 
                    key={template.id}
                    className={`template-card ${newCampaign.selectedTemplate === template.id ? 'selected' : ''}`}
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <div className="template-icon">
                      <MdInsertDriveFile />
                    </div>
                    <div className="template-info">
                      <h4>{template.name}</h4>
                      <p>{template.description}</p>
                    </div>
                    <div className="template-select-indicator"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {createStep === 3 && (
            <div className="form-group">
              <p>
                Your campaign is ready to customize! In the next screen, you'll be able to:
              </p>
              <ul>
                <li>Select your target audience</li>
                <li>Customize your content</li>
                <li>Set send schedule</li>
                <li>Add tracking parameters</li>
              </ul>
              <p>Click "Create Campaign" to continue to the editor.</p>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          {createStep > 1 && (
            <button className="cancel-btn" onClick={handlePreviousStep}>
              Back
            </button>
          )}
          
          {createStep < 3 ? (
            <button 
              className="create-btn" 
              onClick={handleNextStep}
              disabled={createStep === 1 && !newCampaign.name || createStep === 2 && !newCampaign.selectedTemplate}
            >
              Continue
            </button>
          ) : (
            <button className="create-btn" onClick={handleCreateCampaign}>
              Create Campaign
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="marketing-container">
      <div className="marketing-header">
        <div className="marketing-title-section">
          <h1 className="marketing-title">Marketing</h1>
          <p className="marketing-subtitle">Create and manage your marketing campaigns</p>
        </div>
        <button className="create-campaign-btn" onClick={() => setShowCreateModal(true)}>
          <MdAdd /> Create Campaign
        </button>
      </div>

      <div className="marketing-tabs">
        <button 
          className={`marketing-tab ${activeTab === 'campaigns' ? 'active' : ''}`}
          onClick={() => setActiveTab('campaigns')}
        >
          Campaigns
        </button>
        <button 
          className={`marketing-tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
        <button 
          className={`marketing-tab ${activeTab === 'audiences' ? 'active' : ''}`}
          onClick={() => setActiveTab('audiences')}
        >
          Audiences
        </button>
        <button 
          className={`marketing-tab ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          Templates
        </button>
      </div>

      {activeTab === 'campaigns' && (
        <>
          <div className="marketing-filters">
            <div className="filter-buttons">
              <div className="filter-group">
                <span className="filter-label">Status:</span>
                <button 
                  className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`filter-btn ${statusFilter === 'draft' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('draft')}
                >
                  Draft
                </button>
                <button 
                  className={`filter-btn ${statusFilter === 'scheduled' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('scheduled')}
                >
                  Scheduled
                </button>
                <button 
                  className={`filter-btn ${statusFilter === 'sent' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('sent')}
                >
                  Sent
                </button>
              </div>
              
              <div className="filter-group">
                <span className="filter-label">Type:</span>
                <button 
                  className={`filter-btn ${typeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setTypeFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`filter-btn ${typeFilter === 'email' ? 'active' : ''}`}
                  onClick={() => setTypeFilter('email')}
                >
                  <MdEmail /> Email
                </button>
                <button 
                  className={`filter-btn ${typeFilter === 'sms' ? 'active' : ''}`}
                  onClick={() => setTypeFilter('sms')}
                >
                  <MdSms /> SMS
                </button>
              </div>
            </div>
            
            <div className="search-container">
              <span className="search-icon"><MdSearch /></span>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredCampaigns.length > 0 ? (
            <div className="campaigns-list">
              {filteredCampaigns.map(campaign => renderCampaignCard(campaign))}
            </div>
          ) : (
            <div className="no-campaigns-message">
              <div className="no-campaigns-icon"><MdCampaign /></div>
              <h3>No campaigns found</h3>
              <p>
                {searchQuery || statusFilter !== 'all' || typeFilter !== 'all' 
                  ? 'Try adjusting your filters or search query' 
                  : 'Get started by creating your first marketing campaign'}
              </p>
              {!searchQuery && statusFilter === 'all' && typeFilter === 'all' && (
                <button className="create-campaign-btn" onClick={() => setShowCreateModal(true)}>
                  <MdAdd /> Create Campaign
                </button>
              )}
            </div>
          )}
        </>
      )}

      {activeTab === 'analytics' && (
        <div className="analytics-container">
          <div className="analytics-header">
            <h2 className="analytics-title">Marketing Performance</h2>
          </div>
          <div className="analytics-grid">
            <div className="analytics-card">
              <h3>Email Performance</h3>
              <p>Email analytics will be displayed here</p>
            </div>
            <div className="analytics-card">
              <h3>SMS Performance</h3>
              <p>SMS analytics will be displayed here</p>
            </div>
            <div className="analytics-card">
              <h3>Conversion Rate</h3>
              <p>Conversion analytics will be displayed here</p>
            </div>
            <div className="analytics-card">
              <h3>Campaign ROI</h3>
              <p>ROI analytics will be displayed here</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'audiences' && (
        <div className="analytics-container">
          <div className="analytics-header">
            <h2 className="analytics-title">Customer Audiences</h2>
          </div>
          <p>Audience management functionality will be displayed here</p>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="analytics-container">
          <div className="analytics-header">
            <h2 className="analytics-title">Email & SMS Templates</h2>
          </div>
          <p>Template management functionality will be displayed here</p>
        </div>
      )}

      {showCreateModal && renderCreateModal()}
    </div>
  );
};

export default Marketing; 