// Firebase SDK Configuration
// ─────────────────────────────────────────────────────────────────────────────
// SETUP INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com
// 2. Create a project (or use existing)
// 3. Go to Project Settings → Your Apps → Web App → Add App
// 4. Copy the firebaseConfig object and paste the values into your .env file
// 5. Enable Google Sign-In: Authentication → Sign-in method → Google → Enable
// 6. Enable Firestore: Firestore Database → Create database (start in test mode)
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "eduai-d168d.firebaseapp.com",
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID || "eduai-d168d",
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "eduai-d168d.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "506743743156",
  appId:             import.meta.env.VITE_FIREBASE_APP_ID || "1:506743743156:web:440788f645a8255f8f3f1b",
};

// Check if Firebase is configured
export const isFirebaseConfigured = Boolean(firebaseConfig.projectId && firebaseConfig.apiKey);

let app, auth, db, googleProvider;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.addScope('email');
  googleProvider.addScope('profile');
} else {
  console.warn(
    '⚠️ Firebase is not configured. Add your Firebase config values to .env file.\n' +
    'See frontend/.env.example for the required variables.'
  );
  auth = null;
  db = null;
  googleProvider = null;
}

export { auth, db, googleProvider };
export default app;
