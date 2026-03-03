import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTrainingProductBySlug } from '../../lib/trainingProducts';
import { initTrainingPayment } from '../../lib/trainingOrders';
import { useAuth } from '../../contexts/AuthContext';

function formatPriceNGN(n: number): string {
  return `NGN ${n.toLocaleString('en-NG')}`;
}

export function TrainingCheckoutPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user, isEmailConfirmed } = useAuth();
  const [training, setTraining] = useState<Awaited<ReturnType<typeof getTrainingProductBySlug>>>(null);
  const [loading, setLoading] = useState(true);
  const [payLoading, setPayLoading] = useState(false);
  const [payError, setPayError] = useState('');

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

  async function payNow() {
    if (!training || !user) return;
    if (!isEmailConfirmed) {
      setPayError('Please confirm your email before paying.');
      return;
    }
    setPayError('');
    setPayLoading(true);
    try {
      const result = await initTrainingPayment(training.id);
      if (result.error) {
        setPayError(result.error);
        return;
      }
      if (result.checkout_url) {
        window.location.href = result.checkout_url;
        return;
      }
      setPayError('Could not start payment. Try again.');
    } finally {
      setPayLoading(false);
    }
  }

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
        <Link to="/training" className="text-teal-accent font-bold">
          Back to Training
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pt-24">
      <nav className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-8">
        <Link to="/" className="hover:text-teal-accent">Home</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link to="/training" className="hover:text-teal-accent">Training</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link to={`/training/${training.slug}`} className="hover:text-teal-accent">{training.name}</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-white">Checkout</span>
      </nav>

      <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-10">Checkout</h1>

      {!user && (
        <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-200 text-sm">
          <Link to="/login" state={{ from: `/checkout/training/${slug}` }} className="font-semibold underline">
            Sign in
          </Link>
          {' '}to pay. Create an account if you don’t have one.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-6 sm:p-8">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">Payment</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
              Click Pay Now to be redirected to our secure payment page (Seerbit). After payment, you can view the status in your account.
            </p>
            {payError && (
              <p className="text-red-500 dark:text-red-400 text-sm mb-4">{payError}</p>
            )}
            <button
              type="button"
              onClick={payNow}
              disabled={payLoading || !user || !isEmailConfirmed}
              className="w-full py-4 rounded-2xl bg-teal-accent text-background-dark font-black hover:shadow-[0_0_24px_rgba(45,212,191,0.25)] transition-all disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {payLoading ? (
                <>Redirecting…</>
              ) : !user ? (
                <>Sign in to pay</>
              ) : !isEmailConfirmed ? (
                <>Confirm your email to pay</>
              ) : (
                <>
                  Pay Now <span className="material-symbols-outlined">payments</span>
                </>
              )}
            </button>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-32 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-6">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4">
              Order summary
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{training.name}</p>
                {training.summary && (
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{training.summary}</p>
                )}
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex justify-between items-center">
                <span className="text-slate-500 text-sm">Total</span>
                <span className="text-primary font-black text-xl">
                  {formatPriceNGN(training.amount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
