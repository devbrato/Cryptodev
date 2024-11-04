import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCUBpVWi-0f95JamKowDjN86W_oXg-TFe8",
  authDomain: "crypto-2954f.firebaseapp.com",
  projectId: "crypto-2954f",
  storageBucket: "crypto-2954f.firebasestorage.app",
  messagingSenderId: "329010221034",
  appId: "1:329010221034:web:7ef8f79477f296b89f2c93",
  measurementId: "G-TKS7MDTT4H"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
