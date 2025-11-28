'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't redirect while loading
    if (loading) return;
    
    // Redirect to login if not authenticated
    if (!user) {
      if (pathname !== '/login') {
        router.replace('/login');
      }
      return;
    }
    
    // Only check role-based access if roles are specified and userRole is loaded
    if (allowedRoles.length > 0 && userRole !== null && userRole !== undefined) {
      if (!allowedRoles.includes(userRole)) {
        // If user is admin but this route doesn't allow admin, redirect to admin dashboard
        if (userRole === 'admin' && pathname !== '/admin') {
          router.replace('/admin');
          return;
        }
        // Otherwise redirect to user dashboard (for non-admin users trying to access admin-only routes)
        if (userRole !== 'admin' && pathname !== '/dashboard') {
          router.replace('/dashboard');
          return;
        }
      }
    }
  }, [user, userRole, loading, router, allowedRoles, pathname]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // If roles are specified, wait for userRole to be loaded before checking
  if (allowedRoles.length > 0) {
    // If userRole is still null/undefined (but user exists), wait a bit more
    if (userRole === null || userRole === undefined) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      );
    }
    
    // Check if user's role is allowed
    if (!allowedRoles.includes(userRole)) {
      return null;
    }
  }

  return <>{children}</>;
}

