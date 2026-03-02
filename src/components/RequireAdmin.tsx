import { Navigate, useLocation } from 'react-router-dom';
import { isAdmin } from '../lib/adminAuth';

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  if (!isAdmin()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
