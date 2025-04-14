import React from 'react'

interface ServiceItem {
  name: string
  percentage: number
  color: string
}

const ServiceDistribution: React.FC = () => {
  const services: ServiceItem[] = [
    { name: 'Premium Wash', percentage: 32, color: '#3f8cff' },
    { name: 'Deluxe Package', percentage: 24, color: '#f0506e' },
    { name: 'Standard Wash', percentage: 18, color: '#faa05a' },
    { name: 'Quick Wash', percentage: 15, color: '#32d296' },
    { name: 'Interior Cleaning', percentage: 11, color: '#8f8f8f' }
  ]
  
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title">Service Distribution</div>
      </div>
      
      <div className="chart-content">
        {services.map((service, index) => (
          <div className="service-item" key={index}>
            <div className="service-info">
              <div className="service-name">{service.name}</div>
              <div className="service-percentage">{service.percentage}%</div>
            </div>
            <div className="service-bar">
              <div 
                className="service-progress" 
                style={{ 
                  width: `${service.percentage}%`, 
                  backgroundColor: service.color 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServiceDistribution 