'use client';

import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { Plus } from 'lucide-react';

export default function EmptyAssignmentsPage() {
  return (
    <AppShell title="Assignment">
      <section className="empty-center">
        <div>
          <div className="empty-illustration">
            <div className="empty-blob" />
            <div className="empty-paper" />
            <div className="magnify" />
            <div className="empty-x">x</div>
          </div>
          <h2>No assignments yet</h2>
          <p>
            Create your first assignment to start collecting and grading student submissions. You can
            set up rubrics, define marking criteria, and let AI assist with grading.
          </p>
          <Link href="/create-assignment" className="black-btn">
            <Plus size={16} />
            Create Your First Assignment
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
