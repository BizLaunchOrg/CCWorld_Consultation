import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { getAdminAllowedEmails, isEmailAllowedForAdmin } from '../../lib/adminGuard';

/**
 * Admin sign-in uses same Supabase auth. After sign-in, RequireAdmin checks profiles.role === 'admin'.
 * If VITE_ADMIN_ALLOWED_EMAILS is set, only those emails can access this page; others are bounced to home and signed out.
 * Supports both email/password and Google sign-in.
 */
export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, session, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/admin';

  const allowedEmails = getAdminAllowedEmails();
  const isAllowedEmail = session?.user?.email ? isEmailAllowedForAdmin(session.user.email) : true;
  const bounceNonAllowed = allowedEmails.length > 0 && !!session && !isAllowedEmail;

  useEffect(() => {
    if (bounceNonAllowed) signOut();
  }, [bounceNonAllowed, signOut]);

  if (bounceNonAllowed) {
    return <Navigate to="/" state={{ adminDenied: true }} replace />;
  }

  const isLoggedInNotAdmin = !!session && profile !== null && profile?.role !== 'admin';

  useEffect(() => {
    if (session && profile?.role === 'admin') {
      navigate(from, { replace: true });
    }
  }, [session, profile, navigate, from]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Enter email and password.');
      return;
    }
    setSubmitting(true);
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setSubmitting(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    if (!data.user) {
      setError('Login failed.');
      return;
    }
    if (getAdminAllowedEmails().length > 0 && !isEmailAllowedForAdmin(data.user.email)) {
      setError('This email is not authorized to access admin.');
      await supabase.auth.signOut();
      return;
    }
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();
    if (profile?.role !== 'admin') {
      setError('This account does not have admin access.');
      await supabase.auth.signOut();
      return;
    }
    navigate(from, { replace: true });
  }

  async function handleGoogleSignIn() {
    setError('');
    setGoogleLoading(true);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/admin` },
    });
    setGoogleLoading(false);
    if (oauthError) setError(oauthError.message);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-background-dark px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 shadow-xl dark:shadow-none p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Admin sign in</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">
            Sign in with an account that has admin role.
          </p>
        </div>

        {isLoggedInNotAdmin && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-200 text-sm">
            <p className="font-semibold">This account does not have admin access.</p>
            <p className="mt-1 text-amber-700 dark:text-amber-300">Sign out and use an admin account, or ask an admin to promote your account.</p>
            <button
              type="button"
              onClick={() => signOut().then(() => navigate('/admin/login', { replace: true }))}
              className="mt-3 w-full py-2 rounded-xl border border-amber-500/30 font-bold hover:bg-amber-500/10"
            >
              Sign out
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:border-teal-accent/50 outline-none"
              placeholder="admin@example.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:border-teal-accent/50 outline-none"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-2xl bg-teal-accent text-background-dark font-black hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all disabled:opacity-60"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="relative my-6">
          <span className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200 dark:border-white/10" />
          </span>
          <span className="relative flex justify-center text-xs font-medium text-slate-500 dark:text-slate-400">
            Or continue with
          </span>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {googleLoading ? (
            'Redirecting…'
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </>
          )}
        </button>

        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Admin access is granted via profiles.role in Supabase. Promote a user in Admin → Users (or in Supabase Dashboard).
        </p>
      </div>
    </div>
  );
}
