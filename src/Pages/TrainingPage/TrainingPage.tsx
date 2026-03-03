import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DEMO_TRAININGS, fetchTrainings } from '../../data/trainings';
import type { Training } from '../../types/training';
import { useChat } from '../../contexts/ChatContext';

const cx = (...a: Array<string | false | null | undefined>) => a.filter(Boolean).join(' ');

const FILTER_CHIPS = ['All', 'Training', 'Advisory'] as const;

function formatPriceNGN(n: number): string {
  return `NGN ${n.toLocaleString('en-NG')}`;
}

export function TrainingPage() {
  const [trainings, setTrainings] = useState<Training[]>(DEMO_TRAININGS);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<string>('All');
  const { openChat } = useChat();

  useEffect(() => {
    fetchTrainings().then(setTrainings);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return trainings.filter((t) => {
      const matchFilter =
        filter === 'All' ||
        (filter === 'Training' && t.category === 'training') ||
        (filter === 'Advisory' && t.category === 'advisory');
      const matchQuery =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q);
      return matchFilter && matchQuery;
    });
  }, [trainings, filter, query]);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative mesh-gradient overflow-hidden px-6 pt-24 pb-16">
        <div className="grid-overlay absolute inset-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-accent/10 border border-teal-accent/20 text-teal-accent text-xs font-black uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span
                className={
                  !prefersReduced
                    ? 'animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-accent opacity-75'
                    : ''
                }
              />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-accent" />
            </span>
            Training & Advisory
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-slate-900 dark:text-white mt-6">
            Payment for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-accent to-primary">
              training and advisory
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mt-6">
            Book paid training programs and advisory engagements. All offerings require payment to confirm your slot.
          </p>
        </div>
      </section>

      {/* Filter / Search */}
      <section className="max-w-7xl mx-auto px-6 pt-14">
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5 sm:p-6 shadow-sm dark:shadow-none">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-teal-accent">tune</span>
              <div>
                <div className="text-white font-black">Browse offerings</div>
                <div className="text-slate-500 text-xs">Filter by type or search by keyword.</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="flex-1 min-w-[220px]">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    search
                  </span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search trainings…"
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-background-dark border border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-200 placeholder:text-slate-500 dark:placeholder:text-slate-600 outline-none focus:border-teal-accent/30"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFilter('All');
                  setQuery('');
                }}
                className="py-3 px-4 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:border-teal-accent/25 transition-all font-black"
              >
                Reset
              </button>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {FILTER_CHIPS.map((chip) => {
              const on = filter === chip;
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setFilter(on ? 'All' : chip)}
                  className={cx(
                    'px-3 py-1.5 rounded-full text-xs font-black border transition-all',
                    on
                      ? 'bg-teal-accent/15 border-teal-accent/25 text-teal-accent'
                      : 'bg-primary/10 border-primary/20 text-primary hover:border-teal-accent/25'
                  )}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Training cards */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              Training & Advisory
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              {filtered.length} offering{filtered.length === 1 ? '' : 's'} shown
              {filter !== 'All' ? ` • ${filter}` : ''}.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-6 hover:border-teal-accent/25 transition-all group shadow-sm dark:shadow-none"
            >
              <div className="flex items-start gap-4">
                <span className="size-12 rounded-2xl bg-teal-accent/10 border border-teal-accent/20 flex items-center justify-center text-teal-accent shrink-0">
                  <span className="material-symbols-outlined">
                    {t.category === 'advisory' ? 'recommend' : 'school'}
                  </span>
                </span>
                <div className="min-w-0">
                  {t.category === 'advisory' && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                      Advisory
                    </span>
                  )}
                  <h3 className="text-slate-900 dark:text-white font-black text-lg leading-tight">
                    {t.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-500 text-xs mt-1">{t.tagline}</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-5">
                {t.summary}
              </p>
              <ul className="mt-5 space-y-2">
                {t.benefits.slice(0, 5).map((b) => (
                  <li key={b} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-xs">
                    <span className="material-symbols-outlined text-teal-accent text-sm mt-0.5 shrink-0">
                      check
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="text-primary font-black text-lg">
                  {formatPriceNGN(t.priceNGN)}
                </span>
              </div>
              <div className="mt-6 flex gap-3">
                <Link
                  to={`/training/${t.slug}`}
                  className="flex-1 text-center px-5 py-3 rounded-2xl bg-teal-accent text-background-dark font-black hover:shadow-[0_0_24px_rgba(45,212,191,0.25)] transition-all"
                >
                  {t.category === 'advisory' ? 'View Advisory' : 'View Training'}
                </Link>
                <Link
                  to="/consultation"
                  className="px-5 py-3 rounded-2xl bg-primary text-white font-black hover:bg-primary/90 transition-all"
                >
                  Request a Consultation
                </Link>
                <button
                  type="button"
                  onClick={() => openChat()}
                  className="px-5 py-3 rounded-2xl border border-gold-accent/40 text-gold-accent font-black hover:bg-gold-accent/10 transition-all"
                >
                  Live Chat
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 p-10 text-center">
            <div className="text-slate-900 dark:text-white font-black text-xl">
              No offerings found
            </div>
            <div className="text-slate-600 dark:text-slate-400 mt-2">
              Try a different keyword or filter.
            </div>
            <button
              type="button"
              onClick={() => {
                setFilter('All');
                setQuery('');
              }}
              className="mt-6 px-6 py-3 rounded-2xl bg-teal-accent text-background-dark font-black"
            >
              Reset
            </button>
          </div>
        )}
      </section>

      {/* Advisory block */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-8 shadow-sm dark:shadow-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <span className="size-12 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">recommend</span>
              </span>
              <div>
                <h3 className="text-slate-900 dark:text-white font-black text-xl">
                  Advisory
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Work with our organization to conduct risk review and make recommendations.
                </p>
              </div>
            </div>
            <Link
              to="/consultation"
              className="shrink-0 px-6 py-3 rounded-2xl bg-teal-accent text-background-dark font-black hover:shadow-[0_0_24px_rgba(45,212,191,0.25)] transition-all text-center"
            >
              Request Advisory
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">
            Need a custom program or advisory engagement?
          </h2>
          <p className="text-blue-100 leading-relaxed">
            Get in touch and we’ll scope training or advisory to your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/consultation"
              className="px-10 py-5 bg-white text-primary text-lg font-black rounded-xl hover:scale-105 transition-transform"
            >
              Request a Consultation
            </Link>
            <button
              type="button"
              onClick={() => openChat()}
              className="px-10 py-5 border-2 border-white text-white text-lg font-black rounded-xl hover:bg-white/10 transition-all"
            >
              Live Chat
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
