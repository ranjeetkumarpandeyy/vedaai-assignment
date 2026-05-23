'use client';

import AppShell from '@/components/AppShell';
import { BookUser, ClipboardList, FileUp, Plus, Search, Settings2, Users } from 'lucide-react';

const groups = [
  { name: 'Class 5th - Section A', students: 38, assignments: 6 },
  { name: 'Class 6th - Science', students: 42, assignments: 4 },
  { name: 'Class 8th - CBSE', students: 35, assignments: 8 },
];

const actions = [
  { icon: Plus, title: 'Create Group', text: 'Create a new class group for students.' },
  { icon: Settings2, title: 'Manage Group', text: 'Edit group details, students, and sections.' },
  { icon: FileUp, title: 'Import Students', text: 'Upload a CSV or spreadsheet of students.' },
  { icon: ClipboardList, title: 'Assign Work', text: 'Send assignments to selected groups.' },
];

export default function GroupsPage() {
  return (
    <AppShell title="My Groups">
      <div className="section-title">
        <span className="green-dot" />
        <div>
          <h1>My Groups</h1>
          <p>Create and manage class groups for assignment distribution.</p>
        </div>
      </div>

      <section className="group-actions">
        {actions.map(({ icon: Icon, title, text }) => (
          <button className="group-action" key={title}>
            <Icon size={22} />
            <strong>{title}</strong>
            <span>{text}</span>
          </button>
        ))}
      </section>

      <div className="filters">
        <div className="filter-label">
          <Users size={16} />
          All Groups
        </div>
        <div className="search-box">
          <Search size={15} />
          Search Group
        </div>
      </div>

      <section className="group-list">
        {groups.map((group) => (
          <article className="group-card" key={group.name}>
            <div className="avatar">
              <BookUser size={20} />
            </div>
            <div>
              <h2>{group.name}</h2>
              <p>{group.students} students</p>
            </div>
            <div className="group-stat">
              <strong>{group.assignments}</strong>
              <span>Assignments</span>
            </div>
            <button className="white-btn">Manage</button>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
