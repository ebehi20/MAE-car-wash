import { auth, db } from './config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const createAdminUser = async (email: string, password: string) => {
  try {
    // Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create the user document in Firestore with admin role
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: 'admin',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isActive: true
    });

    console.log('Admin user created successfully:', user.uid);
    return user;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};

// Example usage:
// createAdminUser('admin@example.com', 'securePassword123'); 