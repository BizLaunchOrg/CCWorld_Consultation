import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { EngageUsDropdown } from "./EngageUsDropdown";

const navLinks: { to: string; label: string }[] = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/training", label: "Training" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact Us" },
  { to: "/insights", label: "Insights" },
];

/** Solid dark background for nav/mobile menu - matches theme background-dark */
const NAV_BG = "#0f172a";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMobile]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed top-0 z-50 w-full border-b border-white/10 backdrop-blur-md"
        style={{ backgroundColor: NAV_BG }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-28">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/logo.png"
              alt="CC World Consulting"
              className="h-24 w-24 sm:h-28 sm:w-28 object-contain"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors hover:text-white ${isActive ? "text-teal-accent" : "text-slate-200"}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <EngageUsDropdown variant="desktop" />
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden text-white p-3 rounded-2xl hover:bg-white/10 transition-colors touch-manipulation"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] md:hidden flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          style={{ isolation: "isolate", height: "100vh" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(8px)",
            }}
            aria-hidden="true"
            onClick={closeMobile}
          />
          <div
            className="absolute top-0 right-0 bottom-0 w-full max-w-sm flex flex-col border-l border-white/10 shadow-2xl"
            style={{
              backgroundColor: NAV_BG,
              animation: "slideInRight 0.25s ease-out",
              height: "100vh",
            }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
              <span className="text-sm font-bold text-slate-300">Menu</span>
              <button
                type="button"
                onClick={closeMobile}
                className="p-2 rounded-2xl text-white hover:bg-white/10 transition-colors touch-manipulation"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div
              className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-4 py-4 flex flex-col gap-1"
              style={{
                minHeight: 0,
                WebkitOverflowScrolling: "touch",
              }}
            >
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-2xl text-sm font-semibold transition-colors touch-manipulation ${isActive ? "bg-teal-accent/20 text-teal-accent" : "text-slate-200 hover:bg-white/10 hover:text-white"}`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <EngageUsDropdown variant="mobile" onClose={closeMobile} />
              <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-slate-400">
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
