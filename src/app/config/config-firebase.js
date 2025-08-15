import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDt3OepaKZQpTtG6psvJZjcK5_cyYKNiKc",
  authDomain: "laclothes-ea963.firebaseapp.com",
  projectId: "laclothes-ea963",
  storageBucket: "laclothes-ea963.firebasestorage.app",
  messagingSenderId: "191577940919",
  appId: "1:191577940919:web:84d761ca6a7efb84333e32",
  measurementId: "G-MC0GVBQGB0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
