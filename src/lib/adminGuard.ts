/**
 * Admin route guard: only emails in VITE_ADMIN_ALLOWED_EMAILS can access /admin and /admin/login.
 * Set in .env as comma-separated list, e.g. VITE_ADMIN_ALLOWED_EMAILS=admin@ccworldconsultation.com,you@example.com
 * If not set, no allow-list is enforced (anyone can try to log in; role still required).
 *
 * Optional VITE_ADMIN_LOGIN_SECRET: if set, /admin/login only shows when URL has ?t=SECRET.
 * Use the full URL https://yoursite.com/admin/login?t=YourSecret to access admin login; without the param, visitors are redirected to home.
 */

const ALLOWED_EMAILS_KEY = 'VITE_ADMIN_ALLOWED_EMAILS';
const LOGIN_SECRET_KEY = 'VITE_ADMIN_LOGIN_SECRET';

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

/** If set, the admin login page is only accessible when the URL has ?t=this_secret */
let loginSecretCache: string | null | undefined = undefined;

export function getAdminLoginSecret(): string {
  if (loginSecretCache === undefined) {
    const raw = import.meta.env[LOGIN_SECRET_KEY];
    loginSecretCache = typeof raw === 'string' && raw.trim() ? raw.trim() : '';
  }
  return loginSecretCache ?? '';
}

export function isAdminLoginSecretRequired(): boolean {
  return getAdminLoginSecret().length > 0;
}

export function isAdminLoginSecretValid(token: string | null | undefined): boolean {
  const secret = getAdminLoginSecret();
  if (!secret) return true; // no secret configured = no check
  return typeof token === 'string' && token === secret;
}

export function isEmailAllowedForAdmin(email: string | undefined): boolean {
  if (!email) return false;
  const allowed = getAdminAllowedEmails();
  if (allowed.length === 0) return true; // no allow list = allow all (role still checked)
  return allowed.includes(email.trim().toLowerCase());
}
