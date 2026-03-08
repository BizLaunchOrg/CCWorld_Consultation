interface ListCardProps {
  title: string;
  subtitle?: string;
  meta?: string;
  badge?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function ListCard({ title, subtitle, meta, badge, onClick, children, className = '' }: ListCardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 md:p-5 shadow-sm transition-all ${
        onClick ? 'cursor-pointer hover:border-primary/30 hover:shadow-md' : ''
      } ${className}`}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
            {badge}
          </div>
          {subtitle && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
              {subtitle}
            </p>
          )}
          {meta && (
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">{meta}</p>
          )}
        </div>
        {onClick && (
          <span className="material-symbols-outlined text-slate-400 shrink-0">chevron_right</span>
        )}
      </div>
      {children}
    </div>
  );
}
