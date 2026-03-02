import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Training, TrainingCategory } from '../../types/training';
import { DEMO_TRAININGS } from '../../data/trainings';
import { Modal } from '../../components/admin/Modal';

function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function formatNGN(n: number): string {
  return `NGN ${n.toLocaleString('en-NG')}`;
}

export function AdminTrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>(() => [...DEMO_TRAININGS]);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Training | null>(null);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    tagline: '',
    summary: '',
    benefits: [] as string[],
    modules: [] as string[],
    priceNGN: 0,
    deliveryFormat: '',
    duration_label: '',
    whoItsFor: '',
    audience: [] as string[],
    includes: [] as string[],
    faq: [] as { q: string; a: string }[],
    icon: 'school',
    category: 'training' as TrainingCategory,
    published: true,
    sort_order: 0,
  });

  const filtered = useMemo(() => {
    let list = trainings;
    if (filter === 'published') list = list.filter((t) => t.published !== false);
    if (filter === 'draft') list = list.filter((t) => t.published === false);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.slug.toLowerCase().includes(q) ||
          t.summary.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q)
      );
    }
    return list;
  }, [trainings, filter, search]);

  const slugs = useMemo(() => new Set(trainings.map((t) => t.slug)), [trainings]);

  function openCreate() {
    setEditing(null);
    setForm({
      title: '',
      slug: '',
      tagline: '',
      summary: '',
      benefits: [],
      modules: [],
      priceNGN: 0,
      deliveryFormat: '',
      duration_label: '',
      whoItsFor: '',
      audience: [],
      includes: [],
      faq: [],
      icon: 'school',
      category: 'training',
      published: false,
      sort_order: 0,
    });
    setModalOpen(true);
  }

  function openEdit(t: Training) {
    setEditing(t);
    setForm({
      title: t.title,
      slug: t.slug,
      tagline: t.tagline ?? '',
      summary: t.summary,
      benefits: [...t.benefits],
      modules: [...(t.modules ?? [])],
      priceNGN: t.priceNGN,
      deliveryFormat: t.deliveryFormat ?? '',
      duration_label: t.duration_label ?? '',
      whoItsFor: t.whoItsFor ?? '',
      audience: [...(t.audience ?? [])],
      includes: [...(t.includes ?? [])],
      faq: [...(t.faq ?? [])],
      icon: t.icon ?? 'school',
      category: t.category,
      published: t.published !== false,
      sort_order: t.sort_order ?? 0,
    });
    setModalOpen(true);
  }

  function handleTitleChange(title: string) {
    setForm((f) => ({
      ...f,
      title,
      slug: editing ? f.slug : slugFromTitle(title),
    }));
  }

  function addBenefit() {
    setForm((f) => ({ ...f, benefits: [...f.benefits, ''] }));
  }
  function setBenefit(i: number, v: string) {
    setForm((f) => ({ ...f, benefits: f.benefits.map((b, j) => (j === i ? v : b)) }));
  }
  function removeBenefit(i: number) {
    setForm((f) => ({ ...f, benefits: f.benefits.filter((_, j) => j !== i) }));
  }
  function addModule() {
    setForm((f) => ({ ...f, modules: [...f.modules, ''] }));
  }
  function setModule(i: number, v: string) {
    setForm((f) => ({ ...f, modules: f.modules.map((m, j) => (j === i ? v : m)) }));
  }
  function removeModule(i: number) {
    setForm((f) => ({ ...f, modules: f.modules.filter((_, j) => j !== i) }));
  }
  function addAudience() {
    setForm((f) => ({ ...f, audience: [...f.audience, ''] }));
  }
  function setAudience(i: number, v: string) {
    setForm((f) => ({ ...f, audience: f.audience.map((a, j) => (j === i ? v : a)) }));
  }
  function removeAudience(i: number) {
    setForm((f) => ({ ...f, audience: f.audience.filter((_, j) => j !== i) }));
  }
  function addIncludes() {
    setForm((f) => ({ ...f, includes: [...f.includes, ''] }));
  }
  function setIncludes(i: number, v: string) {
    setForm((f) => ({ ...f, includes: f.includes.map((x, j) => (j === i ? v : x)) }));
  }
  function removeIncludes(i: number) {
    setForm((f) => ({ ...f, includes: f.includes.filter((_, j) => j !== i) }));
  }
  function addFaq() {
    setForm((f) => ({ ...f, faq: [...f.faq, { q: '', a: '' }] }));
  }
  function setFaq(i: number, field: 'q' | 'a', v: string) {
    setForm((f) => ({ ...f, faq: f.faq.map((x, j) => (j === i ? { ...x, [field]: v } : x)) }));
  }
  function removeFaq(i: number) {
    setForm((f) => ({ ...f, faq: f.faq.filter((_, j) => j !== i) }));
  }

  function handleSave() {
    if (!form.title.trim()) return;
    const slug = form.slug.trim() || slugFromTitle(form.title);
    if (!slug) return;
    const now = new Date().toISOString();
    if (editing) {
      setTrainings((prev) =>
        prev.map((t) =>
          t.id === editing.id
            ? {
                ...t,
                title: form.title.trim(),
                slug,
                tagline: form.tagline.trim(),
                summary: form.summary.trim(),
                benefits: form.benefits.filter(Boolean),
                modules: form.modules.filter(Boolean),
                priceNGN: form.priceNGN,
                deliveryFormat: form.deliveryFormat.trim() || undefined,
                duration_label: form.duration_label.trim() || undefined,
                whoItsFor: form.whoItsFor.trim() || undefined,
                audience: form.audience.filter(Boolean).length ? form.audience.filter(Boolean) : undefined,
                includes: form.includes.filter(Boolean).length ? form.includes.filter(Boolean) : undefined,
                faq: form.faq.filter((x) => x.q.trim()).length ? form.faq.filter((x) => x.q.trim()).map((x) => ({ q: x.q.trim(), a: x.a.trim() })) : undefined,
                icon: form.icon.trim() || undefined,
                published: form.published,
                sort_order: form.sort_order,
                updated_at: now,
              }
            : t
        )
      );
    } else {
      if (slugs.has(slug)) return;
      setTrainings((prev) => [
        ...prev,
        {
          id: `tr-${Date.now()}`,
          title: form.title.trim(),
          slug,
          tagline: form.tagline.trim(),
          summary: form.summary.trim(),
          benefits: form.benefits.filter(Boolean),
          modules: form.modules.filter(Boolean),
          priceNGN: form.priceNGN,
          category: form.category,
          deliveryFormat: form.deliveryFormat.trim() || undefined,
          duration_label: form.duration_label.trim() || undefined,
          whoItsFor: form.whoItsFor.trim() || undefined,
          audience: form.audience.filter(Boolean).length ? form.audience.filter(Boolean) : undefined,
          includes: form.includes.filter(Boolean).length ? form.includes.filter(Boolean) : undefined,
          faq: form.faq.filter((x) => x.q.trim()).length ? form.faq.filter((x) => x.q.trim()).map((x) => ({ q: x.q.trim(), a: x.a.trim() })) : undefined,
          icon: form.icon.trim() || undefined,
          published: form.published,
          sort_order: form.sort_order,
          updated_at: now,
        },
      ]);
    }
    setModalOpen(false);
  }

  function togglePublished(t: Training) {
    setTrainings((prev) =>
      prev.map((x) => (x.id === t.id ? { ...x, published: x.published === false ? true : false, updated_at: new Date().toISOString() } : x))
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
            className="flex-1 min-w-[200px] rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 px-4 py-2.5 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-500 focus:border-teal-accent/50 outline-none"
          />
          <div className="flex rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
            {(['all', 'published', 'draft'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 text-sm font-semibold capitalize ${
                  filter === f
                    ? 'bg-teal-accent text-background-dark'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
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
            Add Training
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-5 shadow-sm dark:shadow-none"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 dark:text-white">{t.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.slug}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">{t.summary}</p>
                <p className="text-primary font-bold mt-2">{formatNGN(t.priceNGN)}</p>
              </div>
              <span
                className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-bold ${
                  t.published ? 'bg-teal-accent/10 text-teal-accent' : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400'
                }`}
              >
                {t.published !== false ? 'Published' : 'Draft'}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
              <Link
                to={`/training/${t.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-teal-accent hover:underline flex items-center gap-1"
              >
                Preview <span className="material-symbols-outlined text-sm">open_in_new</span>
              </Link>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={t.published !== false}
                    onChange={() => togglePublished(t)}
                    className="rounded border-slate-300 text-teal-accent focus:ring-teal-accent"
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Publish</span>
                </label>
                <button type="button" onClick={() => openEdit(t)} className="text-sm font-semibold text-teal-accent hover:underline">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-10 text-center text-slate-500 dark:text-slate-400">
          No trainings match your filters.
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit training' : 'Add training'}
      >
        <div className="space-y-6">
          <section className="space-y-4">
            <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Basics</h4>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100 focus:border-teal-accent/50 outline-none"
              placeholder="Training title"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100 focus:border-teal-accent/50 outline-none"
              placeholder="url-slug"
            />
            {!editing && form.slug && slugs.has(form.slug) && (
              <p className="text-xs text-red-500 mt-1">Slug already in use.</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Tagline</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
              className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100"
              placeholder="Short one-liner"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Summary</label>
            <textarea
              value={form.summary}
              onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
              rows={2}
              className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100 focus:border-teal-accent/50 outline-none resize-none"
              placeholder="Brief summary"
            />
          </div>
          </section>

          <section className="space-y-4">
            <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Content</h4>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Price (NGN)</label>
            <input
              type="number"
              min={0}
              value={form.priceNGN || ''}
              onChange={(e) => setForm((f) => ({ ...f, priceNGN: Number(e.target.value) || 0 }))}
              className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100 focus:border-teal-accent/50 outline-none"
              placeholder="250000"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Benefits</label>
              <button type="button" onClick={addBenefit} className="text-xs font-semibold text-teal-accent">+ Add</button>
            </div>
            <div className="space-y-2">
              {form.benefits.map((b, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={b}
                    onChange={(e) => setBenefit(i, e.target.value)}
                    className="flex-1 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-3 py-2 text-sm"
                    placeholder="Benefit"
                  />
                  <button type="button" onClick={() => removeBenefit(i)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl">
                    <span className="material-symbols-outlined text-lg">remove</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Modules</label>
              <button type="button" onClick={addModule} className="text-xs font-semibold text-teal-accent">+ Add</button>
            </div>
            <div className="space-y-2">
              {form.modules.map((m, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={m}
                    onChange={(e) => setModule(i, e.target.value)}
                    className="flex-1 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-3 py-2 text-sm"
                    placeholder="Module title"
                  />
                  <button type="button" onClick={() => removeModule(i)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl">
                    <span className="material-symbols-outlined text-lg">remove</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
          </section>

          <section className="space-y-4">
            <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Display</h4>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Delivery format</label>
            <input
              type="text"
              value={form.deliveryFormat}
              onChange={(e) => setForm((f) => ({ ...f, deliveryFormat: e.target.value }))}
              className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100"
              placeholder="Online, onsite, or hybrid"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Duration label</label>
            <input
              type="text"
              value={form.duration_label}
              onChange={(e) => setForm((f) => ({ ...f, duration_label: e.target.value }))}
              className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100"
              placeholder="e.g. 2–4 weeks"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Who it’s for (paragraph)</label>
            <textarea
              value={form.whoItsFor}
              onChange={(e) => setForm((f) => ({ ...f, whoItsFor: e.target.value }))}
              rows={2}
              className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100 resize-none"
              placeholder="Audience description"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Audience (list)</label>
              <button type="button" onClick={addAudience} className="text-xs font-semibold text-teal-accent">+ Add</button>
            </div>
            <div className="space-y-2">
              {form.audience.map((a, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={a}
                    onChange={(e) => setAudience(i, e.target.value)}
                    className="flex-1 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-3 py-2 text-sm"
                    placeholder="Audience item"
                  />
                  <button type="button" onClick={() => removeAudience(i)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl">
                    <span className="material-symbols-outlined text-lg">remove</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">What’s included</label>
              <button type="button" onClick={addIncludes} className="text-xs font-semibold text-teal-accent">+ Add</button>
            </div>
            <div className="space-y-2">
              {form.includes.map((x, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={x}
                    onChange={(e) => setIncludes(i, e.target.value)}
                    className="flex-1 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-3 py-2 text-sm"
                    placeholder="Included item"
                  />
                  <button type="button" onClick={() => removeIncludes(i)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl">
                    <span className="material-symbols-outlined text-lg">remove</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">FAQ</label>
              <button type="button" onClick={addFaq} className="text-xs font-semibold text-teal-accent">+ Add</button>
            </div>
            <div className="space-y-3">
              {form.faq.map((item, i) => (
                <div key={i} className="rounded-xl border border-slate-200 dark:border-white/10 p-3 space-y-2">
                  <input
                    type="text"
                    value={item.q}
                    onChange={(e) => setFaq(i, 'q', e.target.value)}
                    placeholder="Question"
                    className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    value={item.a}
                    onChange={(e) => setFaq(i, 'a', e.target.value)}
                    placeholder="Answer"
                    className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-3 py-2 text-sm"
                  />
                  <button type="button" onClick={() => removeFaq(i)} className="text-xs text-red-500">Remove</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Icon (Material Symbol)</label>
            <input
              type="text"
              value={form.icon}
              onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
              className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100"
              placeholder="school"
            />
          </div>
          </section>

          <section className="space-y-4">
            <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Publish</h4>
          <div className="flex items-center gap-4 flex-wrap">
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
                value={form.sort_order}
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
              disabled={Boolean(!form.title.trim() || (!editing && form.slug && slugs.has(form.slug)))}
              className="flex-1 py-3 rounded-2xl bg-teal-accent text-background-dark font-bold disabled:opacity-50"
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
