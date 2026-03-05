import { Link } from 'react-router-dom';

const solutionsLinks = [
  { to: '#', label: 'Fintech Banking' },
  { to: '#', label: 'Audit Readiness' },
  { to: '#', label: 'AML Automation' },
] as const;

const connectLinks = [
  { to: '/consultation', label: 'Request Consultation' },
  { to: 'mailto:info@ccworldconsulting.com', label: 'Email' },
  { to: '#', label: 'Lagos Office'},
] as const;

export function Footer() {
  return (
    <footer className="bg-background-dark border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="CC World Consulting" className="h-10 w-10 object-contain" />
            <h2 className="text-xl font-extrabold tracking-tight text-white">
              CC World <span className="text-primary">Consulting</span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-sm">
            Strategic compliance advisory for the Nigerian financial landscape. Lagos-based, serving banks and fintechs.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Solutions
          </h4>
          <ul className="space-y-4 text-sm text-slate-400">
            {solutionsLinks.map(({ to, label }) => (
              <li key={label}>
                <Link to={to} className="hover:text-teal-accent text-slate-400 transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Connect
          </h4>
          <ul className="space-y-4 text-sm text-slate-400">
            {connectLinks.map(({ to, label }) => (
              <li key={label}>
                <Link to={to} className="hover:text-teal-accent text-slate-400 transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500">
        <p>© 2026 CCworld Consulting. All rights reserved.</p>
        <div className="flex gap-8">
          <Link to="#" className="text-slate-400 hover:text-teal-accent transition-colors">Privacy Policy</Link>
          <Link to="#" className="text-slate-400 hover:text-teal-accent transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
