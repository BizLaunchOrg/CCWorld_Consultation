import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAdminAllowedEmails, isEmailAllowedForAdmin } from '../lib/adminGuard';

/**
 * Route guard: only users with profiles.role === 'admin' can access.
 * If VITE_ADMIN_ALLOWED_EMAILS is set, only those emails can access admin at all; others are bounced to home and signed out.
 * Refetches profile once when role is not admin so that newly promoted admins get in without re-login.
 */
export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { profile, user, loading, signOut, refreshProfile } = useAuth();
  const [refetching, setRefetching] = useState(false);
  const hasRefetched = useRef(false);

  useEffect(() => {
    if (!loading && user?.id && profile !== null && profile?.role !== 'admin' && !hasRefetched.current) {
      hasRefetched.current = true;
      setRefetching(true);
      refreshProfile().finally(() => setRefetching(false));
    }
  }, [loading, user?.id, profile?.role, refreshProfile]);

  if (loading || refetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <p className="text-slate-600 dark:text-slate-400">Loading…</p>
      </div>
    );
  }

  const allowedEmails = getAdminAllowedEmails();
  if (allowedEmails.length > 0 && user?.email && !isEmailAllowedForAdmin(user.email)) {
    signOut();
    return <Navigate to="/" state={{ adminDenied: true }} replace />;
  }

  const isAdmin = profile?.role === 'admin';
  if (!isAdmin) {
    // Bounce to home so /admin never shows the login page; allowed admins use /admin/login to sign in.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
