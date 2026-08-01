import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  db, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  doc,
  getDoc,
  setDoc
} from '../lib/firebase';
import { UserProfile } from '../types';
import { DEMO_MAP_IMAGES } from '../data/mockData';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loginDemoPassenger: () => void;
  loginDemoStaff: () => void;
  toggleSavedOfflineRoute: (routeId: string) => void;
  toggleFavoriteRoute: (routeId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_PASSENGER: UserProfile = {
  uid: 'demo-mateo-123',
  email: 'mateo.rodriguez@example.com',
  displayName: 'Mateo Rodriguez',
  photoURL: DEMO_MAP_IMAGES.avatarMateo,
  membershipTier: 'Gold Member',
  points: 840,
  isStaff: false,
  savedOfflineRoutes: ['route-cambrils-tarragona'],
  favoriteRouteIds: ['route-next-bus-1', 'route-reus-salou']
};

const DEMO_STAFF: UserProfile = {
  uid: 'demo-staff-admin-456',
  email: 'admin.dispatch@empresaplana.cat',
  displayName: 'Carlos J. (Staff Manager)',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  membershipTier: 'Staff Admin',
  points: 2500,
  isStaff: true,
  savedOfflineRoutes: [],
  favoriteRouteIds: ['route-next-bus-1', 'route-3']
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEMO_PASSENGER);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unsubscribe: () => void = () => {};

    if (auth) {
      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          try {
            const userRef = doc(db, 'users', firebaseUser.uid);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
              setUser(docSnap.data() as UserProfile);
            } else {
              const newUser: UserProfile = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName || 'Usuario Plana',
                photoURL: firebaseUser.photoURL || DEMO_MAP_IMAGES.avatarMateo,
                membershipTier: 'Frecuente • Member',
                points: 100,
                isStaff: firebaseUser.email?.endsWith('@empresaplana.cat') || false,
                savedOfflineRoutes: [],
                favoriteRouteIds: []
              };
              await setDoc(userRef, newUser);
              setUser(newUser);
            }
          } catch (err) {
            console.warn("Firestore fetch error, fallback to memory user:", err);
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || 'Usuario Plana',
              photoURL: firebaseUser.photoURL || DEMO_MAP_IMAGES.avatarMateo,
              membershipTier: 'Frecuente • Member',
              points: 100,
              isStaff: false,
              savedOfflineRoutes: [],
              favoriteRouteIds: []
            });
          }
        } else {
          // If no Firebase session, default to Demo Passenger so app is interactive
          if (!user) {
            setUser(DEMO_PASSENGER);
          }
        }
        setLoading(false);
      });
    } else {
      setUser(DEMO_PASSENGER);
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    if (!auth) {
      setUser(DEMO_PASSENGER);
      return;
    }
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    if (!auth) {
      loginDemoPassenger();
      return;
    }
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const registerWithEmail = async (email: string, pass: string, name: string) => {
    if (!auth) {
      loginDemoPassenger();
      return;
    }
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    if (res.user) {
      const newUser: UserProfile = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: name,
        photoURL: DEMO_MAP_IMAGES.avatarMateo,
        membershipTier: 'Gold Member',
        points: 200,
        isStaff: email.toLowerCase().includes('staff') || email.toLowerCase().includes('admin'),
        savedOfflineRoutes: [],
        favoriteRouteIds: []
      };
      if (db) {
        await setDoc(doc(db, 'users', res.user.uid), newUser);
      }
      setUser(newUser);
    }
  };

  const logout = async () => {
    if (auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.error(e);
      }
    }
    setUser(null);
  };

  const loginDemoPassenger = () => {
    setUser(DEMO_PASSENGER);
  };

  const loginDemoStaff = () => {
    setUser(DEMO_STAFF);
  };

  const toggleSavedOfflineRoute = (routeId: string) => {
    if (!user) return;
    const exists = user.savedOfflineRoutes.includes(routeId);
    const updated = exists 
      ? user.savedOfflineRoutes.filter(id => id !== routeId)
      : [...user.savedOfflineRoutes, routeId];
    
    const updatedUser = { ...user, savedOfflineRoutes: updated };
    setUser(updatedUser);

    if (db && user.uid && !user.uid.startsWith('demo-')) {
      setDoc(doc(db, 'users', user.uid), { savedOfflineRoutes: updated }, { merge: true }).catch(console.error);
    }
  };

  const toggleFavoriteRoute = (routeId: string) => {
    if (!user) return;
    const exists = user.favoriteRouteIds.includes(routeId);
    const updated = exists 
      ? user.favoriteRouteIds.filter(id => id !== routeId)
      : [...user.favoriteRouteIds, routeId];

    const updatedUser = { ...user, favoriteRouteIds: updated };
    setUser(updatedUser);

    if (db && user.uid && !user.uid.startsWith('demo-')) {
      setDoc(doc(db, 'users', user.uid), { favoriteRouteIds: updated }, { merge: true }).catch(console.error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      loginWithGoogle,
      loginWithEmail,
      registerWithEmail,
      logout,
      loginDemoPassenger,
      loginDemoStaff,
      toggleSavedOfflineRoute,
      toggleFavoriteRoute
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
