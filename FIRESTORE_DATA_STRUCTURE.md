# Firestore Data Structure

This document explains how user data is stored in Firestore.

**Current Firebase Project:** `test-5cf56`
**Project ID:** `test-5cf56`
**Auth Domain:** `test-5cf56.firebaseapp.com`

## Collection: `users`

Each user document is stored in the `users` collection with the Firebase Authentication UID as the document ID.

### Document Structure

```
/users/{userId}
```

Where `{userId}` is the Firebase Authentication UID (e.g., `abc123def456...`)

### Document Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Document ID (Firebase UID) | `abc123def456...` |
| `email` | string | User's email address | `user@example.com` |
| `name` | string | User's full name | `John Doe` |
| `role` | string | User role: `user`, `student`, or `admin` | `user` |
| `createdAt` | string (ISO 8601) | Account creation timestamp | `2024-01-15T10:30:00.000Z` |
| `lastLoginAt` | string (ISO 8601) | Last login timestamp | `2024-01-20T14:25:00.000Z` |
| `updatedAt` | string (ISO 8601) | Last update timestamp | `2024-01-20T14:25:00.000Z` |

### Example Document

```json
{
  "email": "john.doe@example.com",
  "name": "John Doe",
  "role": "user",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "lastLoginAt": "2024-01-20T14:25:00.000Z",
  "updatedAt": "2024-01-20T14:25:00.000Z"
}
```

## Collection: `phishingAttempts`

Phishing simulation attempts are stored in the `phishingAttempts` collection.

### Document Structure

```
/phishingAttempts/{attemptId}
```

Where `{attemptId}` is an auto-generated document ID.

### Document Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Document ID (auto-generated) | `xyz789...` |
| `userId` | string | User's Firebase UID | `abc123def456...` |
| `phishingType` | string | Type of phishing: `email`, `face`, `sms`, `social`, `qr` | `email` |
| `capturedData` | object | Data captured during the simulation | `{ email: "...", password: "..." }` |
| `timestamp` | string (ISO 8601) | When the attempt was made | `2024-01-20T14:25:00.000Z` |
| `date` | string | Date in YYYY-MM-DD format | `2024-01-20` |

### Example Document

```json
{
  "userId": "abc123def456...",
  "phishingType": "email",
  "capturedData": {
    "email": "user@example.com",
    "password": "********"
  },
  "timestamp": "2024-01-20T14:25:00.000Z",
  "date": "2024-01-20"
}
```

## Data Storage Flow

### User Sign Up

1. User creates account with email/password
2. Firebase Authentication creates user with UID
3. User data is saved to Firestore:
   - Collection: `users`
   - Document ID: Firebase UID
   - Data: email, name, role, createdAt, lastLoginAt

### User Sign In

1. User signs in with email/password
2. Firebase Authentication authenticates user
3. `lastLoginAt` is updated in Firestore
4. User data is fetched from Firestore

### User Profile Update

1. User updates profile (e.g., name)
2. Data is updated in Firestore
3. `updatedAt` timestamp is automatically set
4. User data is refreshed in the app

## Viewing Data in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database**
4. You'll see:
   - **users** collection with user documents
   - **phishingAttempts** collection with attempt documents

## Viewing Data in the App

### Admin Dashboard

- Go to `/admin/users` to see all users
- Click on a User ID to see full user details
- View user's Firestore document ID and all fields

### User Profile

- Go to `/profile` to see your own user data
- View all stored fields including timestamps

## Security Rules

Users can:
- Read their own user document
- Update their own user document
- Create their own user document (on signup)

Admins can:
- Read all user documents
- Read all phishing attempts

See `SETUP.md` for complete security rules.

## Data Validation

When saving user data, the following fields are automatically set:
- `createdAt`: Set only on first creation (preserved on updates)
- `updatedAt`: Set on every save/update
- `lastLoginAt`: Updated on every sign in

## Notes

- Document IDs in the `users` collection match Firebase Authentication UIDs
- All timestamps are stored in ISO 8601 format
- The `id` field in returned objects is the Firestore document ID
- Data is automatically synced between Firebase Auth and Firestore

