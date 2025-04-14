import React, { useState } from 'react';

interface BookingsProps {
  onNavigate: (page: string) => void;
}

// Mock data for upcoming bookings
const mockBookings = [
  {
    id: 'B1001',
    customerName: 'John Miller',
    vehicleInfo: 'BMW X5 - White - KMY6789',
    date: '2025-04-15',
    time: '09:30 AM',
    service: 'Premium Wash & Wax',
    status: 'confirmed',
    amount: 59.99,
    staffAssigned: 'Mike Johnson'
  },
  {
    id: 'B1002',
    customerName: 'Sarah Williams',
    vehicleInfo: 'Audi A4 - Black - HJK7653',
    date: '2025-04-15',
    time: '10:00 AM',
    service: 'Basic Wash',
    status: 'confirmed',
    amount: 29.99,
    staffAssigned: 'Emma Davis'
  },
  {
    id: 'B1003',
    customerName: 'David Chen',
    vehicleInfo: 'Tesla Model 3 - Red - BVN5432',
    date: '2025-04-15',
    time: '11:30 AM',
    service: 'Interior Detail',
    status: 'pending',
    amount: 89.99,
    staffAssigned: 'Unassigned'
  },
  {
    id: 'B1004',
    customerName: 'Laura Johnson',
    vehicleInfo: 'Range Rover - Silver - MNL3421',
    date: '2025-04-15',
    time: '01:00 PM',
    service: 'Full Detail Package',
    status: 'confirmed',
    amount: 149.99,
    staffAssigned: 'James Wilson'
  },
  {
    id: 'B1005',
    customerName: 'Robert Taylor',
    vehicleInfo: 'Ford Mustang - Blue - PLO8976',
    date: '2025-04-16',
    time: '09:00 AM',
    service: 'Exterior Detail',
    status: 'confirmed',
    amount: 79.99,
    staffAssigned: 'Emma Davis'
  },
  {
    id: 'B1006',
    customerName: 'Maria Garcia',
    vehicleInfo: 'Toyota Camry - Gray - QWE4567',
    date: '2025-04-16',
    time: '10:30 AM',
    service: 'Basic Wash',
    status: 'pending',
    amount: 29.99,
    staffAssigned: 'Unassigned'
  },
  {
    id: 'B1007',
    customerName: 'Thomas Wright',
    vehicleInfo: 'Mercedes C-Class - Black - RTY7890',
    date: '2025-04-16',
    time: '11:30 AM',
    service: 'Premium Wash & Wax',
    status: 'confirmed',
    amount: 59.99,
    staffAssigned: 'Mike Johnson'
  },
  {
    id: 'B1008',
    customerName: 'Jennifer Lopez',
    vehicleInfo: 'Volkswagen Golf - White - UIO1234',
    date: '2025-04-16',
    time: '02:00 PM',
    service: 'Interior Detail',
    status: 'cancelled',
    amount: 89.99,
    staffAssigned: 'James Wilson'
  }
];

// Staff members for assignment
const staffMembers = [
  { id: 1, name: 'Mike Johnson' },
  { id: 2, name: 'Emma Davis' },
  { id: 3, name: 'James Wilson' },
  { id: 4, name: 'Alex Thompson' },
  { id: 5, name: 'Sophia Martinez' }
];

// Types of view
type ViewType = 'day' | 'week' | 'month';

const Bookings: React.FC<BookingsProps> = ({ onNavigate }) => {
  const [bookings, setBookings] = useState(mockBookings);
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [viewType, setViewType] = useState<ViewType>('day');
  
  // Current date for views
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Filter bookings based on filters
  const filteredBookings = bookings.filter(booking => {
    // Date filter
    const dateMatch = filterDate ? booking.date === filterDate : true;
    
    // Status filter
    const statusMatch = filterStatus === 'all' ? true : booking.status === filterStatus;
    
    // Search query (customer name, vehicle info, or booking ID)
    const searchMatch = searchQuery 
      ? booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.vehicleInfo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return dateMatch && statusMatch && searchMatch;
  });
  
  // Change booking status
  const updateBookingStatus = (id: string, newStatus: string) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
  };
  
  // Assign staff to booking
  const assignStaff = (id: string, staffName: string) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, staffAssigned: staffName } : booking
    ));
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `£${amount.toFixed(2)}`;
  };
  
  // Get days in a month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get formatted date
  const getFormattedDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Get start of the week (Monday)
  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    return new Date(d.setDate(diff));
  };

  // Render calendar for week view
  const renderWeekCalendar = () => {
    const weekStart = getStartOfWeek(currentDate);
    const days = [];
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    // Create array of days for the week
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }
    
    // Get bookings for each day
    const weekBookings = days.map(day => {
      const dateStr = getFormattedDate(day);
      return {
        date: day,
        bookings: bookings.filter(booking => booking.date === dateStr)
      };
    });
    
    return (
      <div className="week-calendar">
        <div className="calendar-header">
          <button 
            className="calendar-nav-btn" 
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(newDate.getDate() - 7);
              setCurrentDate(newDate);
            }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <h3>
            {weekStart.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })} - 
            {new Date(weekStart.setDate(weekStart.getDate() + 6)).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}
          </h3>
          <button 
            className="calendar-nav-btn" 
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(newDate.getDate() + 7);
              setCurrentDate(newDate);
            }}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <div className="week-grid">
          {weekDays.map((day, idx) => (
            <div key={day} className="weekday-header">{day}</div>
          ))}
          
          {weekBookings.map((day, idx) => (
            <div key={idx} className={`day-cell ${getFormattedDate(day.date) === getFormattedDate(new Date()) ? 'today' : ''}`}>
              <div className="day-header">
                {day.date.getDate()}
              </div>
              <div className="day-bookings">
                {day.bookings.length === 0 ? (
                  <div className="no-bookings">No bookings</div>
                ) : (
                  day.bookings.map(booking => (
                    <div 
                      key={booking.id} 
                      className={`booking-item status-${booking.status}`}
                      onClick={() => setSelectedBooking(booking.id === selectedBooking ? null : booking.id)}
                    >
                      <div className="booking-time">{booking.time}</div>
                      <div className="booking-customer">{booking.customerName}</div>
                      <div className="booking-service">{booking.service}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render calendar for month view
  const renderMonthCalendar = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay() || 7; // Get the first day of the month (1-7, where 1 is Monday)
    const monthDays = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 1; i < firstDay; i++) {
      monthDays.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      monthDays.push(new Date(year, month, i));
    }
    
    // Get bookings for each day
    const monthBookings = monthDays.map(day => {
      if (!day) return { date: null, bookings: [] };
      
      const dateStr = getFormattedDate(day);
      return {
        date: day,
        bookings: bookings.filter(booking => booking.date === dateStr)
      };
    });
    
    return (
      <div className="month-calendar">
        <div className="calendar-header">
          <button 
            className="calendar-nav-btn" 
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() - 1);
              setCurrentDate(newDate);
            }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <h3>{currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</h3>
          <button 
            className="calendar-nav-btn" 
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() + 1);
              setCurrentDate(newDate);
            }}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <div className="month-grid">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="weekday-header">{day}</div>
          ))}
          
          {monthBookings.map((day, idx) => (
            <div key={idx} className={`day-cell ${day.date && getFormattedDate(day.date) === getFormattedDate(new Date()) ? 'today' : ''} ${!day.date ? 'empty-day' : ''}`}>
              {day.date && (
                <>
                  <div className="day-header">
                    {day.date.getDate()}
                  </div>
                  <div className="day-bookings">
                    {day.bookings.length > 0 ? (
                      <div className="booking-count" title={`${day.bookings.length} booking(s)`}>
                        {day.bookings.length} booking{day.bookings.length !== 1 ? 's' : ''}
                      </div>
                    ) : (
                      <div className="no-bookings"></div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render list view (day view)
  const renderDayView = () => {
    return (
      <div className="bookings-table-container">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Date & Time</th>
              <th>Service</th>
              <th>Amount</th>
              <th>Staff</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map(booking => (
              <tr 
                key={booking.id} 
                className={`booking-row ${selectedBooking === booking.id ? 'selected' : ''} status-${booking.status}`}
                onClick={() => setSelectedBooking(booking.id === selectedBooking ? null : booking.id)}
              >
                <td>{booking.id}</td>
                <td>{booking.customerName}</td>
                <td>{booking.vehicleInfo}</td>
                <td>
                  <div>{new Date(booking.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                  <div className="booking-time">{booking.time}</div>
                </td>
                <td>{booking.service}</td>
                <td>{formatCurrency(booking.amount)}</td>
                <td>
                  <select 
                    className="staff-select"
                    value={booking.staffAssigned}
                    onChange={(e) => assignStaff(booking.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="Unassigned">Unassigned</option>
                    {staffMembers.map(staff => (
                      <option key={staff.id} value={staff.name}>{staff.name}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <span className={`status-badge status-${booking.status}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div className="booking-actions" onClick={(e) => e.stopPropagation()}>
                    {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                      <>
                        {booking.status === 'pending' && (
                          <button 
                            className="action-btn confirm-btn" 
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            title="Confirm booking"
                          >
                            <i className="fas fa-check"></i>
                          </button>
                        )}
                        <button 
                          className="action-btn edit-btn" 
                          title="Edit booking"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          className="action-btn cancel-btn" 
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          title="Cancel booking"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                        {booking.status === 'confirmed' && (
                          <button 
                            className="action-btn complete-btn" 
                            onClick={() => updateBookingStatus(booking.id, 'completed')}
                            title="Mark as completed"
                          >
                            <i className="fas fa-check-double"></i>
                          </button>
                        )}
                      </>
                    )}
                    {(booking.status === 'cancelled' || booking.status === 'completed') && (
                      <button className="action-btn view-btn" title="View details">
                        <i className="fas fa-eye"></i>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  // Render the appropriate view based on viewType
  const renderView = () => {
    switch (viewType) {
      case 'day':
        return renderDayView();
      case 'week':
        return renderWeekCalendar();
      case 'month':
        return renderMonthCalendar();
      default:
        return renderDayView();
    }
  };
  
  return (
    <div className="bookings-container">
      <div className="section-header">
        <h1>Upcoming Bookings</h1>
        <button className="btn btn-primary new-booking-btn" onClick={() => onNavigate('newappointment')}>
          <i className="fas fa-plus"></i> New Booking
        </button>
      </div>
      
      {/* View toggle and filters */}
      <div className="view-toggle-container">
        <div className="view-toggle">
          <button 
            className={`view-toggle-btn ${viewType === 'day' ? 'active' : ''}`} 
            onClick={() => setViewType('day')}
          >
            <i className="fas fa-list"></i> Day
          </button>
          <button 
            className={`view-toggle-btn ${viewType === 'week' ? 'active' : ''}`} 
            onClick={() => setViewType('week')}
          >
            <i className="fas fa-calendar-week"></i> Week
          </button>
          <button 
            className={`view-toggle-btn ${viewType === 'month' ? 'active' : ''}`} 
            onClick={() => setViewType('month')}
          >
            <i className="fas fa-calendar-alt"></i> Month
          </button>
        </div>
        
        <div className="bookings-filters">
          <div className="filter-item">
            <input 
              type="text" 
              placeholder="Search bookings..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="filter-item">
            <select 
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div className="filter-item">
            <input 
              type="date" 
              className="date-filter"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
          
          <div className="filter-item">
            <button 
              className="btn btn-secondary clear-filters-btn"
              onClick={() => {
                setFilterDate('');
                setFilterStatus('all');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Bookings View (Table, Week Calendar, or Month Calendar) */}
      {renderView()}
      
      {/* Stats cards */}
      <div className="booking-stats">
        <div className="booking-stat-card">
          <div className="stat-value">{bookings.filter(b => b.status === 'confirmed').length}</div>
          <div className="stat-label">Confirmed Bookings</div>
        </div>
        <div className="booking-stat-card">
          <div className="stat-value">{bookings.filter(b => b.status === 'pending').length}</div>
          <div className="stat-label">Pending Confirmation</div>
        </div>
        <div className="booking-stat-card">
          <div className="stat-value">
            {formatCurrency(bookings.filter(b => b.status === 'confirmed' || b.status === 'completed')
              .reduce((sum, booking) => sum + booking.amount, 0))}
          </div>
          <div className="stat-label">Total Revenue</div>
        </div>
        <div className="booking-stat-card">
          <div className="stat-value">
            {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
          </div>
          <div className="stat-label">Today's Date</div>
        </div>
      </div>
    </div>
  );
};

export default Bookings; 