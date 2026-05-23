'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Bot, ChevronDown, ChevronLeft, Grid2X2, Home, Library, Menu, Users } from 'lucide-react';
import Sidebar from './Sidebar';

type AppShellProps = {
  title?: string;
  children: React.ReactNode;
  showBack?: boolean;
};

export default function AppShell({ title = 'Assignment', children, showBack = true }: AppShellProps) {
  const pathname = usePathname();
  const isCreate = pathname.includes('create');
  const isAssignments = pathname === '/assignments' || pathname === '/home';

  return (
    <div className="app-stage">
      <div className="desktop-frame">
        <Sidebar />
        <section className="content">
          <header className="topbar">
            <div className="crumb">
              {showBack && (
                <Link href="/assignments" className="round-icon" aria-label="Back">
                  <ChevronLeft size={18} />
                </Link>
              )}
              <Grid2X2 size={15} />
              <span>{title}</span>
            </div>
            <div className="user-area">
              <Link href="/notifications" className="bell-wrap" aria-label="Notifications">
                <Bell size={21} />
              </Link>
              <Link href="/profile" className="profile-link" aria-label="Edit profile">
                <span className="user-avatar">JD</span>
                <span>John Doe</span>
                <ChevronDown size={16} />
              </Link>
              <Menu className="mobile-menu" size={21} />
            </div>
          </header>
          <main className="main-area">{children}</main>
        </section>
      </div>

      <nav className="mobile-shell">
        <Link href="/assignments" className={isAssignments ? 'active' : ''}>
          <Home size={16} />
          Home
        </Link>
        <Link href="/groups">
          <Users size={16} />
          My Groups
        </Link>
        <Link href="/library">
          <Library size={16} />
          Library
        </Link>
        <Link href="/create-assignment" className={isCreate ? 'active' : ''}>
          <Bot size={16} />
          AI Toolkit
        </Link>
      </nav>
    </div>
  );
}
