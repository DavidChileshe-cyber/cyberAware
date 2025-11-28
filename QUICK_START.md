# CyberAware - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Firebase project set up
- Environment variables configured (`.env.local`)

### Installation & Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
http://localhost:3000
```

## 🔐 Authentication

### Sign Up
1. Go to `http://localhost:3000/signup`
2. Enter email and password
3. Select role: **User**, **Student**, or **Admin**
4. Enter your name
5. Submit

### Sign In
1. Go to `http://localhost:3000/login`
2. Enter email and password
3. Click "Sign In"

### Roles Explained
- **User/Student:** Can take phishing simulations, view results
- **Admin:** Can create/manage data, view all statistics, access data management

## 📚 Features by Role

### For Users/Students
- Dashboard with 5 phishing simulations
- Email Phishing
- Face Recognition Phishing (Fake Facebook)
- SMS Phishing
- Social Media Phishing
- QR Code Phishing
- Educational content after each simulation
- Progress tracking

### For Admins
- Admin Dashboard with statistics
- Data Management page
  - Create/edit/view users
  - Log phishing attempts
  - View statistics and charts
- User management
- Reports export (JSON)

## 🎯 Phishing Simulations

### Available Types

| Type | Description | Learning Focus |
|------|-------------|-----------------|
| **Email** | Email phishing form | Identify suspicious emails |
| **Face** | Fake Facebook face login | Recognize biometric scams |
| **SMS** | SMS/text verification | Detect smishing attacks |
| **Social** | Social media login | Spot fake login pages |
| **QR** | QR code scams | Avoid malicious QR codes |

### How Each Works
1. Click on simulation card
2. See realistic-looking phishing page
3. Enter test data (can be fake)
4. Submit form
5. Get educational content
6. Return to dashboard

## 💾 Data Management

### Access Data Management
1. Sign in as Admin
2. Click "Data Management" button on admin dashboard
3. Or go to `http://localhost:3000/data`

### Users Tab

**Create a User:**
- Email: test@example.com
- Name: Test User
- Role: user (or student/admin)
- Click "Create User"
- ID is generated automatically

**Edit a User:**
- Click "Edit" on any user row
- Modify name or role
- Click "Save"

**View Users:**
- Click "Refresh" to load all users

### Phishing Attempts Tab

**Log an Attempt:**
- Enter User ID (from Users tab)
- Select Phishing Type
- Enter email and optional password
- Click "Log Attempt"

**View Attempts:**
- See all logged phishing attempts
- View user, type, email, timestamp
- Click "Refresh" to reload

### Statistics Tab

**View Statistics:**
- Total attempts count
- Unique users count
- Breakdown by phishing type
- Chart showing attempts by date

## 📊 Firestore Collections

### Users Collection
```
/users/{userId}
├── email: "user@example.com"
├── name: "John Doe"
├── role: "user" | "student" | "admin"
├── createdAt: "2025-01-20T10:30:00Z"
├── lastLoginAt: "2025-01-20T14:25:00Z"
└── updatedAt: "2025-01-20T14:25:00Z"
```

### Phishing Attempts Collection
```
/phishingAttempts/{attemptId}
├── userId: "firebase_uid"
├── phishingType: "email" | "face" | "sms" | "social" | "qr"
├── capturedData: {
│   └── email: "user@example.com"
│   └── password: "test123"
├── timestamp: "2025-01-20T14:25:00Z"
└── date: "2025-01-20"
```

## 🔗 Routes

| Route | Role | Description |
|-------|------|-------------|
| `/` | Public | Home page |
| `/login` | Public | Sign in page |
| `/signup` | Public | Sign up page |
| `/dashboard` | User/Student | User dashboard |
| `/phishing/[type]` | User/Student | Phishing simulation |
| `/phishing/[type]/result` | User/Student | Educational content |
| `/admin` | Admin | Admin dashboard |
| `/admin/users` | Admin | User management |
| `/data` | Admin | Data management |
| `/profile` | Logged in | User profile |

## 🧪 Testing Scenarios

### Scenario 1: New User Learning Path
1. Sign up as a new user
2. Go to dashboard
3. Click any phishing simulation
4. Enter fake credentials
5. View educational content
6. Return and try another simulation

### Scenario 2: Admin Monitoring
1. Sign up as admin
2. Go to admin dashboard
3. Create test users in Data Management
4. Log test phishing attempts
5. View statistics
6. Export report

### Scenario 3: Data Analysis
1. Have multiple users complete simulations
2. Go to Data Management
3. View statistics tab
4. See attempts by date/type
5. Export JSON report

## 🐛 Troubleshooting

### Firebase Connection Issues
- Check `.env.local` has correct credentials
- Verify Firebase project is active
- Check Firestore database is created
- Ensure security rules are published

### Data Not Saving
- Open browser console (F12)
- Check for error messages
- Verify Firebase authentication is enabled
- Check Firestore security rules

### Can't Access Data Management
- Must be logged in as admin
- Check your role in Firestore users collection
- Refresh page if needed

### Phishing Simulation Not Working
- Must be logged in as user/student/admin
- Check Firebase is initialized
- Try refresh if page won't load

## 📖 Documentation Files

- `README.md` - Project overview
- `SETUP.md` - Detailed setup instructions
- `DATA_MANAGEMENT_GUIDE.md` - Data management interface guide
- `FACEBOOK_FACE_LOGIN_UPDATE.md` - Facebook phishing simulation details
- `FACEBOOK_FACE_LOGIN_WALKTHROUGH.md` - Visual walkthrough of face login page
- `FIRESTORE_DATA_STRUCTURE.md` - Database schema documentation
- `USER_SERVICE_USAGE.md` - Backend service usage guide

## 🚀 Next Steps

1. **Test the app locally**
   - npm run dev
   - Try all 5 phishing simulations
   - Check data saves to Firestore

2. **Create test scenarios**
   - Use Data Management to create users
   - Log multiple attempts
   - Verify statistics work

3. **Customize simulations**
   - Edit phishing templates
   - Add more educational content
   - Modify styling/branding

4. **Analyze data**
   - Export reports from Data Management
   - View admin dashboard statistics
   - Track user progress

## 💡 Pro Tips

- Use Data Management to bulk-create test users
- Check Firestore console to verify data
- Export JSON reports for analysis
- Use admin dashboard for quick overview
- Create user scenarios for testing

## 🔒 Security Notes

- All credentials in the app are simulated/fake
- No real data is sent anywhere
- Firestore security rules protect data
- Admin-only features require authentication
- All phishing simulations are educational only

## 📞 Support

For issues:
1. Check the troubleshooting section above
2. Review relevant documentation file
3. Check browser console for errors
4. Verify Firebase configuration
5. Test with fresh browser tab

## ✅ Verification Checklist

- [ ] Node.js installed
- [ ] Firebase project created
- [ ] `.env.local` configured
- [ ] Dependencies installed (`npm install`)
- [ ] App running (`npm run dev`)
- [ ] Can sign up/login
- [ ] Can see phishing simulations
- [ ] Can see data management (as admin)
- [ ] Can view statistics
- [ ] Can export reports
