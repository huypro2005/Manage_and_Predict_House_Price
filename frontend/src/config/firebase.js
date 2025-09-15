import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
// import { suppressChromeExtensionErrors } from '../utils/chromeExtensionHandler';

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

// Initialize Firebase with error handling
let app;
let auth;
let analytics;

try {
  app = initializeApp(firebaseConfig);
  
  // Initialize Firebase Authentication with error handling
  auth = getAuth(app);
  
  // Suppress Chrome extension errors
  // suppressChromeExtensionErrors();
  
  // Initialize Analytics (only works on https or localhost)
  analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
  
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Fallback initialization
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  if (!auth) {
    auth = getAuth(app);
  }
}

export { app, auth, analytics };

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
