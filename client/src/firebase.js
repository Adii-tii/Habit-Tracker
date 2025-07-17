// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Import Auth
import { getAnalytics } from "firebase/analytics";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD-q2clLptGr5sesQ_sk8mjvH1SFZ6jhKI",
  authDomain: "habit-tracker-c3240.firebaseapp.com",
  projectId: "habit-tracker-c3240",
  storageBucket: "habit-tracker-c3240.appspot.com", // ❗️Fix typo here
  messagingSenderId: "179074020517",
  appId: "1:179074020517:web:63db8c644d3080d9a6094c",
  measurementId: "G-NZ0B38TFYZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

// ✅ Export the Auth object for login/signup
export const auth = getAuth(app);
