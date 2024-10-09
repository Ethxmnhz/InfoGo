import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'; // Import Firebase auth
import { onAuthStateChanged } from 'firebase/auth'; // Import Firebase auth state listener

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ name: user.displayName || user.uid, uid: user.uid }); // Set user if logged in
      } else {
        setUser(null); // Clear user if logged out
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
