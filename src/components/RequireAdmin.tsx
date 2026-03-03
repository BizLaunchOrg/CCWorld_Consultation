import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Route guard: only users with profiles.role === 'admin' can access.
 * RLS enforces admin-only access at the database level; this is UX only.
 */
export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-background-dark">
        <p className="text-slate-600 dark:text-slate-400">Loading…</p>
      </div>
    );
  }

  const isAdmin = profile?.role === 'admin';
  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
