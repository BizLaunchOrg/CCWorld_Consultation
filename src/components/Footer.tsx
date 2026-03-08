import { Link } from 'react-router-dom';
import { SITE_COMPANY_NAME, SITE_PHONE, SITE_WHATSAPP_LINK, SITE_ADDRESS_LINES, SITE_EMAIL } from '../lib/siteConfig';

const servicesLinks = [
  { to: '/licensing', label: 'Licensing Advisory' },
  { to: '/services', label: 'AML/CFT Frameworks' },
  { to: '/licensing', label: 'Regulatory Sandbox' },
  { to: '/services', label: 'Risk Management' },
] as const;

const resourcesLinks = [
  { to: '/training', label: 'Compliance Training' },
  { to: '/insights', label: 'Industry Reports' },
  { to: '#', label: 'Webinars' },
  { to: '/insights', label: 'Blog' },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-charcoal/5 bg-white dark:bg-charcoal px-6 py-20 text-charcoal dark:text-slate-200">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img src="/logo.png" alt={SITE_COMPANY_NAME} className="site-logo h-12 w-12 object-contain shrink-0" />
            </div>
            <p className="text-sm text-charcoal/60 dark:text-slate-400 leading-relaxed mb-6">
              Strategic compliance and regulatory consulting for the modern financial landscape.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-charcoal/40 hover:text-primary transition-colors" aria-label="Share">
                <span className="material-symbols-outlined">share</span>
              </a>
              <a href={`mailto:${SITE_EMAIL}`} className="text-charcoal/40 hover:text-primary transition-colors" aria-label="Email">
                <span className="material-symbols-outlined">mail</span>
              </a>
              <a href="#" className="text-charcoal/40 hover:text-primary transition-colors" aria-label="Language">
                <span className="material-symbols-outlined">language</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-charcoal dark:text-white">Services</h4>
            <ul className="space-y-4 text-sm text-charcoal/60 dark:text-slate-400">
              {servicesLinks.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-charcoal dark:text-white">Resources</h4>
            <ul className="space-y-4 text-sm text-charcoal/60 dark:text-slate-400">
              {resourcesLinks.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-charcoal dark:text-white">Contact</h4>
            <ul className="space-y-4 text-sm text-charcoal/60 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-xs mt-1 shrink-0">location_on</span>
                <span>{SITE_ADDRESS_LINES.join(', ')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xs shrink-0">call</span>
                <a href={SITE_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {SITE_PHONE}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-charcoal/5 dark:border-white/10 pt-8 text-xs text-charcoal/40 dark:text-slate-500 flex flex-col md:flex-row justify-between gap-4">
          <p>© 2026 {SITE_COMPANY_NAME}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-charcoal dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-charcoal dark:hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
