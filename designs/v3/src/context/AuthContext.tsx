import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, loginWithEmail, registerWithEmail, logoutUser, loginAnonymously, loginWithGoogle } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  loginGuest: () => Promise<void>;
  loginGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    await loginWithEmail(email, pass);
  };

  const register = async (email: string, pass: string) => {
    await registerWithEmail(email, pass);
  };

  const logout = async () => {
    await logoutUser();
  };

  const loginGuest = async () => {
    await loginAnonymously();
  };

  const loginGoogle = async () => {
    await loginWithGoogle();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, loginGuest, loginGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
