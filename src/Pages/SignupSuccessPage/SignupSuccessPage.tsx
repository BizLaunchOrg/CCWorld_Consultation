import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Shown after signup (email confirm or Google). Same card-style UI as signup/login.
 */
export function SignupSuccessPage() {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const name = profile?.name?.trim() || user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'there';

  useEffect(() => {
    if (!loading && !user) {
      navigate('/signup', { replace: true });
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <main className="min-h-screen relative mesh-gradient overflow-hidden flex flex-col items-center justify-center px-6 py-24">
        <div className="grid-overlay absolute inset-0 pointer-events-none" />
        <p className="relative z-10 text-slate-500 dark:text-slate-400">Loading…</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen relative mesh-gradient overflow-hidden flex flex-col items-center justify-center px-6 py-24">
      <div className="grid-overlay absolute inset-0 pointer-events-none" />
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-accent/20 text-teal-accent mb-6">
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
            Successfully signed up
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Welcome, <span className="font-bold text-slate-900 dark:text-white">{name}</span>. Your account is ready.
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">
            You can now book consultations and pay for trainings.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-teal-accent text-background-dark font-bold hover:shadow-[0_0_24px_rgba(45,212,191,0.35)] transition-all"
          >
            Continue to home
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
