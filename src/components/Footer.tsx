import { Link } from 'react-router-dom';
import CCWorldLogo from '../assets/CCWorldLogo.png';

const solutionsLinks = [
  { to: '#', label: 'Fintech Banking' },
  { to: '#', label: 'IMTO Operations' },
  { to: '#', label: 'Audit Readiness' },
  { to: '#', label: 'AML Automation' },
] as const;

const connectLinks = [
  { to: '/consultation', label: 'Request Consultation' },
  { to: 'mailto:info@ccworldconsulting.com', label: 'Email' },
  { to: '#', label: 'Lagos Office' },
] as const;

export function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-background-dark border-t border-slate-200 dark:border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <img src={CCWorldLogo} alt="CC World Consulting" className="h-10 w-10 object-contain" />
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              CC World <span className="text-primary">Consulting</span>
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-500 max-w-sm">
            Strategic compliance advisory for the Nigerian financial landscape. Lagos-based, serving banks, fintechs, and IMTOs.
          </p>
        </div>
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Solutions
          </h4>
          <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-500">
            {solutionsLinks.map(({ to, label }) => (
              <li key={label}>
                <Link to={to} className="hover:text-teal-accent text-slate-700 dark:text-slate-400">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Connect
          </h4>
          <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-500">
            {connectLinks.map(({ to, label }) => (
              <li key={label}>
                <Link to={to} className="hover:text-teal-accent text-slate-700 dark:text-slate-400">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-600 dark:text-slate-500">
        <p>© 2024 CC World Consulting. All rights reserved.</p>
        <div className="flex gap-8">
          <Link to="#" className="text-slate-700 dark:text-slate-400 hover:text-primary">Privacy Policy</Link>
          <Link to="#" className="text-slate-700 dark:text-slate-400 hover:text-primary">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
