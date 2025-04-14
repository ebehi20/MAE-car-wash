import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

interface FirebaseContextType {
  user: User | null;
  loading: boolean;
  userRole: string | null;
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  loading: true,
  userRole: null,
});

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      
      if (user) {
        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      } else {
        setUserRole(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, loading, userRole }}>
      {children}
    </FirebaseContext.Provider>
  );
}; 