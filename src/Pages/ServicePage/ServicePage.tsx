import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedNonLicensingServices } from '../../data/services';
import type { Service } from '../../types/service';
import { useChat } from '../../contexts/ChatContext';

const cx = (...a: Array<string | false | null | undefined>) => a.filter(Boolean).join(' ');

export default function ServicePage() {
  const services = getPublishedNonLicensingServices();
  const { openChat } = useChat();
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const filters = useMemo(
    () => [
      'All',
      'Governance',
      'People',
      'Policies',
      'Processes',
      'Technology',
      'Culture',
      'Monitoring',
      'Regulatory',
      'Continuous Improvement',
    ],
    [],
  );

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<string>('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      const matchesFilter = filter === 'All' ? true : s.categories.includes(filter);
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.categories.some((c) => c.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [services, filter, query]);

  const badgeForLevel = (level: Service['level']) => {
    switch (level) {
      case 'Foundation':
        return { label: 'Foundation', cls: 'bg-primary/10 border-primary/30 text-primary' };
      case 'Build':
        return { label: 'Build', cls: 'bg-primary/15 border-primary/25 text-primary' };
      case 'Advanced':
        return { label: 'Advanced', cls: 'bg-primary/20 border-primary/30 text-primary' };
      case 'Managed':
        return { label: 'Managed', cls: 'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white' };
      default:
        return { label: 'Service', cls: 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300' };
    }
  };

  return (
    <main className="flex-1">
      {/* Hero - new design */}
      <section className="px-6 md:px-20 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
              <span className="relative flex h-2 w-2">
                <span className={!prefersReduced ? 'animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75' : ''} />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Compliance Consulting Services
            </div>
            <h1 className="text-slate-900 dark:text-slate-100 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
              Services built for{' '}
              <span className="text-primary">setting up a compliance department for start-ups</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
              Choose a service and we'll build the governance, people, processes, tooling, and reporting you need to become compliance-ready — without killing velocity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/consulting"
                className="rounded-lg bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                Request a Consultation <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
              <button
                type="button"
                onClick={() => openChat()}
                className="rounded-lg border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-8 py-4 text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all flex items-center gap-2"
              >
                Live Chat <span className="material-symbols-outlined text-lg">chat</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {[
                { k: '10+', v: 'Core deliverables packs', icon: 'fact_check' },
                { k: 'Tailored', v: 'Timelines to your needs', icon: 'schedule' },
                { k: 'Audit-ready', v: 'Evidence + reporting', icon: 'shield' },
              ].map((x) => (
                <div key={x.k} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4">
                  <span className="material-symbols-outlined text-primary mb-2 block">{x.icon}</span>
                  <div className="text-slate-900 dark:text-white font-bold text-lg">{x.k}</div>
                  <div className="text-slate-600 dark:text-slate-400 text-xs mt-1">{x.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Service Navigator</span>
                <span className="text-xs font-bold text-primary">LIVE</span>
              </div>
              <div className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4">
                <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">Pick by pillar</div>
                <div className="flex flex-wrap gap-2">
                  {['Governance', 'Policies', 'Processes', 'Technology', 'Monitoring'].map((x) => (
                    <span key={x} className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                      {x}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4">
                <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">Typical outputs</div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: 'gavel', t: 'Charter & Risk Appetite' },
                    { icon: 'description', t: 'Policy Suite' },
                    { icon: 'account_tree', t: 'Workflow Maps' },
                    { icon: 'monitoring', t: 'Dashboards & KPIs' },
                  ].map((x) => (
                    <div key={x.t} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-xs">
                      <span className="material-symbols-outlined text-primary text-sm">{x.icon}</span>
                      {x.t}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Not sure what you need? Start with a CRA (risk assessment) or a diagnostic session — we'll recommend the right service mix.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 pt-6 pb-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">tune</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Browse services</div>
                <div className="text-slate-500 dark:text-slate-400 text-xs">Filter by pillar or search by keyword.</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="flex-1 min-w-[220px]">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">search</span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search (e.g. AML, reporting, dashboards)…"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 placeholder:text-slate-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary focus:border-primary min-w-[180px]"
              >
                {filters.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
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
            {filters.filter((f) => f !== 'All').slice(0, 8).map((tag) => {
              const on = filter === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setFilter(on ? 'All' : tag)}
                  className={cx(
                    'px-3 py-1.5 rounded-full text-xs font-bold border transition-all',
                    on ? 'bg-primary/15 border-primary/30 text-primary' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary/30',
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-14">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">All Services</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              {filtered.length} service{filtered.length === 1 ? '' : 's'} shown
              {filter !== 'All' ? ` • filtered by ${filter}` : ''}.
            </p>
          </div>
          <Link to="/consulting" className="hidden sm:inline-flex items-center gap-2 text-primary font-bold hover:opacity-90">
            Need help choosing? <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s) => {
            const badge = badgeForLevel(s.level);
            return (
              <div
                key={s.slug}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">{s.icon}</span>
                    </span>
                    <div>
                      <div className="text-slate-900 dark:text-white font-bold text-lg leading-tight">{s.title}</div>
                      <div className="text-slate-600 dark:text-slate-500 text-xs mt-1">{s.tagline}</div>
                    </div>
                  </div>
                  <span className={cx('px-3 py-1.5 rounded-full text-[11px] font-bold border', badge.cls)}>{badge.label}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-5">{s.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.categories.slice(0, 4).map((c) => (
                    <span key={c} className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-bold">
                      {c}
                    </span>
                  ))}
                  {s.categories.length > 4 ? (
                    <span className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-500 text-[11px] font-bold">
                      +{s.categories.length - 4}
                    </span>
                  ) : null}
                </div>
                <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4">
                  <div className="text-slate-600 dark:text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">Typical outputs</div>
                  <div className="space-y-2">
                    {s.outcomes.slice(0, 3).map((o) => (
                      <div key={o} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-xs">
                        <span className="material-symbols-outlined text-primary text-sm mt-0.5">check</span>
                        {o}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <Link
                    to={`/services/${s.slug}`}
                    className="flex-1 text-center px-5 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                  >
                    View Service
                  </Link>
                  <Link
                    to="/consulting"
                    className="px-5 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                    aria-label="Request consultation"
                  >
                    Consult
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-10 text-center">
            <div className="text-slate-900 dark:text-white font-bold text-xl">No services found</div>
            <div className="text-slate-600 dark:text-slate-400 mt-2">Try a different keyword or switch filters.</div>
            <button
              type="button"
              onClick={() => { setFilter('All'); setQuery(''); }}
              className="mt-6 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90"
            >
              Reset
            </button>
          </div>
        )}
      </section>

      {/* How we engage */}
      <section className="py-20 px-6 md:px-20 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">How engagements work</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-3xl mx-auto">
              A consistent delivery approach across governance, policies, workflows, tooling, reporting, and culture — with auditable outputs at every stage.
            </p>
            <div className="h-1.5 w-24 bg-primary mx-auto mt-7 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '1', icon: 'search', title: 'Discovery & GAP', text: 'Obligations map, risk posture, control baseline, and prioritized roadmap with quick wins.' },
              { n: '2', icon: 'settings_suggest', title: 'Build & Embed', text: 'Policies, workflows, tooling plan, reporting cadence, evidence structure — embedded into real operations.' },
              { n: '3', icon: 'verified', title: 'Handover & Assurance', text: 'Training, testing cadence, dashboards, and audit-ready evidence packs for sustained compliance.' },
            ].map((x) => (
              <div key={x.n} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-7 shadow-sm">
                <div className="flex items-center gap-4">
                  <span className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">{x.n}</span>
                  <span className="material-symbols-outlined text-primary">{x.icon}</span>
                </div>
                <div className="text-slate-900 dark:text-white font-bold text-xl mt-5">{x.title}</div>
                <p className="text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{x.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center flex flex-wrap justify-center gap-4">
            <Link to="/consulting" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Request a Consultation <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <button
              type="button"
              onClick={() => openChat()}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Live Chat <span className="material-symbols-outlined">chat</span>
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 md:px-20 bg-primary">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">
            Not sure which service fits your license and risk profile?
          </h2>
          <p className="text-white/90 leading-relaxed text-lg">
            Start with a diagnostic session or a Compliance Risk Assessment (CRA). We'll recommend the most effective build path.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/consulting" className="px-10 py-5 bg-white text-primary text-lg font-bold rounded-xl hover:scale-105 transition-transform shadow-xl">
              Speak to an Expert
            </Link>
            <Link to="/services/compliance-risk-assessment-cra" className="px-10 py-5 border-2 border-white text-white text-lg font-bold rounded-xl hover:bg-white/10 transition-all">
              Start with CRA
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
export { ServicePage as ServicesPage };
