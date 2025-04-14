import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react'
import './index.css'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import JuneAI from './components/JuneAI'
import NewAppointment from './components/NewAppointment'
import Reports from './components/Reports'
import Bookings from './components/Bookings'
import Staff from './components/Staff'
import Customers from './components/Customers'
import Sales from './components/Sales'
import Inventory from './components/Inventory'
import Services from './components/Services'
import Marketing from './components/Marketing'
import Settings from './components/Settings'
import Notifications from './components/Notifications'
import Login from './components/Login'
import { signIn, signOut, getCurrentUser, UserData } from './firebase/auth'
import { User } from 'firebase/auth'

// Error Boundary Component
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Component Error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: '#721c24', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px' }}>
          <h2>Something went wrong.</h2>
          <p>The component could not be loaded. Please check the console for details.</p>
          {this.state.error && <p>Error: {this.state.error.message}</p>}
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState<string>('dashboard')
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const result = await getCurrentUser()
        if (result) {
          setUser(result.user)
          setUserData(result.userData)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const handleNavigation = async (page: string) => {
    if (page === 'logout') {
      try {
        await signOut()
        setUser(null)
        setUserData(null)
      } catch (error) {
        console.error('Error signing out:', error)
      }
      return
    }
    setCurrentPage(page)
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await signIn(email, password)
      setUser(result.user)
      setUserData(result.userData)
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  const renderComponent = (component: ReactNode) => {
    return <ErrorBoundary>{component}</ErrorBoundary>
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  if (!user || !userData) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="app-container">
      <Sidebar onNavigate={handleNavigation} currentPage={currentPage} userRole={userData.role} />
      <main className="main-content">
        {currentPage === 'dashboard' && renderComponent(<Dashboard onNavigate={handleNavigation} />)}
        {currentPage === 'juneai' && renderComponent(<JuneAI onNavigate={handleNavigation} />)}
        {currentPage === 'newappointment' && renderComponent(<NewAppointment onNavigate={handleNavigation} />)}
        {currentPage === 'reports' && renderComponent(<Reports onNavigate={handleNavigation} />)}
        {currentPage === 'bookings' && renderComponent(<Bookings onNavigate={handleNavigation} />)}
        {currentPage === 'staff' && renderComponent(<Staff onNavigate={handleNavigation} />)}
        {currentPage === 'customers' && renderComponent(<Customers onNavigate={handleNavigation} />)}
        {currentPage === 'sales' && renderComponent(<Sales onNavigate={handleNavigation} />)}
        {currentPage === 'inventory' && renderComponent(<Inventory onNavigate={handleNavigation} />)}
        {currentPage === 'services' && renderComponent(<Services onNavigate={handleNavigation} />)}
        {currentPage === 'marketing' && renderComponent(<Marketing onNavigate={handleNavigation} />)}
        {currentPage === 'settings' && renderComponent(<Settings onNavigate={handleNavigation} />)}
        {currentPage === 'notifications' && renderComponent(<Notifications onNavigate={handleNavigation} />)}
      </main>
    </div>
  )
}

export default App 