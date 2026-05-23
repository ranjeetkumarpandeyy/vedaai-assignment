'use client';

import Link from 'next/link';
import { useState } from 'react';
import AppShell from '@/components/AppShell';
import { Edit3, Eye, Filter, MoreVertical, Plus, Search, Trash2 } from 'lucide-react';

const initialCards = Array.from({ length: 8 }, (_, index) => index + 1);

export default function AssignmentsPage() {
  const [cards, setCards] = useState(initialCards);
  const [openMenu, setOpenMenu] = useState(1);

  const deleteCard = (card: number) => {
    setCards((current) => current.filter((item) => item !== card));
    setOpenMenu(0);
  };

  return (
    <AppShell title="Assignment">
      <div className="section-title">
        <span className="green-dot" />
        <div>
          <h1>Assignments</h1>
          <p>Manage and create assignments for your classes.</p>
        </div>
      </div>

      <div className="filters">
        <div className="filter-label">
          <Filter size={16} />
          Filter By
        </div>
        <div className="search-box">
          <Search size={15} />
          Search Assignment
        </div>
      </div>

      <section className="assign-grid">
        {cards.map((card) => (
          <article className="assignment-card" key={card}>
            <h2>Quiz on Electricity</h2>
            <button
              className="menu-dots"
              aria-label="Assignment actions"
              onClick={() => setOpenMenu(openMenu === card ? 0 : card)}
            >
              <MoreVertical size={19} />
            </button>
            {openMenu === card && (
              <div className="mini-menu">
                <Link href="/assignment/demo">
                  <Eye size={13} />
                  View Assignment
                </Link>
                <Link href="/create-assignment">
                  <Edit3 size={13} />
                  Edit
                </Link>
                <button className="delete" onClick={() => deleteCard(card)}>
                  <Trash2 size={13} />
                  Delete
                </button>
              </div>
            )}
            <div className="assignment-meta">
              <span>
                <strong>Assigned on :</strong> 20-06-2025
              </span>
              <span>
                <strong>Due :</strong> 21-06-2025
              </span>
            </div>
          </article>
        ))}
      </section>

      <Link href="/create-assignment" className="floating-create">
        <Plus size={16} />
        Create Assignment
      </Link>
    </AppShell>
  );
}
