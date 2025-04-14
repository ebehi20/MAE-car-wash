import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { initializeDatabase } from '../firebase/initializeDb';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
}

export const FirebaseTest: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initializeStatus, setInitializeStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesRef = collection(db, 'services');
        const snapshot = await getDocs(servicesRef);
        const servicesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Service));
        setServices(servicesData);
        setLoading(false);
      } catch (err) {
        setError('Error fetching services: ' + (err as Error).message);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleInitializeDb = async () => {
    try {
      setInitializeStatus('Initializing...');
      const result = await initializeDatabase();
      if (result) {
        setInitializeStatus('Database initialized successfully!');
        // Refresh the services list
        const servicesRef = collection(db, 'services');
        const snapshot = await getDocs(servicesRef);
        const servicesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Service));
        setServices(servicesData);
      } else {
        setInitializeStatus('Failed to initialize database.');
      }
    } catch (err) {
      setInitializeStatus('Error initializing database: ' + (err as Error).message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Firebase Connection Test</h2>
      
      <button 
        onClick={handleInitializeDb}
        style={{
          padding: '10px 20px',
          marginBottom: '20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Initialize Database
      </button>

      {initializeStatus && (
        <div style={{ 
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: initializeStatus.includes('successfully') ? '#DFF2BF' : '#FFBABA',
          borderRadius: '4px'
        }}>
          {initializeStatus}
        </div>
      )}

      <h3>Available Services:</h3>
      <div style={{ display: 'grid', gap: '20px' }}>
        {services.map(service => (
          <div 
            key={service.id}
            style={{
              padding: '15px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h4 style={{ margin: '0 0 10px 0' }}>{service.name}</h4>
            <p style={{ margin: '0 0 10px 0' }}>{service.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Price: ${service.price}</span>
              <span>Duration: {service.duration} mins</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 