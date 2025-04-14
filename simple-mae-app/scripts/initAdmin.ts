import { createAdminUser } from '../src/firebase/createAdminUser';

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error('Please provide both email and password as arguments');
  console.log('Usage: ts-node initAdmin.ts <email> <password>');
  process.exit(1);
}

createAdminUser(email, password)
  .then((user) => {
    console.log('Admin user created successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to create admin user:', error);
    process.exit(1);
  }); 