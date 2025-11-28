# User Service Usage Guide

This guide explains how to use the user service functions to save and fetch user data from Firestore.

## Available Functions

### 1. `saveUser(userId, userData)`
Save or update user data in Firestore.

```javascript
import { saveUser } from '@/lib/userService';

// Save user data
await saveUser(userId, {
  email: 'user@example.com',
  name: 'John Doe',
  role: 'user',
  createdAt: new Date().toISOString()
});
```

### 2. `getUser(userId)`
Get user details by user ID.

```javascript
import { getUser } from '@/lib/userService';

// Fetch user data
const userData = await getUser(userId);
console.log(userData); // { id: '...', email: '...', name: '...', role: '...', ... }
```

### 3. `updateUser(userId, updates)`
Update specific fields of a user document.

```javascript
import { updateUser } from '@/lib/userService';

// Update user profile
await updateUser(userId, {
  name: 'Jane Doe',
  phone: '123-456-7890'
});
```

### 4. `getAllUsers()`
Get all users from the database (admin only).

```javascript
import { getAllUsers } from '@/lib/userService';

// Get all users
const users = await getAllUsers();
console.log(users); // Array of user objects
```

### 5. `getUserByEmail(email)`
Find a user by their email address.

```javascript
import { getUserByEmail } from '@/lib/userService';

// Find user by email
const user = await getUserByEmail('user@example.com');
```

### 6. `getUsersByRole(role)`
Get all users with a specific role.

```javascript
import { getUsersByRole } from '@/lib/userService';

// Get all admin users
const admins = await getUsersByRole('admin');

// Get all students
const students = await getUsersByRole('student');
```

## Using in Components

### Access User Data from AuthContext

```javascript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, userData, updateUserProfile, refreshUserData } = useAuth();

  // user - Firebase auth user object
  // userData - Full user data from Firestore
  // updateUserProfile - Function to update user profile
  // refreshUserData - Function to refresh user data from Firestore

  return (
    <div>
      <p>Email: {user?.email}</p>
      <p>Name: {userData?.name}</p>
      <p>Role: {userData?.role}</p>
    </div>
  );
}
```

### Update User Profile

```javascript
import { useAuth } from '@/contexts/AuthContext';

function ProfileForm() {
  const { updateUserProfile } = useAuth();
  const [name, setName] = useState('');

  const handleUpdate = async () => {
    try {
      await updateUserProfile({ name });
      alert('Profile updated!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
}
```

## User Data Structure

The user document in Firestore has the following structure:

```javascript
{
  id: 'user-id',              // Document ID (Firebase UID)
  email: 'user@example.com',  // User email
  name: 'John Doe',           // User's full name
  role: 'user',               // User role: 'user', 'student', or 'admin'
  createdAt: '2024-01-01T00:00:00.000Z',  // Account creation date
  lastLoginAt: '2024-01-15T12:00:00.000Z', // Last login timestamp
  updatedAt: '2024-01-15T12:00:00.000Z'    // Last update timestamp
}
```

## Examples

### Example 1: Save User with Additional Data

```javascript
import { saveUser } from '@/lib/userService';

await saveUser(userId, {
  email: 'student@example.com',
  name: 'Jane Student',
  role: 'student',
  studentId: 'STU123',
  department: 'Computer Science',
  year: '2024'
});
```

### Example 2: Fetch and Display User

```javascript
import { getUser } from '@/lib/userService';

const userData = await getUser(userId);
if (userData) {
  console.log('User:', userData.name);
  console.log('Role:', userData.role);
  console.log('Member since:', userData.createdAt);
}
```

### Example 3: Update User Role (Admin)

```javascript
import { updateUser } from '@/lib/userService';

// Promote user to admin
await updateUser(userId, {
  role: 'admin'
});
```

## Error Handling

All functions return promises and can throw errors. Always use try-catch:

```javascript
try {
  const userData = await getUser(userId);
  if (userData) {
    // Use userData
  } else {
    console.log('User not found');
  }
} catch (error) {
  console.error('Error fetching user:', error);
}
```

## Security Notes

- Users can only read/update their own data (unless admin)
- Admins can read all user data
- Firestore security rules enforce these permissions
- Always validate user input before saving to database

