import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase Configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAL7R2-9_wvgrwwLgNknZHvlZbHMqgxZCc",
  authDomain: "auth-e0be2.firebaseapp.com",
  projectId: "auth-e0be2",
  storageBucket: "auth-e0be2.appspot.com",
  messagingSenderId: "301149939517",
  appId: "1:301149939517:web:d58f814569025813a80754",
  measurementId: "G-Z7PFZEETT9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Analytics (only works on https or localhost)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Export the app instance
export { app };

// Validate Firebase config
export const validateFirebaseConfig = () => {
  const requiredFields = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
  ];

  const missingFields = requiredFields.filter(field => !firebaseConfig[field]);
  
  if (missingFields.length > 0) {
    console.warn('⚠️ Firebase configuration missing:', missingFields);
    return false;
  }
  
  return true;
};
