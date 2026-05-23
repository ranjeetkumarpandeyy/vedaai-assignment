'use client';

import AppShell from '@/components/AppShell';
import { Bell, CheckCircle2, Clock3, FileText } from 'lucide-react';

const notifications = [
  {
    icon: FileText,
    title: 'Quiz on Electricity is ready',
    text: 'Your generated paper can now be viewed and downloaded.',
    time: '2 min ago',
  },
  {
    icon: CheckCircle2,
    title: 'Assignment shared',
    text: 'Class 5th - Section A received the assignment.',
    time: '18 min ago',
  },
  {
    icon: Clock3,
    title: 'Due date reminder',
    text: 'One assignment is due tomorrow.',
    time: '1 hr ago',
  },
];

export default function NotificationsPage() {
  return (
    <AppShell title="Notifications">
      <div className="section-title">
        <span className="green-dot" />
        <div>
          <h1>Notifications</h1>
          <p>Recent updates from your assignments and groups.</p>
        </div>
      </div>

      <section className="notification-list">
        {notifications.map(({ icon: Icon, title, text, time }) => (
          <article className="notification-card" key={title}>
            <div className="avatar">
              <Icon size={20} />
            </div>
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
            <span>{time}</span>
          </article>
        ))}
      </section>

      <button className="black-btn">
        <Bell size={16} />
        Mark All as Read
      </button>
    </AppShell>
  );
}
