import { useState } from 'react';
import { ThemeToggle } from '../../components/ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';

export function AdminSettingsPage() {
  const { theme } = useTheme();
  const [profile, setProfile] = useState({ name: 'Admin User', email: 'hello@ccworldconsult.com' });
  const [site, setSite] = useState({
    company_email: 'hello@ccworldconsult.com',
    phone: '',
    whatsapp_link: '',
  });

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-2xl font-black text-slate-900 dark:text-white md:hidden">Settings</h1>

      {/* Theme */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm dark:shadow-none">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Theme</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Switch between light and dark mode. Preference is saved.
        </p>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <span className="text-sm text-slate-600 dark:text-slate-400 capitalize">{theme} mode</span>
        </div>
      </div>

      {/* Admin profile stub */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm dark:shadow-none">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Admin profile</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Placeholder. Replace with Supabase auth profile.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-slate-100"
            />
          </div>
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90"
          >
            Save (stub)
          </button>
        </div>
      </div>

      {/* Site settings placeholders */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm dark:shadow-none">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Site settings</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Contact details shown on the public site. Store in Supabase or env later.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Company email</label>
            <input
              type="text"
              value={site.company_email}
              onChange={(e) => setSite((s) => ({ ...s, company_email: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Phone</label>
            <input
              type="text"
              value={site.phone}
              onChange={(e) => setSite((s) => ({ ...s, phone: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">WhatsApp link</label>
            <input
              type="url"
              value={site.whatsapp_link}
              onChange={(e) => setSite((s) => ({ ...s, whatsapp_link: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-slate-100"
            />
          </div>
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90"
          >
            Save (stub)
          </button>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          <strong>How to create other emails:</strong> Use your email provider (e.g. Google Workspace, Microsoft 365, or your domain host) to add aliases or mailboxes for your domain (e.g. info@, support@, opeyemioluwa@). Forward or use the same inbox as needed. Provider-agnostic.
        </p>
      </div>
    </div>
  );
}
