interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  accent?: 'teal' | 'gold' | 'primary';
}

export function StatCard({ title, value, subtitle, icon, accent = 'teal' }: StatCardProps) {
  const accentCls =
    accent === 'teal'
      ? 'bg-teal-accent/10 border-teal-accent/20 text-teal-accent'
      : accent === 'gold'
        ? 'bg-gold-accent/10 border-gold-accent/20 text-gold-accent'
        : 'bg-primary/10 border-primary/20 text-primary';

  return (
    <div className="rounded-2xl md:rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-5 md:p-6 shadow-sm dark:shadow-none">
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
          className={`size-12 rounded-2xl border flex items-center justify-center shrink-0 ${accentCls}`}
        >
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </span>
      </div>
    </div>
  );
}
