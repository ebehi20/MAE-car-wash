import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

export interface UserData {
  email: string;
  role: 'admin' | 'staff' | 'user';
  createdAt: string;
  lastLogin: string;
}

export const initializeAdminIfNeeded = async () => {
  try {
    // Try to sign in first
    await signInWithEmailAndPassword(auth, 'admin@mae.com', 'Admin123!');
  } catch (error: any) {
    // If user doesn't exist, create it
    if (error.code === 'auth/user-not-found') {
      await createUser('admin@mae.com', 'Admin123!', 'admin');
    } else {
      throw error;
    }
  }
};

export const signIn = async (email: string, password: string): Promise<{ user: User; userData: UserData }> => {
  try {
    // If it's the first login attempt, try to initialize admin
    if (email === 'admin@mae.com') {
      await initializeAdminIfNeeded();
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    let userData = userDoc.data() as UserData;

    // If user document doesn't exist in Firestore, create it
    if (!userData) {
      userData = {
        email: userCredential.user.email || '',
        role: 'admin', // Default to admin for now
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
    } else {
      // Update last login
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        ...userData,
        lastLogin: new Date().toISOString()
      }, { merge: true });
    }

    return { user: userCredential.user, userData };
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const createUser = async (email: string, password: string, role: 'admin' | 'staff' | 'user' = 'admin'): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user document in Firestore with role
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      role,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    });

    return userCredential.user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<{ user: User; userData: UserData } | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data() as UserData;
        resolve({ user, userData });
      } else {
        resolve(null);
      }
    });
  });
}; 