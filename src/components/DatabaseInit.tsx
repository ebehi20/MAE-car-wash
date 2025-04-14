import React, { useState } from 'react';
import { initializeDatabase } from '../firebase/initializeDb';

export const DatabaseInit: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInitialize = async () => {
    try {
      setIsLoading(true);
      setStatus('Initializing database...');
      const result = await initializeDatabase();
      if (result) {
        setStatus('Database initialized successfully! ✅');
      } else {
        setStatus('Failed to initialize database ❌');
      }
    } catch (error) {
      setStatus(`Error: ${error.message} ❌`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>MAE Car Wash - Database Initialization</h2>
      <div style={{ marginBottom: '20px' }}>
        <p>This will initialize the database with:</p>
        <ul>
          <li>Service Categories</li>
          <li>Services</li>
          <li>Staff Members</li>
          <li>Business Settings</li>
        </ul>
      </div>
      
      <button
        onClick={handleInitialize}
        disabled={isLoading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: isLoading ? '#cccccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? 'Initializing...' : 'Initialize Database'}
      </button>

      {status && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: status.includes('successfully') ? '#DFF2BF' : '#FFBABA',
            borderRadius: '4px'
          }}
        >
          {status}
        </div>
      )}
    </div>
  );
}; 