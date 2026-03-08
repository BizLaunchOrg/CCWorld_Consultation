import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Profile } from '../../types/profile';
import { ListCard } from '../../components/admin/ListCard';

export function AdminUsersPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setProfiles((data ?? []) as Profile[]);
    setLoading(false);
  }

  async function setRole(profileId: string, role: 'client' | 'admin') {
    setUpdating(profileId);
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', profileId);
    setUpdating(null);
    if (error) {
      setToast('Failed to update role');
      return;
    }
    setProfiles((prev) => prev.map((p) => (p.id === profileId ? { ...p, role } : p)));
    setToast(`Role set to ${role}`);
  }

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  if (loading) {
    return (
      <div className="space-y-6">
        <p className="text-slate-500 dark:text-slate-400">Loading users…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white md:hidden">Users</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Promote or demote users to admin. Only admins can access the admin panel.
        </p>
      </div>

      <div className="space-y-3">
        {profiles.map((p) => (
          <ListCard
            key={p.id}
            title={p.name || p.email || p.id}
            subtitle={p.email || '—'}
            meta={`Role: ${p.role}`}
            badge={
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  p.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {p.role}
              </span>
            }
          >
            <div className="mt-3 flex items-center gap-2">
              {p.role === 'admin' ? (
                <button
                  type="button"
                  onClick={() => setRole(p.id, 'client')}
                  disabled={updating === p.id}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50"
                >
                  {updating === p.id ? 'Updating…' : 'Demote to client'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setRole(p.id, 'admin')}
                  disabled={updating === p.id}
                  className="px-3 py-1.5 rounded-xl bg-primary/10 text-primary border border-primary/20 text-sm font-semibold hover:bg-primary/20 disabled:opacity-50"
                >
                  {updating === p.id ? 'Updating…' : 'Promote to admin'}
                </button>
              )}
            </div>
          </ListCard>
        ))}
      </div>

      {profiles.length === 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-10 text-center text-slate-500 dark:text-slate-400">
          No users yet. Users appear here after they sign up.
        </div>
      )}

      {toast && (
        <div
          className="fixed bottom-6 right-6 z-[200] flex items-center gap-2 px-4 py-3 rounded-2xl bg-primary text-white font-bold shadow-lg"
          role="status"
          aria-live="polite"
        >
          <span className="material-symbols-outlined text-lg">check_circle</span>
          {toast}
        </div>
      )}
    </div>
  );
}
