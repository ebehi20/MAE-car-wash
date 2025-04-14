import React, { useState } from 'react';
import './Settings.css';
import { FiUser, FiCreditCard, FiBell, FiLock, FiUsers, FiTag, FiPackage, FiSend, FiSettings, FiClipboard, FiShield, FiHelpCircle } from 'react-icons/fi';
import SecuritySettingsPanel from './SecuritySettingsPanel';
import NotificationsSettingsPanel from './NotificationsSettingsPanel';
import PaymentsSettingsPanel from './PaymentsSettingsPanel';
import HelpSupportSettingsPanel from './HelpSupportSettingsPanel';

interface SettingsProps {
  onNavigate: (page: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your business settings and preferences</p>
      </div>

      <div className="settings-content">
        <div className="settings-sidebar">
          <div className="settings-tabs">
            <button 
              className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              <FiSettings /> General
            </button>
            <button 
              className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <FiUser /> Business Profile
            </button>
            <button 
              className={`settings-tab ${activeTab === 'payments' ? 'active' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              <FiCreditCard /> Payments
            </button>
            <button 
              className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <FiBell /> Notifications
            </button>
            <button 
              className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <FiLock /> Security
            </button>
            <button 
              className={`settings-tab ${activeTab === 'teams' ? 'active' : ''}`}
              onClick={() => setActiveTab('teams')}
            >
              <FiUsers /> Teams
            </button>
            <button 
              className={`settings-tab ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              <FiTag /> Services
            </button>
            <button 
              className={`settings-tab ${activeTab === 'integrations' ? 'active' : ''}`}
              onClick={() => setActiveTab('integrations')}
            >
              <FiPackage /> Integrations
            </button>
            <button 
              className={`settings-tab ${activeTab === 'communications' ? 'active' : ''}`}
              onClick={() => setActiveTab('communications')}
            >
              <FiSend /> Communications
            </button>
            <button 
              className={`settings-tab ${activeTab === 'compliance' ? 'active' : ''}`}
              onClick={() => setActiveTab('compliance')}
            >
              <FiClipboard /> Compliance
            </button>
            <button 
              className={`settings-tab ${activeTab === 'privacy' ? 'active' : ''}`}
              onClick={() => setActiveTab('privacy')}
            >
              <FiShield /> Privacy
            </button>
            <button 
              className={`settings-tab ${activeTab === 'help-support' ? 'active' : ''}`}
              onClick={() => setActiveTab('help-support')}
            >
              <FiHelpCircle /> Help & Support
            </button>
          </div>
        </div>

        <div className="settings-panels">
          {activeTab === 'general' && (
            <div className="settings-panel">
              <h2>General Settings</h2>
              
              <div className="settings-section">
                <h3>Business Hours</h3>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Monday - Friday</label>
                    <div className="time-range">
                      <input type="time" defaultValue="08:00" />
                      <span>to</span>
                      <input type="time" defaultValue="18:00" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Saturday</label>
                    <div className="time-range">
                      <input type="time" defaultValue="09:00" />
                      <span>to</span>
                      <input type="time" defaultValue="17:00" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Sunday</label>
                    <div className="time-range">
                      <input type="time" defaultValue="10:00" />
                      <span>to</span>
                      <input type="time" defaultValue="16:00" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h3>Localization</h3>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Time Zone</label>
                    <select>
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Pacific Time (PT)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Date Format</label>
                    <select>
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Currency</label>
                    <select>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>CAD (C$)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h3>System Preferences</h3>
                <div className="settings-form">
                  <div className="form-group checkbox">
                    <input type="checkbox" id="darkMode" />
                    <label htmlFor="darkMode">Enable Dark Mode</label>
                  </div>
                  <div className="form-group checkbox">
                    <input type="checkbox" id="notifications" defaultChecked />
                    <label htmlFor="notifications">Enable Desktop Notifications</label>
                  </div>
                  <div className="form-group checkbox">
                    <input type="checkbox" id="soundAlerts" defaultChecked />
                    <label htmlFor="soundAlerts">Enable Sound Alerts</label>
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button className="btn-save">Save Changes</button>
                <button className="btn-cancel">Cancel</button>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="settings-panel">
              <h2>Business Profile</h2>
              
              <div className="settings-section">
                <h3>Basic Information</h3>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Business Name</label>
                    <input type="text" defaultValue="MAE Car Wash & Detailing" />
                  </div>
                  <div className="form-group">
                    <label>Business Type</label>
                    <select>
                      <option>Car Wash</option>
                      <option>Detailing Shop</option>
                      <option>Auto Spa</option>
                      <option>Mobile Detailing Service</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" defaultValue="(555) 123-4567" />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" defaultValue="contact@maecarwash.com" />
                  </div>
                  <div className="form-group">
                    <label>Website</label>
                    <input type="url" defaultValue="https://www.maecarwash.com" />
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h3>Business Logo</h3>
                <div className="logo-upload">
                  <div className="logo-preview">
                    <div className="placeholder">MAE</div>
                  </div>
                  <div className="upload-controls">
                    <button className="btn-upload">Upload New Logo</button>
                    <p className="upload-hint">Recommended size: 200x200px (PNG or JPG)</p>
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h3>Address</h3>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Street Address</label>
                    <input type="text" defaultValue="123 Main Street" />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" defaultValue="San Francisco" />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input type="text" defaultValue="CA" />
                  </div>
                  <div className="form-group">
                    <label>ZIP Code</label>
                    <input type="text" defaultValue="94105" />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <select>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button className="btn-save">Save Changes</button>
                <button className="btn-cancel">Cancel</button>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="settings-panel">
              <h2>Privacy Settings</h2>
              
              <div className="settings-section">
                <h3>Data Collection</h3>
                <p className="section-description">Configure how customer data is collected and processed within the system.</p>
                <div className="settings-form">
                  <div className="form-group checkbox">
                    <input type="checkbox" id="analyticsCollection" defaultChecked />
                    <label htmlFor="analyticsCollection">Enable Usage Analytics</label>
                    <p className="input-description">Collect anonymous usage data to improve our services</p>
                  </div>
                  <div className="form-group checkbox">
                    <input type="checkbox" id="customerProfiling" defaultChecked />
                    <label htmlFor="customerProfiling">Customer Profiling</label>
                    <p className="input-description">Allow system to build customer profiles based on service history</p>
                  </div>
                  <div className="form-group checkbox">
                    <input type="checkbox" id="thirdPartySharing" />
                    <label htmlFor="thirdPartySharing">Third-Party Data Sharing</label>
                    <p className="input-description">Share anonymized data with trusted partners</p>
                  </div>
                  <div className="form-group">
                    <label>Data Retention Period</label>
                    <select>
                      <option>1 year</option>
                      <option>2 years</option>
                      <option selected>3 years</option>
                      <option>5 years</option>
                      <option>Indefinitely</option>
                    </select>
                    <p className="input-description">How long to retain customer data after their last activity</p>
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h3>Consent Management</h3>
                <p className="section-description">Manage how customer consent is collected and maintained.</p>
                <div className="settings-form">
                  <div className="form-group checkbox">
                    <input type="checkbox" id="explicitConsent" defaultChecked />
                    <label htmlFor="explicitConsent">Require Explicit Consent</label>
                    <p className="input-description">Require customers to opt-in explicitly for marketing communications</p>
                  </div>
                  <div className="form-group checkbox">
                    <input type="checkbox" id="doubleOptIn" defaultChecked />
                    <label htmlFor="doubleOptIn">Double Opt-in for Email</label>
                    <p className="input-description">Require email confirmation before adding to mailing lists</p>
                  </div>
                  <div className="form-group">
                    <label>Consent Refresh Frequency</label>
                    <select>
                      <option>Every 6 months</option>
                      <option selected>Every year</option>
                      <option>Every 2 years</option>
                      <option>Never</option>
                    </select>
                    <p className="input-description">How often to ask customers to renew their consent</p>
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h3>Privacy Policy</h3>
                <p className="section-description">Manage your privacy policy and customer notifications.</p>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Privacy Policy Last Updated</label>
                    <div className="date-update-group">
                      <input type="date" defaultValue="2023-09-15" />
                      <button className="btn-update">Update Now</button>
                    </div>
                  </div>
                  <div className="form-group checkbox">
                    <input type="checkbox" id="notifyPolicyChanges" defaultChecked />
                    <label htmlFor="notifyPolicyChanges">Notify Customers of Policy Changes</label>
                    <p className="input-description">Automatically email customers when privacy policy is updated</p>
                  </div>
                  <div className="form-group">
                    <label>Privacy Policy Document</label>
                    <div className="document-upload">
                      <div className="document-preview">
                        <p className="file-name">privacy-policy-v2.1.pdf</p>
                      </div>
                      <div className="document-actions">
                        <button className="btn-view">View Current</button>
                        <button className="btn-upload">Upload New</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>Data Subject Rights</h3>
                <p className="section-description">Configure how to handle data subject access and deletion requests.</p>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Data Access Request Workflow</label>
                    <select>
                      <option>Manual Review</option>
                      <option selected>Automated with Manual Approval</option>
                      <option>Fully Automated</option>
                    </select>
                    <p className="input-description">Process for handling customer data access requests</p>
                  </div>
                  <div className="form-group">
                    <label>Request Response Timeline</label>
                    <select>
                      <option>Immediate</option>
                      <option>24 Hours</option>
                      <option selected>Within 3 Business Days</option>
                      <option>Within 7 Business Days</option>
                      <option>Within 30 Days</option>
                    </select>
                    <p className="input-description">Target timeline for responding to data requests</p>
                  </div>
                  <div className="form-group checkbox">
                    <input type="checkbox" id="dataPortability" defaultChecked />
                    <label htmlFor="dataPortability">Enable Data Portability</label>
                    <p className="input-description">Allow customers to download their data in machine-readable format</p>
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button className="btn-save">Save Changes</button>
                <button className="btn-cancel">Cancel</button>
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="settings-panel">
              <h2>Compliance Settings</h2>
              
              <div className="settings-section">
                <h3>Regulatory Compliance</h3>
                <p className="section-description">Configure regulations and standards your business needs to comply with.</p>
                <div className="settings-form">
                  <div className="form-group checkbox">
                    <input type="checkbox" id="gdprCompliance" defaultChecked />
                    <label htmlFor="gdprCompliance">GDPR Compliance</label>
                    <p className="input-description">Enable features for General Data Protection Regulation compliance</p>
                  </div>
                  <div className="form-group checkbox">
                    <input type="checkbox" id="ccpaCompliance" defaultChecked />
                    <label htmlFor="ccpaCompliance">CCPA Compliance</label>
                    <p className="input-description">Enable features for California Consumer Privacy Act compliance</p>
                  </div>
                  <div className="form-group checkbox">
                    <input type="checkbox" id="hipaaCompliance" />
                    <label htmlFor="hipaaCompliance">HIPAA Compliance</label>
                    <p className="input-description">Enable features for Health Insurance Portability and Accountability Act compliance</p>
                  </div>
                  <div className="form-group checkbox">
                    <input type="checkbox" id="pciDssCompliance" defaultChecked />
                    <label htmlFor="pciDssCompliance">PCI DSS Compliance</label>
                    <p className="input-description">Enable features for Payment Card Industry Data Security Standard compliance</p>
                  </div>
                  <div className="form-group">
                    <label>Primary Jurisdiction</label>
                    <select>
                      <option>United States</option>
                      <option>European Union</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      <option>Other</option>
                    </select>
                    <p className="input-description">The main jurisdiction your business operates in</p>
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h3>Data Security Standards</h3>
                <p className="section-description">Configure security settings for compliance with industry standards.</p>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Minimum Password Strength</label>
                    <select>
                      <option>Basic (8+ characters)</option>
                      <option>Medium (8+ chars with letters and numbers)</option>
                      <option selected>Strong (8+ chars with letters, numbers, symbols)</option>
                      <option>Very Strong (12+ chars with letters, numbers, symbols)</option>
                    </select>
                    <p className="input-description">Required password complexity for user accounts</p>
                  </div>
                  <div className="form-group">
                    <label>Password Expiration</label>
                    <select>
                      <option>30 days</option>
                      <option>60 days</option>
                      <option selected>90 days</option>
                      <option>180 days</option>
                      <option>365 days</option>
                      <option>Never</option>
                    </select>
                    <p className="input-description">How often users are required to change passwords</p>
                  </div>
                  <div className="form-group checkbox">
                    <input type="checkbox" id="twoFactorAuth" defaultChecked />
                    <label htmlFor="twoFactorAuth">Require Two-Factor Authentication</label>
                    <p className="input-description">Require staff to use 2FA when accessing the system</p>
                  </div>
                  <div className="form-group checkbox">
                    <input type="checkbox" id="encryptedData" defaultChecked />
                    <label htmlFor="encryptedData">Data Encryption</label>
                    <p className="input-description">Store all customer and transaction data in encrypted format</p>
                  </div>
                  <div className="form-group">
                    <label>Session Timeout</label>
                    <select>
                      <option>15 minutes</option>
                      <option selected>30 minutes</option>
                      <option>1 hour</option>
                      <option>2 hours</option>
                      <option>4 hours</option>
                      <option>8 hours</option>
                    </select>
                    <p className="input-description">How long before inactive sessions are automatically logged out</p>
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h3>Audit Logs</h3>
                <p className="section-description">Configure how system activities are logged and monitored for compliance.</p>
                <div className="settings-form">
                  <div className="form-group checkbox">
                    <input type="checkbox" id="userActivityLogging" defaultChecked />
                    <label htmlFor="userActivityLogging">User Activity Logging</label>
                    <p className="input-description">Log all staff user actions within the system</p>
                  </div>
                  <div className="form-group checkbox">
                    <input type="checkbox" id="dataAccessLogging" defaultChecked />
                    <label htmlFor="dataAccessLogging">Data Access Logging</label>
                    <p className="input-description">Log all data access attempts and successes</p>
                  </div>
                  <div className="form-group checkbox">
                    <input type="checkbox" id="paymentProcessingLogging" defaultChecked />
                    <label htmlFor="paymentProcessingLogging">Payment Processing Logging</label>
                    <p className="input-description">Log payment processing activities (excluding sensitive card data)</p>
                  </div>
                  <div className="form-group">
                    <label>Log Retention Period</label>
                    <select>
                      <option>3 months</option>
                      <option>6 months</option>
                      <option selected>1 year</option>
                      <option>2 years</option>
                      <option>5 years</option>
                      <option>7 years</option>
                    </select>
                    <p className="input-description">How long to keep activity logs for compliance purposes</p>
                  </div>
                  <div className="form-group">
                    <label>Audit Log Export</label>
                    <div className="date-range-group">
                      <div className="date-input-group">
                        <label className="small-label">From</label>
                        <input type="date" defaultValue="2023-04-01" />
                      </div>
                      <div className="date-input-group">
                        <label className="small-label">To</label>
                        <input type="date" defaultValue="2023-04-30" />
                      </div>
                      <button className="btn-export">Export Logs</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>Compliance Reporting</h3>
                <p className="section-description">Configure compliance reporting and documentation.</p>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Compliance Report Frequency</label>
                    <select>
                      <option>Weekly</option>
                      <option selected>Monthly</option>
                      <option>Quarterly</option>
                      <option>Bi-annually</option>
                      <option>Annually</option>
                    </select>
                    <p className="input-description">How often to generate compliance reports</p>
                  </div>
                  <div className="form-group checkbox">
                    <input type="checkbox" id="emailReports" defaultChecked />
                    <label htmlFor="emailReports">Email Reports to Administrators</label>
                    <p className="input-description">Automatically email reports to system administrators</p>
                  </div>
                  <div className="form-group">
                    <label>Report Recipients</label>
                    <textarea 
                      placeholder="Enter email addresses separated by commas"
                      defaultValue="compliance@maecarwash.com, admin@maecarwash.com"
                      rows={2}
                    ></textarea>
                    <p className="input-description">Who should receive compliance reports</p>
                  </div>
                  <div className="form-group checkbox">
                    <input type="checkbox" id="incidentReporting" defaultChecked />
                    <label htmlFor="incidentReporting">Security Incident Reporting</label>
                    <p className="input-description">Enable automatic reporting of security incidents</p>
                  </div>
                  <div className="form-group">
                    <label>Compliance Documentation</label>
                    <div className="document-upload">
                      <div className="document-preview">
                        <p className="file-name">compliance-policy-2023.pdf</p>
                      </div>
                      <div className="document-actions">
                        <button className="btn-view">View Current</button>
                        <button className="btn-upload">Upload New</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button className="btn-save">Save Changes</button>
                <button className="btn-cancel">Cancel</button>
              </div>
            </div>
          )}

          {activeTab === 'communications' && (
            <div className="settings-panel">
              <h2>Communications Settings</h2>
              
              <div className="settings-section">
                <h3>Communication Channels</h3>
                <p className="section-description">Configure which communication channels are enabled for customer interaction.</p>
                <div className="settings-form">
                  <div className="form-group checkbox">
                    <input type="checkbox" id="emailComm" defaultChecked />
                    <label htmlFor="emailComm">Email</label>
                    <p className="input-description">Send appointment confirmations, reminders, and marketing via email</p>
                  </div>
                  <div className="form-group checkbox">
                    <input type="checkbox" id="smsComm" defaultChecked />
                    <label htmlFor="smsComm">SMS Text Messaging</label>
                    <p className="input-description">Send appointment reminders and status updates via text</p>
                  </div>
                  <div className="form-group checkbox">
                    <input type="checkbox" id="pushComm" defaultChecked />
                    <label htmlFor="pushComm">Push Notifications</label>
                    <p className="input-description">Send updates to customers through mobile app push notifications</p>
                  </div>
                  <div className="form-group checkbox">
                    <input type="checkbox" id="whatsappComm" />
                    <label htmlFor="whatsappComm">WhatsApp</label>
                    <p className="input-description">Send messages via WhatsApp Business API</p>
                  </div>
                  <div className="form-group">
                    <label>Default Communication Channel</label>
                    <select>
                      <option>Email</option>
                      <option selected>SMS</option>
                      <option>Push Notification</option>
                      <option>WhatsApp</option>
                    </select>
                    <p className="input-description">Primary channel to use when multiple are available</p>
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h3>Message Templates</h3>
                <p className="section-description">Customize message templates for different types of communications.</p>
                <div className="settings-form">
                  <div className="template-selector">
                    <label>Select Template Type</label>
                    <div className="template-tabs">
                      <button className="template-tab active">Appointment Confirmation</button>
                      <button className="template-tab">Appointment Reminder</button>
                      <button className="template-tab">Service Complete</button>
                      <button className="template-tab">Payment Receipt</button>
                      <button className="template-tab">Feedback Request</button>
                    </div>
                  </div>
                  
                  <div className="template-editor">
                    <div className="editor-header">
                      <h4>Appointment Confirmation Template</h4>
                      <div className="channel-tabs">
                        <button className="channel-tab active">Email</button>
                        <button className="channel-tab">SMS</button>
                        <button className="channel-tab">Push</button>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Subject Line (Email Only)</label>
                      <input type="text" defaultValue="Your appointment confirmation for {{service_type}}" />
                      <p className="input-description">&#123;&#123;variable&#125;&#125; placeholders will be replaced with actual data</p>
                    </div>
                    
                    <div className="form-group">
                      <label>Message Content</label>
                      <textarea rows={6} defaultValue={`Hi {{customer_name}},

Thank you for scheduling a {{service_type}} with MAE Car Wash & Detailing.

Your appointment details:
Date: {{appointment_date}}
Time: {{appointment_time}}
Service: {{service_type}}
Vehicle: {{vehicle_make}} {{vehicle_model}}

Need to make changes? Click here {{appointment_link}} or call us at (555) 123-4567.

We look forward to seeing you!

MAE Car Wash & Detailing Team`}></textarea>
                    </div>
                    
                    <div className="form-group checkbox">
                      <input type="checkbox" id="includeMap" defaultChecked />
                      <label htmlFor="includeMap">Include Map Location (Email Only)</label>
                    </div>
                    
                    <div className="form-group checkbox">
                      <input type="checkbox" id="includeCalendarLink" defaultChecked />
                      <label htmlFor="includeCalendarLink">Include Add to Calendar Link</label>
                    </div>
                  </div>
                  
                  <div className="template-preview">
                    <h4>Preview</h4>
                    <div className="preview-frame">
                      <div className="preview-header">
                        <span className="preview-subject">Your appointment confirmation for Premium Wash</span>
                        <span className="preview-from">From: MAE Car Wash & Detailing &lt;noreply@maecarwash.com&gt;</span>
                        <span className="preview-to">To: John Smith &lt;john.smith@example.com&gt;</span>
                      </div>
                      <div className="preview-body">
                        <p>Hi John Smith,</p>
                        <p>Thank you for scheduling a Premium Wash with MAE Car Wash & Detailing.</p>
                        <p>Your appointment details:<br />
                        Date: May 15, 2023<br />
                        Time: 2:00 PM<br />
                        Service: Premium Wash<br />
                        Vehicle: Honda Civic</p>
                        <p>Need to make changes? <a href="#">Click here</a> or call us at (555) 123-4567.</p>
                        <p>We look forward to seeing you!</p>
                        <p>MAE Car Wash & Detailing Team</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="template-actions">
                    <button className="btn-save-template">Save Template</button>
                    <button className="btn-reset-template">Reset to Default</button>
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h3>Notification Preferences</h3>
                <p className="section-description">Configure when and how customer notifications are sent.</p>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Appointment Reminder Timing</label>
                    <select>
                      <option>30 minutes before</option>
                      <option>1 hour before</option>
                      <option selected>24 hours before</option>
                      <option>48 hours before</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  
                  <div className="form-group checkbox">
                    <input type="checkbox" id="sendConfirmation" defaultChecked />
                    <label htmlFor="sendConfirmation">Send Booking Confirmation</label>
                    <p className="input-description">Send confirmation immediately after booking is made</p>
                  </div>
                  
                  <div className="form-group checkbox">
                    <input type="checkbox" id="sendReminder" defaultChecked />
                    <label htmlFor="sendReminder">Send Appointment Reminder</label>
                    <p className="input-description">Send reminder based on timing setting above</p>
                  </div>
                  
                  <div className="form-group checkbox">
                    <input type="checkbox" id="sendComplete" defaultChecked />
                    <label htmlFor="sendComplete">Send Service Completion Notification</label>
                    <p className="input-description">Notify customers when their service is complete</p>
                  </div>
                  
                  <div className="form-group checkbox">
                    <input type="checkbox" id="sendFeedback" defaultChecked />
                    <label htmlFor="sendFeedback">Send Feedback Request</label>
                    <p className="input-description">Ask for customer feedback after service</p>
                  </div>
                  
                  <div className="form-group">
                    <label>Feedback Request Timing</label>
                    <select>
                      <option>Immediately after service</option>
                      <option selected>1 hour after service</option>
                      <option>4 hours after service</option>
                      <option>24 hours after service</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Business Hours for Communications</label>
                    <div className="time-range">
                      <input type="time" defaultValue="08:00" />
                      <span>to</span>
                      <input type="time" defaultValue="20:00" />
                    </div>
                    <p className="input-description">Only send non-urgent communications during these hours</p>
                  </div>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>Email Configuration</h3>
                <p className="section-description">Configure your email sending settings.</p>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Sender Email Address</label>
                    <input type="email" defaultValue="noreply@maecarwash.com" />
                  </div>
                  
                  <div className="form-group">
                    <label>Sender Name</label>
                    <input type="text" defaultValue="MAE Car Wash & Detailing" />
                  </div>
                  
                  <div className="form-group">
                    <label>Reply-To Email Address</label>
                    <input type="email" defaultValue="contact@maecarwash.com" />
                  </div>
                  
                  <div className="form-group">
                    <label>Email Footer Text</label>
                    <textarea rows={3} defaultValue={`© 2023 MAE Car Wash & Detailing. All rights reserved.
123 Main Street, San Francisco, CA 94105
To unsubscribe from marketing emails, click here.`}></textarea>
                  </div>
                  
                  <div className="form-group checkbox">
                    <input type="checkbox" id="includeUnsubscribe" defaultChecked />
                    <label htmlFor="includeUnsubscribe">Include Unsubscribe Link in Marketing Emails</label>
                  </div>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>SMS Configuration</h3>
                <p className="section-description">Configure your SMS messaging settings.</p>
                <div className="settings-form">
                  <div className="form-group">
                    <label>SMS Sender ID</label>
                    <input type="text" defaultValue="MAECARWASH" />
                    <p className="input-description">Alphanumeric sender ID (if supported by your provider)</p>
                  </div>
                  
                  <div className="form-group">
                    <label>SMS Provider</label>
                    <select>
                      <option selected>Twilio</option>
                      <option>MessageBird</option>
                      <option>Nexmo</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Business Phone Number</label>
                    <input type="tel" defaultValue="(555) 123-4567" />
                    <p className="input-description">Include in SMS messages for customer replies</p>
                  </div>
                  
                  <div className="form-group checkbox">
                    <input type="checkbox" id="includeOptOut" defaultChecked />
                    <label htmlFor="includeOptOut">Include Opt-Out Instructions</label>
                    <p className="input-description">Add "Reply STOP to unsubscribe" to marketing SMS</p>
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button className="btn-save">Save Changes</button>
                <button className="btn-cancel">Cancel</button>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="settings-panel">
              <h2>Integrations Settings</h2>
              
              <div className="settings-section">
                <h3>Payment Processors</h3>
                <p className="section-description">Connect payment processors to accept payments through multiple channels.</p>
                <div className="integrations-grid">
                  <div className="integration-card">
                    <div className="integration-logo stripe"></div>
                    <div className="integration-info">
                      <h4>Stripe</h4>
                      <p>Process credit card payments online</p>
                      <span className="integration-status connected">Connected</span>
                    </div>
                    <div className="integration-actions">
                      <button className="btn-configure">Configure</button>
                      <button className="btn-disconnect">Disconnect</button>
                    </div>
                  </div>
                  
                  <div className="integration-card">
                    <div className="integration-logo square"></div>
                    <div className="integration-info">
                      <h4>Square</h4>
                      <p>In-person and online payment processing</p>
                      <span className="integration-status">Not connected</span>
                    </div>
                    <div className="integration-actions">
                      <button className="btn-connect">Connect</button>
                    </div>
                  </div>
                  
                  <div className="integration-card">
                    <div className="integration-logo paypal"></div>
                    <div className="integration-info">
                      <h4>PayPal</h4>
                      <p>Accept PayPal payments online</p>
                      <span className="integration-status">Not connected</span>
                    </div>
                    <div className="integration-actions">
                      <button className="btn-connect">Connect</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>Booking Platforms</h3>
                <p className="section-description">Sync appointments with popular booking platforms and marketplaces.</p>
                <div className="integrations-grid">
                  <div className="integration-card">
                    <div className="integration-logo google"></div>
                    <div className="integration-info">
                      <h4>Google Business</h4>
                      <p>Allow customers to book directly from Google Search and Maps</p>
                      <span className="integration-status connected">Connected</span>
                    </div>
                    <div className="integration-actions">
                      <button className="btn-configure">Configure</button>
                      <button className="btn-disconnect">Disconnect</button>
                    </div>
                  </div>
                  
                  <div className="integration-card">
                    <div className="integration-logo calendar"></div>
                    <div className="integration-info">
                      <h4>Google Calendar</h4>
                      <p>Sync appointments with your team's Google Calendar</p>
                      <span className="integration-status">Not connected</span>
                    </div>
                    <div className="integration-actions">
                      <button className="btn-connect">Connect</button>
                    </div>
                  </div>
                  
                  <div className="integration-card">
                    <div className="integration-logo yelp"></div>
                    <div className="integration-info">
                      <h4>Yelp</h4>
                      <p>Allow customers to book through your Yelp business page</p>
                      <span className="integration-status">Not connected</span>
                    </div>
                    <div className="integration-actions">
                      <button className="btn-connect">Connect</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>Accounting Software</h3>
                <p className="section-description">Connect your accounting software to streamline financial tracking.</p>
                <div className="integrations-grid">
                  <div className="integration-card">
                    <div className="integration-logo quickbooks"></div>
                    <div className="integration-info">
                      <h4>QuickBooks</h4>
                      <p>Automatically sync sales, invoices, and expenses</p>
                      <span className="integration-status connected">Connected</span>
                    </div>
                    <div className="integration-actions">
                      <button className="btn-configure">Configure</button>
                      <button className="btn-disconnect">Disconnect</button>
                    </div>
                  </div>
                  
                  <div className="integration-card">
                    <div className="integration-logo xero"></div>
                    <div className="integration-info">
                      <h4>Xero</h4>
                      <p>Cloud-based accounting software integration</p>
                      <span className="integration-status">Not connected</span>
                    </div>
                    <div className="integration-actions">
                      <button className="btn-connect">Connect</button>
                    </div>
                  </div>
                  
                  <div className="integration-card">
                    <div className="integration-logo freshbooks"></div>
                    <div className="integration-info">
                      <h4>FreshBooks</h4>
                      <p>Invoicing and accounting for small businesses</p>
                      <span className="integration-status">Not connected</span>
                    </div>
                    <div className="integration-actions">
                      <button className="btn-connect">Connect</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>CRM Systems</h3>
                <p className="section-description">Connect your customer relationship management platforms.</p>
                <div className="integrations-grid">
                  <div className="integration-card">
                    <div className="integration-logo salesforce"></div>
                    <div className="integration-info">
                      <h4>Salesforce</h4>
                      <p>Sync customer data with Salesforce CRM</p>
                      <span className="integration-status">Not connected</span>
                    </div>
                    <div className="integration-actions">
                      <button className="btn-connect">Connect</button>
                    </div>
                  </div>
                  
                  <div className="integration-card">
                    <div className="integration-logo hubspot"></div>
                    <div className="integration-info">
                      <h4>HubSpot</h4>
                      <p>Manage customer relationships and marketing</p>
                      <span className="integration-status">Not connected</span>
                    </div>
                    <div className="integration-actions">
                      <button className="btn-connect">Connect</button>
                    </div>
                  </div>
                  
                  <div className="integration-card">
                    <div className="integration-logo zoho"></div>
                    <div className="integration-info">
                      <h4>Zoho CRM</h4>
                      <p>Customer relationship management platform</p>
                      <span className="integration-status">Not connected</span>
                    </div>
                    <div className="integration-actions">
                      <button className="btn-connect">Connect</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>Marketing Tools</h3>
                <p className="section-description">Connect marketing platforms to streamline your marketing efforts.</p>
                <div className="integrations-grid">
                  <div className="integration-card">
                    <div className="integration-logo mailchimp"></div>
                    <div className="integration-info">
                      <h4>Mailchimp</h4>
                      <p>Email marketing automation platform</p>
                      <span className="integration-status connected">Connected</span>
                    </div>
                    <div className="integration-actions">
                      <button className="btn-configure">Configure</button>
                      <button className="btn-disconnect">Disconnect</button>
                    </div>
                  </div>
                  
                  <div className="integration-card">
                    <div className="integration-logo facebook"></div>
                    <div className="integration-info">
                      <h4>Facebook & Instagram</h4>
                      <p>Manage social media ads and presence</p>
                      <span className="integration-status">Not connected</span>
                    </div>
                    <div className="integration-actions">
                      <button className="btn-connect">Connect</button>
                    </div>
                  </div>
                  
                  <div className="integration-card">
                    <div className="integration-logo google-ads"></div>
                    <div className="integration-info">
                      <h4>Google Ads</h4>
                      <p>Manage search and display advertising</p>
                      <span className="integration-status">Not connected</span>
                    </div>
                    <div className="integration-actions">
                      <button className="btn-connect">Connect</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>Add New Integration</h3>
                <p className="section-description">Can't find what you're looking for? Browse our integration marketplace.</p>
                <div className="marketplace-actions">
                  <button className="btn-marketplace">Browse Integration Marketplace</button>
                  <button className="btn-api">View API Documentation</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="settings-panel">
              <h2>Services Settings</h2>
              
              <div className="settings-section">
                <p className="section-description">Manage your service offerings, pricing, and availability.</p>
                
                <div className="service-settings-content">
                  <div className="service-categories-tabs">
                    <button className="service-category-tab active">All Services</button>
                    <button className="service-category-tab">Wash Services</button>
                    <button className="service-category-tab">Detail Services</button>
                    <button className="service-category-tab">Add-ons</button>
                    <button className="service-category-tab add-category">+ Add Category</button>
                  </div>
                  
                  <div className="service-management-header">
                    <div className="service-search">
                      <input type="text" placeholder="Search services..." />
                    </div>
                    <div className="service-actions">
                      <button className="btn-add-service">+ Add New Service</button>
                      <button className="btn-bulk-edit">Bulk Edit</button>
                    </div>
                  </div>
                  
                  <div className="service-list">
                    <div className="service-list-header">
                      <span className="service-header-name">Service Name</span>
                      <span className="service-header-duration">Duration</span>
                      <span className="service-header-price">Price</span>
                      <span className="service-header-availability">Availability</span>
                      <span className="service-header-actions">Actions</span>
                    </div>
                    
                    <div className="service-list-empty">
                      <div className="empty-state-message">
                        <h3>This settings page is under development.</h3>
                        <p>Please check back later for updates.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'teams' && (
            <div className="settings-panel">
              <h2>Teams Settings</h2>
              
              <div className="settings-section">
                <p className="section-description">Manage your team members, roles, and permissions.</p>
                
                <div className="teams-settings-content">
                  <div className="team-management-header">
                    <div className="team-search">
                      <input type="text" placeholder="Search team members..." />
                    </div>
                    <div className="team-actions">
                      <button className="btn-add-member">+ Add Team Member</button>
                      <select className="team-filter">
                        <option value="all">All Departments</option>
                        <option value="admin">Administration</option>
                        <option value="wash">Wash Team</option>
                        <option value="detail">Detail Team</option>
                        <option value="customer">Customer Service</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="team-stats">
                    <div className="team-stat-card">
                      <span className="stat-number">12</span>
                      <span className="stat-label">Team Members</span>
                    </div>
                    <div className="team-stat-card">
                      <span className="stat-number">3</span>
                      <span className="stat-label">Managers</span>
                    </div>
                    <div className="team-stat-card">
                      <span className="stat-number">4</span>
                      <span className="stat-label">Departments</span>
                    </div>
                    <div className="team-stat-card">
                      <span className="stat-number">2</span>
                      <span className="stat-label">Open Positions</span>
                    </div>
                  </div>
                  
                  <div className="team-list-container">
                    <div className="team-list-header">
                      <span className="team-header-name">Name</span>
                      <span className="team-header-email">Email</span>
                      <span className="team-header-role">Role</span>
                      <span className="team-header-department">Department</span>
                      <span className="team-header-status">Status</span>
                      <span className="team-header-actions">Actions</span>
                    </div>
                    
                    <div className="team-list">
                      <div className="team-member-row">
                        <div className="team-member-name">
                          <div className="team-member-avatar">JD</div>
                          <div className="team-member-info">
                            <span className="member-name">John Doe</span>
                            <span className="member-since">Member since Jan 2023</span>
                          </div>
                        </div>
                        <div className="team-member-email">john.doe@example.com</div>
                        <div className="team-member-role">Manager</div>
                        <div className="team-member-department">Administration</div>
                        <div className="team-member-status">
                          <span className="status-badge active">Active</span>
                        </div>
                        <div className="team-member-actions">
                          <button className="btn-edit-member">Edit</button>
                          <button className="btn-view-member">View</button>
                        </div>
                      </div>
                      
                      <div className="team-member-row">
                        <div className="team-member-name">
                          <div className="team-member-avatar">JS</div>
                          <div className="team-member-info">
                            <span className="member-name">Jane Smith</span>
                            <span className="member-since">Member since Mar 2023</span>
                          </div>
                        </div>
                        <div className="team-member-email">jane.smith@example.com</div>
                        <div className="team-member-role">Team Lead</div>
                        <div className="team-member-department">Detail Team</div>
                        <div className="team-member-status">
                          <span className="status-badge active">Active</span>
                        </div>
                        <div className="team-member-actions">
                          <button className="btn-edit-member">Edit</button>
                          <button className="btn-view-member">View</button>
                        </div>
                      </div>
                      
                      <div className="team-member-row">
                        <div className="team-member-name">
                          <div className="team-member-avatar">RJ</div>
                          <div className="team-member-info">
                            <span className="member-name">Robert Johnson</span>
                            <span className="member-since">Member since Feb 2023</span>
                          </div>
                        </div>
                        <div className="team-member-email">robert.j@example.com</div>
                        <div className="team-member-role">Detailer</div>
                        <div className="team-member-department">Detail Team</div>
                        <div className="team-member-status">
                          <span className="status-badge vacation">On Vacation</span>
                        </div>
                        <div className="team-member-actions">
                          <button className="btn-edit-member">Edit</button>
                          <button className="btn-view-member">View</button>
                        </div>
                      </div>
                      
                      <div className="team-member-row">
                        <div className="team-member-name">
                          <div className="team-member-avatar">MC</div>
                          <div className="team-member-info">
                            <span className="member-name">Maria Cruz</span>
                            <span className="member-since">Member since Apr 2023</span>
                          </div>
                        </div>
                        <div className="team-member-email">maria.c@example.com</div>
                        <div className="team-member-role">Customer Service</div>
                        <div className="team-member-department">Customer Service</div>
                        <div className="team-member-status">
                          <span className="status-badge active">Active</span>
                        </div>
                        <div className="team-member-actions">
                          <button className="btn-edit-member">Edit</button>
                          <button className="btn-view-member">View</button>
                        </div>
                      </div>
                      
                      <div className="team-member-row">
                        <div className="team-member-name">
                          <div className="team-member-avatar">DW</div>
                          <div className="team-member-info">
                            <span className="member-name">David Wilson</span>
                            <span className="member-since">Member since May 2023</span>
                          </div>
                        </div>
                        <div className="team-member-email">david.w@example.com</div>
                        <div className="team-member-role">Manager</div>
                        <div className="team-member-department">Wash Team</div>
                        <div className="team-member-status">
                          <span className="status-badge inactive">Inactive</span>
                        </div>
                        <div className="team-member-actions">
                          <button className="btn-edit-member">Edit</button>
                          <button className="btn-view-member">View</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="team-pagination">
                    <div className="pagination-info">Showing 5 of 12 team members</div>
                    <div className="pagination-controls">
                      <button className="btn-prev-page" disabled>Previous</button>
                      <div className="pagination-pages">
                        <button className="pagination-page active">1</button>
                        <button className="pagination-page">2</button>
                        <button className="pagination-page">3</button>
                      </div>
                      <button className="btn-next-page">Next</button>
                    </div>
                    <div className="pagination-per-page">
                      <select>
                        <option>5 per page</option>
                        <option>10 per page</option>
                        <option>20 per page</option>
                        <option>All</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>Roles & Permissions</h3>
                <p className="section-description">Configure access levels and permissions for different roles within your organization.</p>
                
                <div className="role-management">
                  <div className="roles-list">
                    <div className="role-card">
                      <div className="role-header">
                        <h4>Administrator</h4>
                        <span className="role-count">2 members</span>
                      </div>
                      <p className="role-description">Full access to all system functions and settings.</p>
                      <div className="role-actions">
                        <button className="btn-edit-role">Edit</button>
                        <button className="btn-view-users">View Users</button>
                      </div>
                    </div>
                    
                    <div className="role-card">
                      <div className="role-header">
                        <h4>Manager</h4>
                        <span className="role-count">3 members</span>
                      </div>
                      <p className="role-description">Can manage team members, view reports, and handle operations.</p>
                      <div className="role-actions">
                        <button className="btn-edit-role">Edit</button>
                        <button className="btn-view-users">View Users</button>
                      </div>
                    </div>
                    
                    <div className="role-card">
                      <div className="role-header">
                        <h4>Team Lead</h4>
                        <span className="role-count">4 members</span>
                      </div>
                      <p className="role-description">Oversees daily operations and team performance.</p>
                      <div className="role-actions">
                        <button className="btn-edit-role">Edit</button>
                        <button className="btn-view-users">View Users</button>
                      </div>
                    </div>
                    
                    <div className="role-card">
                      <div className="role-header">
                        <h4>Staff</h4>
                        <span className="role-count">3 members</span>
                      </div>
                      <p className="role-description">Basic access to perform daily tasks and record service information.</p>
                      <div className="role-actions">
                        <button className="btn-edit-role">Edit</button>
                        <button className="btn-view-users">View Users</button>
                      </div>
                    </div>
                    
                    <div className="role-card add-role">
                      <div className="add-role-content">
                        <span>+ Add New Role</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>Departments</h3>
                <p className="section-description">Organize your team into functional departments.</p>
                
                <div className="departments-management">
                  <div className="departments-list">
                    <div className="department-card">
                      <div className="department-header">
                        <h4>Administration</h4>
                        <span className="department-count">2 members</span>
                      </div>
                      <p className="department-description">Management and administrative staff.</p>
                      <div className="department-actions">
                        <button className="btn-edit-department">Edit</button>
                        <button className="btn-view-members">View Members</button>
                      </div>
                    </div>
                    
                    <div className="department-card">
                      <div className="department-header">
                        <h4>Wash Team</h4>
                        <span className="department-count">5 members</span>
                      </div>
                      <p className="department-description">Staff responsible for basic and premium wash services.</p>
                      <div className="department-actions">
                        <button className="btn-edit-department">Edit</button>
                        <button className="btn-view-members">View Members</button>
                      </div>
                    </div>
                    
                    <div className="department-card">
                      <div className="department-header">
                        <h4>Detail Team</h4>
                        <span className="department-count">3 members</span>
                      </div>
                      <p className="department-description">Specialists in detailed cleaning and premium services.</p>
                      <div className="department-actions">
                        <button className="btn-edit-department">Edit</button>
                        <button className="btn-view-members">View Members</button>
                      </div>
                    </div>
                    
                    <div className="department-card">
                      <div className="department-header">
                        <h4>Customer Service</h4>
                        <span className="department-count">2 members</span>
                      </div>
                      <p className="department-description">Front desk and customer support personnel.</p>
                      <div className="department-actions">
                        <button className="btn-edit-department">Edit</button>
                        <button className="btn-view-members">View Members</button>
                      </div>
                    </div>
                    
                    <div className="department-card add-department">
                      <div className="add-department-content">
                        <span>+ Add New Department</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <SecuritySettingsPanel />
          )}

          {activeTab === 'notifications' && (
            <NotificationsSettingsPanel />
          )}

          {activeTab === 'payments' && (
            <PaymentsSettingsPanel />
          )}

          {activeTab === 'help-support' && (
            <HelpSupportSettingsPanel />
          )}

          {activeTab !== 'services' && 
           activeTab !== 'teams' && 
           activeTab !== 'security' && 
           activeTab !== 'notifications' && 
           activeTab !== 'payments' && 
           activeTab !== 'help-support' && (
            <div className="settings-placeholder">
              <div className="placeholder-icon">⚙️</div>
              <h3>Settings - {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
              <p>This settings panel is under development.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings; 