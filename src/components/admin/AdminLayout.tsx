import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';

const routeTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/services': 'Services',
  '/admin/trainings': 'Trainings',
  '/admin/transactions': 'Transactions',
  '/admin/consultations': 'Consultations',
  '/admin/messages': 'Messages',
  '/admin/settings': 'Settings',
};

function getPageTitle(pathname: string): string {
  return routeTitles[pathname] ?? 'Admin';
}

export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-background-dark">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <AdminSidebar collapsed={false} />
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      {/* Mobile sidebar drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <AdminSidebar collapsed={false} onClose={() => setMobileOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar title={title} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
