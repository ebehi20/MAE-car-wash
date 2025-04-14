import React, { useState } from 'react';
import './Settings.css';
import { FiBell, FiMail, FiSmartphone, FiBriefcase, FiCalendar, FiDollarSign, FiUsers, FiMessageSquare, FiInfo } from 'react-icons/fi';

interface NotificationPreference {
  id: number;
  type: string;
  description: string;
  email: boolean;
  sms: boolean;
  app: boolean;
  browser: boolean;
}

interface AdvancedSettings {
  emailDigest: string;
  quietHours: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
  weekend: boolean;
}

const NotificationsSettingsPanel: React.FC = () => {
  // Mock notification preference data
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreference[]>([
    { id: 1, type: 'New appointment', description: 'When a new appointment is scheduled', email: true, sms: true, app: true, browser: false },
    { id: 2, type: 'Appointment reminder', description: 'Reminder before scheduled appointments', email: true, sms: true, app: true, browser: false },
    { id: 3, type: 'Appointment changes', description: 'When an appointment is rescheduled or canceled', email: true, sms: true, app: true, browser: false },
    { id: 4, type: 'New customer', description: 'When a new customer is created', email: true, sms: false, app: true, browser: false },
    { id: 5, type: 'Payment received', description: 'When a payment is processed successfully', email: true, sms: false, app: true, browser: false },
    { id: 6, type: 'Payment failed', description: 'When a payment fails to process', email: true, sms: true, app: true, browser: false },
    { id: 7, type: 'Inventory alerts', description: 'Low inventory notifications', email: true, sms: false, app: true, browser: false },
    { id: 8, type: 'Staff updates', description: 'Changes to staff schedules or permissions', email: true, sms: false, app: true, browser: false },
    { id: 9, type: 'System updates', description: 'Platform updates and maintenance notifications', email: true, sms: false, app: true, browser: false },
    { id: 10, type: 'Marketing campaigns', description: 'Updates about marketing and promotional campaigns', email: true, sms: false, app: false, browser: false }
  ]);

  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings>({
    emailDigest: 'daily',
    quietHours: true,
    quietHoursStart: '22:00',
    quietHoursEnd: '07:00',
    weekend: false
  });

  // Toggle all notifications for a specific channel
  const toggleAllChannel = (channel: keyof Omit<NotificationPreference, 'id' | 'type' | 'description'>, enabled: boolean) => {
    setNotificationPreferences(prev => 
      prev.map(pref => ({
        ...pref,
        [channel]: enabled
      }))
    );
  };

  // Toggle a single notification setting
  const toggleNotification = (id: number, channel: keyof Omit<NotificationPreference, 'id' | 'type' | 'description'>) => {
    setNotificationPreferences(prev => 
      prev.map(pref => 
        pref.id === id ? { ...pref, [channel]: !pref[channel] } : pref
      )
    );
  };

  // Handle advanced settings changes
  const handleAdvancedSettingChange = (setting: keyof AdvancedSettings, value: string | boolean) => {
    setAdvancedSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="settings-panel">
      <h2>Notification Settings</h2>
      <p className="section-description">Manage how and when you receive notifications about your business</p>

      <div className="settings-section">
        <h3>Notification Preferences</h3>
        
        <div className="notification-type-info">
          <div className="notification-channel">
            <div className="channel-icon"><FiMail /></div>
            <span>Email</span>
          </div>
          <div className="notification-channel">
            <div className="channel-icon"><FiSmartphone /></div>
            <span>SMS</span>
          </div>
          <div className="notification-channel">
            <div className="channel-icon"><FiBell /></div>
            <span>App</span>
          </div>
          <div className="notification-channel">
            <div className="channel-icon"><FiInfo /></div>
            <span>Browser</span>
          </div>
        </div>
        
        <div className="notification-action-buttons">
          <div className="channel-actions">
            <span>Email</span>
            <button 
              className="btn-enable-all"
              onClick={() => toggleAllChannel('email', true)}
            >
              Enable All
            </button>
            <button 
              className="btn-disable-all"
              onClick={() => toggleAllChannel('email', false)}
            >
              Disable All
            </button>
          </div>
          
          <div className="channel-actions">
            <span>SMS</span>
            <button 
              className="btn-enable-all"
              onClick={() => toggleAllChannel('sms', true)}
            >
              Enable All
            </button>
            <button 
              className="btn-disable-all"
              onClick={() => toggleAllChannel('sms', false)}
            >
              Disable All
            </button>
          </div>
          
          <div className="channel-actions">
            <span>App</span>
            <button 
              className="btn-enable-all"
              onClick={() => toggleAllChannel('app', true)}
            >
              Enable All
            </button>
            <button 
              className="btn-disable-all"
              onClick={() => toggleAllChannel('app', false)}
            >
              Disable All
            </button>
          </div>
          
          <div className="channel-actions">
            <span>Browser</span>
            <button 
              className="btn-enable-all"
              onClick={() => toggleAllChannel('browser', true)}
            >
              Enable All
            </button>
            <button 
              className="btn-disable-all"
              onClick={() => toggleAllChannel('browser', false)}
            >
              Disable All
            </button>
          </div>
        </div>
        
        <div className="notification-preferences">
          <div className="notification-preference-header">
            <div className="notification-type-column">Notification Type</div>
            <div className="notification-channel-column">Email</div>
            <div className="notification-channel-column">SMS</div>
            <div className="notification-channel-column">App</div>
            <div className="notification-channel-column">Browser</div>
          </div>
          
          {notificationPreferences.map(pref => (
            <div className="notification-preference-row" key={pref.id}>
              <div className="notification-type-column">
                <h4>{pref.type}</h4>
                <p>{pref.description}</p>
              </div>
              <div className="notification-channel-column">
                <input 
                  type="checkbox" 
                  checked={pref.email} 
                  onChange={() => toggleNotification(pref.id, 'email')}
                />
              </div>
              <div className="notification-channel-column">
                <input 
                  type="checkbox" 
                  checked={pref.sms} 
                  onChange={() => toggleNotification(pref.id, 'sms')}
                />
              </div>
              <div className="notification-channel-column">
                <input 
                  type="checkbox" 
                  checked={pref.app} 
                  onChange={() => toggleNotification(pref.id, 'app')}
                />
              </div>
              <div className="notification-channel-column">
                <input 
                  type="checkbox" 
                  checked={pref.browser} 
                  onChange={() => toggleNotification(pref.id, 'browser')}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Notification Categories</h3>
        <p className="section-description">Group your notifications by business category</p>
        
        <div className="notification-categories">
          <div className="category-card">
            <div className="category-icon">
              <FiBriefcase />
            </div>
            <div className="category-info">
              <h4>Business Operations</h4>
              <p>Appointments, inventory, and system notifications</p>
              <div className="category-toggle">
                <input type="checkbox" id="business-toggle" checked onChange={() => {}} />
                <label htmlFor="business-toggle">Enabled</label>
              </div>
            </div>
          </div>
          
          <div className="category-card">
            <div className="category-icon">
              <FiCalendar />
            </div>
            <div className="category-info">
              <h4>Appointments</h4>
              <p>Scheduling, reminders, and changes</p>
              <div className="category-toggle">
                <input type="checkbox" id="appointments-toggle" checked onChange={() => {}} />
                <label htmlFor="appointments-toggle">Enabled</label>
              </div>
            </div>
          </div>
          
          <div className="category-card">
            <div className="category-icon">
              <FiDollarSign />
            </div>
            <div className="category-info">
              <h4>Financial</h4>
              <p>Payments, invoices, and billing</p>
              <div className="category-toggle">
                <input type="checkbox" id="financial-toggle" checked onChange={() => {}} />
                <label htmlFor="financial-toggle">Enabled</label>
              </div>
            </div>
          </div>
          
          <div className="category-card">
            <div className="category-icon">
              <FiUsers />
            </div>
            <div className="category-info">
              <h4>Customers</h4>
              <p>New customers and customer updates</p>
              <div className="category-toggle">
                <input type="checkbox" id="customers-toggle" checked onChange={() => {}} />
                <label htmlFor="customers-toggle">Enabled</label>
              </div>
            </div>
          </div>
          
          <div className="category-card">
            <div className="category-icon">
              <FiMessageSquare />
            </div>
            <div className="category-info">
              <h4>Marketing</h4>
              <p>Campaigns, promotions, and customer engagement</p>
              <div className="category-toggle">
                <input type="checkbox" id="marketing-toggle" checked onChange={() => {}} />
                <label htmlFor="marketing-toggle">Enabled</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Advanced Notification Settings</h3>
        
        <div className="advanced-settings">
          <div className="form-group">
            <label>Email Digest Frequency</label>
            <select 
              value={advancedSettings.emailDigest}
              onChange={(e) => handleAdvancedSettingChange('emailDigest', e.target.value)}
            >
              <option value="off">Don't send digest</option>
              <option value="daily">Daily digest</option>
              <option value="weekly">Weekly digest</option>
              <option value="monthly">Monthly digest</option>
            </select>
            <p className="input-description">Receive a summary of notifications instead of individual emails</p>
          </div>
          
          <div className="form-group checkbox">
            <input 
              type="checkbox" 
              id="quietHours" 
              checked={advancedSettings.quietHours}
              onChange={(e) => handleAdvancedSettingChange('quietHours', e.target.checked)}
            />
            <label htmlFor="quietHours">Enable Quiet Hours</label>
            <p className="input-description">Don't send push or SMS notifications during specified hours</p>
          </div>
          
          {advancedSettings.quietHours && (
            <div className="quiet-hours-settings">
              <div className="form-group time-range">
                <label>Quiet Hours</label>
                <div className="time-inputs">
                  <input 
                    type="time" 
                    value={advancedSettings.quietHoursStart}
                    onChange={(e) => handleAdvancedSettingChange('quietHoursStart', e.target.value)}
                  />
                  <span>to</span>
                  <input 
                    type="time" 
                    value={advancedSettings.quietHoursEnd}
                    onChange={(e) => handleAdvancedSettingChange('quietHoursEnd', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group checkbox">
                <input 
                  type="checkbox" 
                  id="weekends" 
                  checked={advancedSettings.weekend}
                  onChange={(e) => handleAdvancedSettingChange('weekend', e.target.checked)}
                />
                <label htmlFor="weekends">Quiet hours active on weekends</label>
              </div>
            </div>
          )}
          
          <div className="form-group">
            <label>Mobile Push Notification Sound</label>
            <select>
              <option>Default</option>
              <option>None</option>
              <option>Subtle</option>
              <option>Chime</option>
              <option>Alert</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Email Template Settings</h3>
        <p className="section-description">Customize the appearance of your notification emails</p>
        
        <div className="email-template-settings">
          <div className="template-preview">
            <h4>Current Email Template</h4>
            <div className="preview-frame">
              <div className="preview-content">
                <div className="preview-header">
                  <div className="logo-placeholder">LOGO</div>
                  <h3>MAE Car Wash</h3>
                </div>
                <div className="preview-body">
                  <p>This is a sample of how your email notifications will appear to customers.</p>
                  <button className="sample-cta">Call To Action</button>
                </div>
                <div className="preview-footer">
                  <p>123 Main Street, Anytown, CA 12345</p>
                  <p>© 2023 MAE Car Wash</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="template-options">
            <div className="form-group">
              <label>Email Template</label>
              <select>
                <option>Default</option>
                <option>Modern</option>
                <option>Classic</option>
                <option>Minimal</option>
                <option>Custom</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Header Color</label>
              <input type="color" value="#4285F4" onChange={() => {}} />
            </div>
            
            <div className="form-group">
              <label>Button Color</label>
              <input type="color" value="#4285F4" onChange={() => {}} />
            </div>
            
            <div className="form-group">
              <label>Company Logo</label>
              <div className="logo-upload">
                <div className="logo-preview">
                  <div className="placeholder">Logo</div>
                </div>
                <button className="btn-upload">Upload Logo</button>
              </div>
              <p className="input-description">Recommended size: 200x50px, PNG or JPG</p>
            </div>
            
            <div className="form-group">
              <label>Email Footer Text</label>
              <textarea rows={3} defaultValue="© 2023 MAE Car Wash - 123 Main Street, Anytown, CA 12345"></textarea>
            </div>
            
            <button className="btn-save-template">Save Template Settings</button>
          </div>
        </div>
      </div>
      
      <div className="settings-actions">
        <button className="btn-save">Save Notification Settings</button>
        <button className="btn-cancel">Cancel</button>
      </div>
    </div>
  );
};

export default NotificationsSettingsPanel; 