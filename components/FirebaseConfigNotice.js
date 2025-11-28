'use client';

import { useEffect, useState } from 'react';

export default function FirebaseConfigNotice() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    // Check if Firebase is configured by checking environment variables
    const isConfigured = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
                         process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'your_api_key_here' &&
                         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    
    if (!isConfigured) {
      setShowNotice(true);
    }
  }, []);

  if (!showNotice) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-md rounded-lg bg-yellow-50 border border-yellow-200 p-4 shadow-lg z-50">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-yellow-800">Firebase Not Configured</h3>
          <p className="mt-1 text-sm text-yellow-700">
            Please set up your Firebase configuration in <code className="bg-yellow-100 px-1 rounded">.env.local</code> file.
            See <code className="bg-yellow-100 px-1 rounded">SETUP.md</code> for instructions.
          </p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={() => setShowNotice(false)}
            className="inline-flex text-yellow-400 hover:text-yellow-500 focus:outline-none"
          >
            <span className="sr-only">Close</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

