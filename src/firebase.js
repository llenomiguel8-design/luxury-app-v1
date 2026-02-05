import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// You can find this in your Firebase Console -> Project Settings -> General -> Your Apps
const firebaseConfig = {
  apiKey: "AIzaSyAXZAl5ubIdnCic27nDqETMVcFSTfTD3VU",
  authDomain: "luxury-firebase-d0b98.firebaseapp.com",
  databaseURL: "https://luxury-firebase-d0b98-default-rtdb.firebaseio.com",
  projectId: "luxury-firebase-d0b98",
  storageBucket: "luxury-firebase-d0b98.firebasestorage.app",
  messagingSenderId: "670861100332",
  appId: "1:670861100332:web:c4be1875fe0b7e6ca39889",
  measurementId: "G-E14T9R34VQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and export it
export const db = getFirestore(app);
