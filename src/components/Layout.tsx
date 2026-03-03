import { Outlet } from 'react-router-dom';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { EmailConfirmationBanner } from './EmailConfirmationBanner';
import { ChatProvider } from '../contexts/ChatContext';
import { ChatWidget } from './ChatWidget';

export function Layout() {
  return (
    <ChatProvider>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <ScrollToTop />
        <Nav />
        <EmailConfirmationBanner />
        <main className="flex-1 pt-10">
          <Outlet />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </ChatProvider>
  );
}
