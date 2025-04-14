import React from 'react';

interface JuneAIProps {
  onNavigate?: (page: string) => void;
}

const JuneAI: React.FC<JuneAIProps> = ({ onNavigate }) => {
  const handleBackToDashboard = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  return (
    <div className="june-ai-container">
      <div className="june-ai-header">
        <h1>June AI Assistant</h1>
        <p className="subtitle">Your intelligent automotive business partner</p>
        
        <div className="back-button-container">
          <button className="back-button" onClick={handleBackToDashboard}>
            <span className="back-icon">←</span> Back to Dashboard
          </button>
          <div className="search-container">
            <input type="text" placeholder="Search June capabilities..." className="search-input" />
          </div>
        </div>
      </div>

      <div className="june-ai-content">
        <div className="june-ai-left-column">
          <div className="june-ai-profile">
            <div className="june-avatar">
              <div className="info-icon">i</div>
            </div>
            <h2>June</h2>
            <p>AI Automotive Assistant</p>
          </div>
          
          <div className="capabilities-section">
            <h3>CAPABILITIES</h3>
            
            <div className="capability-card">
              <div className="capability-icon">📊</div>
              <div className="capability-content">
                <h4>Business Insights</h4>
                <p>Sales analytics and performance metrics</p>
              </div>
            </div>
            
            <div className="capability-card">
              <div className="capability-icon">⏱️</div>
              <div className="capability-content">
                <h4>Task Management</h4>
                <p>Daily prioritization and scheduling</p>
              </div>
            </div>
            
            <div className="capability-card">
              <div className="capability-icon">👥</div>
              <div className="capability-content">
                <h4>Customer Management</h4>
                <p>Customer insights and follow-up reminders</p>
              </div>
            </div>
            
            <div className="capability-card">
              <div className="capability-icon">📦</div>
              <div className="capability-content">
                <h4>Inventory Optimization</h4>
                <p>Stock recommendations and pricing strategy</p>
              </div>
            </div>
            
            <div className="capability-card">
              <div className="capability-icon">⚡</div>
              <div className="capability-content">
                <h4>Sales Assistant</h4>
                <p>Deal recommendations and negotiation support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="june-ai-assistant-section">
          <div className="assistant-header">
            <h3>June <span className="status-text">AI Assistant • Online</span></h3>
          </div>

          <div className="chat-container">
            <div className="message assistant-message">
              <div className="message-avatar">J</div>
              <div className="message-content">
                <p>Good morning, Alex! Welcome to your AI assistant dashboard. I've analyzed your dealership data and have some insights ready for you. What would you like help with today?</p>
                <span className="message-time">9:32 AM</span>
              </div>
            </div>

            <div className="message user-message">
              <div className="message-content">
                <p>I need to know what my sales team should focus on today. What are our priorities?</p>
                <span className="message-time">9:33 AM</span>
              </div>
            </div>

            <div className="message assistant-message">
              <div className="message-avatar">J</div>
              <div className="message-content">
                <p>Based on your current pipeline and customer engagement data, here are today's priorities:</p>
                <ol>
                  <li><strong>Follow-up with 3 hot leads</strong> who test drove the Tesla Model 3 last week. Their buying signals indicate high purchasing intent.</li>
                </ol>
                <span className="message-time"></span>
              </div>
            </div>
          </div>

          <div className="message-input-container">
            <input type="text" placeholder="Type a message to June..." className="message-input" />
            <div className="input-buttons">
              <button className="input-button">?</button>
              <button className="input-button">📄</button>
              <button className="input-button">📎</button>
              <button className="send-button">➤</button>
            </div>
          </div>

          <div className="action-buttons-container">
            <div className="action-buttons-row">
              <button className="action-button">Generate sales report</button>
              <button className="action-button">Analyze customer feedback</button>
              <button className="action-button">Optimize pricing strategy</button>
              <button className="action-button">Create marketing campaign</button>
            </div>
            <div className="action-buttons-row">
              <button className="action-button">Find best vehicles for prospect</button>
              <button className="action-button">Schedule test drives</button>
              <button className="action-button">Evaluate trade-in value</button>
              <button className="action-button">Recommend F&I packages</button>
            </div>
            <div className="action-buttons-row">
              <button className="action-button">Generate competitive analysis</button>
              <button className="action-button">Forecast monthly sales</button>
            </div>
          </div>
        </div>

        <div className="insights-section">
          <div className="insights-header">
            <h3>June's Insights</h3>
            <div className="time-period-tabs">
              <button className="time-tab active">Today</button>
              <button className="time-tab">Week</button>
              <button className="time-tab">Month</button>
            </div>
          </div>

          <div className="insights-metrics">
            <div className="metric-card">
              <h4>Sales Conversion</h4>
              <div className="metric-value">24.5%</div>
              <p className="metric-change positive">↑ 3.2% increase from last week</p>
            </div>
            
            <div className="metric-card">
              <h4>Predicted Sales</h4>
              <div className="metric-value">$98,450</div>
              <p className="metric-change positive">↑ 8.5% above target</p>
            </div>
            
            <div className="metric-card">
              <h4>Lead Quality</h4>
              <div className="metric-value">72.3%</div>
              <p className="metric-change negative">↓ 1.8% decrease from yesterday</p>
            </div>
          </div>

          <div className="insights-section-divider"></div>

          <div className="recommended-actions">
            <div className="actions-header">
              <h3>Recommended Actions</h3>
              <button className="export-button">Export All</button>
            </div>
            
            <div className="action-item">
              <div className="action-star">★</div>
              <div className="action-content">
                <h4>Adjust Toyota RAV4 and Highlander pricing</h4>
                <p>Reduce prices by 2-3% on select models to be more competitive with current market rates</p>
              </div>
              <button className="apply-button">Apply</button>
            </div>
            
            <div className="action-item">
              <div className="action-person">👤</div>
              <div className="action-content">
                <h4>Follow up with Tesla Model 3 test drive customers</h4>
                <p>Contact John Miller, Sarah Chang, and Robert Garcia to present custom financing options</p>
              </div>
              <button className="assign-button">Assign</button>
            </div>
            
            <div className="action-item">
              <div className="action-clock">⏱️</div>
              <div className="action-content">
                <h4>Schedule sales team training session</h4>
                <p>Review updated sales process for presenting financing options earlier in customer journey</p>
              </div>
              <button className="schedule-button">Schedule</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JuneAI; 