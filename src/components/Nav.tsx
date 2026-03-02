import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const navLinks: { to: string; label: string }[] = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/training', label: 'Training' },
  { to: '/about', label: 'About' },
  { to: '/insights', label: 'Insights' },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-background-dark/95 dark:bg-background-dark/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="CC World Consulting" className="h-20 w-20 object-contain" />
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors hover:text-white ${isActive ? 'text-teal-accent' : 'text-slate-200'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            to="/consultation"
            className="hidden lg:block px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-all"
          >
            Request Consultation
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="material-symbols-outlined">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background-dark/98 dark:bg-background-dark/98 backdrop-blur-md border-b border-white/10 shadow-xl">
          <nav className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block py-3 px-4 rounded-xl text-sm font-semibold transition-colors ${isActive ? 'bg-primary/20 text-teal-accent' : 'text-slate-200 hover:bg-white/10 hover:text-white'}`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/consultation"
              onClick={() => setMobileOpen(false)}
              className="mt-4 py-4 px-4 rounded-xl bg-primary text-white text-center font-bold text-sm hover:bg-primary/90 transition-colors"
            >
              Request Consultation
            </Link>
            <div className="mt-3 flex justify-center">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
