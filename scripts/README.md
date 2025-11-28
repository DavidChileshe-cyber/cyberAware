# Data Import Scripts

This directory contains scripts to populate your CyberAware database with realistic data.

## Available Scripts

### 1. `seedData.js` - Generate Realistic Random Data

Automatically generates and imports realistic users and phishing attempts.

**What it does:**
- Creates 50 realistic users with varied roles (user, student, admin)
- Generates 1-8 phishing attempts per user
- Creates realistic email addresses, names, and departments
- Generates attempts with proper timestamps over the last 90 days
- Includes all phishing types: email, face, sms, social, qr

**Usage:**
```bash
node scripts/seedData.js
```

**Output:**
- 50 users in Firestore `/users` collection
- ~200-300 phishing attempts in `/phishingAttempts` collection
- Console summary with statistics

---

### 2. `importCSV.js` - Import from CSV Files

Import users and phishing attempts from CSV files.

**What it does:**
- Reads CSV files from `/data` directory
- Imports users from `users.csv`
- Imports phishing attempts from `phishing_attempts.csv`
- Validates and formats data for Firestore

**Usage:**
```bash
node scripts/importCSV.js
```

**CSV File Locations:**
- Users: `data/users.csv`
- Attempts: `data/phishing_attempts.csv`

**CSV Format for users.csv:**
```csv
id,email,name,role,department,createdAt,lastLoginAt
user_001,john@example.com,John Doe,user,IT,2024-09-15T10:30:00.000Z,2024-11-10T14:25:00.000Z
```

**CSV Format for phishing_attempts.csv:**
```csv
userId,phishingType,capturedData,timestamp,date,ipAddress,userAgent
user_001,email,"{""email"":""john@example.com"",""password"":""********""}",2024-10-15T09:30:00.000Z,2024-10-15,192.168.1.101,Mozilla/5.0
```

---

## Setup

### Install Dependencies

First, make sure you have the required packages installed:

```bash
npm install firebase
```

### Firebase Configuration

The scripts use your existing Firebase configuration from the project. No additional setup needed.

---

## Quick Start Guide

### Option A: Generate Random Realistic Data (Recommended)

This is the easiest way to get started:

```bash
# Run the seed script
node scripts/seedData.js
```

This will create 50 users and ~200-300 phishing attempts automatically.

### Option B: Import Your Own Data

1. **Prepare your CSV files:**
   - Edit `data/users.csv` with your user data
   - Edit `data/phishing_attempts.csv` with phishing attempt data
   - Or create new CSV files following the format

2. **Run the import:**
   ```bash
   node scripts/importCSV.js
   ```

### Option C: Combine Both

You can run both scripts to have a mix of generated and custom data:

```bash
node scripts/seedData.js
node scripts/importCSV.js
```

---

## Data Generated

### Users

Each generated user includes:
- **Email:** Realistic email (firstname.lastname@domain.com)
- **Name:** Random first and last name
- **Role:** user, student, or admin (weighted distribution)
- **Department:** IT, HR, Finance, Marketing, etc.
- **Timestamps:** createdAt, lastLoginAt, updatedAt

### Phishing Attempts

Each attempt includes:
- **Type:** email, face, sms, social, or qr
- **Captured Data:** Type-specific realistic data
  - Email: email, password, subject
  - Face: email, password, faceIdAttempted
  - SMS: phoneNumber, verificationCode
  - Social: username, password, platform
  - QR: scanned, redirectUrl, dataEntered
- **Metadata:** timestamp, date, ipAddress, userAgent

---

## Verification

After running the scripts, verify the data:

1. **In Firebase Console:**
   - Go to https://console.firebase.google.com/
   - Select project `test-5cf56`
   - Navigate to Firestore Database
   - Check `users` and `phishingAttempts` collections

2. **In Your App:**
   - Run `npm run dev`
   - Login as admin
   - Go to Admin Dashboard
   - View users and statistics

3. **In Data Management Page:**
   - Navigate to `http://localhost:3000/data`
   - Check all tabs: Users, Phishing Attempts, Statistics

---

## Customization

### Adjust User Count

Edit `seedData.js` line 142:
```javascript
const userCount = 50; // Change this number
```

### Adjust Attempts Per User

Edit `seedData.js` lines 143-144:
```javascript
const minAttemptsPerUser = 1; // Minimum attempts
const maxAttemptsPerUser = 8; // Maximum attempts
```

### Add More Names/Domains

Edit the arrays at the top of `seedData.js`:
```javascript
const firstNames = [...]; // Add more names
const lastNames = [...];  // Add more names
const domains = [...];    // Add more email domains
```

---

## Troubleshooting

### Error: Module not found

Install Firebase:
```bash
npm install firebase
```

### Error: Permission denied

Check your Firestore security rules allow admin users to write data.

### CSV Import Issues

- Make sure CSV files exist in `data/` directory
- Check CSV format matches the examples
- Ensure no extra commas or malformed JSON in capturedData

### Firebase Connection Issues

- Verify Firebase config in the script matches your project
- Check internet connection
- Verify Firebase project is active

---

## Sample Data Included

Sample CSV files are provided in the `/data` directory:
- `users.csv` - 10 sample users
- `phishing_attempts.csv` - 13 sample phishing attempts

You can use these as templates or import them directly.

---

## Notes

- Scripts use Firebase Admin-like operations (not Auth)
- User IDs for seeded data: `user_TIMESTAMP_INDEX`
- All timestamps are in ISO 8601 format
- Passwords in captured data are always masked as `********`
- Data generation is weighted towards realistic patterns
- Multiple attempts per user simulate real training scenarios

---

## Next Steps

After importing data:

1. **Test the Admin Dashboard** - View statistics and reports
2. **Test Filtering** - Filter by phishing type and date ranges
3. **Export Reports** - Try the export functionality
4. **Add More Data** - Run scripts again to add more data
5. **Create Real Users** - Have real users sign up and complete simulations
