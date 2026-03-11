import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { TrainingProductRow } from '../../lib/adminTrainingProducts';
import { fetchAdminTrainingProducts, upsertTrainingProduct } from '../../lib/adminTrainingProducts';
import { Modal } from '../../components/admin/Modal';

function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function AdminTrainingsPage() {
  const [trainings, setTrainings] = useState<TrainingProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TrainingProductRow | null>(null);
  const [form, setForm] = useState<{
    name: string;
    slug: string;
    active: boolean;
    summary: string;
  }>({
    name: '',
    slug: '',
    active: true,
    summary: '',
  });

  useEffect(() => {
    fetchAdminTrainingProducts().then((list) => {
      setTrainings(list);
      setLoading(false);
    });
  }, []);

  const filtered = trainings.filter((t) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      t.name.toLowerCase().includes(q) ||
      t.slug.toLowerCase().includes(q) ||
      (t.summary?.toLowerCase().includes(q) ?? false)
    );
  });

  const slugs = new Set(trainings.map((t) => t.slug));

  function openCreate() {
    setEditing(null);
    setForm({
      name: '',
      slug: '',
      active: true,
      summary: '',
    });
    setModalOpen(true);
  }

  function openEdit(t: TrainingProductRow) {
    setEditing(t);
    setForm({
      name: t.name,
      slug: t.slug,
      active: t.active,
      summary: t.summary ?? '',
    });
    setModalOpen(true);
  }

  function handleTitleChange(name: string) {
    setForm((f) => ({
      ...f,
      name,
      slug: editing ? f.slug : slugFromTitle(name),
    }));
  }

  async function handleSave() {
    if (!form.name.trim()) return;
    const slug = form.slug.trim() || slugFromTitle(form.name);
    if (!slug) return;
    if (!editing && slugs.has(slug)) return;

    const { id, error } = await upsertTrainingProduct({
      id: editing?.id,
      name: form.name.trim(),
      slug,
      active: form.active,
      summary: form.summary.trim() || undefined,
    });
    if (error) {
      alert(error.message);
      return;
    }
    if (editing) {
      setTrainings((prev) =>
        prev.map((t) =>
          t.id === editing.id
            ? { ...t, name: form.name.trim(), slug, active: form.active, summary: form.summary.trim() || null, updated_at: new Date().toISOString() }
            : t
        )
      );
    } else {
      setTrainings((prev) => [
        {
          id,
          name: form.name.trim(),
          slug,
          active: form.active,
          summary: form.summary.trim() || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        ...prev,
      ]);
    }
    setModalOpen(false);
  }

  function toggleActive(t: TrainingProductRow) {
    const next = !t.active;
    upsertTrainingProduct({
      id: t.id,
      name: t.name,
      slug: t.slug,
      active: next,
      summary: t.summary ?? undefined,
    }).then(() => {
      setTrainings((prev) =>
        prev.map((x) => (x.id === t.id ? { ...x, active: next } : x))
      );
    });
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <p className="text-slate-500 dark:text-slate-400">Loading…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white md:hidden">Trainings</h1>
        <div className="flex flex-wrap gap-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="flex-1 min-w-[200px] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-500 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
          />
          <button
            type="button"
            onClick={openCreate}
            className="px-5 py-2.5 rounded-2xl bg-primary text-white font-bold hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            Add Training
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 p-5 shadow-sm dark:shadow-none"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 dark:text-white">{t.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.slug}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                  {t.summary || '—'}
                </p>
              </div>
              <span
                className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-bold ${
                  t.active ? 'bg-primary/10 text-primary' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {t.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
              <Link
                to={`/training/${t.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
              >
                Preview <span className="material-symbols-outlined text-sm">open_in_new</span>
              </Link>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={t.active}
                    onChange={() => toggleActive(t)}
                    className="rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Active</span>
                </label>
                <button type="button" onClick={() => openEdit(t)} className="text-sm font-semibold text-primary hover:underline">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 p-10 text-center text-slate-500 dark:text-slate-400">
          No trainings yet. Add one to show on the website.
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit training' : 'Add training'}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
              placeholder="Training name"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
              placeholder="url-slug"
            />
            {!editing && form.slug && slugs.has(form.slug) && (
              <p className="text-xs text-red-500 mt-1">Slug already in use.</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Summary</label>
            <textarea
              value={form.summary}
              onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
              rows={3}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none resize-none"
              placeholder="Short description"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(form.active)}
              onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
              className="rounded border-slate-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Active (show on website)</span>
          </label>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={!form.name.trim() || (!editing && !!form.slug && slugs.has(form.slug))}
              className="flex-1 py-3 rounded-2xl bg-primary text-white font-bold disabled:opacity-50"
            >
              {editing ? 'Save' : 'Add'}
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
