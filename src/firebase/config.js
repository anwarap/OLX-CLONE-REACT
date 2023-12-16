import {initializeApp}  from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_j0PpAcoQTyWOn7OnnSZdgKcjZhDywHU",
  authDomain: "olx-clone-4093e.firebaseapp.com",
  projectId: "olx-clone-4093e",
  storageBucket: "olx-clone-4093e.appspot.com",
  messagingSenderId: "192967639377",
  appId: "1:192967639377:web:30d3661d71b33c3554d370",
  measurementId: "G-6SNBN54DBL"
};

  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp); 
  const firestore = getFirestore(firebaseApp); 
  
  export { firebaseApp, auth, firestore };