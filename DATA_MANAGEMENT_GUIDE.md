# Data Management Guide

## Overview

A comprehensive data management interface has been created at `/app/data/page.js` that allows admins to create, read, update, and manage data directly from the frontend.

## Access

1. **Login** as an admin user at `http://localhost:3000/login`
2. Click **"Data Management"** button on the Admin Dashboard
3. Or navigate directly to `http://localhost:3000/data`

## Features

### 1. Users Tab

#### Create New User
- Enter email, name, and select role (user, student, admin)
- Click "Create User" 
- User is saved to Firestore with auto-generated ID
- Success message displays the new user ID

#### View All Users
- Click "Refresh" to load all users from Firestore
- Table shows:
  - User ID (first 8 characters)
  - Email
  - Name
  - Role (with colored badge)
  - Creation date
  - Edit action

#### Edit User
- Click "Edit" on any user row
- Modify name and role
- Click "Save" to update in Firestore
- Click "Cancel" to discard changes

### 2. Phishing Attempts Tab

#### Log Phishing Attempt
- Enter User ID (from Users tab)
- Select Phishing Type:
  - Email
  - Face Login
  - SMS
  - Social Media
  - QR Code
- Enter email and password (simulated, for testing)
- Click "Log Attempt"
- Record is saved to Firestore

#### View All Attempts
- Click "Refresh" to load all phishing attempts
- Table shows:
  - User ID (abbreviated)
  - Phishing Type (with colored badge)
  - Captured email
  - Timestamp

### 3. Statistics Tab

#### View Statistics
- Click "Refresh" to calculate fresh statistics
- Displays:

**Summary Cards:**
- Total Attempts (blue)
- Unique Users (green)
- Breakdown by Type (purple)
  - Email count
  - Face count
  - SMS count
  - Social count
  - QR count

**Chart:**
- Attempts by Date (bar chart)
- Shows attempt count for each date
- Visual representation with bars

## Data Flow

### User Creation
```
Form Input 
  → Validate fields 
  → Generate User ID (user_TIMESTAMP)
  → Save to Firestore (/users/{userId})
  → Show success message
  → Reload users list
```

### Phishing Logging
```
Form Input 
  → Validate User ID and Email
  → Call trackPhishingAttempt()
  → Save to Firestore (/phishingAttempts/{id})
  → Show success message
  → Reload attempts list
```

### User Update
```
Click Edit 
  → Modify fields
  → Click Save
  → Update Firestore (/users/{userId})
  → Show success message
  → Close edit form
  → Reload users list
```

## Behind the Scenes

### Functions Used

**User Operations:**
- `getAllUsers()` - Load all users from Firestore
- `saveUser(userId, userData)` - Create new user
- `updateUser(userId, updates)` - Update existing user

**Phishing Operations:**
- `trackPhishingAttempt(userId, type, data)` - Log attempt
- `getAllPhishingAttempts()` - Load all attempts
- `getPhishingStatistics()` - Calculate statistics

### Firestore Collections

**Users Collection:**
```
/users/{userId}
  ├── email: string
  ├── name: string
  ├── role: string ('user', 'student', 'admin')
  ├── createdAt: ISO 8601 timestamp
  └── updatedAt: ISO 8601 timestamp
```

**Phishing Attempts Collection:**
```
/phishingAttempts/{attemptId}
  ├── userId: string
  ├── phishingType: string
  ├── capturedData: { email, password }
  ├── timestamp: ISO 8601 timestamp
  └── date: YYYY-MM-DD
```

## Testing

### Quick Test Steps

1. **Create a test user:**
   - Go to Users tab
   - Email: `test@example.com`
   - Name: `Test User`
   - Role: `user`
   - Click Create

2. **Log a phishing attempt:**
   - Copy the displayed User ID
   - Go to Phishing Attempts tab
   - Paste User ID
   - Select phishing type
   - Enter test@example.com as email
   - Click Log Attempt

3. **View statistics:**
   - Go to Statistics tab
   - Click Refresh
   - See updated counts and charts

## Notes

- All operations are in real-time with Firestore
- User IDs for manually created users follow format: `user_TIMESTAMP`
- Auth users get their Firebase UID as ID
- Admin-only access (protected route)
- Messages display operation status (success/error)
- Firestore security rules are enforced

## Troubleshooting

### Data not showing
- Click "Refresh" button on the respective section
- Check browser console for errors
- Verify Firestore is configured in `.env.local`

### Create operations fail
- Check all required fields are filled
- Verify Firebase connection
- Check browser console for detailed error

### Edit not working
- Make sure you're editing the correct user
- Click Save before leaving the form
- Check for validation errors in message area
