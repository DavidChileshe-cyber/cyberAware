# CyberAware Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `test-5cf56` (or your preferred name)
4. Follow the setup wizard

**Note:** The current Firebase project is `test-5cf56`. The configuration is already set in `lib/firebase.js`.

#### Enable Authentication
1. In Firebase Console, go to **Authentication**
2. Click **Get started**
3. Go to **Sign-in method** tab
4. Enable **Email/Password** provider
5. Click **Save**

#### Create Firestore Database
1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Select **Start in production mode**
4. Choose a location for your database
5. Click **Enable**

#### Set Firestore Security Rules
1. Go to **Firestore Database** > **Rules**
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null && (request.auth.uid == userId || isAdmin());
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
    }
    
    // Phishing attempts collection
    match /phishingAttempts/{attemptId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && (
        resource.data.userId == request.auth.uid || isAdmin()
      );
    }
  }
}
```

3. Click **Publish**

#### Get Firebase Configuration
1. Go to **Project Settings** (gear icon)
2. Scroll down to **Your apps**
3. Click the **Web** icon (`</>`)
4. Register app with nickname: `cyberaware-web`
5. Copy the configuration values

**Note:** The Firebase configuration is already set in `lib/firebase.js` with the following values:
- Project ID: `test-5cf56`
- Auth Domain: `test-5cf56.firebaseapp.com`

### 3. Create Environment File (Optional)

If you want to use environment variables instead of hardcoded values, create a file named `.env.local` in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCTJBiH5LxFpfwNMNSJ1TKGVNyVSCNH7FI
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=test-5cf56.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=test-5cf56
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=test-5cf56.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=812873039219
NEXT_PUBLIC_FIREBASE_APP_ID=1:812873039219:web:0db976537a40121349d906
```

**Note:** The app will work without `.env.local` since the configuration is hardcoded in `lib/firebase.js`.

### 4. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Create Your First Admin Account

1. Go to the signup page
2. Fill in your details
3. Select **Admin** as the account type
4. Complete the signup process
5. You'll be redirected to the admin dashboard

## Testing the Application

### Test User Flow
1. Create a test user account (User or Student role)
2. Log in and navigate to the dashboard
3. Click on any phishing simulation
4. Fill in the form (this is safe - it's just for learning)
5. View the educational content
6. Return to dashboard

### Test Admin Flow
1. Log in as an admin
2. View the admin dashboard
3. See statistics on phishing attempts
4. Filter attempts by type
5. Export reports

## Troubleshooting

### Firebase Configuration Errors
- Make sure all environment variables are set correctly
- Verify your Firebase project is active
- Check that Authentication is enabled
- Ensure Firestore database is created

### Authentication Issues
- Verify Email/Password authentication is enabled in Firebase
- Check that Firestore security rules are published
- Make sure you're using the correct Firebase project

### Firestore Errors
- Check that security rules are published
- Verify the database is created in production mode
- Ensure you're using the correct project ID

## Next Steps

- Customize the phishing simulations
- Add more educational content
- Enhance the admin dashboard
- Add more phishing types
- Implement user progress tracking

