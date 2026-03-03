import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

/**
 * Admin sign-in uses same Supabase auth. After sign-in, RequireAdmin checks profiles.role === 'admin'.
 */
export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/admin';

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-background-dark px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 shadow-xl dark:shadow-none p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Admin sign in</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">
            Sign in with an account that has admin role.
          </p>
        </div>
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
        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Admin access is granted via profiles.role in Supabase. Promote a user in Admin → Users.
        </p>
      </div>
    </div>
  );
}
