'use client';

import AppShell from '@/components/AppShell';

export default function SettingsPage() {
  return (
    <AppShell title="Settings">
      <section className="profile-card">
        <h1>Settings</h1>
        <label>
          Notifications
          <input type="checkbox" defaultChecked />
        </label>
        <label>
          Auto-save generated papers
          <input type="checkbox" defaultChecked />
        </label>
        <label>
          Default language
          <select defaultValue="English">
            <option>English</option>
            <option>Hindi</option>
          </select>
        </label>
      </section>
    </AppShell>
  );
}
