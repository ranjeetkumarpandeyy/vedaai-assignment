'use client';

import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { Plus, Sparkles } from 'lucide-react';

export default function ToolkitPage() {
  return (
    <AppShell title="AI Teacher's Toolkit">
      <section className="empty-center">
        <div>
          <div className="empty-illustration">
            <div className="empty-blob" />
            <div className="empty-paper" />
            <div className="magnify" />
            <div className="empty-x">
              <Sparkles size={44} />
            </div>
          </div>
          <h2>AI Teacher's Toolkit</h2>
          <p>Create AI-assisted worksheets, quizzes, lesson notes, and classroom resources from one place.</p>
          <Link href="/create-assignment" className="black-btn">
            <Plus size={16} />
            Create Assignment
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
