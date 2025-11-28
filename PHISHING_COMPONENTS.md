# Phishing Simulation Components

## Overview

Five reusable React components that render realistic-looking phishing pages for educational purposes. Each component mimics a real platform's login/verification interface.

## Components Created

### 1. EmailPhishing Component
**File:** `components/EmailPhishing.js`  
**Target Platform:** Gmail  
**Purpose:** Email credential phishing

**Features:**
- Gmail branding with blue logo
- Single email input field
- "Next" button (Gmail uses a two-step process)
- "Can't sign in?" and "Create account" links
- Security warning about encryption
- Gradient background

**Form Fields:**
- Email or phone (required)

**Usage:**
```javascript
import EmailPhishing from '@/components/EmailPhishing';

<EmailPhishing 
  formData={formData}
  handleChange={handleChange}
  handleSubmit={handleSubmit}
  loading={loading}
/>
```

### 2. FacebookPhishing Component
**File:** `components/FacebookPhishing.js`  
**Target Platform:** Facebook  
**Purpose:** Social network credential theft

**Features:**
- Facebook branding on left side (desktop only)
- Two-column responsive layout
- Email/phone and password fields
- Blue "Log In" button
- "Forgotten password?" link
- Border and shadow styling

**Form Fields:**
- Email address or phone number (required)
- Password (required)

**Desktop Layout:** Two-column (branding + form)  
**Mobile Layout:** Single-column form with stacked logo

### 3. SMSPhishing Component
**File:** `components/SMSPhishing.js`  
**Target Platform:** Bank/Security Services  
**Purpose:** 2FA bypass / verification code theft

**Features:**
- Lock emoji header (🔐)
- "Verify Your Account" messaging
- Phone number input
- 6-digit code input (centered, monospace)
- Helper text about code delivery
- Yellow warning box ("Didn't receive code?")
- Gray info box (security messaging)
- "Resend" link

**Form Fields:**
- Phone number (required)
- Verification code (required, max 6 chars)

**Special Styling:**
- Centered, monospace code input
- Larger spacing between fields
- Emphasis on security messaging

### 4. SocialPhishing Component
**File:** `components/SocialPhishing.js`  
**Target Platform:** Instagram  
**Purpose:** Social media account takeover

**Features:**
- Instagram-style branding (cursive font)
- Username/email input
- Password input
- Blue "Log in" button
- Divider with "OR"
- "Log in with Facebook" button
- "Forgotten your password?" link
- "Don't have an account? Sign up" card below

**Form Fields:**
- Username (required)
- Password (required)

**Special Styling:**
- Bordered card layout
- Separate signup card below
- Pink-purple gradient background
- Instagram-inspired colors

### 5. QRPhishing Component
**File:** `components/QRPhishing.js`  
**Target Platform:** Generic "Quick Login"  
**Purpose:** QR code redirect / alternative login theft

**Features:**
- 📱 Mobile phone icon header
- "Quick Login" messaging
- Fake QR code display area (dashed border)
- "Scan with your phone" instruction
- OR divider
- Email input field
- Password input field
- Blue "Log In" button
- Blue info box with 💡 tip
- "Need help logging in?" footer link

**Form Fields:**
- Email address (required)
- Password (required)

**Special Elements:**
- Fake QR code display area
- Dual input method messaging

## Common Props

All components accept the same props:

```typescript
{
  formData: {
    [fieldName: string]: string
  },
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (e: FormEvent) => Promise<void>,
  loading: boolean
}
```

## Usage in Page Component

### Example Integration
```javascript
'use client';

import { useState } from 'react';
import EmailPhishing from '@/components/EmailPhishing';
import FacebookPhishing from '@/components/FacebookPhishing';
// ... other imports

export default function PhishingSimulation() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Track attempt to Firestore
    await trackPhishingAttempt(user.uid, type, formData);
    
    setLoading(false);
    // Redirect to results page
  };

  if (type === 'email') {
    return <EmailPhishing {...{ formData, handleChange, handleSubmit, loading }} />;
  }
  
  if (type === 'face') {
    return <FacebookPhishing {...{ formData, handleChange, handleSubmit, loading }} />;
  }
  
  // ... other types
}
```

## Component Features

### All Components Include:
- ✅ Responsive design (mobile-friendly)
- ✅ Tailwind CSS styling
- ✅ Proper form input handling
- ✅ Loading states
- ✅ Focus states and keyboard navigation
- ✅ Realistic branding/styling
- ✅ Helper text and guidance
- ✅ Accessibility considerations

### Styling Consistency:
- Blue buttons for primary actions
- Gray backgrounds for inputs
- Proper spacing and padding
- Rounded corners and shadows
- Focus ring indicators

## Platform-Specific Design Details

| Component | Platform | Key Visual | Button Color | Background |
|-----------|----------|-----------|--------------|-----------|
| Email | Gmail | Google blue | Blue | Light gray gradient |
| Facebook | Facebook | Blue fb logo | Blue | White |
| SMS | Bank | Lock emoji | Blue | Light blue gradient |
| Social | Instagram | Cursive text | Blue | Pink-purple gradient |
| QR | Generic | Mobile phone | Blue | Light gray gradient |

## Educational Value

Each component teaches users to recognize:

**Gmail (Email Phishing):**
- Email harvesting attacks
- Two-step verification hijacking
- Fake Google branding

**Facebook:**
- Credential theft from social networks
- Account takeover attacks
- URL verification importance

**SMS:**
- 2FA bypass attacks
- Verification code theft
- Social engineering urgency tactics

**Instagram:**
- Social media impersonation
- Account takeover
- Alternative login methods

**QR Code:**
- QR redirect attacks
- Unknown URL clicking
- Dual-method login exploitation

## Integration with Main Page

The main `app/phishing/[type]/page.js` uses conditional rendering to display the appropriate component based on the `type` parameter.

```javascript
// In app/phishing/[type]/page.js

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // All components use same submit logic
  await trackPhishingAttempt(user.uid, type, formData);
  
  setSubmitted(true);
  setTimeout(() => {
    router.push(`/phishing/${type}/result`);
  }, 1500);
};

return (
  <>
    {type === 'email' && <EmailPhishing {...props} />}
    {type === 'face' && <FacebookPhishing {...props} />}
    {type === 'sms' && <SMSPhishing {...props} />}
    {type === 'social' && <SocialPhishing {...props} />}
    {type === 'qr' && <QRPhishing {...props} />}
  </>
);
```

## Data Captured

Each component captures form data which gets stored in Firestore:

```javascript
{
  userId: "firebase_uid",
  phishingType: "email" | "face" | "sms" | "social" | "qr",
  capturedData: {
    // Email: { email }
    // Facebook: { email, password }
    // SMS: { phone, code }
    // Social: { username, password }
    // QR: { email, password }
  },
  timestamp: "ISO 8601",
  date: "YYYY-MM-DD"
}
```

## Customization

### Modify Colors
```javascript
// Change button color (all components)
className="bg-blue-600 hover:bg-blue-700"

// To purple:
className="bg-purple-600 hover:bg-purple-700"
```

### Modify Text
```javascript
// Placeholder text
placeholder="Custom placeholder"

// Button text
{loading ? 'Custom loading...' : 'Custom text'}
```

### Add Fields
```javascript
// Add new input to any component
<input
  name="newField"
  type="text"
  value={formData.newField || ''}
  onChange={handleChange}
  placeholder="New field"
/>
```

## Accessibility

All components include:
- ✅ Proper label associations (via `htmlFor`)
- ✅ Required field attributes
- ✅ Placeholder text for hints
- ✅ Disabled states for buttons
- ✅ Focus indicators (ring)
- ✅ Semantic HTML

## Security Considerations

✅ **Safe:**
- No data sent to actual platforms
- Firestore-only storage
- Educational purpose only
- No real authentication occurs

⚠️ **Important:**
- These are simplified versions of real pages
- Real phishing pages often include more sophistication
- Always verify URLs and security indicators
- Never enter real credentials on unfamiliar pages

## Files Summary

```
components/
├── EmailPhishing.js       # Gmail-style email phishing
├── FacebookPhishing.js    # Facebook login phishing
├── SMSPhishing.js         # SMS/2FA verification phishing
├── SocialPhishing.js      # Instagram login phishing
└── QRPhishing.js          # QR code login phishing
```

Total: 5 reusable components  
Lines of code: ~500 total  
Styling: Tailwind CSS  
Props pattern: Unified across all components
