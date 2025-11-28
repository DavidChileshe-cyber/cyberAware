// Script to import users and phishing attempts from CSV files
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, setDoc, doc } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTJBiH5LxFpfwNMNSJ1TKGVNyVSCNH7FI",
  authDomain: "test-5cf56.firebaseapp.com",
  projectId: "test-5cf56",
  storageBucket: "test-5cf56.firebasestorage.app",
  messagingSenderId: "812873039219",
  appId: "1:812873039219:web:0db976537a40121349d906"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Parse CSV file
function parseCSV(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });
    data.push(row);
  }
  
  return data;
}

// Import users from CSV
async function importUsers(csvPath) {
  console.log(`📥 Importing users from ${csvPath}...`);
  
  try {
    const users = parseCSV(csvPath);
    let count = 0;
    
    for (const user of users) {
      const userId = user.id || `user_${Date.now()}_${count}`;
      const userData = {
        email: user.email,
        name: user.name,
        role: user.role || 'user',
        department: user.department || 'General',
        createdAt: user.createdAt || new Date().toISOString(),
        lastLoginAt: user.lastLoginAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await setDoc(doc(db, 'users', userId), userData);
      count++;
      
      if (count % 10 === 0) {
        console.log(`   ✓ Imported ${count}/${users.length} users`);
      }
    }
    
    console.log(`✅ Successfully imported ${count} users\n`);
    return count;
  } catch (error) {
    console.error('❌ Error importing users:', error);
    throw error;
  }
}

// Import phishing attempts from CSV
async function importPhishingAttempts(csvPath) {
  console.log(`📥 Importing phishing attempts from ${csvPath}...`);
  
  try {
    const attempts = parseCSV(csvPath);
    let count = 0;
    
    for (const attempt of attempts) {
      // Parse captured data if it's a JSON string
      let capturedData = {};
      try {
        capturedData = JSON.parse(attempt.capturedData || '{}');
      } catch {
        capturedData = { raw: attempt.capturedData };
      }
      
      const attemptData = {
        userId: attempt.userId,
        phishingType: attempt.phishingType || 'email',
        capturedData,
        timestamp: attempt.timestamp || new Date().toISOString(),
        date: attempt.date || new Date().toISOString().split('T')[0],
        ipAddress: attempt.ipAddress || '0.0.0.0',
        userAgent: attempt.userAgent || 'Unknown'
      };
      
      await addDoc(collection(db, 'phishingAttempts'), attemptData);
      count++;
      
      if (count % 10 === 0) {
        console.log(`   ✓ Imported ${count}/${attempts.length} attempts`);
      }
    }
    
    console.log(`✅ Successfully imported ${count} phishing attempts\n`);
    return count;
  } catch (error) {
    console.error('❌ Error importing phishing attempts:', error);
    throw error;
  }
}

// Main import function
async function importData() {
  console.log('📦 Starting CSV import...\n');
  
  const dataDir = path.join(__dirname, '..', 'data');
  const usersCSV = path.join(dataDir, 'users.csv');
  const attemptsCSV = path.join(dataDir, 'phishing_attempts.csv');
  
  try {
    let usersImported = 0;
    let attemptsImported = 0;
    
    // Import users if file exists
    if (fs.existsSync(usersCSV)) {
      usersImported = await importUsers(usersCSV);
    } else {
      console.log(`⚠️  Users file not found: ${usersCSV}`);
      console.log('   Create a CSV file with headers: id,email,name,role,department,createdAt,lastLoginAt\n');
    }
    
    // Import phishing attempts if file exists
    if (fs.existsSync(attemptsCSV)) {
      attemptsImported = await importPhishingAttempts(attemptsCSV);
    } else {
      console.log(`⚠️  Phishing attempts file not found: ${attemptsCSV}`);
      console.log('   Create a CSV file with headers: userId,phishingType,capturedData,timestamp,date,ipAddress,userAgent\n');
    }
    
    console.log('📊 Import Summary:');
    console.log(`   Users imported: ${usersImported}`);
    console.log(`   Phishing attempts imported: ${attemptsImported}`);
    console.log('\n✨ Import completed successfully!');
    
  } catch (error) {
    console.error('❌ Import failed:', error);
    throw error;
  }
}

// Run the import
importData()
  .then(() => {
    console.log('\n🎉 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Import failed:', error);
    process.exit(1);
  });
