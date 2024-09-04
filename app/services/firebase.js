import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACUTHK_R9fSikBDv7vn9Qwmi5AxpFFiPQ",
  authDomain: "cfc-blog.firebaseapp.com",
  projectId: "cfc-blog",
  storageBucket: "cfc-blog.appspot.com",
  messagingSenderId: "855982433329",
  appId: "1:855982433329:web:d20d6db65d83b14162e110",
  measurementId: "G-CFCY9TCN7J",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
