'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

function MobileLoginContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMsg, setErrorMsg] = useState('');

    const handleApprove = async () => {
        if (!sessionId || !db) return;

        setStatus('loading');
        try {
            const sessionRef = doc(db, 'qr_sessions', sessionId);

            // Check if session exists first
            const docSnap = await getDoc(sessionRef);

            if (!docSnap.exists()) {
                // If it doesn't exist, we might need to create it (though desktop should have)
                // Or it might be a permissions issue if we can't read it
                await setDoc(sessionRef, {
                    status: 'approved',
                    timestamp: new Date().toISOString(),
                    device: navigator.userAgent
                });
            } else {
                await updateDoc(sessionRef, {
                    status: 'approved',
                    updatedAt: new Date().toISOString(),
                    device: navigator.userAgent
                });
            }

            setStatus('success');
        } catch (error) {
            console.error('Error approving login:', error);
            setStatus('error');
            setErrorMsg('Could not approve login. Please try again.');
        }
    };

    if (!sessionId) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
                <div className="text-center text-red-600">
                    Invalid Session
                </div>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#f0f2f5] p-6 text-center font-sans">
                <div className="mb-6 rounded-full bg-green-100 p-6 ring-8 ring-green-50">
                    <svg className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="mb-2 text-2xl font-bold text-slate-900">Login Approved</h1>
                <p className="text-slate-600">You have successfully signed in on your desktop.</p>
                <p className="mt-8 text-xs text-slate-400">You can now close this window.</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#f0f2f5] font-sans">
            {/* Mobile Header */}
            <div className="bg-white px-6 py-4 shadow-sm flex items-center justify-center">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">S</div>
                    <span className="text-lg font-semibold tracking-tight text-slate-700">Secure<span className="text-indigo-600">ID</span></span>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-900/5">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.131A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.858.5-4m1.5 18a4 4 0 00-4-4" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-bold text-slate-900">Confirm Login</h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Are you trying to log in to SecureID on another device?
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-xl bg-slate-50 p-4 text-sm border border-slate-100">
                            <div className="flex justify-between py-2 border-b border-slate-200">
                                <span className="text-slate-500">Device</span>
                                <span className="font-medium text-slate-900">Desktop Chrome</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-200">
                                <span className="text-slate-500">Location</span>
                                <span className="font-medium text-slate-900">Unknown</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-slate-500">Time</span>
                                <span className="font-medium text-slate-900">{new Date().toLocaleTimeString()}</span>
                            </div>
                        </div>

                        {status === 'error' && (
                            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-100">
                                {errorMsg}
                            </div>
                        )}

                        <div className="pt-2 space-y-3">
                            <button
                                onClick={handleApprove}
                                disabled={status === 'loading'}
                                className="w-full rounded-xl bg-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75 transition-all active:scale-[0.98]"
                            >
                                {status === 'loading' ? 'Approving...' : 'Yes, It\'s Me'}
                            </button>

                            <button
                                className="w-full rounded-xl bg-white py-3.5 font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all active:scale-[0.98]"
                            >
                                No, Deny Request
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-[10px] text-slate-400">
                    <p>SecureID Enterprise Systems</p>
                    <p>End-to-end encrypted connection</p>
                </div>
            </div>
        </div>
    );
}

export default function MobileLoginPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
            </div>
        }>
            <MobileLoginContent />
        </Suspense>
    );
}
