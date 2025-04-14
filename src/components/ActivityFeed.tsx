import React from 'react'

interface ActivityItem {
  type: 'completed' | 'booking' | 'profile' | 'cancelled'
  title: string
  details: string
  time: string
  icon: string
  color: string
}

const ActivityFeed: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      type: 'completed',
      title: 'Premium Wash Completed',
      details: 'BMW X5 (KL20 XYZ) - James Wilson',
      time: '10 minutes ago',
      icon: '✓',
      color: '#32d296'
    },
    {
      type: 'booking',
      title: 'New Booking Created',
      details: 'Deluxe Package - Tomorrow at 11:30 AM',
      time: '25 minutes ago',
      icon: '📅',
      color: '#3f8cff'
    },
    {
      type: 'profile',
      title: 'Customer Profile Updated',
      details: 'Contact information updated for Michael Brown',
      time: '1 hour ago',
      icon: '👤',
      color: '#faa05a'
    },
    {
      type: 'cancelled',
      title: 'Booking Cancelled',
      details: 'Express Wash - Today',
      time: '2 hours ago',
      icon: '✕',
      color: '#f0506e'
    }
  ]
  
  return (
    <div className="chart-card">
      <div className="activity-header">
        <div className="chart-title">Recent Activity Feed</div>
        <div className="activity-actions">
          <span title="Download">⬇️</span>
          <span title="Fullscreen">⛶</span>
          <span title="More">⋮</span>
        </div>
      </div>
      
      <div>
        {activities.map((activity, index) => (
          <div className="activity-item" key={index}>
            <div 
              className="activity-icon" 
              style={{ backgroundColor: `${activity.color}20`, color: activity.color }}
            >
              {activity.icon}
            </div>
            <div className="activity-content">
              <div className="activity-title">{activity.title}</div>
              <div className="activity-details">{activity.details}</div>
              <div className="activity-time">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityFeed 