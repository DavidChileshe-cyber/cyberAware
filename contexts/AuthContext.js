'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { saveUser, getUser, updateUser } from '@/lib/userService';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null); // Full user data from Firestore
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firestore
  const fetchUserData = async (userId) => {
    try {
      const data = await getUser(userId);
      if (data) {
        setUserData(data);
        setUserRole(data.role || null);
      } else {
        setUserData(null);
        setUserRole(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserData(null);
      setUserRole(null);
    }
  };

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Fetch full user data from Firestore
        await fetchUserData(firebaseUser.uid);
      } else {
        setUser(null);
        setUserRole(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    if (!auth) {
      throw new Error('Firebase is not configured. Please set up your environment variables.');
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last login time
    try {
      await updateUser(userCredential.user.uid, {
        lastLoginAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating last login:', error);
      // Don't throw - login should still succeed even if this fails
    }
    
    return userCredential;
  };

  const signUp = async (email, password, role, name, additionalData = {}) => {
    if (!auth) {
      throw new Error('Firebase is not configured. Please set up your environment variables.');
    }
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    // Save comprehensive user data to Firestore
    const userDataToSave = {
      email: firebaseUser.email,
      role: role, // 'user', 'student', or 'admin'
      name: name,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      ...additionalData // Allow additional fields to be passed
    };

    try {
      await saveUser(firebaseUser.uid, userDataToSave);
      // Fetch the saved user data
      await fetchUserData(firebaseUser.uid);
    } catch (error) {
      console.error('Error saving user data:', error);
      // Even if Firestore fails, set the role locally so the app can continue
      setUserRole(role);
    }
    
    return userCredential;
  };

  const updateUserProfile = async (updates) => {
    if (!user || !auth) {
      throw new Error('User must be logged in to update profile');
    }

    try {
      await updateUser(user.uid, updates);
      // Refresh user data after update
      await fetchUserData(user.uid);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  const signOut = async () => {
    if (!auth) {
      setUser(null);
      setUserRole(null);
      setUserData(null);
      return;
    }
    await firebaseSignOut(auth);
    setUser(null);
    setUserRole(null);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userRole, 
      userData, // Full user data from Firestore
      signIn, 
      signUp, 
      signOut, 
      updateUserProfile, // Function to update user profile
      refreshUserData: () => user && fetchUserData(user.uid), // Function to refresh user data
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

