// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB7201ISE6RiRIKRAUDDSH32M8ZAticrGc",
  authDomain: "change-the-narrative-333.firebaseapp.com",
  projectId: "change-the-narrative-333",
  storageBucket: "change-the-narrative-333.firebasestorage.app",
  messagingSenderId: "142492322468",
  appId: "1:142492322468:web:a1a72695d92f6e25c83431",
  measurementId: "G-ZGV01SNR7J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
