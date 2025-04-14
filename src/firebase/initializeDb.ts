import { db } from './config';
import { collection, doc, setDoc } from 'firebase/firestore';

export const initializeDatabase = async () => {
  try {
    // Create initial service categories
    const serviceCategories = [
      {
        id: 'basic-wash',
        name: 'Basic Wash',
        description: 'Basic exterior wash services',
        order: 1
      },
      {
        id: 'premium-wash',
        name: 'Premium Wash',
        description: 'Premium wash services with wax and polish',
        order: 2
      },
      {
        id: 'detailing',
        name: 'Detailing',
        description: 'Full detailing services',
        order: 3
      }
    ];

    // Create initial services
    const services = [
      {
        id: 'basic-exterior-wash',
        categoryId: 'basic-wash',
        name: 'Basic Exterior Wash',
        description: 'Basic exterior wash with soap and water',
        price: 15.99,
        duration: 30,
        isActive: true
      },
      {
        id: 'premium-wash-wax',
        categoryId: 'premium-wash',
        name: 'Premium Wash & Wax',
        description: 'Premium wash with wax protection',
        price: 29.99,
        duration: 60,
        isActive: true
      },
      {
        id: 'full-detailing',
        categoryId: 'detailing',
        name: 'Full Detailing Package',
        description: 'Complete interior and exterior detailing',
        price: 149.99,
        duration: 180,
        isActive: true
      }
    ];

    // Create collections and documents
    for (const category of serviceCategories) {
      await setDoc(doc(db, 'serviceCategories', category.id), {
        ...category,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    for (const service of services) {
      await setDoc(doc(db, 'services', service.id), {
        ...service,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Create initial admin user (you should change this password immediately)
    await setDoc(doc(db, 'users', 'admin'), {
      email: 'admin@mae-carwash.com',
      role: 'admin',
      name: 'Admin User',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
}; 