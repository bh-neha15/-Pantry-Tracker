 // lib/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBkZR5PNMyFjtr9aTyJBXh-ANVOklU1iaE',
  authDomain: 'pantry-tracker-68df8.firebaseapp.com',
  projectId: 'pantry-tracker-68df8',
  storageBucket: 'pantry-tracker-68df8.appspot.com',
  messagingSenderId: '541887151277',
  appId: '1:541887151277:web:9dd03fbc3e448ff7271a24',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

