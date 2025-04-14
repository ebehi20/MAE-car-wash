import { createAdminUser } from './createAdminUser';

const initializeAdmin = async () => {
  try {
    await createAdminUser('admin@mae.com', 'Admin123!');
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

initializeAdmin(); 