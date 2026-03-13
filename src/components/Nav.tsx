import { Link, NavLink } from 'react-router-dom';
import { SITE_COMPANY_NAME } from '../lib/siteConfig';
import { useState, useEffect, useCallback } from 'react';
import { EngageUsDropdown } from './EngageUsDropdown';

const navLinks: { to: string; label: string }[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/consulting', label: 'Consultation' },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobile();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen, closeMobile]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-charcoal/5 dark:border-slate-700/80 bg-background-light/80 dark:bg-slate-900/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-14">
          <Link to="/" className="flex items-center shrink-0 h-full" aria-label={`${SITE_COMPANY_NAME} - Home`}>
            <img
              src="/logo.png"
              alt={SITE_COMPANY_NAME}
              className="site-logo h-full max-h-7 w-auto max-w-[110px] object-contain object-left"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-charcoal dark:text-slate-200'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <EngageUsDropdown />
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden text-charcoal dark:text-white p-2 rounded-lg hover:bg-charcoal/5 dark:hover:bg-white/10 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="material-symbols-outlined text-2xl">{mobileOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
        >
          <div
            className="absolute inset-0 bg-charcoal/20 dark:bg-black/50 backdrop-blur-sm"
            aria-hidden
            onClick={closeMobile}
          />
          <div className="absolute top-0 right-0 bottom-0 w-full max-w-sm flex flex-col border-l border-charcoal/5 dark:border-slate-700 bg-background-light dark:bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-charcoal/5 dark:border-slate-700 shrink-0">
              <span className="text-sm font-bold text-charcoal dark:text-white">Menu</span>
              <button
                type="button"
                onClick={closeMobile}
                className="p-2 rounded-lg text-charcoal dark:text-white hover:bg-charcoal/5 dark:hover:bg-slate-800"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? 'bg-primary/10 text-primary' : 'text-charcoal dark:text-slate-200 hover:bg-charcoal/5 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <EngageUsDropdown variant="mobile" onClose={closeMobile} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
