import { Link } from 'react-router-dom';
import { getLicensingServices } from '../../data/services';
import { useChat } from '../../contexts/ChatContext';

export function LicensingPage() {
  const services = getLicensingServices();
  const { openChat } = useChat();

  return (
    <main className="flex-1">
      <section className="relative mesh-gradient overflow-hidden px-6 pt-24 pb-16">
        <div className="grid-overlay absolute inset-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
            <Link to="/" className="hover:text-teal-accent">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <Link to="/services" className="hover:text-teal-accent">Services</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-teal-accent">Licensing Advisory</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-accent/10 border border-teal-accent/20 text-teal-accent text-xs font-black uppercase tracking-widest mb-6">
            CBN Licensing
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-slate-900 dark:text-white mb-4">
            Licensing Advisory <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-accent to-primary">(CBN)</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
            Dedicated support for Payment Solution Service Provider (PSSP), Payment Terminal Service Provider (PTSP), and CBN Regulatory Sandbox participation.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.slug}
              className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-6 hover:border-teal-accent/25 transition-all shadow-sm dark:shadow-none flex flex-col"
            >
              <div className="flex items-start gap-4">
                <span className="size-12 rounded-2xl bg-teal-accent/10 border border-teal-accent/20 flex items-center justify-center text-teal-accent shrink-0">
                  <span className="material-symbols-outlined">{s.icon}</span>
                </span>
                <div className="min-w-0">
                  <h2 className="text-slate-900 dark:text-white font-black text-lg leading-tight">{s.title}</h2>
                  <p className="text-slate-600 dark:text-slate-500 text-xs mt-1">{s.tagline}</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-4 flex-1">{s.summary}</p>
              <ul className="mt-4 space-y-2">
                {s.outcomes.slice(0, 4).map((o) => (
                  <li key={o} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-xs">
                    <span className="material-symbols-outlined text-teal-accent text-sm shrink-0">check</span>
                    {o}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-3 flex-wrap">
                <Link
                  to={`/licensing/${s.slug}`}
                  className="flex-1 min-w-[120px] text-center px-5 py-3 rounded-2xl bg-teal-accent text-background-dark font-black hover:shadow-[0_0_24px_rgba(45,212,191,0.25)] transition-all"
                >
                  View Details
                </Link>
                <Link
                  to="/consultation"
                  className="px-5 py-3 rounded-2xl border border-gold-accent/40 text-gold-accent font-black hover:bg-gold-accent/10 transition-all"
                >
                  Engage Us
                </Link>
                <button
                  type="button"
                  onClick={openChat}
                  className="p-3 rounded-2xl border border-slate-200 dark:border-white/20 text-slate-600 dark:text-slate-300 hover:bg-white/10 transition-all"
                  aria-label="Live chat"
                >
                  <span className="material-symbols-outlined">chat</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-100 dark:bg-slate-900/30 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-4">Ready to start?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Request a consultation or open live chat. No payment required — we'll discuss your licensing needs and next steps.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/consultation"
              className="px-8 py-4 bg-teal-accent text-background-dark font-black rounded-xl hover:shadow-[0_0_30px_rgba(45,212,191,0.35)] transition-all flex items-center gap-2"
            >
              Request Engagement <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <button
              type="button"
              onClick={openChat}
              className="px-8 py-4 border-2 border-gold-accent/50 text-gold-accent font-black rounded-xl hover:bg-gold-accent/10 transition-all flex items-center gap-2"
            >
              Live Chat <span className="material-symbols-outlined">chat</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
