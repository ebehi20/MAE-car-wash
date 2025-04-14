import React, { useState } from 'react';
import './Settings.css';
import { FiLock, FiShield, FiAlertCircle, FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';

const SecuritySettingsPanel: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [current2FA, setCurrent2FA] = useState('none');
  const [new2FA, setNew2FA] = useState('none');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Mock audit log data
  const auditLogs = [
    { id: 1, action: 'Login', user: 'admin@example.com', ip: '192.168.1.105', date: '2023-06-12 10:45 AM', status: 'success' },
    { id: 2, action: 'Password change', user: 'admin@example.com', ip: '192.168.1.105', date: '2023-06-10 03:22 PM', status: 'success' },
    { id: 3, action: 'Failed login', user: 'admin@example.com', ip: '45.232.112.89', date: '2023-06-08 07:18 AM', status: 'failed' },
    { id: 4, action: 'Two-factor authentication setup', user: 'admin@example.com', ip: '192.168.1.105', date: '2023-06-05 01:33 PM', status: 'success' },
    { id: 5, action: 'API key generated', user: 'admin@example.com', ip: '192.168.1.105', date: '2023-06-01 11:27 AM', status: 'success' }
  ];

  return (
    <div className="settings-panel">
      <h2>Security Settings</h2>
      <p className="section-description">Manage your account security preferences and authentication methods</p>

      <div className="settings-section">
        <h3>Password Management</h3>
        <div className="settings-form">
          <div className="form-group">
            <label>Current Password</label>
            <div className="password-input-group">
              <input 
                type={passwordVisible ? "text" : "password"} 
                placeholder="Enter your current password" 
              />
              <button 
                className="toggle-password-btn" 
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label>New Password</label>
            <input 
              type="password" 
              placeholder="Enter a new password" 
            />
            <p className="input-description">Password must be at least 12 characters long and include uppercase, lowercase, number, and special character</p>
          </div>
          
          <div className="form-group">
            <label>Confirm New Password</label>
            <input 
              type="password" 
              placeholder="Confirm your new password" 
            />
          </div>
          
          <div className="password-strength">
            <div className="strength-meter">
              <div className="strength-meter-fill" style={{ width: '75%' }}></div>
            </div>
            <p>Password Strength: <span className="strength-label strong">Strong</span></p>
          </div>
          
          <button className="btn-save">Update Password</button>
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Two-Factor Authentication (2FA)</h3>
        <p className="section-description">Add an extra layer of security to your account</p>
        
        <div className="two-factor-options">
          <div className="form-group">
            <label>Current 2FA Method</label>
            <select 
              value={current2FA}
              onChange={(e) => setCurrent2FA(e.target.value)}
            >
              <option value="none">None (not recommended)</option>
              <option value="app">Authenticator App</option>
              <option value="sms">SMS Authentication</option>
              <option value="email">Email Authentication</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Set Up a New 2FA Method</label>
            <select 
              value={new2FA}
              onChange={(e) => setNew2FA(e.target.value)}
            >
              <option value="none">Select a method</option>
              <option value="app">Authenticator App</option>
              <option value="sms">SMS Authentication</option>
              <option value="email">Email Authentication</option>
            </select>
          </div>
          
          {new2FA !== 'none' && (
            <div className="setup-2fa">
              <h4>Setup Instructions</h4>
              {new2FA === 'app' && (
                <div className="qr-setup">
                  <div className="qr-placeholder">
                    <p>QR Code</p>
                  </div>
                  <ol className="setup-steps">
                    <li>Download an authenticator app like Google Authenticator or Authy</li>
                    <li>Scan this QR code with the app</li>
                    <li>Enter the 6-digit code from the app below</li>
                  </ol>
                  <input type="text" placeholder="Enter 6-digit code" maxLength={6} />
                </div>
              )}
              
              {new2FA === 'sms' && (
                <div className="sms-setup">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="Enter your phone number" />
                  </div>
                  <button className="btn-send-code">Send Verification Code</button>
                  <div className="form-group">
                    <label>Verification Code</label>
                    <input type="text" placeholder="Enter verification code" maxLength={6} />
                  </div>
                </div>
              )}
              
              {new2FA === 'email' && (
                <div className="email-setup">
                  <p>We'll send a verification code to your email: admin@example.com</p>
                  <button className="btn-send-code">Send Verification Code</button>
                  <div className="form-group">
                    <label>Verification Code</label>
                    <input type="text" placeholder="Enter verification code" maxLength={6} />
                  </div>
                </div>
              )}
              
              <button className="btn-save">Verify and Enable</button>
            </div>
          )}
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Security Log</h3>
        <p className="section-description">Recent security events for your account</p>
        
        <div className="security-log">
          <div className="log-header">
            <div className="log-action">Action</div>
            <div className="log-user">User</div>
            <div className="log-ip">IP Address</div>
            <div className="log-date">Date & Time</div>
            <div className="log-status">Status</div>
          </div>
          
          {auditLogs.map(log => (
            <div className="log-item" key={log.id}>
              <div className="log-action">{log.action}</div>
              <div className="log-user">{log.user}</div>
              <div className="log-ip">{log.ip}</div>
              <div className="log-date">{log.date}</div>
              <div className={`log-status ${log.status}`}>
                {log.status === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
                {log.status}
              </div>
            </div>
          ))}
        </div>
        
        <div className="log-footer">
          <button className="btn-view-all">View Full Security Log</button>
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Device Management</h3>
        <p className="section-description">Manage devices currently logged into your account</p>
        
        <div className="device-list">
          <div className="device-item current">
            <div className="device-icon">
              <FiLock />
            </div>
            <div className="device-info">
              <h4>Current Device</h4>
              <p>Chrome on macOS - 192.168.1.105</p>
              <span className="device-last-active">Active now</span>
            </div>
            <div className="device-actions">
              <button className="btn-logout-device disabled">This Device</button>
            </div>
          </div>
          
          <div className="device-item">
            <div className="device-icon">
              <FiLock />
            </div>
            <div className="device-info">
              <h4>iPhone 13</h4>
              <p>Safari on iOS - 172.56.38.29</p>
              <span className="device-last-active">Last active: 2 hours ago</span>
            </div>
            <div className="device-actions">
              <button className="btn-logout-device">Logout Device</button>
            </div>
          </div>
          
          <div className="device-item">
            <div className="device-icon">
              <FiLock />
            </div>
            <div className="device-info">
              <h4>Windows Laptop</h4>
              <p>Firefox on Windows - 86.45.72.14</p>
              <span className="device-last-active">Last active: 3 days ago</span>
            </div>
            <div className="device-actions">
              <button className="btn-logout-device">Logout Device</button>
            </div>
          </div>
        </div>
        
        <button className="btn-logout-all">Logout All Other Devices</button>
      </div>
      
      <div className="settings-actions">
        <button className="btn-save">Save Security Changes</button>
        <button className="btn-cancel">Cancel</button>
      </div>
    </div>
  );
};

export default SecuritySettingsPanel; 