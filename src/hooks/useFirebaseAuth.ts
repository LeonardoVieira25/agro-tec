import { useEffect, useState } from 'react';
import { auth, signInWithGooglePopup } from '../firebase/init';
import { User } from 'firebase/auth';

export default function useFirebaseAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUser(user);
      } else {
        setLoggedIn(false);
        setUser(null);
      }
    });

    // Retornar a função de cleanup (unsubscribe) para evitar vazamento de memória
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return {
    loggedIn,
    login,
    logout,
    user,
  };
}
