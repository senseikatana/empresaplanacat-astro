import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  Auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  signInAnonymously as firebaseSignInAnonymously,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { 
  getFirestore, 
  Firestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc, 
  doc, 
  setDoc,
  serverTimestamp 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { DigitalTicket, FrequentRoute } from '../types';

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);

// Auth Helpers
export const loginWithEmail = (email: string, pass: string) => 
  signInWithEmailAndPassword(auth, email, pass);

export const registerWithEmail = (email: string, pass: string) => 
  createUserWithEmailAndPassword(auth, email, pass);

export const loginAnonymously = () => 
  firebaseSignInAnonymously(auth);

export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logoutUser = () => 
  firebaseSignOut(auth);

// Firestore Ticket Helpers
export async function createTicketInFirestore(ticketData: Omit<DigitalTicket, 'id' | 'createdAt'>): Promise<string> {
  try {
    const colRef = collection(db, 'tickets');
    const docRef = await addDoc(colRef, {
      ...ticketData,
      createdAt: new Date().toISOString(),
      timestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (err) {
    console.error('Error saving ticket to Firestore:', err);
    throw err;
  }
}

export async function getUserTicketsFromFirestore(userId: string): Promise<DigitalTicket[]> {
  try {
    const colRef = collection(db, 'tickets');
    const q = query(colRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    const tickets: DigitalTicket[] = [];
    snapshot.forEach((docSnap) => {
      tickets.push({
        id: docSnap.id,
        ...docSnap.data()
      } as DigitalTicket);
    });
    return tickets;
  } catch (err) {
    console.error('Error fetching tickets from Firestore:', err);
    return [];
  }
}

// Firestore Favorites Helpers
export async function saveFavoriteRouteToFirestore(userId: string, route: FrequentRoute): Promise<void> {
  try {
    const docRef = doc(db, 'users', userId, 'favorites', route.id);
    await setDoc(docRef, route);
  } catch (err) {
    console.error('Error saving favorite route:', err);
  }
}

export async function getFavoriteRoutesFromFirestore(userId: string): Promise<FrequentRoute[]> {
  try {
    const colRef = collection(db, 'users', userId, 'favorites');
    const snapshot = await getDocs(colRef);
    const favs: FrequentRoute[] = [];
    snapshot.forEach((docSnap) => {
      favs.push({
        id: docSnap.id,
        ...docSnap.data()
      } as FrequentRoute);
    });
    return favs;
  } catch (err) {
    console.error('Error fetching favorites:', err);
    return [];
  }
}

export async function removeFavoriteRouteFromFirestore(userId: string, routeId: string): Promise<void> {
  try {
    const docRef = doc(db, 'users', userId, 'favorites', routeId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('Error removing favorite:', err);
  }
}
