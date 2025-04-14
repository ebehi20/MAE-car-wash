import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn_NpoAT8mnXgLTchHhcMr1RtLlJjmEi8",
  authDomain: "mae-full-stack-applicati-f0945.firebaseapp.com",
  databaseURL: "https://mae-full-stack-applicati-f0945-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mae-full-stack-applicati-f0945",
  storageBucket: "mae-full-stack-applicati-f0945.firebasestorage.app",
  messagingSenderId: "1051196929534",
  appId: "1:1051196929534:web:966ccc04c8654b3211bcaf",
  measurementId: "G-9G5CHR5CWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); 