import { useState, useEffect } from 'react';
import type { AdminConsultation, ConsultationStatus } from '../../types/admin';
import { seedConsultations } from '../../data/adminSeed';
import { ListCard } from '../../components/admin/ListCard';
import { Drawer } from '../../components/admin/Drawer';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

export function AdminConsultationsPage() {
  const [consultations, setConsultations] = useState<AdminConsultation[]>(() => [...seedConsultations]);
  const [selected, setSelected] = useState<AdminConsultation | null>(null);
  const [status, setStatus] = useState<ConsultationStatus>(selected?.status ?? 'new');
  const [internalNotes, setInternalNotes] = useState(selected?.internal_notes ?? '');

  useEffect(() => {
    if (selected) {
      setStatus(selected.status);
      setInternalNotes(selected.internal_notes ?? '');
    }
  }, [selected?.id]);

  function openDetail(c: AdminConsultation) {
    setSelected(c);
    setStatus(c.status);
    setInternalNotes(c.internal_notes ?? '');
  }

  function handleSaveDetail() {
    if (!selected) return;
    setConsultations((prev) =>
      prev.map((c) =>
        c.id === selected.id ? { ...c, status, internal_notes: internalNotes } : c
      )
    );
    setSelected((s) => (s ? { ...s, status, internal_notes: internalNotes } : null));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white md:hidden">Consultation requests</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">All requests (inquiries only, no payment).</p>
      </div>

      <div className="space-y-3">
        {consultations.map((c) => (
          <ListCard
            key={c.id}
            title={c.customer_name}
            subtitle={c.service_selected}
            meta={`Submitted ${formatDate(c.created_at)}`}
            badge={
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400">
                {c.status}
              </span>
            }
            onClick={() => openDetail(c)}
          />
        ))}
      </div>

      {consultations.length === 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-10 text-center text-slate-500 dark:text-slate-400">
          No consultation requests yet.
        </div>
      )}

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Consultation details"
      >
        {selected && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 space-y-3 text-sm">
              <p><span className="text-slate-500 dark:text-slate-400 block text-xs font-bold uppercase tracking-wider">Full name</span>{selected.customer_name}</p>
              <p><span className="text-slate-500 dark:text-slate-400 block text-xs font-bold uppercase tracking-wider">Email</span>{selected.email}</p>
              <p><span className="text-slate-500 dark:text-slate-400 block text-xs font-bold uppercase tracking-wider">Phone</span>{selected.phone}</p>
              <p><span className="text-slate-500 dark:text-slate-400 block text-xs font-bold uppercase tracking-wider">Company / Organization</span>{selected.company || '—'}</p>
              <p><span className="text-slate-500 dark:text-slate-400 block text-xs font-bold uppercase tracking-wider">Job title</span>{selected.job_title || '—'}</p>
              <p><span className="text-slate-500 dark:text-slate-400 block text-xs font-bold uppercase tracking-wider">Selected service / inquiry type</span>{selected.service_selected}</p>
              {selected.preferred_date && (
                <p><span className="text-slate-500 dark:text-slate-400 block text-xs font-bold uppercase tracking-wider">Preferred date / time</span>{selected.preferred_date}{selected.preferred_time ? ` ${selected.preferred_time}` : ''}</p>
              )}
              {selected.team_size && <p><span className="text-slate-500 dark:text-slate-400 block text-xs font-bold uppercase tracking-wider">Team size</span>{selected.team_size}</p>}
              {selected.region && <p><span className="text-slate-500 dark:text-slate-400 block text-xs font-bold uppercase tracking-wider">Region</span>{selected.region}</p>}
              {selected.gap && <p><span className="text-slate-500 dark:text-slate-400 block text-xs font-bold uppercase tracking-wider">Gap / focus</span>{selected.gap}</p>}
              <p><span className="text-slate-500 dark:text-slate-400 block text-xs font-bold uppercase tracking-wider">Submitted at</span>{formatDate(selected.created_at)}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Note / message / extra details</p>
              <p className="text-slate-900 dark:text-white whitespace-pre-wrap">{selected.note || '—'}</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ConsultationStatus)}
                className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100 focus:border-teal-accent/50 outline-none"
              >
                <option value="new">New</option>
                <option value="in_review">In review</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Internal notes</label>
              <textarea
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100 focus:border-teal-accent/50 outline-none resize-none"
                placeholder="Internal notes (not visible to customer)"
              />
            </div>
            <button
              type="button"
              onClick={handleSaveDetail}
              className="w-full py-3 rounded-2xl bg-teal-accent text-background-dark font-bold"
            >
              Save changes
            </button>
          </div>
        )}
      </Drawer>
    </div>
  );
}
