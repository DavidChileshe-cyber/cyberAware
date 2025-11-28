'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { trackPhishingAttempt } from '@/lib/phishingTracking';
import RansomwarePhishing from '@/components/RansomwarePhishing';
import QRPhishing from '@/components/QRPhishing';
import SocialPhishing from '@/components/SocialPhishing';
import EmailPhishing from '@/components/EmailPhishing';
import FacebookPhishing from '@/components/FacebookPhishing';
import SMSPhishing from '@/components/SMSPhishing';

const phishingTemplates = {
  email: { title: 'Sign in', description: 'to continue to Gmail' },
  face: { title: 'facebook', description: 'Connect with friends' },
  sms: { title: 'Security Alert', description: 'Unusual activity detected.' },
  social: { title: 'Instagram' },
  qr: { title: 'Secure Login' },
  ransomware: { title: 'Ransomware' }
};

function PhishingSimulation() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const type = params.type;
  const template = phishingTemplates[type];

  const [simulationStarted, setSimulationStarted] = useState(false);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);

  useEffect(() => {
    if (!simulationStarted) return;
    const start = Date.now();
    const interval = setInterval(() => {
      setTimeOnPage(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [simulationStarted]);

  if (!template) {
    return <div className="text-center text-red-600 text-2xl">Invalid simulation type</div>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      await trackPhishingAttempt(user.uid, type, {
        ...formData,
        timeOnPage,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        language: navigator.language
      });
      setSubmitted(true);
      setTimeout(() => router.push(`/phishing/${type}/result`), 1500);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // Prize notification intro
  if (!simulationStarted) {
    const prizes = {
      email: { icon: '📧', title: 'CONGRATULATIONS!', subtitle: "Gmail Winner!", prize: 'iPhone 15 Pro Max', value: '$1,299', desc: 'Your Gmail account has been selected!', urgency: 'Claim within 24 hours', btn: 'Sign In to Claim' },
      social: { icon: '🎉', title: 'YOU WON!', subtitle: 'Instagram Winner', prize: '$500 Gift Card', value: '$500', desc: 'Instagram giveaway winner!', urgency: 'Claim now', btn: 'Login to Claim' },
      face: { icon: '🏆', title: 'WINNER!', subtitle: 'Facebook Giveaway', prize: 'MacBook Air M2', value: '$1,199', desc: 'You won a MacBook!', urgency: 'Login now', btn: 'Claim MacBook' },
      sms: { icon: '💰', title: 'CASH PRIZE!', subtitle: 'Winner', prize: '$5,000 Cash', value: '$5,000', desc: 'Your number won!', urgency: 'Verify now', btn: 'Verify & Claim' },
      qr: { icon: '🎫', title: 'EXCLUSIVE!', subtitle: 'Scan to Win', prize: 'Mystery Box', value: '$1,000+', desc: 'You\'ve been selected!', urgency: 'Act fast', btn: 'Scan to Claim' },
      ransomware: { icon: '⚠️', title: 'ALERT', subtitle: 'Action Required', prize: 'Protection', value: 'URGENT', desc: 'System at risk!', urgency: 'Act now', btn: 'Download' }
    };

    const info = prizes[type] || { icon: '🎁', title: 'WINNER!', subtitle: 'Prize!', prize: 'Special Prize', value: '$500', desc: 'You won!', urgency: 'Limited time', btn: 'Claim Now' };

    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 px-4 py-8">
        <div className="w-full max-w-2xl">
          <div className="relative rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-1 shadow-2xl animate-pulse">
            <div className="rounded-2xl bg-white p-8 md:p-12">
              <div className="mb-6 text-center">
                <div className="inline-block animate-bounce text-8xl">{info.icon}</div>
              </div>
              <h1 className="mb-2 text-center text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600">{info.title}</h1>
              <p className="mb-6 text-center text-xl font-semibold text-gray-800">{info.subtitle}</p>
              <div className="mb-6 rounded-xl border-4 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 p-6 shadow-lg">
                <div className="text-center">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">Your Prize</p>
                  <p className="mb-1 text-2xl font-bold text-gray-900">{info.prize}</p>
                  <p className="text-3xl font-black text-orange-600">VALUE: {info.value}</p>
                </div>
              </div>
              <p className="mb-6 text-center text-lg text-gray-700">{info.desc}</p>
              <div className="mb-8 rounded-lg bg-red-100 border-2 border-red-400 p-4">
                <div className="flex items-center justify-center">
                  <svg className="h-6 w-6 text-red-600 mr-2 flex-shrink-0 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-bold text-red-700">⚡ {info.urgency}</p>
                </div>
              </div>
              <div className="mb-8 space-y-3 rounded-lg bg-gray-50 p-6">
                <p className="text-center text-sm font-semibold text-gray-900">Recent Winners:</p>
                <div className="space-y-2 text-xs text-gray-600">
                  <p>✅ Sarah M. - 2 hours ago</p>
                  <p>✅ Michael K. - 3 hours ago</p>
                  <p>✅ Jennifer L. - 5 hours ago</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={() => setSimulationStarted(true)} className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 font-bold text-white shadow-2xl transform transition hover:scale-105">
                  <span className="relative z-10 text-xl">{info.btn} →</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <button onClick={() => router.push('/dashboard')} className="text-sm text-gray-500 hover:text-gray-700 underline">No thanks, return to dashboard</button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500">
                <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure & Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mb-4 text-6xl">⏳</div>
          <p className="text-xl text-gray-600">Processing...</p>
        </div>
      </div>
    );
  }

  if (type === 'ransomware') return <RansomwarePhishing formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} />;
  if (type === 'qr') return <QRPhishing formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} />;
  if (type === 'social') return <SocialPhishing formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} />;
  if (type === 'email') return <EmailPhishing formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} />;
  if (type === 'face') return <FacebookPhishing formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} />;
  if (type === 'sms') return <SMSPhishing formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} />;

  return null;
}

export default function PhishingPage() {
  return (
    <ProtectedRoute allowedRoles={['user', 'student', 'admin']}>
      <PhishingSimulation />
    </ProtectedRoute>
  );
}