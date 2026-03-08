import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTrainingProductBySlug } from '../../lib/trainingProducts';
import { useChat } from '../../contexts/ChatContext';

function formatPriceNGN(n: number): string {
  return `NGN ${n.toLocaleString('en-NG')}`;
}

export function TrainingDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [training, setTraining] = useState<Awaited<ReturnType<typeof getTrainingProductBySlug>>>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setTraining(null);
      setLoading(false);
      return;
    }
    getTrainingProductBySlug(slug).then((t) => {
      setTraining(t);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-24 pt-32 text-center">
        <p className="text-slate-500 dark:text-slate-400">Loading…</p>
      </main>
    );
  }

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

  const whoItsFor = training.who_its_for ?? 'Compliance officers, operations leads, and staff who need structured learning and evidence of completion.';
  const modules: string[] = (training.modules ?? []).length > 0
    ? (training.modules ?? [])
    : ['Module 1: Introduction', 'Module 2: Core concepts', 'Module 3: Practice', 'Module 4: Assessment'];
  const deliveryFormat = training.delivery_format ?? 'Online, onsite, or hybrid. Duration and schedule agreed per engagement.';
  const faq: { q: string; a: string }[] = (training.faq ?? []).length > 0
    ? (training.faq ?? [])
    : [
        { q: 'How do I book?', a: 'Use “Request a quote” to open Live Chat — we’ll send a short message about this training and our team will get back to you with a quote and next steps.' },
        { q: 'Can we get a custom quote?', a: 'Yes. Use the chat to tell us your needs and we’ll provide a tailored quote.' },
      ];
  const { openChat } = useChat();

  const handleRequestQuote = () => {
    openChat(`Hi, I need a training on ${training.name}. Can you send me a quote?`);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-20 py-8 pt-16">
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-8 py-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <Link to="/training" className="hover:text-primary">Training</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-primary">{training.name}</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight">
              {training.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-3 text-lg">{training.tagline ?? training.summary ?? ''}</p>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-primary font-black text-2xl">
                {formatPriceNGN(training.amount)}
              </span>
              <button
                type="button"
                onClick={handleRequestQuote}
                className="px-8 py-4 bg-primary text-white font-black rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Request a quote
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">group</span>
              Who it’s for
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{whoItsFor}</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">menu_book</span>
              What you’ll learn
            </h2>
            <ul className="space-y-3">
              {modules.map((m, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                  <span className="text-primary font-bold">{i + 1}.</span>
                  {m}
                </li>
              ))}
            </ul>
          </section>

          {(training.benefits ?? []).length > 0 && (
            <section>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                Benefits / Outcomes
              </h2>
              <ul className="space-y-3">
                {(training.benefits ?? []).map((b) => (
                  <li key={b} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-primary shrink-0">check</span>
                    {b}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">schedule</span>
              Delivery format
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{deliveryFormat}</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">help</span>
              FAQ
            </h2>
            <div className="space-y-4">
              {faq.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4"
                >
                  <h3 className="font-bold text-slate-900 dark:text-white">{item.q}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-32 space-y-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
                Summary
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{training.summary ?? ''}</p>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Price</span>
                  <span className="text-primary font-black text-xl">
                    {formatPriceNGN(training.amount)}
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRequestQuote}
              className="block w-full py-4 rounded-xl bg-primary text-white font-black text-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Request a quote
            </button>
          </div>
        </aside>
      </div>

      <section className="mt-16 rounded-2xl border border-slate-200 dark:border-slate-800 bg-primary/10 dark:bg-primary/5 p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Ready to book?</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {formatPriceNGN(training.amount)}
          </p>
        </div>
        <button
          type="button"
          onClick={handleRequestQuote}
          className="shrink-0 px-8 py-4 bg-primary text-white font-black rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          Request a quote
        </button>
      </section>
    </main>
  );
}
