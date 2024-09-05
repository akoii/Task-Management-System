// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDorB9j96Fr9qEMkK1zxLmIjkG9embmF7I",
  authDomain: "task-management-system-2f9b7.firebaseapp.com",
  projectId: "task-management-system-2f9b7",
  storageBucket: "task-management-system-2f9b7.appspot.com",
  messagingSenderId: "907423398300",
  appId: "1:907423398300:web:e3755232c3725a45503059",
  measurementId: "G-5WDSMYWLLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider};