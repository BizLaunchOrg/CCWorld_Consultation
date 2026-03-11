import { Link, useLocation } from 'react-router-dom';

export function ConsultatingSuccessPage() {
  const location = useLocation();
  const state = (location.state || {}) as {
    fullName?: string;
    consultatingDate?: string;
    consultatingTime?: string;
    service?: string;
  };

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-16 pt-28">
      <div className="max-w-xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-8">
          <span className="material-symbols-outlined text-5xl">check_circle</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
          Payment Successful
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
          Your consultating has been secured. We've sent a confirmation to your email.
        </p>

        <div className="bg-slate-100 dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left mb-10">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Booking details</h2>
          <dl className="space-y-3 text-sm">
            {state.fullName && (
              <div className="flex justify-between">
                <dt className="text-slate-500">Booked for</dt>
                <dd className="text-slate-900 dark:text-white font-medium">{state.fullName}</dd>
              </div>
            )}
            {state.service && (
              <div className="flex justify-between">
                <dt className="text-slate-500">Service</dt>
                <dd className="text-slate-900 dark:text-white font-medium">{state.service}</dd>
              </div>
            )}
            {state.consultatingDate && (
              <div className="flex justify-between">
                <dt className="text-slate-500">Date</dt>
                <dd className="text-slate-900 dark:text-white font-medium">{state.consultatingDate}</dd>
              </div>
            )}
            {state.consultatingTime && (
              <div className="flex justify-between">
                <dt className="text-slate-500">Time</dt>
                <dd className="text-slate-900 dark:text-white font-medium">{state.consultatingTime}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Back to Home
          </Link>
          <Link
            to="/consulting"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            Book Another Session
          </Link>
        </div>
      </div>
    </main>
  );
}
