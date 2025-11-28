# CyberAware System User Manual

Welcome to **CyberAware**, your interactive cybersecurity awareness training platform. This guide will help you navigate the system, perform phishing simulations, and manage administrative tasks.

---

## 📚 Table of Contents

1. [Getting Started](#getting-started)
2. [User Dashboard](#user-dashboard)
3. [Phishing Simulations](#phishing-simulations)
    - [Email Phishing](#email-phishing)
    - [Facebook Login Phishing](#facebook-login-phishing)
    - [SMS (Smishing)](#sms-smishing)
    - [Social Media Scams](#social-media-scams)
    - [QR Code Attacks](#qr-code-attacks)
    - [Ransomware Attack](#ransomware-attack)
4. [Understanding Results](#understanding-results)
5. [Admin Dashboard](#admin-dashboard)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started

### Accessing the System
Open your web browser and navigate to the application URL (e.g., `http://localhost:3000` for local testing).

### Logging In
1. Enter your **Email Address** and **Password**.
2. Click **Sign In**.
3. If you don't have an account, contact your administrator or use the **Sign Up** link if available.

---

## 👤 User Dashboard

Upon logging in, you will be greeted by the **User Dashboard**. This is your central hub for training.

*   **Welcome Banner**: Displays your name and a motivational message.
*   **Statistics Bar**:
    *   **Simulations Completed**: Tracks how many training modules you've finished.
    *   **Accuracy Rate**: Shows your success rate in identifying threats.
    *   **Threats Blocked**: A gamified score of your security awareness.
*   **Training Modules**: A grid of available simulations. Click **Start Simulation** on any card to begin.
*   **Daily Tip**: A security tip displayed at the bottom of the page.

---

## 🎣 Phishing Simulations

Each simulation places you in a realistic scenario to test your ability to spot cyber threats.

### 1. ✉️ Email Phishing
*   **Scenario**: You receive a suspicious email (e.g., from "Google" or a bank).
*   **Goal**: Identify red flags like fake sender addresses, urgent language, or suspicious links.
*   **Action**: You might be asked to "Sign In". If you enter credentials, the system captures them (safely) to show you what *would* have happened.

### 2. 📘 Facebook Login Phishing
*   **Scenario**: A fake Facebook login page asking you to connect or claim a prize.
*   **Features**:
    *   Realistic "facebook" logo and blue branding.
    *   "Log In" and "Create new account" buttons.
*   **Lesson**: Always check the URL bar. Real Facebook is `facebook.com`. Phishing sites might use `faceb00k.com` or other variations.

### 3. 💬 SMS (Smishing)
*   **Scenario**: You receive a text message on a simulated mobile screen.
*   **Content**: Often a "Security Alert" or "Prize Notification" asking you to verify your identity.
*   **Interaction**:
    *   **Step 1**: Enter a phone number.
    *   **Step 2**: Enter a verification code.
*   **Lesson**: legitimate organizations rarely ask for sensitive codes via text.

### 4. 🌐 Social Media Scams
*   **Scenario**: A fake Instagram or social media login page.
*   **Goal**: To steal your social media credentials.
*   **Lesson**: Be wary of "You won!" messages or urgent requests to change your password via a link.

### 5. 🔳 QR Code Attacks (Quishing)
*   **Scenario**: A QR code appears, promising a reward or secure login.
*   **Action**: Scanning (or clicking) the code leads to a fake login form.
*   **Lesson**: QR codes can hide malicious URLs. Don't scan codes from untrusted sources.

### 6. 🔒 Ransomware Attack
*   **Scenario**: Your screen appears "locked" with a threatening message demanding payment.
*   **Features**: Countdown timer, scary warnings, payment instructions.
*   **Lesson**: This simulates a malware infection. In real life, **never pay the ransom**. Disconnect from the network immediately.

---

## 📊 Understanding Results

After completing a simulation (by "falling" for the phish or submitting data), you are taken to the **Result Page**.

*   **⚠️ Alert Header**: Clearly states "Phishing Detected!"
*   **Captured Information**: Shows exactly what data you entered (e.g., "Email: dav***@gmail.com", "Password: *****").
    *   *Note: We never store your actual passwords. This is for educational purposes only.*
*   **Time Awareness**: Tells you how long you spent on the page. Attackers act fast!
*   **Red Flags**: A checklist of what you missed (e.g., "Suspicious URL", "Urgent Language").
*   **Prevention Measures**: Actionable tips to stay safe next time.

Click **Back to Dashboard** to return and try another module.

---

## 🛡️ Admin Dashboard

*Access restricted to users with the 'admin' role.*

To access:
1. Log in with an admin account.
2. Navigate to `/admin` or click the **Admin Dashboard** link if visible.

### Features:
1.  **Overview Stats**:
    *   Total Attempts across the organization.
    *   Unique Users tested.
    *   Average Attempts per User.
2.  **Attempts by Type**: A visual breakdown of which attacks are most common (Email vs. SMS vs. QR, etc.).
3.  **Recent Attempts Log**: A detailed table showing:
    *   **User**: Name of the user.
    *   **Type**: The simulation type.
    *   **Data Captured**: What info they submitted.
    *   **Time**: When the attempt occurred.
4.  **Export Report**: Click **Export Report (PDF)** to download a professional PDF summary of all phishing activity for compliance or review.
5.  **Manage Users**: Click **Manage Users** to view, add, or remove users from the system.

---

## 🔧 Troubleshooting

*   **"I can't log in"**: Ensure you are using the correct email/password. If you are a student, check with your instructor.
*   **"The simulation isn't loading"**: Refresh the page. Ensure you have a stable internet connection.
*   **"I don't see the Admin Dashboard"**: You might not have admin privileges. Contact the system owner to upgrade your role.
*   **"Text is hard to read"**: The system uses high-contrast colors, but ensure your screen brightness is adequate.

---

**Stay Alert, Stay Safe!**
*The CyberAware Team*
