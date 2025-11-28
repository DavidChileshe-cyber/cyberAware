# Fake Facebook Login Phishing Simulation

## Overview

The "Face Recognition Login" simulation has been updated to be a **realistic fake Facebook login page** that closely mimics the real facebook.com login interface.

## What Users See

### Desktop Layout
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  facebook                                                   │
│  Facebook helps you connect and share with the             │
│  people in your life.                                      │
│                                              ┌──────────┐  │
│                                              │ facebook │  │
│                                              │          │  │
│                                              │ ┌──────┐ │  │
│                                              │ │email │ │  │
│                                              │ └──────┘ │  │
│                                              │ ┌──────┐ │  │
│                                              │ │pass  │ │  │
│                                              │ └──────┘ │  │
│                                              │ ┌──────┐ │  │
│                                              │ │Login │ │  │
│                                              │ └──────┘ │  │
│                                              │ Forgot?  │  │
│                                              └──────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Mobile Layout
```
┌──────────────────────┐
│                      │
│   facebook           │
│                      │
│   ┌──────────────┐   │
│   │ Email/Phone  │   │
│   └──────────────┘   │
│   ┌──────────────┐   │
│   │ Password     │   │
│   └──────────────┘   │
│   ┌──────────────┐   │
│   │  Log In      │   │
│   └──────────────┘   │
│   Forgot password?   │
│                      │
└──────────────────────┘
```

## Features

### Realistic Elements
- ✓ Clean white background (just like Facebook)
- ✓ Large blue "facebook" logo
- ✓ Tagline: "Facebook helps you connect and share with the people in your life"
- ✓ Two input fields: Email/Phone and Password
- ✓ Blue "Log In" button
- ✓ "Forgotten password?" link
- ✓ Responsive design (two-column on desktop, single column on mobile)
- ✓ Proper shadows and borders

### Form Fields

| Field | Type | Placeholder |
|-------|------|-------------|
| Email/Phone | text | "Email address or phone number" |
| Password | password | "Password" |

### Educational Value

When users submit, they see warnings about:

**Red Flags:**
- Wrong URLs (faceb00k.com vs facebook.com)
- Poor spelling or grammar
- Arriving through suspicious links
- Missing security certificates
- Extra information requests
- Different layout/styling
- Urgent security messages

**Prevention Measures:**
1. Always type facebook.com directly in browser
2. Check the URL carefully
3. Look for HTTPS and padlock
4. Never click Facebook links in emails
5. Use 2FA on your real account
6. Use the official mobile app
7. Be suspicious of login pages from emails/texts
8. Verify authentic Facebook branding

## Technical Details

### Form Data Captured
```javascript
{
  email: "user@example.com",     // Email or phone number entered
  password: "test123"             // Password entered (for testing)
}
```

### Stored in Firestore
```javascript
{
  userId: "firebase_uid",
  phishingType: "face",
  capturedData: {
    email: "user@example.com",
    password: "test123"
  },
  timestamp: "2025-11-10T16:18:41.000Z",
  date: "2025-11-10"
}
```

## Visual Styling

### Colors
- **Background:** White (`bg-white`)
- **Logo:** Blue (`text-blue-600`)
- **Button:** Blue (`bg-blue-600`)
- **Input fields:** Light gray background (`bg-gray-50`)
- **Borders:** Gray (`border-gray-300`)
- **Focus state:** Blue ring (`focus:ring-blue-500`)

### Responsive Breakpoints
- **Mobile:** Single column, full width
- **Tablet+:** Two columns with left branding, right form

### Shadows & Effects
- Card shadow on form
- Subtle border on card
- Hover effects on button
- Focus states on inputs

## User Flow

1. **User arrives at simulation**
   - Sees realistic Facebook login page
   - Two columns on desktop, stacked on mobile

2. **User enters credentials**
   - Types email/phone
   - Types password
   - Page looks exactly like real Facebook

3. **User clicks "Log In"**
   - Form submits
   - Shows "Processing..." screen
   - After 1.5 seconds redirects

4. **Educational page**
   - Warning about the phishing attack
   - Specific red flags shown
   - Prevention measures listed
   - Link to return to dashboard

## Comparison to Real Facebook

| Feature | Fake Page | Real Facebook |
|---------|-----------|---------------|
| URL | /phishing/face | facebook.com |
| Purpose | Educational simulation | Real login |
| Security | Safe, educational | Real security |
| Data handling | Logged to Firestore | Encrypted |
| Follow-up | Educational content | Dashboard |

## Why This Matters

Users learn to:
- Spot phishing pages that look legitimate
- Check URLs before entering credentials
- Recognize common phishing techniques
- Understand the danger of credential theft
- Use 2FA for protection
- Be cautious of unsolicited links

## Testing

**To Test:**
1. Sign in to CyberAware
2. Click "Face Login Phishing" on dashboard
3. Enter any email and password
4. Click "Log In"
5. View the educational warning
6. Check Firestore to see attempt logged

**Expected Result:**
- Page loads with Facebook branding
- Form accepts input
- Data is saved to Firestore
- Educational content displays after submit

## Key Differences from Other Simulations

| Feature | Face/FB | Email | SMS | Social | QR |
|---------|---------|-------|-----|--------|-----|
| Platform | Facebook | Generic | SMS | Social | QR |
| Design | Two-column | Form | Form | Form | QR+Form |
| Key threat | Credential theft | Email spoofing | Code theft | Account takeover | URL redirect |
| Input fields | 2 | 2 | 2 | 2 | 2 |
| Special elements | None | None | None | None | QR code |

## Security Considerations

✅ **Safe:**
- No credentials sent to real Facebook
- No actual login occurs
- Data stored only in Firestore
- Educational purpose only

⚠️ **Important:**
- This is a simulation for education
- Real phishing pages may look even MORE legitimate
- Always verify URLs in real situations
- Never enter real credentials on unfamiliar pages

## Files Modified

1. **`app/phishing/[type]/page.js`**
   - Updated 'face' template to show Facebook login
   - Changed from face recognition to email/password
   - Updated layout and styling
   - Responsive design

2. **`app/phishing/[type]/result/page.js`**
   - Updated educational content
   - Changed warning message
   - Updated red flags for Facebook phishing
   - Updated prevention measures

## Next Steps

Users can:
- Return to dashboard
- Try other phishing simulations
- View their progress in admin dashboard
- Check data management to see logged attempts

## Resources

- Official Facebook Security: https://www.facebook.com/security
- How to Identify Phishing: https://www.cisa.gov/phishing
- Facebook Account Recovery: https://www.facebook.com/login/identify
