/**
 * Stub admin auth. Replace with Supabase auth + profiles role check.
 */

const ROLE_KEY = 'ccworld-admin-role';

export function getAdminRole(): string | null {
  try {
    return localStorage.getItem(ROLE_KEY);
  } catch {
    return null;
  }
}

export function setAdminRole(role: string | null): void {
  try {
    if (role == null) localStorage.removeItem(ROLE_KEY);
    else localStorage.setItem(ROLE_KEY, role);
  } catch {}
}

export function isAdmin(): boolean {
  const role = getAdminRole();
  return role === 'admin';
}

/** For development: set admin and return true. */
export function stubLoginAsAdmin(): boolean {
  setAdminRole('admin');
  return true;
}

export function logoutAdmin(): void {
  setAdminRole(null);
}
