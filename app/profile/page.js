'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

function UserProfile() {
  const { user, userData, updateUserProfile, refreshUserData } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Update name when userData is loaded
  useEffect(() => {
    if (userData?.name) {
      setName(userData.name);
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await updateUserProfile({ name });
      setSuccess('Profile updated successfully!');
      // Refresh user data to show updated information
      await refreshUserData();
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
              <h1 className="text-xl font-bold text-gray-900">User Profile</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Profile Information</h2>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-800">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-800">
              {success}
            </div>
          )}

          {/* Display User Data */}
          <div className="mb-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-gray-900">{user?.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">User ID</label>
              <p className="mt-1 text-sm text-gray-600">{user?.uid}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <p className="mt-1 capitalize text-gray-900">{userData?.role || 'N/A'}</p>
            </div>

            {userData?.createdAt && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Member Since</label>
                <p className="mt-1 text-gray-900">
                  {new Date(userData.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}

            {userData?.lastLoginAt && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Login</label>
                <p className="mt-1 text-gray-900">
                  {new Date(userData.lastLoginAt).toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* Update Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="Enter your name"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>

          {/* Display all user data (for debugging) */}
          {userData && (
            <div className="mt-8">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">All User Data</h3>
              <pre className="overflow-auto rounded-md bg-gray-50 p-4 text-xs">
                {JSON.stringify(userData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute allowedRoles={['user', 'student', 'admin']}>
      <UserProfile />
    </ProtectedRoute>
  );
}

