// firebase/config.js
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCiRUnvev0Lh0VIkd7-JFlip-_3SztZUQI",
  authDomain: "bitsync-70a59.firebaseapp.com",
  projectId: "bitsync-70a59",
  storageBucket: "bitsync-70a59.appspot.com",
  messagingSenderId: "752978383382",
  appId: "1:752978383382:web:b35df82c5c58b3b7565b37",
  measurementId: "G-GLZFQ66CE3",
};

// ✅ Initialize Firebase app only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Initialize Auth with persistence (React Native requires AsyncStorage)
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app); // if already initialized
}

// ✅ Firestore
const db = getFirestore(app);

export { app, auth, db };
