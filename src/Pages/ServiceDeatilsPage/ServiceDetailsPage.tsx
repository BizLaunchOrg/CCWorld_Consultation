import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getServiceBySlugFromDb, type ServiceRecord } from '../../lib/servicesApi';
import { useChat } from '../../contexts/ChatContext';

export function ServiceDetailsPage() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const [service, setService] = useState<ServiceRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const { openChat } = useChat();

  useEffect(() => {
    if (!serviceSlug) {
      setService(null);
      setLoading(false);
      return;
    }
    getServiceBySlugFromDb(serviceSlug).then((s) => {
      setService(s);
      setLoading(false);
    });
  }, [serviceSlug]);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-24 pt-32 text-center">
        <p className="text-slate-500 dark:text-slate-400">Loading…</p>
      </main>
    );
  }

  if (!service) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-24 pt-32 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Service not found</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">The service you’re looking for doesn’t exist or the link may be wrong.</p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90"
        >
          View all services <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-20 py-8 pt-16">
      {/* Hero */}
      <div className="relative w-full h-[280px] sm:h-[360px] rounded-2xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 dark:from-slate-900/95 via-slate-800/70 to-transparent z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000')`,
          }}
          aria-hidden
        />
        <div className="relative z-20 h-full flex flex-col justify-center px-8 sm:px-12 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
              {service.level}
            </span>
            <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-full">
              {service.duration_label}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            {service.title}
          </h1>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            {service.tagline}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main content */}
        <div className="flex-1 space-y-12">
          <nav className="flex items-center gap-2 text-sm font-medium">
            <Link to="/" className="text-slate-600 dark:text-slate-500 hover:text-primary">Home</Link>
            <span className="material-symbols-outlined text-xs text-slate-400">chevron_right</span>
            <Link to="/services" className="text-slate-600 dark:text-slate-500 hover:text-primary">Services</Link>
            <span className="material-symbols-outlined text-xs text-slate-400">chevron_right</span>
            <span className="text-primary">{service.title}</span>
          </nav>

          <section id="overview">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
              <span className="text-primary material-symbols-outlined">{service.icon}</span>
              Overview
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-loose">{service.summary}</p>
          </section>

          <section id="outcomes">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-900 dark:text-white">Key outcomes</h2>
            <ul className="space-y-4">
              {service.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-primary shrink-0">check_circle</span>
                  {o}
                </li>
              ))}
            </ul>
          </section>

          <section className="pb-12">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6">
              <div className="flex flex-wrap gap-2">
                {service.categories.map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="sticky top-32 space-y-6">
            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">This service</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Duration</span>
                  <span className="text-slate-900 dark:text-white font-medium">{service.duration_label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Level</span>
                  <span className="text-slate-900 dark:text-white font-medium">{service.level}</span>
                </div>
              </div>
            </div>

            <Link
              to="/consulting"
              className="block bg-primary rounded-2xl p-8 text-white relative overflow-hidden group shadow-lg shadow-primary/20"
            >
              <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <span className="material-symbols-outlined text-[160px]">support_agent</span>
              </div>
              <h3 className="text-xl font-bold mb-4 relative z-10">Ready to start?</h3>
              <p className="text-blue-100 text-sm mb-8 relative z-10 leading-relaxed">
                Book a diagnostic session to see how this service fits your needs.
              </p>
              <span className="inline-block w-full bg-white text-primary font-bold py-4 rounded-2xl hover:bg-slate-100 transition-colors relative z-10 shadow-xl shadow-black/20 text-center">
                Request a Consultating
              </span>
            </Link>
            <button
              type="button"
              onClick={() => openChat()}
              className="block w-full mt-4 py-4 px-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-center"
            >
              Live Chat
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
