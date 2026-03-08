import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTrainingProducts } from '../../lib/trainingProducts';
import type { TrainingProduct } from '../../lib/trainingProducts';
import { useChat } from '../../contexts/ChatContext';

const cx = (...a: Array<string | false | null | undefined>) => a.filter(Boolean).join(' ');

const FILTER_CHIPS = ['All', 'Training', 'Advisory'] as const;

function formatPriceNGN(n: number): string {
  return `NGN ${n.toLocaleString('en-NG')}`;
}

export function TrainingPage() {
  const [trainings, setTrainings] = useState<TrainingProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<string>('All');
  const { openChat } = useChat();

  useEffect(() => {
    fetchTrainingProducts().then((list) => {
      setTrainings(list);
      setLoading(false);
    });
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
        t.name.toLowerCase().includes(q) ||
        (t.summary?.toLowerCase().includes(q) ?? false) ||
        (t.tagline?.toLowerCase().includes(q) ?? false);
      return matchFilter && matchQuery;
    });
  }, [trainings, filter, query]);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  return (
    <main className="flex-1">
      {/* Hero - new design */}
      <section className="px-6 md:px-20 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
            <span className="relative flex h-2 w-2">
              <span className={!prefersReduced ? 'animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75' : ''} />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Training & Advisory
          </div>
          <h1 className="text-slate-900 dark:text-slate-100 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
            Training & <span className="text-primary">advisory</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
            Browse our training programs and advisory engagements. View details or start a chat to get a quote.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/consulting"
              className="rounded-lg bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              Request Consultation
            </Link>
            <button
              type="button"
              onClick={() => openChat()}
              className="rounded-lg border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-8 py-4 text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
            >
              Live Chat
            </button>
          </div>
        </div>
      </section>

      {/* Filter / Search */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 pt-6 pb-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">tune</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Browse offerings</div>
                <div className="text-slate-500 dark:text-slate-400 text-xs">Filter by type or search by keyword.</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="flex-1 min-w-[220px]">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">search</span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search trainings…"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 placeholder:text-slate-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => { setFilter('All'); setQuery(''); }}
                className="py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-primary hover:border-primary/50 transition-all font-bold"
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
                    'px-3 py-1.5 rounded-full text-xs font-bold border transition-all',
                    on ? 'bg-primary/15 border-primary/30 text-primary' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary/30'
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
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-14">
        {loading ? (
          <p className="text-slate-500 dark:text-slate-400">Loading offerings…</p>
        ) : (
          <>
            <div className="flex items-end justify-between gap-6 mb-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Training & Advisory</h2>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  {filtered.length} offering{filtered.length === 1 ? '' : 's'} shown
                  {filter !== 'All' ? ` • ${filter}` : ''}.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <span className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">{t.category === 'advisory' ? 'recommend' : (t.icon || 'school')}</span>
                    </span>
                    <div className="min-w-0">
                      {t.category === 'advisory' && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Advisory</span>
                      )}
                      <h3 className="text-slate-900 dark:text-white font-bold text-lg leading-tight">{t.name}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{t.tagline ?? t.summary ?? ''}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-5">
                    {t.summary || 'Structured training and evidence of completion.'}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {(t.benefits ?? []).slice(0, 5).map((b) => (
                      <li key={b} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-xs">
                        <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">check</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="text-primary font-bold text-lg">{formatPriceNGN(t.amount)}</span>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Link
                      to={`/training/${t.slug}`}
                      className="flex-1 text-center px-5 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                      {t.category === 'advisory' ? 'View Advisory' : 'View Details'}
                    </Link>
                    <button
                      type="button"
                      onClick={() => openChat()}
                      className="px-5 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                    >
                      Live Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="mt-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-10 text-center">
                <div className="text-slate-900 dark:text-white font-bold text-xl">No offerings found</div>
                <div className="text-slate-600 dark:text-slate-400 mt-2">Try a different keyword or check back later.</div>
                <button
                  type="button"
                  onClick={() => { setFilter('All'); setQuery(''); }}
                  className="mt-6 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90"
                >
                  Reset
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Advisory block */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-14">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <span className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">recommend</span>
              </span>
              <div>
                <h3 className="text-slate-900 dark:text-white font-bold text-xl">Advisory</h3>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Work with our organization to conduct risk review and make recommendations.
                </p>
              </div>
            </div>
            <Link
              to="/training"
              className="shrink-0 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all text-center shadow-lg shadow-primary/20"
            >
              View offerings
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-20 bg-primary">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">
            Need a custom program or advisory engagement?
          </h2>
          <p className="text-white/90 leading-relaxed text-lg">
            Get in touch and we'll scope training or advisory to your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button
              type="button"
              onClick={() => openChat()}
              className="px-10 py-5 bg-white text-primary text-lg font-bold rounded-xl hover:scale-105 transition-transform shadow-xl"
            >
              Live Chat
            </button>
            <Link
              to="/contact"
              className="px-10 py-5 border-2 border-white text-white text-lg font-bold rounded-xl hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
