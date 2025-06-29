// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "trainer-crud-react.firebaseapp.com",
  projectId: "trainer-crud-react",
  storageBucket: "trainer-crud-react.appspot.com",
  messagingSenderId: "623096120935",
  appId: "1:623096120935:web:bc4d19931b5f9780fff6c2",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
