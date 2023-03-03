import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { FIREBASE_API_KEY } from "@env";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "instagram-clone-33526.firebaseapp.com",
  projectId: "instagram-clone-33526",
  storageBucket: "instagram-clone-33526.appspot.com",
  messagingSenderId: "966697711401",
  appId: "1:966697711401:web:f6fd3a5e8caad789cba938",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
export { app, auth, db, storage };
