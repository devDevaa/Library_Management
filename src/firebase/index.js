import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyB1WK1Q19gZagFypFBv1Pv8jUFftYjyJHE",

  authDomain: "central-library-77f7b.firebaseapp.com",

  projectId: "central-library-77f7b",

  storageBucket: "central-library-77f7b.appspot.com",

  messagingSenderId: "632049191468",

  appId: "1:632049191468:web:8cb2355dd3d6eef7a8df89",

  measurementId: "G-EE4FJGVWGQ",
};

const app = initializeApp(firebaseConfig);
let db = getFirestore(app);
let auth = getAuth(app);
let storage = getStorage(app);

export { db, auth, storage };
