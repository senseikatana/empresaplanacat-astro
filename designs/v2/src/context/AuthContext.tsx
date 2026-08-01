import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  signInWithPopup,
  GoogleAuthProvider,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (role: UserRole) => void;
  quickDemoLogin: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>({
    uid: 'demo-user-1',
    email: 'marc.conductor@empresaplana.cat',
    displayName: 'Marc - Conductor',
    role: 'driver',
    photoURL: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', fbUser.uid));
          let role: UserRole = 'passenger';
          if (userDoc.exists()) {
            role = userDoc.data().role || 'passenger';
          } else {
            await setDoc(doc(db, 'users', fbUser.uid), {
              uid: fbUser.uid,
              email: fbUser.email,
              displayName: fbUser.displayName || 'Usuario',
              role: 'passenger',
              createdAt: new Date().toISOString()
            });
          }
          setUser({
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Usuario',
            role,
            photoURL: fbUser.photoURL
          });
        } catch (err) {
          console.warn('Firestore user lookup fallback:', err);
          setUser({
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName || 'Usuario',
            role: 'passenger',
            photoURL: fbUser.photoURL
          });
        }
      } else {
        // Leave default demo profile if not logged into firebase
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error: any) {
      console.error('Firebase Email login failed, triggering fallback demo user:', error);
      // Demo fallback if Firebase fails or unconfigured user
      const isEmployee = email.includes('empresa') || email.includes('driver') || email.includes('conductor');
      const role: UserRole = isEmployee ? 'driver' : 'passenger';
      setUser({
        uid: 'user-' + Date.now(),
        email,
        displayName: email.split('@')[0],
        role,
      });
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name?: string) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      await setDoc(doc(db, 'users', res.user.uid), {
        uid: res.user.uid,
        email,
        displayName: name || email.split('@')[0],
        role: 'passenger',
        createdAt: new Date().toISOString()
      });
      setUser({
        uid: res.user.uid,
        email,
        displayName: name || email.split('@')[0],
        role: 'passenger'
      });
    } catch (error: any) {
      console.warn('Sign up error fallback:', error);
      setUser({
        uid: 'user-' + Date.now(),
        email,
        displayName: name || email.split('@')[0],
        role: 'passenger'
      });
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.warn('Google Popup login fallback:', error);
      setUser({
        uid: 'google-demo-123',
        email: 'usuario.google@gmail.com',
        displayName: 'Usuario Google',
        role: 'passenger',
        photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.error(e);
    }
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (!user) return;
    setUser({ ...user, role: newRole });
  };

  const quickDemoLogin = (role: UserRole) => {
    const roleNames: Record<UserRole, string> = {
      passenger: 'Laura Garcia - Pasajera',
      driver: 'Marc - Conductor',
      staff: 'Joan - Estación Reus',
      manager: 'Elena - Gestora de Flota'
    };
    const roleEmails: Record<UserRole, string> = {
      passenger: 'laura.garcia@gmail.com',
      driver: 'marc.conductor@empresaplana.cat',
      staff: 'joan.estacio@empresaplana.cat',
      manager: 'elena.manager@empresaplana.cat'
    };

    setUser({
      uid: `demo-${role}-${Date.now()}`,
      email: roleEmails[role],
      displayName: roleNames[role],
      role,
      photoURL: role === 'driver' 
        ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithEmail,
        signUpWithEmail,
        loginWithGoogle,
        logout,
        switchRole,
        quickDemoLogin
      }}
    >
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
