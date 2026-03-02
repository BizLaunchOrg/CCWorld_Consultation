import { Link } from 'react-router-dom';
import { StatCard } from '../../components/admin/StatCard';
import { seedTransactions, seedConsultations, seedConversations } from '../../data/adminSeed';
import { getPublishedServices } from '../../data/services';
import { DEMO_TRAININGS } from '../../data/trainings';

const paidTrainingCount = seedTransactions.filter((t) => t.status === 'paid').length;
const newConsultations = seedConsultations.filter((c) => c.status === 'new').length;
const unreadMessages = seedConversations.reduce((acc, c) => acc + c.unread_count, 0);
const publishedTrainings = DEMO_TRAININGS.filter((t) => t.published !== false).length;
const publishedServices = getPublishedServices().length;

const recentActivity = [
  { id: '1', type: 'payment', text: 'Payment received: NGN 250,000 — Compliance Culture Training', time: '2 hours ago' },
  { id: '2', type: 'consultation', text: 'New consultation request from Amina Bello', time: '3 hours ago' },
  { id: '3', type: 'message', text: 'New message in conversation with Chioma Eze', time: '5 hours ago' },
  { id: '4', type: 'payment', text: 'Payment received: NGN 320,000 — Compliance Landscape Training', time: 'Yesterday' },
];

export function AdminDashboardPage() {
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
          value={paidTrainingCount}
          icon="payments"
          accent="teal"
        />
        <StatCard
          title="New consultation requests"
          value={newConsultations}
          icon="event_note"
          accent="primary"
        />
        <StatCard
          title="Unread messages"
          value={unreadMessages}
          icon="chat"
          accent="teal"
        />
        <StatCard
          title="Published trainings / services"
          value={`${publishedTrainings} / ${publishedServices}`}
          subtitle="Trainings / Services"
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
