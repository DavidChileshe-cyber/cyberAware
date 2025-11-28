import { collection, addDoc, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

// Track phishing attempt
export const trackPhishingAttempt = async (userId, phishingType, capturedData) => {
  if (!db) {
    console.warn('Firestore is not available. Phishing attempt not tracked.');
    return;
  }
  
  try {
    // Add more detailed tracking information
    const detailedData = {
      userId,
      phishingType,
      capturedData,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0], // Store date for easy querying
      // Add browser information
      userAgent: capturedData.userAgent || navigator.userAgent,
      language: capturedData.language || navigator.language,
      // Add timing information
      interactionTime: new Date().getTime(),
      // Add device information
      screenWidth: typeof window !== 'undefined' ? window.screen.width : null,
      screenHeight: typeof window !== 'undefined' ? window.screen.height : null,
      viewportWidth: typeof window !== 'undefined' ? window.innerWidth : null,
      viewportHeight: typeof window !== 'undefined' ? window.innerHeight : null,
      // Add phishing-specific information
      phishingDetails: {
        // Time spent on page before submitting
        timeOnPage: capturedData.timeOnPage || null,
        // Which fields were filled out
        fieldsEntered: Object.keys(capturedData).filter(key => key !== 'userAgent' && key !== 'language' && key !== 'timeOnPage'),
        // Whether they clicked on links (if we can track this)
        clickedLinks: capturedData.clickedLinks || [],
        // Whether they hovered over security indicators
        checkedSecurity: capturedData.checkedSecurity || false
      }
    };
    
    await addDoc(collection(db, 'phishingAttempts'), detailedData);
  } catch (error) {
    console.error('Error tracking phishing attempt:', error);
    // Don't throw - allow the app to continue even if tracking fails
  }
};

// Get all phishing attempts for reporting
export const getAllPhishingAttempts = async () => {
  if (!db) {
    console.warn('Firestore is not available. Cannot fetch phishing attempts.');
    return [];
  }
  
  try {
    const snapshot = await getDocs(collection(db, 'phishingAttempts'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching phishing attempts:', error);
    return [];
  }
};

// Get phishing attempts by user
export const getUserPhishingAttempts = async (userId) => {
  if (!db) {
    console.warn('Firestore is not available. Cannot fetch user phishing attempts.');
    return [];
  }
  
  try {
    const q = query(collection(db, 'phishingAttempts'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching user phishing attempts:', error);
    return [];
  }
};

// Get statistics for admin dashboard
export const getPhishingStatistics = async () => {
  if (!db) {
    console.warn('Firestore is not available. Cannot get statistics.');
    return {
      totalAttempts: 0,
      uniqueUsers: 0,
      byType: {},
      byDate: {},
      avgTimeOnPage: 0,
      successRateByType: {}
    };
  }
  
  try {
    const attempts = await getAllPhishingAttempts();
    
    const stats = {
      total: attempts.length,
      byType: {},
      byDate: {},
      uniqueUsers: new Set(),
      totalTime: 0,
      typeSuccess: {} // Track how many attempts per type
    };
    
    attempts.forEach(attempt => {
      // Count by type
      stats.byType[attempt.phishingType] = (stats.byType[attempt.phishingType] || 0) + 1;
      
      // Count by date
      const date = attempt.date || attempt.timestamp.split('T')[0];
      stats.byDate[date] = (stats.byDate[date] || 0) + 1;
      
      // Count unique users
      stats.uniqueUsers.add(attempt.userId);
      
      // Track time on page if available
      if (attempt.capturedData && attempt.capturedData.timeOnPage) {
        stats.totalTime += attempt.capturedData.timeOnPage;
      }
      
      // Track success by type (all attempts are considered "successful" in simulation)
      stats.typeSuccess[attempt.phishingType] = (stats.typeSuccess[attempt.phishingType] || 0) + 1;
    });
    
    // Calculate success rate by type
    const successRateByType = {};
    Object.keys(stats.byType).forEach(type => {
      successRateByType[type] = stats.typeSuccess[type] ? 
        Math.round((stats.typeSuccess[type] / stats.byType[type]) * 100) : 0;
    });
    
    return {
      totalAttempts: stats.total,
      uniqueUsers: stats.uniqueUsers.size,
      byType: stats.byType,
      byDate: stats.byDate,
      avgTimeOnPage: stats.total > 0 ? Math.round(stats.totalTime / stats.total) : 0,
      successRateByType
    };
  } catch (error) {
    console.error('Error getting statistics:', error);
    return {
      totalAttempts: 0,
      uniqueUsers: 0,
      byType: {},
      byDate: {},
      avgTimeOnPage: 0,
      successRateByType: {}
    };
  }
};

