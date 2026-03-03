import { useState, useEffect, useMemo } from 'react';
import type { AdminConsultation, ConsultationStatus, EngagementType } from '../../types/admin';
import { seedConsultations } from '../../data/adminSeed';
import { ListCard } from '../../components/admin/ListCard';
import { Drawer } from '../../components/admin/Drawer';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

function formatEngagementType(t?: string): string {
  if (!t) return '—';
  const map: Record<string, string> = {
    licensing_pssp: 'Licensing Advisory: PSSP',
    licensing_ptsp: 'Licensing Advisory: PTSP',
    licensing_sandbox: 'Licensing Advisory: Regulatory Sandbox',
    training: 'Training',
    advisory: 'Advisory (Risk review & recommendation)',
  };
  return map[t] ?? t;
}

function formatStage(s?: string): string {
  if (!s) return '—';
  const map: Record<string, string> = {
    pre_application: 'Pre-application',
    aip: 'AIP',
    existing_ops: 'Existing Ops',
    not_sure: 'Not sure',
  };
  return map[s] ?? s;
}

const STATUS_OPTIONS: { value: ConsultationStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'new', label: 'New' },
  { value: 'in_review', label: 'In review' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'completed', label: 'Completed' },
];

const ENGAGEMENT_OPTIONS: { value: EngagementType | 'all'; label: string }[] = [
  { value: 'all', label: 'All types' },
  { value: 'licensing_pssp', label: 'Licensing: PSSP' },
  { value: 'licensing_ptsp', label: 'Licensing: PTSP' },
  { value: 'licensing_sandbox', label: 'Licensing: Sandbox' },
  { value: 'training', label: 'Training' },
  { value: 'advisory', label: 'Advisory' },
];

export function AdminConsultationsPage() {
  const [consultations, setConsultations] = useState<AdminConsultation[]>(() => [...seedConsultations]);
  const [selected, setSelected] = useState<AdminConsultation | null>(null);
  const [status, setStatus] = useState<ConsultationStatus>(selected?.status ?? 'new');
  const [internalNotes, setInternalNotes] = useState(selected?.internal_notes ?? '');
  const [statusFilter, setStatusFilter] = useState<ConsultationStatus | 'all'>('all');
  const [engagementFilter, setEngagementFilter] = useState<EngagementType | 'all'>('all');
  const [toast, setToast] = useState<string | null>(null);

  const newCount = useMemo(() => consultations.filter((c) => c.status === 'new').length, [consultations]);

  const filtered = useMemo(() => {
    return consultations.filter((c) => {
      const matchStatus = statusFilter === 'all' || c.status === statusFilter;
      const matchEngagement = engagementFilter === 'all' || c.engagement_type === engagementFilter;
      return matchStatus && matchEngagement;
    });
  }, [consultations, statusFilter, engagementFilter]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);

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
    setSelected(null);
    setToast('Changes saved');
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white md:hidden">Consultation requests</h1>
            {newCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold bg-teal-accent/20 text-teal-accent border border-teal-accent/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-accent" />
                </span>
                {newCount} new
              </span>
            )}
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">All requests (inquiries only, no payment).</p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ConsultationStatus | 'all')}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-teal-accent/50 outline-none"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">Type</label>
            <select
              value={engagementFilter}
              onChange={(e) => setEngagementFilter(e.target.value as EngagementType | 'all')}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-teal-accent/50 outline-none min-w-[180px]"
            >
              {ENGAGEMENT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => { setStatusFilter('all'); setEngagementFilter('all'); }}
            className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-teal-accent"
          >
            Clear filters
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((c) => (
          <ListCard
            key={c.id}
            title={c.customer_name}
            subtitle={c.service_selected}
            meta={`Submitted ${formatDate(c.created_at)}`}
            badge={
              <div className="flex items-center gap-2">
                {c.status === 'new' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-accent text-background-dark uppercase">
                    New
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400">
                  {c.status}
                </span>
              </div>
            }
            onClick={() => openDetail(c)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-10 text-center text-slate-500 dark:text-slate-400">
          {consultations.length === 0 ? 'No consultation requests yet.' : 'No requests match the selected filters.'}
        </div>
      )}

      {toast && (
        <div
          className="fixed bottom-6 right-6 z-[200] flex items-center gap-2 px-4 py-3 rounded-2xl bg-teal-accent text-background-dark font-bold shadow-lg"
          style={{ animation: 'fadeIn 0.2s ease-out' }}
          role="status"
          aria-live="polite"
        >
          <span className="material-symbols-outlined text-lg">check_circle</span>
          {toast}
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
              <p><span className="text-slate-500 dark:text-slate-400 block text-xs font-bold uppercase tracking-wider">Engagement type</span>{formatEngagementType(selected.engagement_type)}</p>
              {selected.license_type && <p><span className="text-slate-500 dark:text-slate-400 block text-xs font-bold uppercase tracking-wider">License type</span><span className="capitalize">{selected.license_type}</span></p>}
              {selected.stage && <p><span className="text-slate-500 dark:text-slate-400 block text-xs font-bold uppercase tracking-wider">Stage</span>{formatStage(selected.stage)}</p>}
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
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Note / message</p>
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
