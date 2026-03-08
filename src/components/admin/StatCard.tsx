interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  accent?: 'primary' | 'muted';
}

export function StatCard({ title, value, subtitle, icon, accent = 'primary' }: StatCardProps) {
  const accentCls =
    accent === 'primary'
      ? 'bg-primary/10 text-primary'
      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
        <span
          className={`size-12 rounded-xl flex items-center justify-center shrink-0 ${accentCls}`}
        >
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </span>
      </div>
    </div>
  );
}
