'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getAllUsers, getUsersByRole } from '@/lib/userService';
import Link from 'next/link';
import { Shield, Users, LogOut, Search, Filter, ChevronLeft } from 'lucide-react';

function UsersManagement() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    loadUsers();
  }, [filterRole]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      let userList;
      if (filterRole === 'all') {
        userList = await getAllUsers();
      } else {
        userList = await getUsersByRole(filterRole);
      }
      setUsers(userList);
    } catch (error) {
      console.error('Error loading users:', error);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center">
        <div className="text-xl font-medium text-indigo-600 animate-pulse">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-indigo-600"
            >
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              User Management
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-600 font-medium px-3 py-1 bg-gray-100 rounded-full">
              {user?.email}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">All Users</h2>
            <p className="text-gray-600 mt-2">Manage user accounts, roles, and access permissions</p>
          </div>

          <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-2 rounded-xl border border-white/20 shadow-sm">
            <div className="flex items-center gap-2 px-3 text-gray-500">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter by Role:</span>
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="bg-white border-0 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 shadow-sm"
            >
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="student">Students</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Created At</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Users className="h-8 w-8 text-gray-300" />
                        <p>No users found matching your criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((userData) => (
                    <tr key={userData.id} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/users/${userData.id}`}
                          className="font-mono text-xs text-indigo-600 hover:text-indigo-800 hover:underline bg-indigo-50 px-2 py-1 rounded border border-indigo-100"
                          title={userData.id}
                        >
                          {userData.id.substring(0, 8)}...
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{userData.name || userData.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{userData.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${userData.role === 'admin' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                            userData.role === 'student' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                              'bg-gray-100 text-gray-800 border border-gray-200'
                          }`}>
                          {userData.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {userData.createdAt
                          ? new Date(userData.createdAt).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {userData.lastLoginAt
                          ? new Date(userData.lastLoginAt).toLocaleString()
                          : <span className="text-gray-400 italic">Never</span>}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{users.length}</span> users
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function UsersPage() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <UsersManagement />
    </ProtectedRoute>
  );
}
