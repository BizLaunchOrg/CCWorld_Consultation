import { useState } from 'react';
import { ThemeToggle } from '../ThemeToggle';

interface AdminTopbarProps {
  onMenuClick: () => void;
  title?: string;
}

export function AdminTopbar({ onMenuClick, title }: AdminTopbarProps) {
  const [search, setSearch] = useState('');
  const [notifications] = useState(3);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-4 h-16 px-4 md:px-6 border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-teal-accent md:hidden"
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        {title && (
          <h1 className="text-lg font-bold text-slate-900 dark:text-white hidden sm:block">
            {title}
          </h1>
        )}
        <div className="hidden md:block flex-1 max-w-xs">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xl">
              search
            </span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="w-full pl-10 pr-4 py-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-slate-100 placeholder:text-slate-500 text-sm focus:border-teal-accent/50 outline-none"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="relative p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined">notifications</span>
          {notifications > 0 && (
            <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-primary text-white text-[10px] font-bold">
              {notifications}
            </span>
          )}
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
