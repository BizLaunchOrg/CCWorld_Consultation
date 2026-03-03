import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getServiceBySlug } from '../../data/services';
import type { ServiceContentSection } from '../../types/service';
import { useChat } from '../../contexts/ChatContext';

const LICENSING_SLUGS = ['pssp', 'ptsp', 'sandbox'];

function AccordionSection({ section }: { section: ServiceContentSection }) {
  const [open, setOpen] = useState(false);
  const isChecklist = section.heading.toLowerCase().includes('checklist') && section.bullets && section.bullets.length > 6;
  if (!isChecklist) {
    return (
      <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{section.heading}</h2>
        {section.text && <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{section.text}</p>}
        {section.bullets && (
          <ul className="mt-3 space-y-2">
            {section.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                <span className="material-symbols-outlined text-teal-accent text-sm mt-0.5 shrink-0">check</span>
                {b}
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }
  return (
    <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
      >
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{section.heading}</h2>
        <span className="material-symbols-outlined text-teal-accent">{open ? 'expand_less' : 'expand_more'}</span>
      </button>
      {open && section.bullets && (
        <div className="px-6 pb-6 pt-0 border-t border-slate-200 dark:border-white/10">
          <ul className="space-y-2">
            {section.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-sm">
                <span className="material-symbols-outlined text-teal-accent text-sm mt-0.5 shrink-0">check</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export function LicensingDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : null;
  const { openChat } = useChat();
  const isLicensing = service && LICENSING_SLUGS.includes(service.slug);

  if (!service || !isLicensing) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-24 pt-32 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">License type not found</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">The page you're looking for doesn't exist or the link may be wrong.</p>
        <Link
          to="/licensing"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90"
        >
          View licensing options <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </main>
    );
  }

  const sections = service.content_sections ?? [];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pt-24">
      <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-8">
        <Link to="/" className="hover:text-teal-accent">Home</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link to="/services" className="hover:text-teal-accent">Services</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link to="/licensing" className="hover:text-teal-accent">Licensing Advisory</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-teal-accent">{service.title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900/40 p-8">
            <div className="flex items-start gap-4">
              <span className="size-14 rounded-2xl bg-teal-accent/10 border border-teal-accent/20 flex items-center justify-center text-teal-accent shrink-0">
                <span className="material-symbols-outlined text-3xl">{service.icon}</span>
              </span>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">{service.title}</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">{service.tagline}</p>
                <p className="text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">{service.summary}</p>
              </div>
            </div>
          </div>

          {sections.length > 0 ? (
            <div className="space-y-4">
              {sections.map((sec, i) => (
                <AccordionSection key={i} section={sec} />
              ))}
            </div>
          ) : (
            <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Key outcomes</h2>
              <ul className="space-y-2">
                {service.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-teal-accent shrink-0">check</span>
                    {o}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* CTA block */}
          <div className="rounded-3xl border border-teal-accent/20 bg-teal-accent/5 dark:bg-teal-accent/10 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                {service.slug === 'sandbox' ? 'Request Sandbox Support' : 'Request engagement'}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1">No payment required. We'll discuss your licensing needs and next steps.</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/consultation"
                className="px-6 py-3 rounded-2xl bg-teal-accent text-background-dark font-black hover:shadow-[0_0_24px_rgba(45,212,191,0.3)] transition-all"
              >
                {service.slug === 'sandbox' ? 'Request Sandbox Support' : 'Request Engagement'}
              </Link>
              <button
                type="button"
                onClick={openChat}
                className="px-6 py-3 rounded-2xl border border-gold-accent/50 text-gold-accent font-black hover:bg-gold-accent/10 transition-all"
              >
                Live Chat
              </button>
            </div>
          </div>
        </div>

        <aside className="w-full lg:w-80 shrink-0">
          <div className="sticky top-32 space-y-6">
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900/40 p-6">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">This offering</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Type</span>
                  <span className="text-slate-900 dark:text-white font-medium">Licensing Advisory</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Engagement</span>
                  <span className="text-slate-900 dark:text-white font-medium">{service.duration_label}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-slate-200 dark:border-white/10">
                  <span className="text-slate-500">Fee</span>
                  <span className="text-teal-accent font-bold">{service.amount}</span>
                </div>
              </div>
            </div>
            <Link
              to="/consultation"
              className="block rounded-3xl bg-primary p-8 text-white relative overflow-hidden group"
            >
              <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <span className="material-symbols-outlined text-[160px]">support_agent</span>
              </div>
              <h3 className="text-xl font-bold mb-4 relative z-10">Ready to start?</h3>
              <p className="text-blue-100 text-sm mb-8 relative z-10 leading-relaxed">
                Request a consultation. We'll prepare a tailored pack and support you through the process.
              </p>
              <span className="inline-block w-full bg-white text-primary font-bold py-4 rounded-2xl hover:bg-slate-100 transition-colors relative z-10 text-center">
                Request Consultation
              </span>
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
