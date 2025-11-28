// Seed script to populate Firestore with realistic data
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, setDoc, doc } = require('firebase/firestore');

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

// Realistic data generators
const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'David', 'Barbara', 'William', 'Elizabeth', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
  'Matthew', 'Margaret', 'Anthony', 'Betty', 'Mark', 'Sandra', 'Donald', 'Ashley',
  'Steven', 'Emily', 'Paul', 'Kimberly', 'Andrew', 'Donna', 'Joshua', 'Michelle'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
  'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
  'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young'
];

const domains = [
  'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'company.com',
  'university.edu', 'organization.org', 'business.net', 'email.com', 'mail.com'
];

const departments = [
  'IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations', 'Support', 'Engineering'
];

// Generate random date within the last 90 days
function randomDate(daysAgo = 90) {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString();
}

// Generate random date string (YYYY-MM-DD)
function randomDateString(daysAgo = 90) {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString().split('T')[0];
}

// Generate realistic user
function generateUser() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
  
  const roles = ['user', 'user', 'user', 'student', 'student', 'admin']; // Weighted distribution
  const role = roles[Math.floor(Math.random() * roles.length)];
  
  const createdAt = randomDate(180); // Account created in last 180 days
  
  return {
    email,
    name: `${firstName} ${lastName}`,
    role,
    department: departments[Math.floor(Math.random() * departments.length)],
    createdAt,
    lastLoginAt: randomDate(7), // Last login within 7 days
    updatedAt: createdAt
  };
}

// Generate realistic phishing attempt
function generatePhishingAttempt(userId) {
  const phishingTypes = ['email', 'face', 'sms', 'social', 'qr'];
  const type = phishingTypes[Math.floor(Math.random() * phishingTypes.length)];
  
  const timestamp = randomDate(60);
  const date = timestamp.split('T')[0];
  
  // Generate realistic captured data based on type
  let capturedData = {};
  
  switch(type) {
    case 'email':
      capturedData = {
        email: `user${Math.floor(Math.random() * 1000)}@company.com`,
        password: '********',
        subject: 'Urgent: Verify your account',
        clicked: true
      };
      break;
    case 'face':
      capturedData = {
        email: `user${Math.floor(Math.random() * 1000)}@company.com`,
        password: '********',
        faceIdAttempted: true
      };
      break;
    case 'sms':
      capturedData = {
        phoneNumber: `+1-555-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
        verificationCode: Math.floor(Math.random() * 900000 + 100000).toString(),
        clicked: true
      };
      break;
    case 'social':
      capturedData = {
        username: `user${Math.floor(Math.random() * 1000)}`,
        password: '********',
        platform: ['Facebook', 'Instagram', 'Twitter'][Math.floor(Math.random() * 3)]
      };
      break;
    case 'qr':
      capturedData = {
        scanned: true,
        redirectUrl: 'https://fake-site.com',
        dataEntered: Math.random() > 0.3
      };
      break;
  }
  
  return {
    userId,
    phishingType: type,
    capturedData,
    timestamp,
    date,
    ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  };
}

// Main seeding function
async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');
  
  try {
    const userCount = 50; // Number of users to create
    const minAttemptsPerUser = 1;
    const maxAttemptsPerUser = 8;
    
    const userIds = [];
    
    // Create users
    console.log(`📝 Creating ${userCount} users...`);
    for (let i = 0; i < userCount; i++) {
      const user = generateUser();
      const userId = `user_${Date.now()}_${i}`;
      
      await setDoc(doc(db, 'users', userId), user);
      userIds.push(userId);
      
      if ((i + 1) % 10 === 0) {
        console.log(`   ✓ Created ${i + 1}/${userCount} users`);
      }
    }
    console.log(`✅ Successfully created ${userCount} users\n`);
    
    // Create phishing attempts
    console.log('🎣 Creating phishing attempts...');
    let totalAttempts = 0;
    
    for (const userId of userIds) {
      const numAttempts = Math.floor(
        Math.random() * (maxAttemptsPerUser - minAttemptsPerUser + 1) + minAttemptsPerUser
      );
      
      for (let i = 0; i < numAttempts; i++) {
        const attempt = generatePhishingAttempt(userId);
        await addDoc(collection(db, 'phishingAttempts'), attempt);
        totalAttempts++;
      }
    }
    console.log(`✅ Successfully created ${totalAttempts} phishing attempts\n`);
    
    // Summary
    console.log('📊 Seeding Summary:');
    console.log(`   Users created: ${userCount}`);
    console.log(`   Phishing attempts created: ${totalAttempts}`);
    console.log(`   Average attempts per user: ${(totalAttempts / userCount).toFixed(2)}`);
    console.log('\n✨ Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run the seeding
seedDatabase()
  .then(() => {
    console.log('\n🎉 All done! You can now view the data in your app.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Seeding failed:', error);
    process.exit(1);
  });
