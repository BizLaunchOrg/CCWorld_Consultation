import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTrainingProductBySlug } from '../../lib/trainingProducts';

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

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pt-24">
      <section className="relative mesh-gradient overflow-hidden rounded-3xl px-8 py-12 mb-12">
        <div className="grid-overlay absolute inset-0 pointer-events-none rounded-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-4">
              <Link to="/" className="hover:text-teal-accent">Home</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <Link to="/training" className="hover:text-teal-accent">Training</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-white">{training.name}</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {training.name}
            </h1>
            {training.summary && (
              <p className="text-slate-300 mt-3 text-lg">{training.summary}</p>
            )}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-teal-accent font-black text-2xl">
                {formatPriceNGN(training.amount)}
              </span>
              <Link
                to={`/checkout/training/${training.slug}`}
                className="px-8 py-4 bg-teal-accent text-background-dark font-black rounded-xl hover:shadow-[0_0_30px_rgba(45,212,191,0.35)] transition-all"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {training.summary && (
            <section>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Summary</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{training.summary}</p>
            </section>
          )}
        </div>
        <aside className="lg:col-span-1">
          <div className="sticky top-32 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-6">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Price</h4>
            <p className="text-primary font-black text-2xl">{formatPriceNGN(training.amount)}</p>
            <Link
              to={`/checkout/training/${training.slug}`}
              className="mt-6 block w-full py-4 rounded-2xl bg-teal-accent text-background-dark font-black text-center hover:shadow-[0_0_24px_rgba(45,212,191,0.25)] transition-all"
            >
              Proceed to Checkout
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
