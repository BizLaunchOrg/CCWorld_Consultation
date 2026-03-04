import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StatCard } from '../../components/admin/StatCard';
import { fetchAdminDashboardStats } from '../../lib/adminDashboard';
import { subscribeToAllMessages } from '../../lib/chatApi';
import { getPublishedServices } from '../../data/services';

function formatNGN(n: number): string {
  return `NGN ${n.toLocaleString('en-NG')}`;
}

function formatTimeAgo(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 60) return diffMins <= 1 ? 'Just now' : `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  return d.toLocaleDateString();
}

export function AdminDashboardPage() {
  const [stats, setStats] = useState<Awaited<ReturnType<typeof fetchAdminDashboardStats>> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminDashboardStats().then(setStats).finally(() => setLoading(false));
  }, []);

  // Realtime: refetch stats when any new message arrives so unread count updates without refresh
  useEffect(() => {
    const unsub = subscribeToAllMessages(() => {
      fetchAdminDashboardStats().then((next) => setStats((prev) => (prev ? { ...next, error: prev.error } : next)));
    });
    return unsub;
  }, []);

  const publishedServices = getPublishedServices().length;

  if (loading || !stats) {
    return (
      <div className="space-y-8">
        <p className="text-slate-500 dark:text-slate-400">Loading dashboard…</p>
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="space-y-8">
        <div className="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 p-6">
          <h2 className="text-lg font-bold text-amber-800 dark:text-amber-200 mb-2">Could not load dashboard data</h2>
          <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">This often means your admin user’s profile role is not set to <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">admin</code>, or Row Level Security is blocking reads.</p>
          <p className="text-xs font-mono text-slate-600 dark:text-slate-400 break-all">{stats.error}</p>
        </div>
      </div>
    );
  }

  const recentActivity = [
    ...stats.recentOrders.slice(0, 5).map((o) => ({
      id: o.id,
      type: 'payment' as const,
      text: `${o.status === 'paid' ? 'Payment received' : o.status}: ${formatNGN(o.amount)} — ${o.productName}`,
      time: formatTimeAgo(o.created_at),
      created_at: o.created_at,
    })),
    ...stats.recentConsultations.slice(0, 5).map((c) => ({
      id: c.id,
      type: 'consultation' as const,
      text: `Consultation request from ${c.customerName} — ${c.topic}`,
      time: formatTimeAgo(c.created_at),
      created_at: c.created_at,
    })),
  ]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 8);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white md:hidden">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Overview of your compliance platform.</p>
      </div>

      {/* KPI cards — no Pending Transactions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total paid (trainings)"
          value={stats.paidTrainingCount}
          icon="payments"
          accent="teal"
        />
        <StatCard
          title="New consultation requests"
          value={stats.newConsultationsCount}
          icon="event_note"
          accent="primary"
        />
        <StatCard
          title="Unread messages"
          value={stats.unreadMessagesCount}
          icon="chat"
          accent="teal"
        />
        <StatCard
          title="Trainings & services"
          value={`${stats.activeTrainingsCount} · ${publishedServices}`}
          subtitle="Active trainings (database) · Published services (website)"
          icon="inventory_2"
          accent="gold"
        />
      </div>

      {/* Quick actions */}
      <div className="rounded-2xl md:rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 shadow-sm dark:shadow-none">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/trainings"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-teal-accent text-background-dark font-bold hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all"
          >
            <span className="material-symbols-outlined">add</span>
            Add Training
          </Link>
          <Link
            to="/admin/services"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-teal-accent/50 text-teal-accent font-bold hover:bg-teal-accent/10 transition-all"
          >
            <span className="material-symbols-outlined">add</span>
            Add Service
          </Link>
          <Link
            to="/admin/transactions"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-gold-accent/50 text-gold-accent font-bold hover:bg-gold-accent/10 transition-all"
          >
            <span className="material-symbols-outlined">list</span>
            View Transactions
          </Link>
          <Link
            to="/admin/messages"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-primary/50 text-primary font-bold hover:bg-primary/10 transition-all"
          >
            <span className="material-symbols-outlined">chat</span>
            Open Messages
          </Link>
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-2xl md:rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 shadow-sm dark:shadow-none">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent activity</h2>
        {recentActivity.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400 text-sm">No recent activity yet.</p>
        ) : (
        <ul className="space-y-3">
          {recentActivity.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-3 py-3 border-b border-slate-100 dark:border-white/5 last:border-0"
            >
              <span className="material-symbols-outlined text-teal-accent shrink-0 mt-0.5">
                {item.type === 'payment' ? 'payments' : item.type === 'consultation' ? 'event_note' : 'chat'}
              </span>
              <div className="min-w-0">
                <p className="text-sm text-slate-900 dark:text-white">{item.text}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
        )}
      </div>

      {/* Chart placeholder */}
      <div className="rounded-2xl md:rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 shadow-sm dark:shadow-none">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Revenue overview</h2>
        <div className="h-40 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-sm">
          Chart placeholder — connect Supabase + chart library later
        </div>
      </div>
    </div>
  );
}
