// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "re-mern-abdul.firebaseapp.com",
  projectId: "re-mern-abdul",
  storageBucket: "re-mern-abdul.appspot.com",
  messagingSenderId: "503653910021",
  appId: "1:503653910021:web:71ef67376f461336a57e6c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);