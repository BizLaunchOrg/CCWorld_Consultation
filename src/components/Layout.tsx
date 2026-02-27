import { Outlet } from 'react-router-dom';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';

export function Layout() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <ScrollToTop />
      <Nav />
      <main className="flex-1 pt-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
