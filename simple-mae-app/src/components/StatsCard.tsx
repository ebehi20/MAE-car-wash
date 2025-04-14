import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: string;
  isPositive: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon, isPositive }) => {
  return (
    <div className="stats-card">
      <div className={`stats-icon ${isPositive ? 'bg-success-light' : 'bg-danger-light'}`}>
        {icon}
      </div>
      <div className="stats-title">{title}</div>
      <div className="stats-value">{value}</div>
      <div className={`stats-change ${isPositive ? 'change-up' : 'change-down'}`}>
        <span className="change-icon">{isPositive ? '↑' : '↓'}</span>
        {change}
      </div>
    </div>
  );
};

export default StatsCard; 