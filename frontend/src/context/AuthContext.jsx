import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseConfigured } from '../firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null); // { role, displayName, email, photoURL }
  const [loading, setLoading] = useState(true);

  // Listen to Firebase auth state
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        // Fetch user profile from Firestore
        try {
          const profileRef = doc(db, 'users', user.uid);
          const profileSnap = await getDoc(profileRef);
          if (profileSnap.exists()) {
            setUserProfile(profileSnap.data());
          } else {
            // Profile not yet created (new user, role selection pending)
            setUserProfile(null);
          }
        } catch (err) {
          console.error('Failed to fetch user profile:', err);
          setUserProfile(null);
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign in with Google, save role if first time
  const signInWithGoogle = async (role) => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Firebase is not configured. Please add your Firebase config to .env file.');
    }

    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if profile already exists
    const profileRef = doc(db, 'users', user.uid);
    const profileSnap = await getDoc(profileRef);

    if (!profileSnap.exists()) {
      // First-time login: save role + profile
      const profile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: role,
        createdAt: serverTimestamp(),
      };
      await setDoc(profileRef, profile);
      setUserProfile(profile);
    } else {
      setUserProfile(profileSnap.data());
    }

    return result.user;
  };

  const signOut = async () => {
    if (auth) {
      await firebaseSignOut(auth);
    }
    setCurrentUser(null);
    setUserProfile(null);
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    isFirebaseConfigured,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
