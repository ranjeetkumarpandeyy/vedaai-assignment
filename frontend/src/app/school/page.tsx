'use client';

import AppShell from '@/components/AppShell';

export default function SchoolPage() {
  return (
    <AppShell title="Delhi Public School">
      <section className="profile-card">
        <h1>Delhi Public School</h1>
        <label>
          School Name
          <input defaultValue="Delhi Public School" />
        </label>
        <label>
          City
          <input defaultValue="Bokaro Steel City" />
        </label>
        <label>
          Default Board
          <input defaultValue="CBSE" />
        </label>
        <button className="black-btn">Save School</button>
      </section>
    </AppShell>
  );
}
