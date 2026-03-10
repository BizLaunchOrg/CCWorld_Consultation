import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import { SITE_EMAIL } from '../lib/siteConfig';

const OFFICIAL_EMAIL = SITE_EMAIL;

function EmailRow({ email, onCopy }: { email: string; onCopy: (e: string) => void }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      onCopy(email);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="flex items-center justify-between gap-2 py-2 group">
      <a href={`mailto:${email}`} className="text-sm text-primary hover:underline truncate flex-1 min-w-0">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        aria-label="Copy email"
      >
        {copied ? (
          <span className="text-xs text-primary font-bold">Copied!</span>
        ) : (
          <span className="material-symbols-outlined text-lg">content_copy</span>
        )}
      </button>
    </div>
  );
}

export function EngageUsDropdown({ variant = 'desktop', onClose }: { variant?: 'desktop' | 'mobile'; onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { openChat } = useChat();

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (!open || variant !== 'desktop') return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, variant]);

  const handleCopy = () => setToast('ok');

  if (variant === 'mobile') {
    return (
      <div className="mt-4 space-y-2">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 mb-2">Engage with us</div>
        <Link
          to="/contact"
          onClick={onClose}
          className="block py-3 px-4 rounded-2xl bg-primary text-white text-center font-bold text-sm hover:bg-primary/90 transition-colors touch-manipulation"
        >
          Contact form
        </Link>
        <Link
          to="/consulting"
          onClick={onClose}
          className="block py-3 px-4 rounded-2xl border border-charcoal/20 dark:border-white/20 text-charcoal dark:text-white text-center font-bold text-sm hover:bg-charcoal/5 dark:hover:bg-white/10 transition-colors touch-manipulation"
        >
          Request Consultation
        </Link>
        <button
          type="button"
          onClick={() => { openChat(); onClose?.(); }}
          className="block w-full py-3 px-4 rounded-2xl border border-charcoal/20 dark:border-white/20 text-charcoal dark:text-white text-center font-bold text-sm hover:bg-charcoal/5 dark:hover:bg-white/10 transition-colors touch-manipulation"
        >
          Live Chat
        </button>
        <div className="py-3 px-4 rounded-2xl border border-charcoal/10 dark:border-slate-600 bg-charcoal/5 dark:bg-slate-800">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">Email us</div>
          <EmailRow email={OFFICIAL_EMAIL} onCopy={handleCopy} />
        </div>
        {toast && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold shadow-lg z-[60]">
            Copied to clipboard
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative hidden lg:block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-all"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Engage with us
        <span className="material-symbols-outlined text-lg">{open ? 'expand_less' : 'expand_more'}</span>
      </button>
      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-slate-200 dark:border-slate-600 shadow-xl overflow-hidden z-50 bg-white dark:bg-slate-800"
          role="menu"
        >
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 text-sm font-semibold text-slate-900 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors border-b border-slate-200 dark:border-slate-600"
            role="menuitem"
          >
            Contact form
          </Link>
          <Link
            to="/consulting"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 text-sm font-semibold text-slate-900 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors border-b border-slate-200 dark:border-slate-600"
            role="menuitem"
          >
            Request Consultation
          </Link>
          <button
            type="button"
            onClick={() => { openChat(); setOpen(false); }}
            className="block w-full text-left px-4 py-3 text-sm font-semibold text-slate-900 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors border-b border-slate-200 dark:border-slate-600"
            role="menuitem"
          >
            Live Chat
          </button>
          <div className="p-3">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Email us</div>
            <EmailRow email={OFFICIAL_EMAIL} onCopy={handleCopy} />
          </div>
        </div>
      )}
      {toast && (
        <div className="fixed bottom-8 right-8 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold shadow-lg z-[60]">
          Copied to clipboard
        </div>
      )}
    </div>
  );
}
