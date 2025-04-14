import React, { useState } from 'react'

const WashPerformance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'day' | 'week' | 'month'>('week')
  
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title">Wash Performance</div>
        <div className="chart-tabs">
          <div 
            className={`chart-tab ${activeTab === 'day' ? 'active' : ''}`}
            onClick={() => setActiveTab('day')}
          >
            Day
          </div>
          <div 
            className={`chart-tab ${activeTab === 'week' ? 'active' : ''}`}
            onClick={() => setActiveTab('week')}
          >
            Week
          </div>
          <div 
            className={`chart-tab ${activeTab === 'month' ? 'active' : ''}`}
            onClick={() => setActiveTab('month')}
          >
            Month
          </div>
        </div>
      </div>
      
      <div className="chart-content">
        {/* In a real app, we would use a charting library like Chart.js */}
        {/* This is a placeholder for the chart */}
        <div style={{ display: 'flex', height: '200px', alignItems: 'flex-end', gap: '20px', marginTop: '20px' }}>
          <div style={{ width: '40px', height: '100px', backgroundColor: '#3f8cff', borderRadius: '5px', flex: 1 }}></div>
          <div style={{ width: '40px', height: '80px', backgroundColor: '#3f8cff', borderRadius: '5px', flex: 1 }}></div>
          <div style={{ width: '40px', height: '120px', backgroundColor: '#3f8cff', borderRadius: '5px', flex: 1 }}></div>
          <div style={{ width: '40px', height: '100px', backgroundColor: '#3f8cff', borderRadius: '5px', flex: 1 }}></div>
          <div style={{ width: '40px', height: '140px', backgroundColor: '#3f8cff', borderRadius: '5px', flex: 1 }}></div>
          <div style={{ width: '40px', height: '180px', backgroundColor: '#3f8cff', borderRadius: '5px', flex: 1 }}></div>
          <div style={{ width: '40px', height: '120px', backgroundColor: '#3f8cff', borderRadius: '5px', flex: 1 }}></div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <div style={{ textAlign: 'center', flex: 1 }}>Mon</div>
          <div style={{ textAlign: 'center', flex: 1 }}>Tue</div>
          <div style={{ textAlign: 'center', flex: 1 }}>Wed</div>
          <div style={{ textAlign: 'center', flex: 1 }}>Thu</div>
          <div style={{ textAlign: 'center', flex: 1 }}>Fri</div>
          <div style={{ textAlign: 'center', flex: 1 }}>Sat</div>
          <div style={{ textAlign: 'center', flex: 1 }}>Sun</div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          Total washes this week: 1282
        </div>
      </div>
    </div>
  )
}

export default WashPerformance 