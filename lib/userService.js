import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Save user data to Firestore
 * @param {string} userId - User's Firebase UID
 * @param {Object} userData - User data to save
 * @returns {Promise<void>}
 */
export const saveUser = async (userId, userData) => {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...userData,
      updatedAt: new Date().toISOString(),
      // Ensure createdAt is set only on first creation
      createdAt: userData.createdAt || new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

/**
 * Get user details by user ID
 * @param {string} userId - User's Firebase UID
 * @returns {Promise<Object|null>} User data or null if not found
 */
export const getUser = async (userId) => {
  if (!db) {
    console.warn('Firestore is not initialized');
    return null;
  }

  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return {
        id: userDoc.id,
        ...userDoc.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

/**
 * Update user details
 * @param {string} userId - User's Firebase UID
 * @param {Object} updates - Fields to update
 * @returns {Promise<void>}
 */
export const updateUser = async (userId, updates) => {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

/**
 * Get all users (admin only)
 * @returns {Promise<Array>} Array of user objects
 */
export const getAllUsers = async () => {
  if (!db) {
    console.warn('Firestore is not initialized');
    return [];
  }

  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    return usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching all users:', error);
    return [];
  }
};

/**
 * Get user by email
 * @param {string} email - User's email address
 * @returns {Promise<Object|null>} User data or null if not found
 */
export const getUserByEmail = async (email) => {
  if (!db) {
    console.warn('Firestore is not initialized');
    return null;
  }

  try {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return {
        id: userDoc.id,
        ...userDoc.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
};

/**
 * Get users by role
 * @param {string} role - User role ('user', 'student', 'admin')
 * @returns {Promise<Array>} Array of user objects with the specified role
 */
export const getUsersByRole = async (role) => {
  if (!db) {
    console.warn('Firestore is not initialized');
    return [];
  }

  try {
    const q = query(collection(db, 'users'), where('role', '==', role));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching users by role:', error);
    return [];
  }
};

