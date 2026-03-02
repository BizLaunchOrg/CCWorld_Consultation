import { useState, useMemo } from 'react';
import type { Service, ServiceLevel } from '../../types/service';
import { SERVICES_LIST } from '../../data/services';
import { Modal } from '../../components/admin/Modal';

function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const LEVELS: ServiceLevel[] = ['Foundation', 'Build', 'Advanced', 'Managed'];

const emptyForm: Omit<Service, 'id' | 'updated_at'> & { id?: string; updated_at?: string } = {
  title: '',
  slug: '',
  tagline: '',
  summary: '',
  categories: [],
  outcomes: [],
  duration_label: '',
  level: 'Foundation',
  amount: '',
  icon: 'design_services',
  published: false,
  sort_order: 0,
};

function ListEditor({
  items,
  onChange,
  placeholder,
  label,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
  label: string;
}) {
  function add() {
    onChange([...items, '']);
  }
  function set(i: number, v: string) {
    onChange(items.map((x, j) => (j === i ? v : x)));
  }
  function remove(i: number) {
    onChange(items.filter((_, j) => j !== i));
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{label}</label>
        <button type="button" onClick={add} className="text-xs font-semibold text-teal-accent">+ Add</button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => set(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
            />
            <button type="button" onClick={() => remove(i)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl">
              <span className="material-symbols-outlined text-lg">remove</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>(() => [...SERVICES_LIST]);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<typeof emptyForm>({ ...emptyForm });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    let list = services;
    if (filter === 'published') list = list.filter((s) => s.published);
    if (filter === 'draft') list = list.filter((s) => !s.published);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.slug.toLowerCase().includes(q) ||
          s.summary.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q)
      );
    }
    return list;
  }, [services, filter, search]);

  const slugs = useMemo(() => new Set(services.map((s) => s.slug)), [services]);

  function openCreate() {
    setEditing(null);
    setForm({ ...emptyForm });
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(s: Service) {
    setEditing(s);
    setForm({
      id: s.id,
      title: s.title,
      slug: s.slug,
      tagline: s.tagline,
      summary: s.summary,
      categories: [...s.categories],
      outcomes: [...s.outcomes],
      duration_label: s.duration_label,
      level: s.level,
      amount: s.amount,
      icon: s.icon,
      published: s.published,
      sort_order: s.sort_order ?? 0,
      updated_at: s.updated_at,
    });
    setErrors({});
    setModalOpen(true);
  }

  function handleTitleChange(title: string) {
    setForm((f) => ({
      ...f,
      title,
      slug: editing ? f.slug : slugFromTitle(title),
    }));
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.slug.trim()) e.slug = 'Slug is required';
    else if (!editing && slugs.has(form.slug)) e.slug = 'Slug already in use';
    if (!form.tagline.trim()) e.tagline = 'Tagline is required';
    if (!form.summary.trim()) e.summary = 'Summary is required';
    if (!form.duration_label.trim()) e.duration_label = 'Duration is required';
    if (!form.amount.trim()) e.amount = 'Amount is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    const slug = form.slug.trim();
    const now = new Date().toISOString();
    if (editing) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === editing.id
            ? {
                ...s,
                ...form,
                slug,
                categories: form.categories.filter(Boolean),
                outcomes: form.outcomes.filter(Boolean),
                updated_at: now,
              }
        : s
        )
      );
    } else {
      setServices((prev) => [
        ...prev,
        {
          id: `svc-${Date.now()}`,
          title: form.title.trim(),
          slug,
          tagline: form.tagline.trim(),
          summary: form.summary.trim(),
          categories: form.categories.filter(Boolean),
          outcomes: form.outcomes.filter(Boolean),
          duration_label: form.duration_label.trim(),
          level: form.level,
          amount: form.amount.trim(),
          icon: form.icon.trim() || 'design_services',
          published: form.published,
          sort_order: form.sort_order ?? 0,
          updated_at: now,
        },
      ]);
    }
    setModalOpen(false);
  }

  function togglePublished(s: Service) {
    setServices((prev) =>
      prev.map((x) => (x.id === s.id ? { ...x, published: !x.published, updated_at: new Date().toISOString() } : x))
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white md:hidden">Services</h1>
        <div className="flex flex-wrap gap-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services…"
            className="flex-1 min-w-[200px] rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 px-4 py-2.5 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-500 focus:border-teal-accent/50 outline-none"
          />
          <div className="flex rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
            {(['all', 'published', 'draft'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 text-sm font-semibold capitalize ${
                  filter === f ? 'bg-teal-accent text-background-dark' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="px-5 py-2.5 rounded-2xl bg-teal-accent text-background-dark font-bold hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            Add Service
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-5 shadow-sm dark:shadow-none"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 dark:text-white">{s.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.slug}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">{s.tagline}</p>
                <p className="text-primary font-bold mt-2">{s.amount}</p>
              </div>
              <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-accent/10 text-teal-accent">
                {s.level}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={s.published}
                  onChange={() => togglePublished(s)}
                  className="rounded border-slate-300 text-teal-accent focus:ring-teal-accent"
                />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Published</span>
              </label>
              <button type="button" onClick={() => openEdit(s)} className="text-sm font-semibold text-teal-accent hover:underline">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-10 text-center text-slate-500 dark:text-slate-400">
          No services match your filters.
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit service' : 'Add service'}>
        <div className="space-y-5">
          <section>
            <h3 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Basics</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100 focus:border-teal-accent/50 outline-none"
                  placeholder="Service title"
                />
                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Slug *</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100 focus:border-teal-accent/50 outline-none"
                  placeholder="url-slug"
                />
                {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Tagline *</label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100 focus:border-teal-accent/50 outline-none"
                  placeholder="Short one-liner"
                />
                {errors.tagline && <p className="text-xs text-red-500 mt-1">{errors.tagline}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Summary *</label>
                <textarea
                  value={form.summary}
                  onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
                  rows={3}
                  className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100 focus:border-teal-accent/50 outline-none resize-none"
                  placeholder="Longer description"
                />
                {errors.summary && <p className="text-xs text-red-500 mt-1">{errors.summary}</p>}
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Content</h3>
            <ListEditor
              label="Categories / tags"
              items={form.categories}
              onChange={(categories) => setForm((f) => ({ ...f, categories }))}
              placeholder="e.g. Governance, Policies"
            />
            <div className="mt-4">
              <ListEditor
                label="Outcomes (typical outputs)"
                items={form.outcomes}
                onChange={(outcomes) => setForm((f) => ({ ...f, outcomes }))}
                placeholder="e.g. Board-approved charter"
              />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Display / badges</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Duration *</label>
                <input
                  type="text"
                  value={form.duration_label}
                  onChange={(e) => setForm((f) => ({ ...f, duration_label: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100"
                  placeholder="e.g. 8–12 weeks"
                />
                {errors.duration_label && <p className="text-xs text-red-500 mt-1">{errors.duration_label}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Level</label>
                <select
                  value={form.level}
                  onChange={(e) => setForm((f) => ({ ...f, level: e.target.value as ServiceLevel }))}
                  className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100"
                >
                  {LEVELS.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Amount *</label>
                <input
                  type="text"
                  value={form.amount}
                  onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100"
                  placeholder="NGN 450,000"
                />
                {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Icon (Material Symbol)</label>
                <input
                  type="text"
                  value={form.icon}
                  onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100"
                  placeholder="design_services"
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Publish</h3>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                  className="rounded border-slate-300 text-teal-accent focus:ring-teal-accent"
                />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Published</span>
              </label>
              <div className="flex items-center gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Sort order</label>
                <input
                  type="number"
                  min={0}
                  value={form.sort_order ?? 0}
                  onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) || 0 }))}
                  className="w-20 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-3 py-2 text-sm"
                />
              </div>
            </div>
          </section>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 py-3 rounded-2xl bg-teal-accent text-background-dark font-bold"
            >
              {editing ? 'Save' : 'Add'}
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-5 py-3 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
