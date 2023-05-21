import { initializeApp } from 'firebase/app';
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

// Optionally import the services that you want to use
// import {...} from "firebase/database";
 
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBeMmc6vW_M-ifHvrjX4XLrBBZrGFNcZJ8",
    authDomain: "our-brothers-1a5f3.firebaseapp.com",
    projectId: "our-brothers-1a5f3",
    storageBucket: "our-brothers-1a5f3.appspot.com",
    messagingSenderId: "371212714833",
    appId: "1:371212714833:web:a47b1bc33f261c74770970"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);