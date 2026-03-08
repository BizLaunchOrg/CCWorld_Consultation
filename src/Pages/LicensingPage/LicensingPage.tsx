import { Link } from 'react-router-dom';
import { useChat } from '../../contexts/ChatContext';
import { getLicensingServices } from '../../data/services';

export function LicensingPage() {
  const { openChat } = useChat();
  const licensingServices = getLicensingServices();

  return (
    <main className="flex-1">
      {/* Hero - new design */}
      <section className="px-6 md:px-20 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <Link to="/services" className="hover:text-primary">Services</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-primary">Payment Licensing</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Payment Licensing
          </div>
          <h1 className="text-slate-900 dark:text-slate-100 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
            Licensing & <span className="text-primary">compliance advisory</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
            Dedicated support for proper documentation and advisory on the required licence to set up financial institutions.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
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
        </div>
      </section>

      {/* Licensing options grid (if we have any) */}
      {licensingServices.length > 0 && (
        <section className="px-6 md:px-20 py-14 max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Licensing options</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">
            We support PSSP, PTSP, Regulatory Sandbox, and related payment licensing pathways.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {licensingServices.map((s) => (
              <Link
                key={s.id}
                to={`/licensing/${s.slug}`}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group block"
              >
                <div className="flex items-start gap-4">
                  <span className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">{s.icon}</span>
                  </span>
                  <div>
                    <h3 className="text-slate-900 dark:text-white font-bold text-lg leading-tight">{s.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{s.tagline}</p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-5">{s.summary}</p>
                <span className="inline-flex items-center gap-1 text-primary font-bold text-sm mt-4">
                  View details <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-6 md:px-20 bg-primary">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Ready to start?
          </h2>
          <p className="text-white/90 leading-relaxed text-lg">
            Request a consultation or open live chat. No payment required — we'll discuss your licensing needs and next steps.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/consulting"
              className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:scale-105 transition-transform shadow-xl flex items-center gap-2"
            >
              Request a Consultation <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <button
              type="button"
              onClick={() => openChat()}
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
            >
              Live Chat <span className="material-symbols-outlined">chat</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
