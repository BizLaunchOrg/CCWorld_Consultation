import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTrainingBySlug } from '../../data/trainings';
import { createTransaction } from '../../lib/transactions';

function formatPriceNGN(n: number): string {
  return `NGN ${n.toLocaleString('en-NG')}`;
}

export function TrainingCheckoutPage() {
  const { slug } = useParams<{ slug: string }>();
  const training = slug ? getTrainingBySlug(slug) : null;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

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

  async function payNow() {
    if (!training) return;
    setLoading(true);
    try {
      const txn = await createTransaction({
        training_id: training.id,
        amount: training.priceNGN,
        currency: 'NGN',
        status: 'paid', // demo: mark as paid; later Paystack verification will set this
      });
      console.log('Transaction created:', txn);
      setSuccessOpen(true);
    } catch (e) {
      console.error(e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pt-24">
      <nav className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-8">
        <Link to="/" className="hover:text-teal-accent">Home</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link to="/training" className="hover:text-teal-accent">Training</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link to={`/training/${training.slug}`} className="hover:text-teal-accent">{training.title}</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-white">Checkout</span>
      </nav>

      <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Buyer details + Payment */}
        <div className="lg:col-span-2 space-y-8">
          <section className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-6 sm:p-8">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">Your details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name"
                  className="w-full rounded-2xl bg-white dark:bg-background-dark border border-slate-200 dark:border-white/10 px-4 py-3 text-slate-900 dark:text-slate-200 placeholder:text-slate-500 focus:border-teal-accent/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full rounded-2xl bg-white dark:bg-background-dark border border-slate-200 dark:border-white/10 px-4 py-3 text-slate-900 dark:text-slate-200 placeholder:text-slate-500 focus:border-teal-accent/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  className="w-full rounded-2xl bg-white dark:bg-background-dark border border-slate-200 dark:border-white/10 px-4 py-3 text-slate-900 dark:text-slate-200 placeholder:text-slate-500 focus:border-teal-accent/50 outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
                  Company <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company"
                  className="w-full rounded-2xl bg-white dark:bg-background-dark border border-slate-200 dark:border-white/10 px-4 py-3 text-slate-900 dark:text-slate-200 placeholder:text-slate-500 focus:border-teal-accent/50 outline-none"
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-6 sm:p-8">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">Payment</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
              Click Pay Now to complete your booking. You will receive a confirmation email with next steps.
            </p>
            <button
              type="button"
              onClick={payNow}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-teal-accent text-background-dark font-black hover:shadow-[0_0_24px_rgba(45,212,191,0.25)] transition-all disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>Processing…</>
              ) : (
                <>
                  Pay Now <span className="material-symbols-outlined">payments</span>
                </>
              )}
            </button>
          </section>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-6">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4">
              Order summary
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{training.title}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{training.summary}</p>
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex justify-between items-center">
                <span className="text-slate-500 text-sm">Total</span>
                <span className="text-primary font-black text-xl">
                  {formatPriceNGN(training.priceNGN)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success modal overlay */}
      {successOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
        >
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-background-dark p-8 shadow-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-accent/20 text-teal-accent mb-6">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h2 id="success-title" className="text-2xl font-black text-white mb-2">
              Payment received
            </h2>
            <p className="text-slate-400 mb-8">
              Your training booking has been received. We’ll email you next steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/training"
                className="flex-1 text-center py-3 rounded-2xl border border-teal-accent/50 text-teal-accent font-black hover:bg-teal-accent/10 transition-all"
              >
                Back to Training
              </Link>
              <Link
                to="/"
                className="flex-1 text-center py-3 rounded-2xl bg-teal-accent text-background-dark font-black hover:shadow-[0_0_24px_rgba(45,212,191,0.25)] transition-all"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
