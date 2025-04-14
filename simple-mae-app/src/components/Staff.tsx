import React, { useState } from 'react';

interface StaffProps {
  onNavigate: (page: string) => void;
}

// Mock staff data
const mockStaffData = [
  {
    id: 'EMP001',
    name: 'Mike Johnson',
    role: 'Technician',
    email: 'mike.j@example.com',
    phone: '+1 (555) 123-4567',
    schedule: {
      today: '09:00 - 17:00',
      tomorrow: '09:00 - 17:00'
    },
    status: 'active',
    avatar: 'MJ'
  },
  {
    id: 'EMP002',
    name: 'Emma Davis',
    role: 'Manager',
    email: 'emma.d@example.com',
    phone: '+1 (555) 234-5678',
    schedule: {
      today: '08:00 - 16:00',
      tomorrow: '08:00 - 16:00'
    },
    status: 'active',
    avatar: 'ED'
  },
  {
    id: 'EMP003',
    name: 'James Wilson',
    role: 'Technician',
    email: 'james.w@example.com',
    phone: '+1 (555) 345-6789',
    schedule: {
      today: '10:00 - 18:00',
      tomorrow: '10:00 - 18:00'
    },
    status: 'active',
    avatar: 'JW'
  },
  {
    id: 'EMP004',
    name: 'Sophia Martinez',
    role: 'Receptionist',
    email: 'sophia.m@example.com',
    phone: '+1 (555) 456-7890',
    schedule: {
      today: '09:00 - 17:00',
      tomorrow: '09:00 - 17:00'
    },
    status: 'active',
    avatar: 'SM'
  },
  {
    id: 'EMP005',
    name: 'Robert Taylor',
    role: 'Technician',
    email: 'robert.t@example.com',
    phone: '+1 (555) 567-8901',
    schedule: {
      today: '12:00 - 21:00',
      tomorrow: '09:00 - 18:00'
    },
    status: 'active',
    avatar: 'RT'
  },
  {
    id: 'EMP006',
    name: 'Alex Thompson',
    role: 'Technician',
    email: 'alex.t@example.com',
    phone: '+1 (555) 678-9012',
    schedule: {
      today: 'Off',
      tomorrow: '09:00 - 17:00'
    },
    status: 'inactive',
    avatar: 'AT'
  },
  {
    id: 'EMP007',
    name: 'Olivia Clark',
    role: 'Manager',
    email: 'olivia.c@example.com',
    phone: '+1 (555) 789-0123',
    schedule: {
      today: '08:00 - 16:00',
      tomorrow: 'Off'
    },
    status: 'active',
    avatar: 'OC'
  },
  {
    id: 'EMP008',
    name: 'William Brown',
    role: 'Receptionist',
    email: 'william.b@example.com',
    phone: '+1 (555) 890-1234',
    schedule: {
      today: 'Off',
      tomorrow: 'Off'
    },
    status: 'inactive',
    avatar: 'WB'
  }
];

// Role options
const roleOptions = ['All Roles', 'Manager', 'Technician', 'Receptionist'];

const Staff: React.FC<StaffProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [staffData, setStaffData] = useState(mockStaffData);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  
  // Filter staff based on search and role
  const filteredStaff = staffData.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        staff.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        staff.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === 'All Roles' || staff.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });
  
  // Stats calculations
  const totalStaff = staffData.length;
  const activeStaff = staffData.filter(staff => staff.status === 'active').length;
  const availableToday = staffData.filter(staff => staff.schedule.today !== 'Off' && staff.status === 'active').length;
  
  return (
    <div className="staff-container">
      {/* Header */}
      <div className="section-header">
        <h1>Staff Management</h1>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search staff..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stats-content">
            <div className="stats-title">Total Staff</div>
            <div className="stats-value">{totalStaff}</div>
            <div className="stats-change positive">
              <i className="fas fa-arrow-up"></i> 4.3% from last month
            </div>
          </div>
        </div>
        
        <div className="stats-card">
          <div className="stats-icon">
            <i className="fas fa-user-check"></i>
          </div>
          <div className="stats-content">
            <div className="stats-title">Active Staff</div>
            <div className="stats-value">{activeStaff}</div>
            <div className="stats-change positive">
              <i className="fas fa-arrow-up"></i> 2.1% from yesterday
            </div>
          </div>
        </div>
        
        <div className="stats-card">
          <div className="stats-icon">
            <i className="fas fa-calendar-day"></i>
          </div>
          <div className="stats-content">
            <div className="stats-title">Available Today</div>
            <div className="stats-value">{availableToday}</div>
            <div className="stats-change negative">
              <i className="fas fa-arrow-down"></i> 2 from yesterday
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Cards */}
      <div className="action-grid">
        <div className="action-card">
          <div className="action-icon">
            <i className="fas fa-user-plus"></i>
          </div>
          <div className="action-title">Add Staff</div>
        </div>
        
        <div className="action-card">
          <div className="action-icon">
            <i className="fas fa-user-tag"></i>
          </div>
          <div className="action-title">Manage Roles</div>
        </div>
        
        <div className="action-card">
          <div className="action-icon">
            <i className="fas fa-file-alt"></i>
          </div>
          <div className="action-title">Generate Report</div>
        </div>
      </div>
      
      {/* Staff List Section */}
      <div className="staff-list-section">
        <div className="staff-list-header">
          <h2>Staff List</h2>
          <div className="staff-filters">
            <select 
              className="role-filter"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {roleOptions.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <button className="filter-btn">
              <i className="fas fa-filter"></i>
            </button>
            <button className="export-btn">
              <i className="fas fa-download"></i>
            </button>
            <button className="options-btn">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>
        
        <div className="staff-list">
          {filteredStaff.map(staff => (
            <div 
              key={staff.id} 
              className={`staff-card ${selectedStaff === staff.id ? 'selected' : ''}`}
              onClick={() => setSelectedStaff(staff.id === selectedStaff ? null : staff.id)}
            >
              <div className={`staff-avatar ${staff.status === 'inactive' ? 'inactive' : ''}`}>
                {staff.avatar}
              </div>
              <div className="staff-details">
                <div className="staff-name">{staff.name}</div>
                <div className="staff-id">ID: {staff.id}</div>
                <div className="staff-role">
                  <span className="role-badge">{staff.role}</span>
                </div>
                <div className="staff-contact">
                  <div className="staff-email">{staff.email}</div>
                  <div className="staff-phone">{staff.phone}</div>
                </div>
                <div className="staff-schedule">
                  <div className="schedule-today">
                    <span className="schedule-label">Today:</span> {staff.schedule.today}
                  </div>
                  <div className="schedule-tomorrow">
                    <span className="schedule-label">Tomorrow:</span> {staff.schedule.tomorrow}
                  </div>
                </div>
                <div className="staff-actions">
                  <button className="action-btn edit-btn" title="Edit staff">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="action-btn schedule-btn" title="Edit schedule">
                    <i className="fas fa-calendar-alt"></i>
                  </button>
                  <button className="action-btn message-btn" title="Send message">
                    <i className="fas fa-envelope"></i>
                  </button>
                  {staff.status === 'active' ? (
                    <button className="action-btn deactivate-btn" title="Deactivate">
                      <i className="fas fa-user-slash"></i>
                    </button>
                  ) : (
                    <button className="action-btn activate-btn" title="Activate">
                      <i className="fas fa-user-check"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Staff; 