'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import {
  saveUser,
  getUser,
  updateUser,
  getAllUsers,
} from '@/lib/userService';
import {
  trackPhishingAttempt,
  getAllPhishingAttempts,
  getUserPhishingAttempts,
  getPhishingStatistics,
} from '@/lib/phishingTracking';

export default function DataManagementPage() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DataManagement />
    </ProtectedRoute>
  );
}

function DataManagement() {
  const { user, userData } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // User Form State
  const [userForm, setUserForm] = useState({
    email: '',
    name: '',
    role: 'user',
  });

  // Phishing Form State
  const [phishingForm, setPhishingForm] = useState({
    userId: '',
    phishingType: 'email',
    email: '',
    password: '',
  });

  // Data Display State
  const [users, setUsers] = useState([]);
  const [phishingAttempts, setPhishingAttempts] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Load users
  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
      setMessage('Users loaded successfully');
    } catch (error) {
      setMessage(`Error loading users: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Load phishing attempts
  const loadPhishingAttempts = async () => {
    setLoading(true);
    try {
      const data = await getAllPhishingAttempts();
      setPhishingAttempts(data);
      setMessage('Phishing attempts loaded successfully');
    } catch (error) {
      setMessage(`Error loading attempts: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Load statistics
  const loadStatistics = async () => {
    setLoading(true);
    try {
      const data = await getPhishingStatistics();
      setStatistics(data);
      setMessage('Statistics loaded successfully');
    } catch (error) {
      setMessage(`Error loading statistics: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Create new user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!userForm.email || !userForm.name) {
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Generate a simple ID (in production, use Firebase Auth)
      const userId = `user_${Date.now()}`;
      await saveUser(userId, {
        email: userForm.email,
        name: userForm.name,
        role: userForm.role,
        createdAt: new Date().toISOString(),
      });
      setMessage(`User created successfully with ID: ${userId}`);
      setUserForm({ email: '', name: '', role: 'user' });
      loadUsers();
    } catch (error) {
      setMessage(`Error creating user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Create phishing attempt
  const handleCreatePhishing = async (e) => {
    e.preventDefault();
    if (!phishingForm.userId || !phishingForm.email) {
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await trackPhishingAttempt(phishingForm.userId, phishingForm.phishingType, {
        email: phishingForm.email,
        password: phishingForm.password,
      });
      setMessage('Phishing attempt tracked successfully');
      setPhishingForm({ userId: '', phishingType: 'email', email: '', password: '' });
      loadPhishingAttempts();
    } catch (error) {
      setMessage(`Error tracking attempt: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Update user
  const handleUpdateUser = async (userId) => {
    setLoading(true);
    try {
      await updateUser(userId, {
        name: selectedUser.name,
        role: selectedUser.role,
      });
      setMessage('User updated successfully');
      setSelectedUser(null);
      loadUsers();
    } catch (error) {
      setMessage(`Error updating user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Data Management</h1>

        {/* Message Alert */}
        {message && (
          <div className="mb-6 rounded-lg bg-blue-50 p-4 text-blue-800">
            {message}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'users'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('phishing')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'phishing'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Phishing Attempts
          </button>
          <button
            onClick={() => setActiveTab('statistics')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'statistics'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Statistics
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-8">
            {/* Create User Form */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Create New User
              </h2>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={userForm.email}
                    onChange={(e) =>
                      setUserForm({ ...userForm, email: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900 placeholder-gray-400"
                    placeholder="user@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={userForm.name}
                    onChange={(e) =>
                      setUserForm({ ...userForm, name: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900 placeholder-gray-400"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    value={userForm.role}
                    onChange={(e) =>
                      setUserForm({ ...userForm, role: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900"
                  >
                    <option value="user">User</option>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create User'}
                </button>
              </form>
            </div>

            {/* Users List */}
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  All Users
                </h2>
                <button
                  onClick={loadUsers}
                  disabled={loading}
                  className="rounded-md bg-gray-600 px-3 py-1 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Refresh'}
                </button>
              </div>

              {selectedUser ? (
                <div className="space-y-4">
                  <h3 className="font-semibold">Edit User: {selectedUser.id}</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      value={selectedUser.name}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, name: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <select
                      value={selectedUser.role}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, role: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900"
                    >
                      <option value="user">User</option>
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateUser(selectedUser.id)}
                      className="flex-1 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="flex-1 rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Role</th>
                        <th className="px-4 py-2 text-left">Created</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2 font-mono text-xs">
                            {u.id.slice(0, 8)}...
                          </td>
                          <td className="px-4 py-2">{u.email}</td>
                          <td className="px-4 py-2">{u.name}</td>
                          <td className="px-4 py-2">
                            <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                              {u.role}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-xs">
                            {u.createdAt
                              ? new Date(u.createdAt).toLocaleDateString()
                              : 'N/A'}
                          </td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => setSelectedUser(u)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Phishing Tab */}
        {activeTab === 'phishing' && (
          <div className="space-y-8">
            {/* Create Phishing Record Form */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Log Phishing Attempt
              </h2>
              <form onSubmit={handleCreatePhishing} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    User ID
                  </label>
                  <input
                    type="text"
                    required
                    value={phishingForm.userId}
                    onChange={(e) =>
                      setPhishingForm({ ...phishingForm, userId: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900 placeholder-gray-400"
                    placeholder="user_id"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phishing Type
                  </label>
                  <select
                    value={phishingForm.phishingType}
                    onChange={(e) =>
                      setPhishingForm({
                        ...phishingForm,
                        phishingType: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900"
                  >
                    <option value="email">Email</option>
                    <option value="face">Face Login</option>
                    <option value="sms">SMS</option>
                    <option value="social">Social Media</option>
                    <option value="qr">QR Code</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={phishingForm.email}
                    onChange={(e) =>
                      setPhishingForm({ ...phishingForm, email: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900 placeholder-gray-400"
                    placeholder="user@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password (simulated)
                  </label>
                  <input
                    type="password"
                    value={phishingForm.password}
                    onChange={(e) =>
                      setPhishingForm({
                        ...phishingForm,
                        password: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900 placeholder-gray-400"
                    placeholder="password"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? 'Logging...' : 'Log Attempt'}
                </button>
              </form>
            </div>

            {/* Phishing Attempts List */}
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  All Phishing Attempts
                </h2>
                <button
                  onClick={loadPhishingAttempts}
                  disabled={loading}
                  className="rounded-md bg-gray-600 px-3 py-1 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Refresh'}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">User ID</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {phishingAttempts.map((attempt) => (
                      <tr key={attempt.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 font-mono text-xs">
                          {attempt.userId.slice(0, 8)}...
                        </td>
                        <td className="px-4 py-2">
                          <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                            {attempt.phishingType}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-xs">
                          {attempt.capturedData?.email || 'N/A'}
                        </td>
                        <td className="px-4 py-2 text-xs">
                          {new Date(attempt.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'statistics' && (
          <div className="space-y-8">
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Phishing Statistics
                </h2>
                <button
                  onClick={loadStatistics}
                  disabled={loading}
                  className="rounded-md bg-gray-600 px-3 py-1 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Refresh'}
                </button>
              </div>

              {statistics && (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Total Attempts */}
                    <div className="rounded-lg bg-blue-50 p-4">
                      <p className="text-sm font-medium text-blue-600">
                        Total Attempts
                      </p>
                      <p className="mt-2 text-3xl font-bold text-blue-900">
                        {statistics.totalAttempts}
                      </p>
                    </div>

                    {/* Unique Users */}
                    <div className="rounded-lg bg-green-50 p-4">
                      <p className="text-sm font-medium text-green-600">
                        Unique Users
                      </p>
                      <p className="mt-2 text-3xl font-bold text-green-900">
                        {statistics.uniqueUsers}
                      </p>
                    </div>

                    {/* By Type */}
                    {Object.entries(statistics.byType || {}).map(([type, count]) => (
                      <div key={type} className="rounded-lg bg-purple-50 p-4">
                        <p className="text-sm font-medium text-purple-600">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </p>
                        <p className="mt-2 text-3xl font-bold text-purple-900">
                          {count}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* By Date Chart */}
                  {Object.keys(statistics.byDate || {}).length > 0 ? (
                    <div className="mt-8">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        Attempts by Date
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(statistics.byDate || {}).map(([date, count]) => (
                          <div key={date} className="flex items-center gap-4">
                            <div className="w-24 text-sm font-medium">{date}</div>
                            <div
                              className="flex-1 h-8 bg-indigo-600 rounded flex items-center justify-center text-white text-sm font-semibold"
                              style={{ width: `${(count / Math.max(...Object.values(statistics.byDate || {}))) * 100}%` }}
                            >
                              {count}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
