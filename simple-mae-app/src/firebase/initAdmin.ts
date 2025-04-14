import { createUser } from './auth';

const initializeAdmin = async () => {
  try {
    await createUser('admin@mae.com', 'Admin123!', 'admin');
    console.log('Admin user created successfully');
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('Admin user already exists');
    } else {
      console.error('Error creating admin user:', error);
    }
  }
};

// Run the initialization
initializeAdmin(); 