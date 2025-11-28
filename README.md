# CyberAware - Cybersecurity Awareness Platform

A comprehensive cybersecurity education platform that helps users learn about phishing attacks through interactive simulations.

## Features

### User Roles
- **Users/Students**: Can participate in phishing simulations and learn about cybersecurity
- **Admin**: Can view reports and statistics on phishing attempts

### Phishing Simulations
1. **Email Phishing**: Learn to identify suspicious emails
2. **Face Login Phishing**: Understand fake face recognition systems
3. **SMS Phishing (Smishing)**: Recognize fraudulent text messages
4. **Social Media Phishing**: Spot fake social media login pages
5. **QR Code Phishing**: Learn about QR code scams

### Key Features
- User authentication with Firebase
- Role-based access control (User, Student, Admin)
- Interactive phishing simulations
- Educational content after each simulation
- Admin dashboard with reporting and statistics
- Real-time tracking of phishing attempts
- Export reports functionality

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password authentication
4. Create Firestore Database:
   - Go to Firestore Database
   - Create database in production mode
   - Set up security rules (see below)
5. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll down to "Your apps" and select Web app
   - Copy the Firebase configuration values

### 3. Firebase Configuration

The Firebase configuration is already set in `lib/firebase.js` with the project `test-5cf56`. 

**Optional:** If you want to use environment variables, create a `.env.local` file:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCTJBiH5LxFpfwNMNSJ1TKGVNyVSCNH7FI
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=test-5cf56.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=test-5cf56
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=test-5cf56.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=812873039219
   NEXT_PUBLIC_FIREBASE_APP_ID=1:812873039219:web:0db976537a40121349d906
   ```

**Note:** The app will work without `.env.local` since the configuration is hardcoded.

### 4. Firestore Security Rules

Set up the following security rules in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read their own data, admins can read all
    match /users/{userId} {
      allow read: if request.auth != null && (request.auth.uid == userId || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Phishing attempts - users can create, admins can read all
    match /phishingAttempts/{attemptId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && (
        resource.data.userId == request.auth.uid || 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
      );
    }
  }
}
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
cyberaware/
├── app/
│   ├── admin/           # Admin dashboard
│   ├── dashboard/       # User dashboard
│   ├── login/           # Login page
│   ├── signup/          # Signup page
│   ├── phishing/        # Phishing simulations
│   │   └── [type]/      # Dynamic routes for each phishing type
│   │       ├── page.js  # Simulation page
│   │       └── result/  # Educational result page
│   ├── layout.js        # Root layout
│   ├── page.js          # Home page
│   └── globals.css      # Global styles
├── components/
│   └── ProtectedRoute.js # Route protection component
├── contexts/
│   └── AuthContext.js   # Authentication context
├── lib/
│   ├── firebase.js      # Firebase configuration
│   └── phishingTracking.js # Phishing tracking utilities
└── .env.local           # Environment variables (not in git)
```

## Usage

### For Users/Students

1. Sign up for an account (select User or Student role)
2. Log in to access the dashboard
3. Click on any phishing simulation to start
4. Complete the simulation (this is safe - it's just for learning)
5. View educational content about the attack and prevention measures
6. Return to dashboard to try other simulations

### For Admins

1. Sign up with Admin role
2. Log in to access the admin dashboard
3. View statistics on phishing attempts:
   - Total attempts
   - Number of users phished
   - Attempts by type
   - Recent attempts
4. Filter attempts by phishing type
5. Export reports as JSON

## Technologies Used

- **Next.js 16**: React framework
- **Firebase Authentication**: User authentication
- **Firestore**: Database for storing user data and phishing attempts
- **Tailwind CSS**: Styling
- **React Context**: State management

## Security Notes

- This is an educational platform. All phishing simulations are simulated and safe.
- No actual credentials are stored or used maliciously.
- All data is stored in Firebase Firestore.
- Admin users have access to view all phishing attempts for reporting purposes.

## License

This project is for educational purposes.
