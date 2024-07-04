// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5qnhWmVKiY3_9ZFLyVO_6KKeJMRFu5mg",
  authDomain: "polymaps1auth.firebaseapp.com",
  projectId: "polymaps1auth",
  storageBucket: "polymaps1auth.appspot.com",
  messagingSenderId: "937260497789",
  appId: "1:937260497789:web:8ce7dd89e75acbaa802a14",
  measurementId: "G-NK2VPNSBZX"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
