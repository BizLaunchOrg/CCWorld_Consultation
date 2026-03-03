import { Link, useSearchParams } from 'react-router-dom';

export function TrainingPaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference') ?? undefined;

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-16 pt-28">
      <div className="max-w-xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-500/20 text-teal-accent mb-8">
          <span className="material-symbols-outlined text-5xl">check_circle</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
          Payment successful
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg mb-2">
          We&apos;ve received your payment. Thank you for your order.
        </p>
        <p className="text-slate-500 dark:text-slate-500 text-base mb-8">
          We&apos;ll get back to you shortly with next steps. A confirmation email has been sent to your inbox.
        </p>

        {reference && (
          <p className="text-slate-400 dark:text-slate-600 text-sm mb-8 font-mono">
            Reference: {reference}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/training"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-teal-accent text-background-dark hover:shadow-[0_0_24px_rgba(45,212,191,0.25)] transition-all"
          >
            Browse more training
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
