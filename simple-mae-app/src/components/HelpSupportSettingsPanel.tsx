import React, { useState } from 'react';
import './HelpSupportSettings.css';
import { FiSearch, FiHelpCircle, FiMessageCircle, FiFileText, FiVideo, FiStar, FiPhone, FiMail, FiMessageSquare, FiExternalLink } from 'react-icons/fi';

const HelpSupportSettingsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('knowledge-base');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample knowledge base categories
  const categories = [
    { id: 1, title: 'Getting Started', icon: <FiHelpCircle />, articles: 12 },
    { id: 2, title: 'Customer Management', icon: <FiMessageCircle />, articles: 8 },
    { id: 3, title: 'Appointments', icon: <FiFileText />, articles: 10 },
    { id: 4, title: 'Payments & Billing', icon: <FiFileText />, articles: 15 },
    { id: 5, title: 'Reports & Analytics', icon: <FiFileText />, articles: 7 },
    { id: 6, title: 'Integrations', icon: <FiFileText />, articles: 9 }
  ];

  // Sample popular articles
  const popularArticles = [
    { id: 1, title: 'How to schedule a recurring appointment', views: 1243 },
    { id: 2, title: 'Setting up payment processing', views: 987 },
    { id: 3, title: 'Managing your team schedule', views: 856 },
    { id: 4, title: 'Customizing customer notifications', views: 743 },
    { id: 5, title: 'Generating monthly reports', views: 621 }
  ];

  // Sample support options
  const supportOptions = [
    { id: 1, title: 'Live Chat Support', description: 'Chat with our support team in real-time', icon: <FiMessageSquare />, availability: 'Available 24/7' },
    { id: 2, title: 'Phone Support', description: 'Call our dedicated support line', icon: <FiPhone />, availability: 'Mon-Fri, 9am-6pm ET' },
    { id: 3, title: 'Email Support', description: 'Send us an email and we\'ll respond within 24 hours', icon: <FiMail />, availability: 'Response within 24 hours' }
  ];

  // Sample training resources
  const trainingResources = [
    { id: 1, title: 'MAE Basics Tutorial', type: 'Video', duration: '15 min', icon: <FiVideo /> },
    { id: 2, title: 'Advanced Scheduling Features', type: 'Video', duration: '12 min', icon: <FiVideo /> },
    { id: 3, title: 'Customer Management Guide', type: 'Document', duration: 'PDF', icon: <FiFileText /> },
    { id: 4, title: 'Reporting & Analytics Walkthrough', type: 'Video', duration: '20 min', icon: <FiVideo /> },
    { id: 5, title: 'Integration Setup Guide', type: 'Document', duration: 'PDF', icon: <FiFileText /> }
  ];

  return (
    <div className="settings-panel help-support-panel">
      <h2>Help & Support</h2>
      <p className="section-description">Find answers, get support, and provide feedback</p>

      <div className="help-support-tabs">
        <button 
          className={`help-tab ${activeTab === 'knowledge-base' ? 'active' : ''}`}
          onClick={() => setActiveTab('knowledge-base')}
        >
          Knowledge Base
        </button>
        <button 
          className={`help-tab ${activeTab === 'support' ? 'active' : ''}`}
          onClick={() => setActiveTab('support')}
        >
          Contact Support
        </button>
        <button 
          className={`help-tab ${activeTab === 'feedback' ? 'active' : ''}`}
          onClick={() => setActiveTab('feedback')}
        >
          Provide Feedback
        </button>
        <button 
          className={`help-tab ${activeTab === 'training' ? 'active' : ''}`}
          onClick={() => setActiveTab('training')}
        >
          Training Resources
        </button>
      </div>

      {activeTab === 'knowledge-base' && (
        <div className="help-content knowledge-base-content">
          <div className="help-search">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search the knowledge base..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <h3>Browse by Category</h3>
          <div className="category-cards">
            {categories.map(category => (
              <div className="category-card" key={category.id}>
                <div className="category-icon">{category.icon}</div>
                <div className="category-info">
                  <h4>{category.title}</h4>
                  <span>{category.articles} articles</span>
                </div>
              </div>
            ))}
          </div>

          <h3>Popular Articles</h3>
          <div className="popular-articles">
            {popularArticles.map(article => (
              <div className="article-item" key={article.id}>
                <h4>{article.title}</h4>
                <span>{article.views} views</span>
              </div>
            ))}
            <div className="view-all-articles">
              <a href="#view-all">View all articles <FiExternalLink /></a>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'support' && (
        <div className="help-content support-content">
          <h3>How can we help you?</h3>
          
          <div className="support-options">
            {supportOptions.map(option => (
              <div className="support-card" key={option.id}>
                <div className="support-icon">{option.icon}</div>
                <div className="support-info">
                  <h4>{option.title}</h4>
                  <p>{option.description}</p>
                  <span className="availability">{option.availability}</span>
                </div>
                <button className="btn-contact">Contact Now</button>
              </div>
            ))}
          </div>
          
          <div className="support-ticket">
            <h3>Submit a Support Ticket</h3>
            <div className="ticket-form">
              <div className="form-group">
                <label>Subject</label>
                <input type="text" placeholder="Briefly describe your issue" />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Describe your issue in detail" rows={5}></textarea>
              </div>
              <div className="form-group">
                <label>Attachments</label>
                <div className="file-upload">
                  <button className="btn-upload">Upload File</button>
                  <span>Max file size: 10MB (PNG, JPG, PDF)</span>
                </div>
              </div>
              <button className="btn-submit-ticket">Submit Ticket</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="help-content feedback-content">
          <h3>We Value Your Feedback</h3>
          <p>Your feedback helps us improve our platform and better serve your business needs.</p>
          
          <div className="rating-section">
            <h4>How would you rate your overall experience with MAE?</h4>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map(rating => (
                <FiStar key={rating} className="rating-star" />
              ))}
            </div>
          </div>
          
          <div className="feedback-form">
            <div className="form-group">
              <label>What do you like most about MAE?</label>
              <textarea rows={3} placeholder="Tell us what's working well..."></textarea>
            </div>
            
            <div className="form-group">
              <label>What could we improve?</label>
              <textarea rows={3} placeholder="Tell us what could be better..."></textarea>
            </div>
            
            <div className="form-group">
              <label>Any features you'd like to see added?</label>
              <textarea rows={3} placeholder="Share your feature ideas..."></textarea>
            </div>
            
            <div className="form-group checkbox">
              <input type="checkbox" id="contactPermission" />
              <label htmlFor="contactPermission">It's okay to contact me about my feedback</label>
            </div>
            
            <button className="btn-submit-feedback">Submit Feedback</button>
          </div>
        </div>
      )}

      {activeTab === 'training' && (
        <div className="help-content training-content">
          <h3>Training Resources</h3>
          <p>Access tutorials, videos, and guides to help you get the most out of MAE.</p>
          
          <div className="training-filters">
            <select>
              <option>All Resources</option>
              <option>Videos</option>
              <option>Documents</option>
              <option>Tutorials</option>
            </select>
            <div className="help-search small">
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Search training resources..." />
            </div>
          </div>
          
          <div className="training-resources-list">
            {trainingResources.map(resource => (
              <div className="training-resource-item" key={resource.id}>
                <div className="resource-icon">{resource.icon}</div>
                <div className="resource-info">
                  <h4>{resource.title}</h4>
                  <div className="resource-meta">
                    <span className="resource-type">{resource.type}</span>
                    <span className="resource-duration">{resource.duration}</span>
                  </div>
                </div>
                <button className="btn-view-resource">View</button>
              </div>
            ))}
          </div>
          
          <div className="training-schedule">
            <h3>Live Training Sessions</h3>
            <p>Join our interactive webinars to learn more about MAE features.</p>
            
            <div className="upcoming-sessions">
              <div className="session-card">
                <div className="session-date">
                  <span className="month">May</span>
                  <span className="day">15</span>
                </div>
                <div className="session-info">
                  <h4>Getting Started with MAE</h4>
                  <p>A beginner-friendly introduction to the platform.</p>
                  <span className="session-time">2:00 PM - 3:00 PM ET</span>
                </div>
                <button className="btn-register">Register</button>
              </div>
              
              <div className="session-card">
                <div className="session-date">
                  <span className="month">May</span>
                  <span className="day">22</span>
                </div>
                <div className="session-info">
                  <h4>Advanced Reporting Features</h4>
                  <p>Learn how to get the most out of MAE's analytics.</p>
                  <span className="session-time">1:00 PM - 2:30 PM ET</span>
                </div>
                <button className="btn-register">Register</button>
              </div>
              
              <div className="view-all-sessions">
                <a href="#more-sessions">View All Upcoming Sessions <FiExternalLink /></a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSupportSettingsPanel; 