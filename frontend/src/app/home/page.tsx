'use client';

import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { FileText, Plus, Sparkles, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <AppShell title="Home" showBack={false}>
      <div className="section-title">
        <span className="green-dot" />
        <div>
          <h1>Home</h1>
          <p>Quick overview of your teaching workspace.</p>
        </div>
      </div>

      <section className="home-grid">
        <Link href="/assignments" className="home-tile">
          <FileText size={24} />
          <strong>Assignments</strong>
          <span>Open created quizzes and papers</span>
        </Link>
        <Link href="/create-assignment" className="home-tile">
          <Plus size={24} />
          <strong>Create Assignment</strong>
          <span>Build a new AI-generated paper</span>
        </Link>
        <Link href="/toolkit" className="home-tile">
          <Sparkles size={24} />
          <strong>AI Teacher's Toolkit</strong>
          <span>Use classroom AI tools</span>
        </Link>
        <Link href="/groups" className="home-tile">
          <Users size={24} />
          <strong>My Groups</strong>
          <span>Manage classes and batches</span>
        </Link>
      </section>
    </AppShell>
  );
}
