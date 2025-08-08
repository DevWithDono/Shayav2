import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCCXMTfzjGZqQ9IPyq3ny-SAWZV3Ya6Z-0",
  authDomain: "app-shaya.firebaseapp.com",
  projectId: "app-shaya",
  storageBucket: "app-shaya.firebasestorage.app",
  messagingSenderId: "755994153087",
  appId: "1:755994153087:web:b835348540414be2e3af4a",
  measurementId: "G-5RGQ7R5ZHG"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);