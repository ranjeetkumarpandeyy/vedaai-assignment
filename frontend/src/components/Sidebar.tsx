'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Bot,
  Clock3,
  FileText,
  Home,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react';

const nav = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/groups', icon: Users, label: 'My Groups' },
  { href: '/assignments', icon: FileText, label: 'Assignments', count: '10' },
  { href: '/toolkit', icon: Bot, label: "AI Teacher's Toolkit" },
  { href: '/library', icon: Clock3, label: 'My Library', count: '32' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Link href="/assignments" className="brand">
        <span className="brand-mark">V</span>
        <span>VedaAI</span>
      </Link>

      <Link href="/create-assignment" className="create-btn">
        <Sparkles size={15} />
        Create Assignment
      </Link>

      <nav className="nav-list">
        {nav.map(({ href, icon: Icon, label, count }) => {
          const active =
            pathname === href || (href === '/assignments' && pathname.startsWith('/assignment'));
          return (
            <Link className={`nav-item ${active ? 'active' : ''}`} href={href} key={label}>
              <Icon size={15} />
              <span>{label}</span>
              {count && <span className="nav-pill">{count}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="school-card">
        <Link href="/settings" className="settings">
          <Settings size={15} />
          Settings
        </Link>
        <Link href="/school" className="school-box">
          <div className="avatar">
            <BookOpen size={20} />
          </div>
          <div>
            <div className="school-name">Delhi Public School</div>
            <div className="school-city">Bokaro Steel City</div>
          </div>
        </Link>
      </div>
    </aside>
  );
}
