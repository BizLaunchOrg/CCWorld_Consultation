import { Outlet } from 'react-router-dom';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { ChatProvider } from '../contexts/ChatContext';
import { ChatWidget } from './ChatWidget';

export function Layout() {
  return (
    <ChatProvider>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-charcoal dark:text-slate-100 antialiased">
        <ScrollToTop />
        <Nav />
        <main className="flex-1 pt-2">
          <Outlet />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </ChatProvider>
  );
}
