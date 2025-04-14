import React, { useState } from 'react';

interface NewAppointmentProps {
  onNavigate?: (page: string) => void;
}

const NewAppointment: React.FC<NewAppointmentProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  
  const handleCancel = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = () => {
    // Here we would handle the actual form submission
    // For now, just return to dashboard
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  return (
    <div className="appointment-container">
      <div className="appointment-header">
        <h1 className="appointment-title">New Wash Appointment</h1>
        <button className="cancel-button" onClick={handleCancel}>
          <span className="cancel-icon">✕</span> Cancel
        </button>
      </div>

      <div className="appointment-content">
        <div className="appointment-progress">
          <div className={`progress-step ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}>
            <div className="step-circle">1</div>
            <div className="step-label">Customer</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}>
            <div className="step-circle">2</div>
            <div className="step-label">Vehicle</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : ''}`}>
            <div className="step-circle">3</div>
            <div className="step-label">Service</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${currentStep === 4 ? 'active' : currentStep > 4 ? 'completed' : ''}`}>
            <div className="step-circle">4</div>
            <div className="step-label">Date & Time</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${currentStep === 5 ? 'active' : currentStep > 5 ? 'completed' : ''}`}>
            <div className="step-circle">5</div>
            <div className="step-label">Confirm</div>
          </div>
        </div>

        {currentStep === 1 && (
          <div className="appointment-form">
            <h2 className="form-section-title">Customer Information</h2>
            
            <div className="search-field">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                className="customer-search" 
                placeholder="Search customer by name, phone or email" 
              />
            </div>

            <div className="customer-list">
              <div className="customer-item selected">
                <div className="customer-name">James Wilson</div>
                <div className="customer-details">
                  <span className="customer-phone">📱 07712 345678</span>
                  <span className="customer-email">✉️ james.wilson@example.com</span>
                </div>
              </div>
              
              <div className="customer-item">
                <div className="customer-name">Sarah Johnson</div>
                <div className="customer-details">
                  <span className="customer-phone">📱 07798 765432</span>
                  <span className="customer-email">✉️ sarah.johnson@example.com</span>
                </div>
              </div>
              
              <div className="customer-item">
                <div className="customer-name">Michael Brown</div>
                <div className="customer-details">
                  <span className="customer-phone">📱 07734 123456</span>
                  <span className="customer-email">✉️ michael.brown@example.com</span>
                </div>
              </div>
              
              <div className="customer-item">
                <div className="customer-name">Emma Davis</div>
                <div className="customer-details">
                  <span className="customer-phone">📱 07756 987654</span>
                  <span className="customer-email">✉️ emma.davis@example.com</span>
                </div>
              </div>
              
              <div className="customer-item">
                <div className="customer-name">David Thompson</div>
                <div className="customer-details">
                  <span className="customer-phone">📱 07712 345678</span>
                  <span className="customer-email">✉️ david.thompson@example.com</span>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="add-customer-btn">
                <span className="add-icon">+</span> Add New Customer
              </button>

              <button className="next-btn" onClick={handleNextStep}>
                Next: Vehicle <span className="next-icon">→</span>
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="appointment-form">
            <h2 className="form-section-title">Vehicle Information</h2>
            
            <div className="vehicle-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Vehicle Make</label>
                  <select className="form-select">
                    <option value="">Select Make</option>
                    <option value="audi">Audi</option>
                    <option value="bmw">BMW</option>
                    <option value="ford">Ford</option>
                    <option value="honda">Honda</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="toyota">Toyota</option>
                    <option value="volkswagen">Volkswagen</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Vehicle Model</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter model" 
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Registration Number</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter registration" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Year</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="Enter year" 
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Color</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter color" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Vehicle Size</label>
                  <select className="form-select">
                    <option value="">Select Size</option>
                    <option value="compact">Compact</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="truck">Truck</option>
                    <option value="van">Van</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Any special instructions or notes about the vehicle"
                  rows={3}
                ></textarea>
              </div>
            </div>

            <div className="form-actions">
              <button className="back-btn" onClick={handlePreviousStep}>
                <span className="back-icon">←</span> Back: Customer
              </button>

              <button className="next-btn" onClick={handleNextStep}>
                Next: Service <span className="next-icon">→</span>
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="appointment-form">
            <h2 className="form-section-title">Select Services</h2>
            
            <div className="services-container">
              <div className="services-category">
                <h3 className="category-title">Exterior Wash</h3>
                <div className="services-grid">
                  <div 
                    className={`service-card ${selectedServices.includes('quick-wash') ? 'selected' : ''}`} 
                    onClick={() => toggleService('quick-wash')}
                  >
                    <div className="service-icon">💦</div>
                    <div className="service-info">
                      <h4>Quick Wash</h4>
                      <p>Basic exterior wash</p>
                      <div className="service-price">£10.99</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`service-card ${selectedServices.includes('deluxe-wash') ? 'selected' : ''}`} 
                    onClick={() => toggleService('deluxe-wash')}
                  >
                    <div className="service-icon">✨</div>
                    <div className="service-info">
                      <h4>Deluxe Wash</h4>
                      <p>Exterior wash with wax</p>
                      <div className="service-price">£14.99</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`service-card ${selectedServices.includes('premium-wash') ? 'selected' : ''}`} 
                    onClick={() => toggleService('premium-wash')}
                  >
                    <div className="service-icon">🌟</div>
                    <div className="service-info">
                      <h4>Premium Wash</h4>
                      <p>Premium exterior with polish</p>
                      <div className="service-price">£19.99</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="services-category">
                <h3 className="category-title">Interior Services</h3>
                <div className="services-grid">
                  <div 
                    className={`service-card ${selectedServices.includes('interior-vacuum') ? 'selected' : ''}`} 
                    onClick={() => toggleService('interior-vacuum')}
                  >
                    <div className="service-icon">🧹</div>
                    <div className="service-info">
                      <h4>Interior Vacuum</h4>
                      <p>Basic interior cleaning</p>
                      <div className="service-price">£8.99</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`service-card ${selectedServices.includes('full-interior') ? 'selected' : ''}`} 
                    onClick={() => toggleService('full-interior')}
                  >
                    <div className="service-icon">🛋️</div>
                    <div className="service-info">
                      <h4>Full Interior</h4>
                      <p>Deep clean all surfaces</p>
                      <div className="service-price">£24.99</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`service-card ${selectedServices.includes('leather-treatment') ? 'selected' : ''}`} 
                    onClick={() => toggleService('leather-treatment')}
                  >
                    <div className="service-icon">🧴</div>
                    <div className="service-info">
                      <h4>Leather Treatment</h4>
                      <p>Condition and protect leather</p>
                      <div className="service-price">£12.99</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="services-category">
                <h3 className="category-title">Add-on Services</h3>
                <div className="services-grid">
                  <div 
                    className={`service-card ${selectedServices.includes('tire-shine') ? 'selected' : ''}`} 
                    onClick={() => toggleService('tire-shine')}
                  >
                    <div className="service-icon">🛞</div>
                    <div className="service-info">
                      <h4>Tire Shine</h4>
                      <p>Clean and shine tires</p>
                      <div className="service-price">£4.99</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`service-card ${selectedServices.includes('window-treatment') ? 'selected' : ''}`} 
                    onClick={() => toggleService('window-treatment')}
                  >
                    <div className="service-icon">🪟</div>
                    <div className="service-info">
                      <h4>Window Treatment</h4>
                      <p>Clean and repel water</p>
                      <div className="service-price">£7.99</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`service-card ${selectedServices.includes('odor-elimination') ? 'selected' : ''}`} 
                    onClick={() => toggleService('odor-elimination')}
                  >
                    <div className="service-icon">🌬️</div>
                    <div className="service-info">
                      <h4>Odor Elimination</h4>
                      <p>Remove unpleasant odors</p>
                      <div className="service-price">£9.99</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="selected-services">
              <h3>Selected Services</h3>
              <div className="selected-services-list">
                {selectedServices.length === 0 ? (
                  <p className="no-services">No services selected. Please select at least one service.</p>
                ) : (
                  selectedServices.map(service => (
                    <div key={service} className="selected-service-item">
                      <span className="selected-service-name">
                        {service === 'quick-wash' && 'Quick Wash'}
                        {service === 'deluxe-wash' && 'Deluxe Wash'}
                        {service === 'premium-wash' && 'Premium Wash'}
                        {service === 'interior-vacuum' && 'Interior Vacuum'}
                        {service === 'full-interior' && 'Full Interior'}
                        {service === 'leather-treatment' && 'Leather Treatment'}
                        {service === 'tire-shine' && 'Tire Shine'}
                        {service === 'window-treatment' && 'Window Treatment'}
                        {service === 'odor-elimination' && 'Odor Elimination'}
                      </span>
                      <button 
                        className="remove-service-btn" 
                        onClick={() => toggleService(service)}
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="form-actions">
              <button className="back-btn" onClick={handlePreviousStep}>
                <span className="back-icon">←</span> Back: Vehicle
              </button>

              <button 
                className="next-btn" 
                onClick={handleNextStep}
                disabled={selectedServices.length === 0}
              >
                Next: Date & Time <span className="next-icon">→</span>
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="appointment-form">
            <h2 className="form-section-title">Schedule Date & Time</h2>
            
            <div className="date-time-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input 
                    type="date" 
                    className="form-input" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <select className="form-select">
                    <option value="">Select Time</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="09:30">09:30 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="10:30">10:30 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="13:30">01:30 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="14:30">02:30 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="15:30">03:30 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="16:30">04:30 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Staff Member</label>
                <select className="form-select">
                  <option value="">Select Staff Member</option>
                  <option value="john">John Smith</option>
                  <option value="jane">Jane Doe</option>
                  <option value="alex">Alex Johnson</option>
                  <option value="marco">Marco Williams</option>
                  <option value="any">Any Available</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Special Instructions</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Any special instructions for this appointment"
                  rows={3}
                ></textarea>
              </div>
              
              <div className="time-slots">
                <h3 className="slots-title">Available Time Slots</h3>
                <div className="time-slot-grid">
                  <div className="time-slot available">
                    <span className="time-slot-time">9:00 AM</span>
                    <span className="time-slot-availability">Available</span>
                  </div>
                  <div className="time-slot available">
                    <span className="time-slot-time">9:30 AM</span>
                    <span className="time-slot-availability">Available</span>
                  </div>
                  <div className="time-slot unavailable">
                    <span className="time-slot-time">10:00 AM</span>
                    <span className="time-slot-availability">Booked</span>
                  </div>
                  <div className="time-slot available">
                    <span className="time-slot-time">10:30 AM</span>
                    <span className="time-slot-availability">Available</span>
                  </div>
                  <div className="time-slot available selected">
                    <span className="time-slot-time">11:00 AM</span>
                    <span className="time-slot-availability">Selected</span>
                  </div>
                  <div className="time-slot available">
                    <span className="time-slot-time">11:30 AM</span>
                    <span className="time-slot-availability">Available</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="back-btn" onClick={handlePreviousStep}>
                <span className="back-icon">←</span> Back: Service
              </button>

              <button className="next-btn" onClick={handleNextStep}>
                Next: Confirm <span className="next-icon">→</span>
              </button>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="appointment-form">
            <h2 className="form-section-title">Appointment Summary</h2>
            
            <div className="appointment-summary">
              <div className="summary-section">
                <h3 className="summary-title">Customer Information</h3>
                <div className="summary-info">
                  <div className="summary-row">
                    <span className="summary-label">Name:</span>
                    <span className="summary-value">James Wilson</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Phone:</span>
                    <span className="summary-value">07712 345678</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Email:</span>
                    <span className="summary-value">james.wilson@example.com</span>
                  </div>
                </div>
              </div>
              
              <div className="summary-section">
                <h3 className="summary-title">Vehicle Information</h3>
                <div className="summary-info">
                  <div className="summary-row">
                    <span className="summary-label">Make/Model:</span>
                    <span className="summary-value">Honda Civic</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Registration:</span>
                    <span className="summary-value">AB12 CDE</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Color:</span>
                    <span className="summary-value">Blue</span>
                  </div>
                </div>
              </div>
              
              <div className="summary-section">
                <h3 className="summary-title">Selected Services</h3>
                <div className="summary-info">
                  <div className="summary-row">
                    <span className="summary-service">Deluxe Wash</span>
                    <span className="summary-price">£14.99</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-service">Interior Vacuum</span>
                    <span className="summary-price">£8.99</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-service">Tire Shine</span>
                    <span className="summary-price">£4.99</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-row total">
                    <span className="summary-label">Total:</span>
                    <span className="summary-value">£28.97</span>
                  </div>
                </div>
              </div>
              
              <div className="summary-section">
                <h3 className="summary-title">Appointment Time</h3>
                <div className="summary-info">
                  <div className="summary-row">
                    <span className="summary-label">Date:</span>
                    <span className="summary-value">Friday, 12 April 2024</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Time:</span>
                    <span className="summary-value">11:00 AM</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Staff:</span>
                    <span className="summary-value">John Smith</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">
                <input type="checkbox" className="form-checkbox" />
                Send confirmation email to customer
              </label>
            </div>
            
            <div className="form-group">
              <label className="form-label">
                <input type="checkbox" className="form-checkbox" />
                Send SMS reminder 2 hours before appointment
              </label>
            </div>

            <div className="form-actions">
              <button className="back-btn" onClick={handlePreviousStep}>
                <span className="back-icon">←</span> Back: Date & Time
              </button>

              <button className="submit-btn" onClick={handleSubmit}>
                Confirm Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewAppointment; 