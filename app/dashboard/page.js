'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { LogOut, User, Shield, TrendingUp } from 'lucide-react';

function UserDashboard() {
  const { user, userRole, userData, signOut } = useAuth();
  const router = useRouter();

  const phishingSimulations = [
    {
      id: 'email',
      title: 'Email Phishing',
      description: 'Master the art of spotting malicious emails before they trick you',
      icon: '✉️',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'face',
      title: 'Facebook Login',
      description: 'Identify fake Facebook login pages that steal your credentials',
      icon: 'f',
      gradient: 'from-blue-600 to-blue-800',
    },
    {
      id: 'sms',
      title: 'SMS (Smishing)',
      description: 'Learn how attackers use text messages to steal your data',
      icon: '💬',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      id: 'social',
      title: 'Social Media Scams',
      description: 'Spot fake profiles, messages, and urgent login requests',
      icon: '🌐',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      id: 'qr',
      title: 'QR Code Attacks',
      description: 'Don’t scan blindly — learn how QR codes can lead to danger',
      icon: '🔳',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      id: 'ransomware',
      title: 'Ransomware Attack',
      description: 'Experience a simulated ransomware lock screen and learn how to react',
      icon: '🔒',
      gradient: 'from-red-600 to-rose-700',
    },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-lg shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                <Shield className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                Cyber<span className="text-indigo-600">Aware</span>
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-3 rounded-full bg-gray-100 py-1.5 pl-4 pr-2 border border-gray-200">
                <div className="flex flex-col text-right leading-tight">
                  <span className="text-sm font-bold text-gray-900">
                    {userData?.name || user?.email.split('@')[0]}
                  </span>
                  <span className="text-xs font-medium text-gray-500">
                    {userRole === 'student' ? 'Student Account' : 'User Account'}
                  </span>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="group flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 transition-all hover:bg-gray-50 hover:text-red-600 hover:ring-red-200"
              >
                <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">{userData?.name?.split(' ')[0] || 'Cyber Warrior'}</span> 👋
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Ready to test your skills? Choose a simulation below to sharpen your awareness against real-world cyber threats.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="mb-16 grid gap-6 sm:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Simulations Completed</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">12</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
              <span className="font-medium">+2 this week</span>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Accuracy Rate</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">94%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-indigo-600">
              <span className="font-medium">Top 5% of users</span>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Threats Blocked</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">47</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-600 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🛡️</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-orange-600">
              <span className="font-medium">Keep it up!</span>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-8 flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Training Modules</h2>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        {/* Simulations Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {phishingSimulations.map((sim) => (
            <Link
              key={sim.id}
              href={`/phishing/${sim.id}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-gray-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${sim.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />

              <div className="p-8">
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${sim.gradient} text-3xl text-white shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform duration-300`}>
                  {sim.icon}
                </div>

                <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {sim.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-8">
                  {sim.description}
                </p>

                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-indigo-600 group-hover:gap-3 transition-all">
                  <span>Start Simulation</span>
                  <span className="text-lg">→</span>
                </div>
              </div>

              <div className={`h-1.5 w-full bg-gradient-to-r ${sim.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </Link>
          ))}
        </div>

        {/* Pro Tip */}
        <div className="mt-20 rounded-2xl bg-gray-900 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20"></div>
          <div className="relative z-10">
            <span className="inline-block rounded-full bg-indigo-500/20 px-4 py-1.5 text-sm font-semibold text-indigo-300 mb-6 border border-indigo-500/30">
              Daily Security Tip
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              "Real attackers don't give second chances."
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Phishing attacks are becoming more sophisticated every day. Regular training is your best defense against evolving cyber threats.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['user', 'student']}>
      <UserDashboard />
    </ProtectedRoute>
  );
}