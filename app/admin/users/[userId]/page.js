'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getUser } from '@/lib/userService';
import Link from 'next/link';

function UserDetails() {
  const { user: currentUser, signOut } = useAuth();
  const router = useRouter();
  const params = useParams();
  const userId = params.userId;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUserData();
  }, [userId]);

  const loadUserData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getUser(userId);
      if (data) {
        setUserData(data);
      } else {
        setError('User not found');
      }
    } catch (err) {
      setError('Error loading user data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-md">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600">Error</h2>
              <p className="mt-2 text-gray-600">{error}</p>
              <Link
                href="/admin/users"
                className="mt-4 inline-block text-indigo-600 hover:text-indigo-700"
              >
                ← Back to Users
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/users" className="text-indigo-600 hover:text-indigo-700">
                ← Back to Users
              </Link>
              <h1 className="text-xl font-bold text-gray-900">User Details</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{currentUser?.email}</span>
              <button
                onClick={handleSignOut}
                className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">User Information</h2>

          {/* User Details */}
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">User ID (Firestore Document ID)</label>
              <p className="mt-1 font-mono text-sm text-gray-900">{userData?.id}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-gray-900">{userData?.email || 'N/A'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-gray-900">{userData?.name || 'N/A'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <p className="mt-1 capitalize text-gray-900">
                <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                  userData?.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                  userData?.role === 'student' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {userData?.role || 'N/A'}
                </span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Created At</label>
              <p className="mt-1 text-gray-900">
                {userData?.createdAt
                  ? new Date(userData.createdAt).toLocaleString()
                  : 'N/A'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Last Login</label>
              <p className="mt-1 text-gray-900">
                {userData?.lastLoginAt
                  ? new Date(userData.lastLoginAt).toLocaleString()
                  : 'Never'}
              </p>
            </div>

            {userData?.updatedAt && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                <p className="mt-1 text-gray-900">
                  {new Date(userData.updatedAt).toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* Raw Data Display */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Raw Firestore Data</h3>
            <div className="overflow-auto rounded-md bg-gray-50 p-4">
              <pre className="text-xs text-gray-800">
                {JSON.stringify(userData, null, 2)}
              </pre>
            </div>
          </div>

          {/* Firestore Collection Info */}
          <div className="mt-6 rounded-md bg-blue-50 p-4">
            <h4 className="text-sm font-semibold text-blue-900">Firestore Information</h4>
            <ul className="mt-2 space-y-1 text-sm text-blue-800">
              <li><strong>Collection:</strong> users</li>
              <li><strong>Document ID:</strong> {userData?.id}</li>
              <li><strong>Path:</strong> /users/{userData?.id}</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function UserDetailsPage() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <UserDetails />
    </ProtectedRoute>
  );
}

