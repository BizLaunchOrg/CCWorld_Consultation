import { Link, useParams } from 'react-router-dom';
import { getTrainingBySlug } from '../../data/trainings';

function formatPriceNGN(n: number): string {
  return `NGN ${n.toLocaleString('en-NG')}`;
}

export function TrainingDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const training = slug ? getTrainingBySlug(slug) : null;

  if (!training) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-24 pt-32 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Training not found</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          The training you’re looking for doesn’t exist or the link may be wrong.
        </p>
        <Link
          to="/training"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90"
        >
          View all trainings <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </main>
    );
  }

  const whoItsFor = training.whoItsFor ?? 'Compliance officers, operations leads, and staff who need structured learning and evidence of completion.';
  const modules = training.modules ?? ['Module 1: Introduction', 'Module 2: Core concepts', 'Module 3: Practice', 'Module 4: Assessment'];
  const deliveryFormat = training.deliveryFormat ?? 'Online, onsite, or hybrid. Duration and schedule agreed per engagement.';
  const faq = training.faq ?? [
    { q: 'How do I book?', a: 'Proceed to checkout and pay. We’ll email you to confirm and schedule.' },
    { q: 'Can we get a custom quote?', a: 'Yes. Use the chat or request a consultation for tailored programs.' },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pt-24">
      {/* Hero */}
      <section className="relative mesh-gradient overflow-hidden rounded-3xl px-8 py-12 mb-12">
        <div className="grid-overlay absolute inset-0 pointer-events-none rounded-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-4">
              <Link to="/" className="hover:text-teal-accent">Home</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <Link to="/training" className="hover:text-teal-accent">Training</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-white">{training.title}</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {training.title}
            </h1>
            <p className="text-slate-300 mt-3 text-lg">{training.tagline}</p>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-teal-accent font-black text-2xl">
                {formatPriceNGN(training.priceNGN)}
              </span>
              <Link
                to={`/checkout/training/${training.slug}`}
                className="px-8 py-4 bg-teal-accent text-background-dark font-black rounded-xl hover:shadow-[0_0_30px_rgba(45,212,191,0.35)] transition-all"
              >
                {training.category === 'advisory' ? 'Pay for Advisory' : 'Pay for Training'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Who it's for */}
          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-teal-accent">group</span>
              Who it’s for
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{whoItsFor}</p>
          </section>

          {/* What you'll learn */}
          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-teal-accent">menu_book</span>
              What you’ll learn
            </h2>
            <ul className="space-y-3">
              {modules.map((m, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                  <span className="text-teal-accent font-bold">{i + 1}.</span>
                  {m}
                </li>
              ))}
            </ul>
          </section>

          {/* Benefits / Outcomes */}
          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-teal-accent">check_circle</span>
              Benefits / Outcomes
            </h2>
            <ul className="space-y-3">
              {training.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                  <span className="material-symbols-outlined text-teal-accent shrink-0">check</span>
                  {b}
                </li>
              ))}
            </ul>
          </section>

          {/* Delivery format */}
          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-teal-accent">schedule</span>
              Delivery format
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{deliveryFormat}</p>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-teal-accent">help</span>
              FAQ
            </h2>
            <div className="space-y-4">
              {faq.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-4"
                >
                  <h3 className="font-bold text-slate-900 dark:text-white">{item.q}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-32 space-y-6">
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-6">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
                Summary
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{training.summary}</p>
              <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Price</span>
                  <span className="text-primary font-black text-xl">
                    {formatPriceNGN(training.priceNGN)}
                  </span>
                </div>
              </div>
            </div>
            <Link
              to={`/checkout/training/${training.slug}`}
              className="block w-full py-4 rounded-2xl bg-teal-accent text-background-dark font-black text-center hover:shadow-[0_0_24px_rgba(45,212,191,0.25)] transition-all"
            >
              Proceed to Checkout
            </Link>
          </div>
        </aside>
      </div>

      {/* Final CTA bar */}
      <section className="mt-16 rounded-3xl border border-slate-200 dark:border-white/10 bg-primary/10 dark:bg-primary/5 p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Ready to book?</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {formatPriceNGN(training.priceNGN)}
          </p>
        </div>
        <Link
          to={`/checkout/training/${training.slug}`}
          className="shrink-0 px-8 py-4 bg-teal-accent text-background-dark font-black rounded-xl hover:shadow-[0_0_30px_rgba(45,212,191,0.35)] transition-all"
        >
          Proceed to Checkout
        </Link>
      </section>
    </main>
  );
}
