import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTrainingProductBySlug, type TrainingProduct } from '../../lib/trainingProducts';
import { useChat } from '../../contexts/ChatContext';

export function TrainingDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [training, setTraining] = useState<TrainingProduct | null>(null);
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

  const whoItsFor =
    training.who_its_for ?? 'Compliance officers, operations leads, and staff who need structured learning and evidence of completion.';
  const modules: string[] =
    (training.modules ?? []).length > 0
      ? (training.modules ?? [])
      : ['Module 1: Introduction', 'Module 2: Core concepts', 'Module 3: Practice', 'Module 4: Assessment'];
  const deliveryFormat =
    training.delivery_format ?? 'Online, onsite, or hybrid. Duration and schedule agreed per engagement.';
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

          
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-32 space-y-6">
            <div className="rounded-2xl bg-primary text-white p-8 shadow-lg shadow-primary/40">
              <h4 className="text-sm font-black uppercase tracking-widest mb-3">
                Ready to start?
              </h4>
              <p className="text-white/90 text-sm leading-relaxed mb-6">
                {training.summary ?? 'Book a diagnostic session to see how this training fits your needs.'}
              </p>
              <button
                type="button"
                onClick={handleRequestQuote}
                className="mt-2 w-full py-4 rounded-xl bg-white text-primary font-black text-center hover:bg-slate-100 transition-colors shadow-xl shadow-black/20"
              >
                Request a quote
              </button>
            </div>
          </div>
        </aside>
      </div>

      
    </main>
  );
}
