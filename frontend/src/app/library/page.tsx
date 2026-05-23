'use client';

import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { BookOpen, Plus } from 'lucide-react';

export default function LibraryPage() {
  return (
    <AppShell title="My Library">
      <section className="empty-center">
        <div>
          <div className="empty-illustration">
            <div className="empty-blob" />
            <div className="empty-paper" />
            <div className="magnify" />
            <div className="empty-x">
              <BookOpen size={44} />
            </div>
          </div>
          <h2>My Library</h2>
          <p>Your saved assignments, generated papers, and teaching resources will appear here.</p>
          <Link href="/assignments" className="black-btn">
            <Plus size={16} />
            View Assignments
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
