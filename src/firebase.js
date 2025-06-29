import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmBhk9KW4ZEfxjuVjToPMlBT91K_0DaEM",
  authDomain: "trainer-crud-react.firebaseapp.com",
  projectId: "trainer-crud-react",
  storageBucket: "trainer-crud-react.appspot.com", // corregido
  messagingSenderId: "623096120935",
  appId: "1:623096120935:web:bc4d19931b5f9780fff6c2",
  measurementId: "G-P5GL4FKSVE",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
