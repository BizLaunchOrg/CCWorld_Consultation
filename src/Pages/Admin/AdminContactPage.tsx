import { useState, useEffect } from 'react';
import { fetchAdminContactSubmissions, getContactSendToLabel, type ContactSubmission } from '../../lib/contactSubmissions';
import { ListCard } from '../../components/admin/ListCard';
import { Drawer } from '../../components/admin/Drawer';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

export function AdminContactPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    fetchAdminContactSubmissions().then((list) => {
      setSubmissions(list);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white md:hidden">Contact form submissions</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Request trail: all Contact Us form submissions. Each was sent to one of: General, Company, or Opeyemi.
        </p>
      </div>

      <div className="space-y-3">
        {loading ? (
          <p className="text-slate-500 dark:text-slate-400">Loading…</p>
        ) : submissions.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-10 text-center text-slate-500 dark:text-slate-400">
            No contact form submissions yet.
          </div>
        ) : (
          submissions.map((s) => (
            <ListCard
              key={s.id}
              title={s.name}
              subtitle={s.subject || s.message.slice(0, 80) + (s.message.length > 80 ? '…' : '')}
              meta={`${formatDate(s.created_at)} · Sent to: ${getContactSendToLabel(s.send_to)}`}
              badge={
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400">
                  {s.send_to}
                </span>
              }
              onClick={() => setSelected(s)}
            />
          ))
        )}
      </div>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Contact submission">
        {selected && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 space-y-3 text-sm">
              <p><span className="text-slate-500 dark:text-slate-400 block text-xs font-bold uppercase tracking-wider">Name</span>{selected.name}</p>
              <p><span className="text-slate-500 dark:text-slate-400 block text-xs font-bold uppercase tracking-wider">Email</span>{selected.email}</p>
              <p><span className="text-slate-500 dark:text-slate-400 block text-xs font-bold uppercase tracking-wider">Sent to</span>{getContactSendToLabel(selected.send_to)}</p>
              {selected.subject && (
                <p><span className="text-slate-500 dark:text-slate-400 block text-xs font-bold uppercase tracking-wider">Subject</span>{selected.subject}</p>
              )}
              <p><span className="text-slate-500 dark:text-slate-400 block text-xs font-bold uppercase tracking-wider">Submitted</span>{formatDate(selected.created_at)}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Message</p>
              <p className="text-slate-900 dark:text-white whitespace-pre-wrap">{selected.message}</p>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
