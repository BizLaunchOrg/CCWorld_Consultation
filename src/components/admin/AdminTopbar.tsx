import { useState, useRef, useEffect } from 'react';
import { ThemeToggle } from '../ThemeToggle';
import { useAdminNotifications } from '../../contexts/AdminNotificationContext';
import type { AdminNotification } from '../../contexts/AdminNotificationContext';

interface AdminTopbarProps {
  onMenuClick: () => void;
  title?: string;
}

function formatNotifTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return d.toLocaleDateString();
}

export function AdminTopbar({ onMenuClick, title }: AdminTopbarProps) {
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, count, markAllAsRead, goToNotification } = useAdminNotifications();

  useEffect(() => {
    if (!dropdownOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [dropdownOpen]);

  const handleGoTo = (n: AdminNotification) => {
    setDropdownOpen(false);
    goToNotification(n);
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-4 h-16 px-4 md:px-6 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary md:hidden"
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
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((o) => !o)}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
            {count > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-primary text-white text-[10px] font-bold">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 max-h-[70vh] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl z-50 flex flex-col">
              <div className="p-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-sm">Notifications</span>
                {count > 0 && (
                  <button
                    type="button"
                    onClick={() => { markAllAsRead(); setDropdownOpen(false); }}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="overflow-y-auto flex-1">
                {notifications.length === 0 ? (
                  <p className="p-4 text-slate-500 dark:text-slate-400 text-sm">No new notifications</p>
                ) : (
                  notifications.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => handleGoTo(n)}
                      className="w-full text-left px-4 py-3 border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 flex items-start gap-3"
                    >
                      <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">
                        {n.type === 'message' ? 'chat' : 'event_note'}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{n.title}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{formatNotifTime(n.createdAt)}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
