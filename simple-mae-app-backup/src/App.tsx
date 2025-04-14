import React, { useState } from 'react'
import './index.css'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import JuneAI from './components/JuneAI'
import NewAppointment from './components/NewAppointment'

function App() {
  const [currentPage, setCurrentPage] = useState<string>('dashboard')

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
  }

  return (
    <div className="app-container">
      <Sidebar onNavigate={handleNavigation} currentPage={currentPage} />
      <main className="main-content">
        {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigation} />}
        {currentPage === 'juneai' && <JuneAI onNavigate={handleNavigation} />}
        {currentPage === 'newappointment' && <NewAppointment onNavigate={handleNavigation} />}
      </main>
    </div>
  )
}

export default App 