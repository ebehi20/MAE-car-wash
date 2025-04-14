import React, { useState } from 'react';
import './Settings.css';
import { FiCreditCard, FiDollarSign, FiBarChart2, FiClock, FiPercent, FiToggleRight, FiFileText, FiAlertCircle } from 'react-icons/fi';

const PaymentsSettingsPanel: React.FC = () => {
  // Mock payment method data
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: 'Credit Card', type: 'credit-card', enabled: true },
    { id: 2, name: 'Cash', type: 'cash', enabled: true },
    { id: 3, name: 'Mobile Payment', type: 'mobile', enabled: true },
    { id: 4, name: 'Gift Card', type: 'gift-card', enabled: false }
  ]);

  // Toggle payment method enabled state
  const togglePaymentMethod = (id: number) => {
    setPaymentMethods(prev => 
      prev.map(method => 
        method.id === id ? { ...method, enabled: !method.enabled } : method
      )
    );
  };

  // Mock tax rates
  const [taxRates, setTaxRates] = useState([
    { id: 1, name: 'Sales Tax', rate: 7.5, country: 'US', state: 'CA', active: true },
    { id: 2, name: 'County Tax', rate: 0.25, country: 'US', state: 'CA', active: true },
    { id: 3, name: 'Special District Tax', rate: 0.10, country: 'US', state: 'CA', active: false }
  ]);

  return (
    <div className="settings-panel">
      <h2>Payment Settings</h2>
      <p className="section-description">Manage your payment methods, processors, and tax settings</p>

      <div className="settings-section">
        <h3>Payment Methods</h3>
        <p className="section-description">Configure the payment methods your business accepts</p>
        
        <div className="payment-methods">
          {paymentMethods.map(method => (
            <div className="payment-method-item" key={method.id}>
              <div className="payment-method-header">
                <div className="payment-method-info">
                  <div className={`payment-method-icon ${method.type}`}></div>
                  <div className="payment-method-details">
                    <h4>{method.name}</h4>
                    <p>{method.enabled ? 'Enabled' : 'Disabled'}</p>
                  </div>
                </div>
                <div className="payment-method-toggle">
                  <input 
                    type="checkbox" 
                    id={`toggle-${method.id}`} 
                    checked={method.enabled}
                    onChange={() => togglePaymentMethod(method.id)}
                  />
                  <label htmlFor={`toggle-${method.id}`}></label>
                </div>
              </div>
              
              {method.enabled ? (
                <div className="payment-method-settings">
                  {method.type === 'credit-card' && (
                    <>
                      <div className="form-group">
                        <label>Processing Fee</label>
                        <div className="fee-input-group">
                          <input type="number" min="0" step="0.1" defaultValue="2.9" />
                          <span>% + </span>
                          <input type="number" min="0" step="0.01" defaultValue="0.30" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Processing Time</label>
                        <select>
                          <option>Immediate</option>
                          <option>End of Day</option>
                          <option>Next Business Day</option>
                        </select>
                      </div>
                    </>
                  )}
                  
                  {method.type === 'cash' && (
                    <div className="form-group">
                      <label>Cash Handling Fee</label>
                      <input type="number" min="0" step="0.1" defaultValue="0" />
                      <span>%</span>
                    </div>
                  )}
                  
                  {method.type === 'mobile' && (
                    <div className="form-group">
                      <label>Accepted Mobile Payments</label>
                      <div className="mobile-payment-options">
                        <div className="form-group checkbox">
                          <input type="checkbox" id="apple-pay" defaultChecked />
                          <label htmlFor="apple-pay">Apple Pay</label>
                        </div>
                        <div className="form-group checkbox">
                          <input type="checkbox" id="google-pay" defaultChecked />
                          <label htmlFor="google-pay">Google Pay</label>
                        </div>
                        <div className="form-group checkbox">
                          <input type="checkbox" id="samsung-pay" />
                          <label htmlFor="samsung-pay">Samsung Pay</label>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {method.type === 'gift-card' && (
                    <div className="method-disabled-message">
                      <FiAlertCircle />
                      <p>Gift card processing is currently disabled. Enable this payment method to configure settings.</p>
                      <button className="btn-enable-method">Enable Gift Cards</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="method-disabled-message">
                  <FiAlertCircle />
                  <p>This payment method is currently disabled. Enable it to accept payments via {method.name}.</p>
                  <button className="btn-enable-method" onClick={() => togglePaymentMethod(method.id)}>Enable {method.name}</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Payment Processor</h3>
        <p className="section-description">Configure your payment processor integration</p>
        
        <div className="payment-processor">
          <div className="processor-selection">
            <div className="form-group">
              <label>Payment Processor</label>
              <select>
                <option>Stripe</option>
                <option>PayPal</option>
                <option>Square</option>
                <option>Authorize.net</option>
              </select>
            </div>
            
            <div className="processor-status connected">
              <div className="status-indicator"></div>
              <div className="status-text">Connected</div>
              <button className="btn-configure-processor">Configure</button>
            </div>
          </div>
          
          <div className="processor-settings">
            <div className="form-group api-key-field">
              <label>API Key</label>
              <div className="api-key-input">
                <input type="password" value="•••••••••••••••••••••••••••" readOnly />
                <button className="btn-show-key">Show</button>
              </div>
            </div>
            
            <div className="form-group api-key-field">
              <label>Secret Key</label>
              <div className="api-key-input">
                <input type="password" value="•••••••••••••••••••••••••••" readOnly />
                <button className="btn-show-key">Show</button>
              </div>
              <p className="input-description">Never share your secret key with anyone. MAE encrypts all keys securely.</p>
            </div>
            
            <div className="form-group">
              <label>Webhooks URL</label>
              <input type="text" value="https://api.mae.com/webhooks/payments/stripe" readOnly />
              <button className="btn-copy">Copy</button>
            </div>
            
            <div className="payment-verification-settings">
              <h4>Payment Verification</h4>
              
              <div className="form-group checkbox">
                <input type="checkbox" id="address-verification" defaultChecked />
                <label htmlFor="address-verification">Address Verification (AVS)</label>
              </div>
              
              <div className="form-group checkbox">
                <input type="checkbox" id="cvv-verification" defaultChecked />
                <label htmlFor="cvv-verification">Card Security Code (CVV/CVC)</label>
              </div>
              
              <div className="form-group checkbox">
                <input type="checkbox" id="3ds-verification" />
                <label htmlFor="3ds-verification">3D Secure Authentication</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Taxes</h3>
        <p className="section-description">Configure tax rates applied to your services</p>
        
        <div className="tax-settings">
          <div className="tax-calculation">
            <div className="form-group">
              <label>Tax Calculation</label>
              <select>
                <option>Calculate tax based on business address</option>
                <option>Calculate tax based on customer address</option>
                <option>Manual tax rates only</option>
              </select>
            </div>
          </div>
          
          <div className="tax-rates-table">
            <div className="table-header">
              <h4>Tax Rates</h4>
              <button className="btn-add-tax-rate">+ Add Tax Rate</button>
            </div>
            
            <div className="tax-rates-header">
              <div>Name</div>
              <div>Rate (%)</div>
              <div>Region</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            
            {taxRates.map(tax => (
              <div className="tax-rate-row" key={tax.id}>
                <div>{tax.name}</div>
                <div>{tax.rate}%</div>
                <div>{tax.state}, {tax.country}</div>
                <div className={tax.active ? 'active' : 'inactive'}>
                  {tax.active ? 'Active' : 'Inactive'}
                </div>
                <div className="tax-rate-actions">
                  <button className="btn-edit-rate">Edit</button>
                  <button className="btn-delete-rate">Delete</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="form-group">
            <label>Tax Invoice Settings</label>
            <div className="form-group checkbox">
              <input type="checkbox" id="include-tax-details" defaultChecked />
              <label htmlFor="include-tax-details">Show tax breakdown on invoice</label>
            </div>
            <div className="form-group checkbox">
              <input type="checkbox" id="tax-receipt" defaultChecked />
              <label htmlFor="tax-receipt">Generate separate tax receipt</label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Invoice Settings</h3>
        <p className="section-description">Configure default invoice settings and templates</p>
        
        <div className="invoice-settings">
          <div className="form-group">
            <label>Invoice Numbering Format</label>
            <input type="text" defaultValue="INV-{YEAR}{MONTH}-{NUMBER}" />
            <p className="input-description">Use {'{YEAR}'}, {'{MONTH}'}, {'{DAY}'}, and {'{NUMBER}'} as placeholders</p>
          </div>
          
          <div className="form-group">
            <label>Default Payment Terms</label>
            <select>
              <option>Due on receipt</option>
              <option>Net 15</option>
              <option>Net 30</option>
              <option>Net 60</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Default Invoice Note</label>
            <textarea rows={3} defaultValue="Thank you for your business!"></textarea>
          </div>
          
          <div className="form-group">
            <label>Invoice Logo</label>
            <div className="logo-upload">
              <div className="logo-preview">
                <div className="placeholder">Logo</div>
              </div>
              <button className="btn-upload">Upload Logo</button>
            </div>
            <p className="input-description">Recommended size: 200x50px, PNG or JPG</p>
          </div>
          
          <button className="btn-view-invoice-template">View Invoice Template</button>
        </div>
      </div>
      
      <div className="settings-actions">
        <button className="btn-save">Save Payment Settings</button>
        <button className="btn-cancel">Cancel</button>
      </div>
    </div>
  );
};

export default PaymentsSettingsPanel; 