import { initializeApp } from "firebase/app";
import { FIREBASE_API_KEY } from "@env";

import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "gainzapp-392017.firebaseapp.com",
  projectId: "gainzapp-392017",
  storageBucket: "gainzapp-392017.appspot.com",
  messagingSenderId: "75694328412",
  appId: "1:75694328412:web:4a21ed74752f0d3303b499",
  measurementId: "G-LCNCPRRM62",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

const auth = getAuth(app);
