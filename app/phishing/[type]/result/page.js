'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const educationalContent = {
  email: {
    title: 'Email Phishing Detected!',
    capturedInfo: 'Email address, Password',
    description: 'This was a simulated phishing attack. In a real scenario, your credentials would have been stolen.',
    measures: [
      'Always verify the sender\'s email address before entering credentials',
      'Look for HTTPS and a valid SSL certificate in the URL',
      'Check for spelling and grammar errors in emails',
      'Never click on links in suspicious emails - type the URL directly',
      'Enable two-factor authentication (2FA) on your accounts',
      'Use a password manager to generate strong, unique passwords',
      'Be cautious of emails with urgent requests or threats',
      'Look for the lock icon in the address bar to verify website security'
    ],
    redFlags: [
      'Urgent or threatening language',
      'Requests for personal information',
      'Suspicious sender email addresses',
      'Poor grammar and spelling',
      'Unexpected attachments or links',
      'Emails that create a false sense of urgency',
      'Emails that don\'t match the official branding of the company'
    ],
    dynamicTips: (data) => {
      const tips = [];
      if (data.email) {
        tips.push(`You entered: ${data.email.substring(0, 3)}***@${data.email.split('@')[1] || '***'}. This shows how attackers can capture your email.`);
      }
      if (data.password) {
        tips.push(`You entered a password that would have been stolen. Always use unique passwords for each account.`);
      }
      return tips;
    },
    timeOnPageTip: (seconds) => {
      if (seconds < 10) {
        return 'You acted quickly! In a real phishing attack, even a few seconds is enough for attackers to capture your information.';
      } else if (seconds < 30) {
        return 'You took some time to review the page. In a real attack, attackers can capture your information in just seconds.';
      } else {
        return 'You spent considerable time on the page. Even if you suspected something was wrong, a real attacker would have already captured your information.';
      }
    }
  },
  face: {
    title: 'Fake Facebook Login Phishing Detected!',
    capturedInfo: 'Email address or phone number, Password, Facebook login credentials',
    description: 'This was a simulated phishing attack mimicking Facebook\'s login page. A real attacker could have stolen your Facebook credentials!',
    measures: [
      'Always go directly to facebook.com by typing it in your browser',
      'Check the URL carefully - look for exactly facebook.com (not faceb00k.com or similar)',
      'Look for the secure padlock icon and HTTPS in the address bar',
      'Never click on links in emails claiming to be from Facebook',
      'Enable two-factor authentication on your real Facebook account',
      'Use Facebook\'s official mobile app instead of browser when possible',
      'Be suspicious of login pages that arrive through email or text links',
      'Look for Facebook\'s official blue branding and proper spelling',
      'Verify the security certificate by clicking the lock icon in the address bar'
    ],
    redFlags: [
      'Wrong URL that\'s not exactly facebook.com',
      'Poor spelling or grammar in the Facebook interface',
      'Arriving at the page through suspicious emails or links',
      'Missing security certificates or warnings about unsafe sites',
      'Requests for additional personal information beyond email/password',
      'Different fonts, colors, or layout than real Facebook',
      'Urgent messages saying your account will be closed or suspended',
      'Unusual requests for personal information not typically asked during login'
    ],
    dynamicTips: (data) => {
      const tips = [];
      if (data.email) {
        tips.push(`You entered: ${data.email.substring(0, 3)}***. Attackers often use fake Facebook login pages to steal credentials.`);
      }
      if (data.password) {
        tips.push(`You entered a password that would have given attackers full access to your Facebook account.`);
      }
      return tips;
    },
    timeOnPageTip: (seconds) => {
      if (seconds < 15) {
        return 'You acted quickly! Facebook credentials are highly valuable to attackers and can be used to access many other accounts.';
      } else if (seconds < 45) {
        return 'You took some time to review the page. Even a short delay gives attackers enough time to capture your Facebook credentials.';
      } else {
        return 'You spent considerable time on the page. In a real attack, attackers would have already used your credentials to access your account.';
      }
    }
  },
  sms: {
    title: 'SMS Phishing (Smishing) Detected!',
    capturedInfo: 'Phone number, Verification code',
    description: 'This was a simulated phishing attack. Scammers use SMS to trick you into revealing sensitive information.',
    measures: [
      'Never share verification codes with anyone',
      'Verify the sender\'s phone number before responding',
      'Be cautious of urgent or threatening messages',
      'Don\'t click on links in text messages from unknown senders',
      'Contact the company directly using official channels if unsure',
      'Enable SMS filtering and spam protection on your phone',
      'Be suspicious of messages that create urgency or fear',
      'Look up the official customer service number rather than calling numbers in suspicious texts'
    ],
    redFlags: [
      'Urgent requests for personal information',
      'Suspicious phone numbers or short codes',
      'Requests for verification codes',
      'Links to unfamiliar websites',
      'Poor grammar or spelling in messages',
      'Messages that claim immediate action is required',
      'Requests for money or financial information via text',
      'Messages that claim to be from your bank but contain suspicious links'
    ],
    dynamicTips: (data) => {
      const tips = [];
      if (data.phone) {
        tips.push(`You entered: ${data.phone.replace(/\d/g, '*')}. In a real attack, this number would be used for further targeting.`);
      }
      if (data.code) {
        tips.push(`You entered code: ${data.code}. Real attackers use these codes to gain access to your accounts.`);
      }
      return tips;
    },
    timeOnPageTip: (seconds) => {
      if (seconds < 10) {
        return 'You acted quickly! SMS phishing attacks are designed to be fast, and even a few seconds is enough to capture your information.';
      } else if (seconds < 30) {
        return 'You took some time to review the message. In a real attack, attackers can use your information within seconds of you entering it.';
      } else {
        return 'You spent considerable time on the page. Even with hesitation, a real attacker would have already used your verification code.';
      }
    }
  },
  social: {
    title: 'Social Media Phishing Detected!',
    capturedInfo: 'Username, Password',
    description: 'This was a simulated phishing attack. Fake social media login pages are commonly used to steal credentials.',
    measures: [
      'Always check the URL to ensure you\'re on the official website',
      'Look for the official social media platform branding',
      'Enable two-factor authentication on all social media accounts',
      'Be cautious of login prompts from emails or messages',
      'Use official mobile apps from app stores',
      'Regularly review your account activity and security settings',
      'Be suspicious of login pages accessed through links in messages',
      'Bookmark official login pages to avoid being redirected to fake sites',
      'Check for HTTPS and the lock icon in the address bar'
    ],
    redFlags: [
      'URLs that don\'t match the official domain',
      'Missing security indicators (HTTPS, lock icon)',
      'Unexpected login prompts',
      'Requests for excessive permissions',
      'Suspicious or unverified applications',
      'Login pages that look different from the official site',
      'Unusual requests for personal information during login',
      'Pages that load slowly or have poor design quality'
    ],
    dynamicTips: (data) => {
      const tips = [];
      if (data.username) {
        tips.push(`You entered: ${data.username.substring(0, 2)}***. Attackers use fake login pages to capture usernames.`);
      }
      if (data.password) {
        tips.push(`You entered a password that would have compromised your social media account.`);
      }
      return tips;
    },
    timeOnPageTip: (seconds) => {
      if (seconds < 10) {
        return 'You acted quickly! Social media accounts can be used for identity theft and to target your contacts.';
      } else if (seconds < 30) {
        return 'You took some time to review the page. Even a brief delay gives attackers access to your social media profile and contacts.';
      } else {
        return 'You spent considerable time on the page. In a real attack, attackers would have already accessed your account and started targeting your contacts.';
      }
    }
  },
  qr: {
    title: 'QR Code Phishing Detected!',
    capturedInfo: 'Email address, Password',
    description: 'This was a simulated phishing attack. Malicious QR codes can redirect you to fake login pages.',
    measures: [
      'Only scan QR codes from trusted sources',
      'Verify the destination URL before entering any information',
      'Use a QR code scanner that shows the URL before opening',
      'Be cautious of QR codes in public places',
      'Check for HTTPS and security indicators',
      'When possible, type URLs directly instead of scanning QR codes',
      'Be suspicious of QR codes that promise rewards or urgent action',
      'Use your phone\'s built-in QR scanner rather than third-party apps when possible'
    ],
    redFlags: [
      'QR codes in suspicious locations',
      'Unexpected redirects to login pages',
      'QR codes that require immediate action',
      'Poor quality or tampered QR codes',
      'Requests for sensitive information after scanning',
      'QR codes found in unexpected places like parking meters or street signs',
      'QR codes that promise prizes or urgent notifications',
      'QR codes that don\'t clearly indicate their purpose'
    ],
    dynamicTips: (data) => {
      const tips = [];
      if (data.email) {
        tips.push(`You entered: ${data.email.substring(0, 3)}***@${data.email.split('@')[1] || '***'}. QR codes can lead to fake login pages that capture this information.`);
      }
      if (data.password) {
        tips.push(`You entered a password that would have been stolen through this QR code phishing attack.`);
      }
      return tips;
    },
    timeOnPageTip: (seconds) => {
      if (seconds < 10) {
        return 'You acted quickly! QR code attacks are especially dangerous because they can instantly redirect you to malicious sites.';
      } else if (seconds < 30) {
        return 'You took some time to review the page. In a real attack, scanning a malicious QR code instantly redirects you to a fake site.';
      } else {
        return 'You spent considerable time on the page. Even with hesitation, a real attacker would have already captured your credentials after you scanned the QR code.';
      }
    }
  },
  ransomware: {
    title: 'Ransomware Simulation Complete!',
    capturedInfo: 'Payment Transaction ID (Simulated)',
    description: 'This was a simulated ransomware attack. In a real scenario, your files would be encrypted and inaccessible.',
    measures: [
      'Regularly back up your data to an offline source',
      'Keep your operating system and software up to date',
      'Use reliable antivirus and anti-malware software',
      'Enable "Show file extensions" to spot malicious files (e.g. .exe disguised as .pdf)',
      'Never pay the ransom - there is no guarantee you will get your data back',
      'Disconnect infected devices from the network immediately',
      'Use strong, unique passwords and 2FA to prevent initial access',
      'Be cautious of email attachments, especially ZIP or EXE files'
    ],
    redFlags: [
      'Unexpected file encryption or inability to open files',
      'Changed desktop wallpaper with a ransom note',
      'Files renamed with strange extensions (e.g. .locked, .crypt)',
      'Pop-up windows demanding payment',
      'Countdown timers creating urgency',
      'Requests for payment in cryptocurrency (Bitcoin, Monero)',
      'Threats to delete or publish your data'
    ],
    dynamicTips: (data) => {
      const tips = [];
      if (data.paymentId) {
        tips.push(`You attempted to "pay" the ransom by entering a Transaction ID. In a real attack, paying funds criminal organizations and doesn't guarantee data recovery.`);
      }
      return tips;
    },
    timeOnPageTip: (seconds) => {
      if (seconds < 30) {
        return 'You acted quickly. In a real attack, immediate disconnection from the network is critical to stop the spread.';
      } else if (seconds < 60) {
        return 'You took some time to read the ransom note. While understanding the situation is important, every second counts in preventing spread to other devices.';
      } else {
        return 'You spent a long time on the screen. In a corporate environment, this delay could allow the ransomware to encrypt network drives and other connected systems.';
      }
    }
  }
};

function PhishingResult() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const type = params.type;
  const content = educationalContent[type];
  const [dynamicContent, setDynamicContent] = useState(content);
  const [formData, setFormData] = useState({});
  const [timeOnPage, setTimeOnPage] = useState(15); // Simulated time on page

  if (!content) {
    return <div>Invalid phishing type</div>;
  }

  // Simulate getting user's phishing attempt data
  useEffect(() => {
    // In a real implementation, this would fetch the actual user's data from the database
    // For now, we'll just use the static content but show how it could be dynamic
    // Simulate some user data based on the phishing type
    let simulatedData = {};
    // Simulate different time on page values based on phishing type
    let simulatedTime = 15;
    switch (type) {
      case 'email':
        simulatedData = { email: 'user@example.com', password: 'password123' };
        simulatedTime = Math.floor(Math.random() * 45) + 5; // 5-50 seconds
        break;
      case 'face':
        simulatedData = { email: 'user@facebook.com', password: 'facebookpass' };
        simulatedTime = Math.floor(Math.random() * 60) + 10; // 10-70 seconds
        break;
      case 'sms':
        simulatedData = { phone: '+1234567890', code: '123456' };
        simulatedTime = Math.floor(Math.random() * 30) + 3; // 3-33 seconds
        break;
      case 'social':
        simulatedData = { username: 'socialuser', password: 'socialpass' };
        simulatedTime = Math.floor(Math.random() * 40) + 8; // 8-48 seconds
        break;
      case 'qr':
        simulatedData = { email: 'user@company.com', password: 'qrpassword' };
        simulatedTime = Math.floor(Math.random() * 25) + 2; // 2-27 seconds
        break;
      case 'ransomware':
        simulatedData = { paymentId: 'tx123456789' };
        simulatedTime = Math.floor(Math.random() * 45) + 15; // 15-60 seconds
        break;
      default:
        simulatedData = {};
        simulatedTime = 15;
    }

    setFormData(simulatedData);
    setTimeOnPage(simulatedTime);

    setDynamicContent({
      ...content,
      title: `${content.title}`,
      description: `${content.description} You entered information that would have been captured by a real attacker.`,
    });
  }, [type, content]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-3xl">
        {/* Main Alert Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-200">
          {/* Header */}
          <div className="bg-red-600 px-8 py-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-4xl shadow-lg">
              ⚠️
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">{dynamicContent.title}</h1>
            <p className="mt-2 text-red-100 text-lg font-medium">Simulation Complete</p>
          </div>

          <div className="p-8 sm:p-10">
            {/* Description */}
            <div className="mb-10 text-center">
              <p className="text-lg text-gray-700 leading-relaxed">
                {dynamicContent.description}
              </p>
            </div>

            {/* Captured Info Warning */}
            <div className="mb-10 rounded-xl border border-red-100 bg-red-50 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-full bg-red-100 p-2">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-red-900">Information That Would Have Been Captured:</h2>
                  <p className="mt-1 text-red-700 font-medium">{dynamicContent.capturedInfo}</p>
                </div>
              </div>
            </div>

            {/* What You Entered (Dynamic) */}
            <div className="mb-10">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600 text-lg">📝</span>
                What You Entered
              </h2>
              <div className="rounded-xl border border-yellow-200 bg-yellow-50/50 p-6">
                <p className="mb-4 text-gray-700 font-medium">Based on what you entered, here's what an attacker could have done:</p>
                <div className="space-y-4">
                  {dynamicContent.dynamicTips && dynamicContent.dynamicTips(formData).map((tip, index) => (
                    <div key={index} className="flex gap-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-yellow-100">
                      <span className="flex-shrink-0 text-xl">⚠️</span>
                      <p className="text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Time Awareness */}
            <div className="mb-10">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 text-lg">⏱️</span>
                Time Awareness
              </h2>
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-6">
                <p className="text-gray-800 font-medium mb-2">
                  {dynamicContent.timeOnPageTip && dynamicContent.timeOnPageTip(timeOnPage)}
                </p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                  <span>You spent approximately {timeOnPage} seconds on the page</span>
                </div>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Red Flags */}
              <div>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 text-sm">🚩</span>
                  Red Flags to Watch For
                </h2>
                <ul className="space-y-3">
                  {dynamicContent.redFlags.map((flag, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="mt-1 flex-shrink-0 text-red-500">•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention Measures */}
              <div>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600 text-sm">🛡️</span>
                  Prevention Measures
                </h2>
                <ul className="space-y-3">
                  {dynamicContent.measures.map((measure, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="mt-0.5 flex-shrink-0 text-green-500 font-bold">✓</span>
                      <span>{measure}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-12 text-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-gray-800 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                <span>Back to Dashboard</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PhishingResultPage() {
  return (
    <ProtectedRoute allowedRoles={['user', 'student', 'admin']}>
      <PhishingResult />
    </ProtectedRoute>
  );
}
