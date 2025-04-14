// Export Firebase services
export { db, auth, storage } from './config';

// Export customer related interfaces and services
export { 
  Customer, 
  Vehicle, 
  ServiceRecord, 
  customerService 
} from './models/customer';

// Export service related interfaces and services
export { 
  ServiceCategory, 
  Service, 
  serviceService 
} from './models/service';

// Export appointment related interfaces and services
export { 
  AppointmentStatus, 
  Appointment, 
  appointmentService 
} from './models/appointment';

// Add a function to initialize Firebase data for testing
export const initializeFirebaseData = async () => {
  // Import services
  const { serviceService } = await import('./models/service');
  const { customerService } = await import('./models/customer');
  const { appointmentService } = await import('./models/appointment');
  
  try {
    // Add some sample services
    const washServiceId = await serviceService.createService({
      name: 'Premium Wash',
      description: 'Complete wash with wax and polish',
      price: 29.99,
      duration: 45,
      category: 'wash' as any,
      isActive: true,
      imageUrl: 'https://example.com/images/premium-wash.jpg'
    });

    const detailServiceId = await serviceService.createService({
      name: 'Interior Detailing',
      description: 'Complete interior cleaning and conditioning',
      price: 79.99,
      duration: 120,
      category: 'detail' as any,
      isActive: true,
      imageUrl: 'https://example.com/images/interior-detail.jpg'
    });

    // Add a sample customer
    const customerId = await customerService.createCustomer({
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '555-123-4567',
      address: '123 Main Street, Anytown, US 12345',
      joinDate: new Date(),
      status: 'active',
      vehicles: [
        {
          make: 'Toyota',
          model: 'Camry',
          year: 2018,
          licensePlate: 'ABC123',
          color: 'Silver'
        }
      ]
    });

    // Add a sample appointment
    await appointmentService.createAppointment({
      customerId: customerId,
      customerName: 'John Smith',
      vehicleInfo: '2018 Toyota Camry (Silver)',
      services: [
        {
          serviceId: washServiceId,
          serviceName: 'Premium Wash',
          price: 29.99
        }
      ],
      date: new Date(new Date().setDate(new Date().getDate() + 2)), // 2 days from now
      time: '10:00 AM',
      duration: 45,
      status: 'scheduled',
      staffName: 'Mike Johnson',
      totalPrice: 29.99
    });

    console.log('Sample Firebase data has been initialized');
    return true;
  } catch (error) {
    console.error('Error initializing Firebase data:', error);
    return false;
  }
}; 