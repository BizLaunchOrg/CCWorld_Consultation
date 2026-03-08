import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [authError, setAuthError] = useState('');

  function validate(): boolean {
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = 'Email is required';
    else if (!EMAIL_RE.test(email.trim())) next.email = 'Enter a valid email address';
    if (!password) next.password = 'Password is required';
    else if (password.length < 8) next.password = 'Password must be at least 8 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAuthError('');
    if (!validate() || submitting) return;
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setSubmitting(false);
    if (error) {
      setAuthError(error.message);
      return;
    }
    setSuccess(true);
    setTimeout(() => navigate('/', { replace: true }), 800);
  }

  async function handleGoogleSignIn() {
    setAuthError('');
    const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${siteUrl}/` },
    });
    if (error) setAuthError(error.message);
  }

  return (
    <main className="min-h-screen relative mesh-gradient overflow-hidden flex flex-col items-center justify-center px-6 py-24">
      <div className="grid-overlay absolute inset-0 pointer-events-none" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-accent/10 border border-teal-accent/20 text-teal-accent text-xs font-bold uppercase tracking-widest mb-6">
            Welcome back
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3">
            Sign in to your account
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Access your compliance resources and training history.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:border-teal-accent/50 focus:ring-2 focus:ring-teal-accent/20 outline-none transition-all"
                placeholder="you@company.com"
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:border-teal-accent/50 focus:ring-2 focus:ring-teal-accent/20 outline-none transition-all"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">{errors.password}</p>
              )}
            </div>
            <div className="flex justify-end">
              <Link to="/login" className="text-sm font-semibold text-teal-accent hover:underline">
                Forgot password?
              </Link>
            </div>
            {authError && (
              <p className="text-sm text-red-500 dark:text-red-400">{authError}</p>
            )}
            <button
              type="submit"
              disabled={submitting || success}
              className="w-full py-4 rounded-2xl bg-teal-accent text-background-dark font-bold text-base hover:shadow-[0_0_24px_rgba(45,212,191,0.35)] transition-all disabled:opacity-60 disabled:pointer-events-none"
            >
              {submitting || success ? 'Signing in…' : 'Login'}
            </button>
            <div className="relative flex items-center gap-4">
              <span className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">or</span>
              <span className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
            </div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">mail</span>
              Continue with Google
            </button>
          </form>
        </div>
      </div>

      {success && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl bg-teal-accent/95 text-background-dark font-bold shadow-lg flex items-center gap-2"
        >
          <span className="material-symbols-outlined">check_circle</span>
          Success! Redirecting…
        </div>
      )}
    </main>
  );
}
