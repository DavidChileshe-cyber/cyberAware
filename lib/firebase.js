// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTJBiH5LxFpfwNMNSJ1TKGVNyVSCNH7FI",
  authDomain: "test-5cf56.firebaseapp.com",
  projectId: "test-5cf56",
  storageBucket: "test-5cf56.firebasestorage.app",
  messagingSenderId: "812873039219",
  appId: "1:812873039219:web:0db976537a40121349d906"
};

// Initialize Firebase
let app;
let auth;
let db;

try {
  // Initialize Firebase only if not already initialized (prevents duplicate initialization)
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.error('Error initializing Firebase:', error);
  // Set to null to prevent errors if Firebase fails to initialize
  auth = null;
  db = null;
}

export { auth, db };
export default app;
