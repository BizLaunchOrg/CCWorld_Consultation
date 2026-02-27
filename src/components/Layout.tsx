import { Outlet } from 'react-router-dom';
import { Nav } from './Nav';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Nav />
      <main className="flex-1 pt-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
