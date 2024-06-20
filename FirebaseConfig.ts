// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKiPAO04e7EWnmn_0L47US56ntluNcvcU",
  authDomain: "mapsauth-6f68f.firebaseapp.com",
  projectId: "mapsauth-6f68f",
  storageBucket: "mapsauth-6f68f.appspot.com",
  messagingSenderId: "865436165189",
  appId: "1:865436165189:web:4a0f8563028aa5c2c16f2c",
  measurementId: "G-RQ2VXXJGDM"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);