import { Link, useLocation } from 'react-router-dom';

const navItems: { to: string; label: string; icon: string }[] = [
  { to: '/admin', label: 'Dashboard', icon: 'dashboard' },
  { to: '/admin/users', label: 'Users', icon: 'people' },
  { to: '/admin/services', label: 'Services', icon: 'design_services' },
  { to: '/admin/trainings', label: 'Trainings', icon: 'school' },
  { to: '/admin/transactions', label: 'Orders', icon: 'payments' },
  { to: '/admin/consultations', label: 'Consultations', icon: 'event_note' },
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
        <span className="material-symbols-outlined text-teal-accent">admin_panel_settings</span>
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
                  ? 'bg-teal-accent/15 text-teal-accent border border-teal-accent/25'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{icon}</span>
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>
      {!collapsed && (
        <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/10">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-slate-600 dark:text-slate-400 hover:text-teal-accent"
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
      className={`flex flex-col bg-white dark:bg-slate-900/95 border-r border-slate-200 dark:border-white/10 transition-all duration-200 ${
        collapsed ? 'w-[72px] min-w-[72px] px-2 py-4' : 'w-64 min-w-[256px] px-4 py-6'
      }`}
    >
      {content}
    </aside>
  );
}
