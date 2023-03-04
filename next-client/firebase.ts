import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBcDmCw_Al3GEKBj57BmrLoCGivNZ-re7Q',
  authDomain: 'scraper-9dc5a.firebaseapp.com',
  projectId: 'scraper-9dc5a',
  storageBucket: 'scraper-9dc5a.appspot.com',
  messagingSenderId: '784276677209',
  appId: '1:784276677209:web:fd683b893103dee9a9c748',
  measurementId: 'G-BXRCRHMRBF',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
