/**
 * Admin route guard: only emails in VITE_ADMIN_ALLOWED_EMAILS can access /admin and /admin/login.
 * Set in .env as comma-separated list, e.g. VITE_ADMIN_ALLOWED_EMAILS=admin@ccworldconsultation.com,you@example.com
 * If not set, no allow-list is enforced (anyone can try to log in; role still required).
 */

const ALLOWED_EMAILS_KEY = 'VITE_ADMIN_ALLOWED_EMAILS';

function parseAllowedEmails(): string[] {
  const raw = import.meta.env[ALLOWED_EMAILS_KEY];
  if (typeof raw !== 'string' || !raw.trim()) return [];
  return raw
    .split(',')
    .map((e: string) => e.trim().toLowerCase())
    .filter(Boolean);
}

let cached: string[] | null = null;

export function getAdminAllowedEmails(): string[] {
  if (cached === null) cached = parseAllowedEmails();
  return cached;
}

export function isEmailAllowedForAdmin(email: string | undefined): boolean {
  if (!email) return false;
  const allowed = getAdminAllowedEmails();
  if (allowed.length === 0) return true; // no allow list = allow all (role still checked)
  return allowed.includes(email.trim().toLowerCase());
}
