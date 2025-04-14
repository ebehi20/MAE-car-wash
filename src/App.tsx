import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>MAE Car Wash - Database Initialization</h1>
      <button 
        onClick={() => console.log('Initialize clicked')}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Initialize Database
      </button>
    </div>
  )
}

export default App 