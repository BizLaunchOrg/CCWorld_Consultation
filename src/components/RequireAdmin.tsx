import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAdminAllowedEmails, isEmailAllowedForAdmin } from '../lib/adminGuard';

/**
 * Route guard: only users with profiles.role === 'admin' can access.
 * If VITE_ADMIN_ALLOWED_EMAILS is set, only those emails can access admin at all; others are bounced to home and signed out.
 * RLS enforces admin-only access at the database level; this is UX only.
 */
export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { profile, user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-background-dark">
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
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
