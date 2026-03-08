import { Link, useLocation } from 'react-router-dom';

const navItems: { to: string; label: string; icon: string }[] = [
  { to: '/admin', label: 'Dashboard', icon: 'dashboard' },
  { to: '/admin/users', label: 'Users', icon: 'people' },
  { to: '/admin/services', label: 'Services', icon: 'design_services' },
  { to: '/admin/trainings', label: 'Trainings', icon: 'school' },
  { to: '/admin/consulting', label: 'Consultatings', icon: 'event_note' },
  { to: '/admin/contact', label: 'Contact form', icon: 'contact_mail' },
  { to: '/admin/messages', label: 'Messages', icon: 'chat' },
  { to: '/admin/settings', label: 'Settings', icon: 'settings' },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ collapsed, onClose }: AdminSidebarProps) {
  const location = useLocation();

  const content = (
    <>
      <Link
        to="/admin"
        className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-900 dark:text-white font-black text-lg"
      >
        <img src="/logo.png" alt="CCworld Consulting" className="site-logo h-8 w-8 object-contain shrink-0" />
        {!collapsed && <span>Admin</span>}
      </Link>
      <nav className="mt-6 flex flex-col gap-1">
        {navItems.map(({ to, label, icon }) => {
          const isActive = location.pathname === to || (to !== '/admin' && location.pathname.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{icon}</span>
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>
      {!collapsed && (
        <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/5"
          >
            <span className="material-symbols-outlined">open_in_new</span>
            View site
          </Link>
        </div>
      )}
    </>
  );

  return (
    <aside
      className={`flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-200 ${
        collapsed ? 'w-[72px] min-w-[72px] px-2 py-4' : 'w-64 min-w-[256px] px-4 py-6'
      }`}
    >
      {content}
    </aside>
  );
}
