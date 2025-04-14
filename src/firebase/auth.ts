import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from './config';

export const authService = {
  // Sign up new users
  async signUp(email: string, password: string, displayName: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    return userCredential.user;
  },

  // Sign in existing users
  async signIn(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  // Sign out
  async signOut() {
    await signOut(auth);
  },

  // Reset password
  async resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  },

  // Subscribe to auth state changes
  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }
}; 