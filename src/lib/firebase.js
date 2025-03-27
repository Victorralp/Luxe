import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDxgMRYRP8PlT7OF0qSaQH8HnyjgaIVF4o",
  authDomain: "glamshopperia.firebaseapp.com",
  projectId: "glamshopperia",
  storageBucket: "glamshopperia.firebasestorage.app",
  messagingSenderId: "805073956475",
  appId: "1:805073956475:web:9878f740dc67cba5a2fcde",
  measurementId: "G-7NS8ZS0R0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Storage
export const storage = getStorage(app);

export default app; 