'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import AppShell from '@/components/AppShell';
import { CalendarDays, ChevronDown, Mic, Minus, Plus, UploadCloud, X } from 'lucide-react';

const rows = [
  ['Multiple Choice Questions', 4, 1],
  ['Short Questions', 3, 2],
  ['Diagram/Graph-Based Questions', 5, 5],
  ['Numerical Problems', 5, 5],
];

export default function CreateAssignmentPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const [dueDate, setDueDate] = useState('');

  return (
    <AppShell title="Assignment">
      <div className="section-title">
        <span className="green-dot" />
        <div>
          <h1>Create Assignment</h1>
          <p>Set up a new assignment for your students</p>
        </div>
      </div>

      <div className="form-wrap">
        <div className="progress">
          <span />
          <span />
        </div>

        <section className="form-card">
          <h2>Assignment Details</h2>
          <div className="hint">Basic information about your assignment</div>

          <div className="upload-zone" onClick={() => fileRef.current?.click()}>
            <div>
              <div className="upload-icon">
                <UploadCloud size={20} />
              </div>
              <strong>{fileName || 'Choose a file or drag & drop it here'}</strong>
              <div className="hint">JPEG, PNG, upto 10MB</div>
              <button
                className="browse"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  fileRef.current?.click();
                }}
              >
                Browse Files
              </button>
              <input
                ref={fileRef}
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                className="file-input"
                onChange={(event) => setFileName(event.target.files?.[0]?.name || '')}
              />
            </div>
          </div>
          <div className="hint" style={{ textAlign: 'center' }}>
            Upload images of your preferred document/image
          </div>

          <div className="field-label">Due Date</div>
          <label className="date-field">
            <input
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              aria-label="Due date"
            />
            <CalendarDays size={16} />
          </label>

          <div className="row-heading" style={{ marginTop: 22 }}>
            <span>Question Type</span>
            <span />
            <span>No. of Questions</span>
            <span>Marks</span>
          </div>

          {rows.map(([label, questions, marks]) => (
            <div className="q-row" key={label as string}>
              <div className="select-pill">
                <span>{label}</span>
                <ChevronDown size={14} />
              </div>
              <X size={14} />
              <div className="stepper">
                <button>
                  <Minus size={12} />
                </button>
                <span>{questions}</span>
                <button>
                  <Plus size={12} />
                </button>
              </div>
              <div className="stepper">
                <button>
                  <Minus size={12} />
                </button>
                <span>{marks}</span>
                <button>
                  <Plus size={12} />
                </button>
              </div>
            </div>
          ))}

          <button className="add-type">
            <span>+</span>
            Add Question Type
          </button>

          <div className="totals">
            <div>Total Questions : 25</div>
            <div>Total Marks : 60</div>
          </div>

          <div className="field-label">Additional Information (For better output)</div>
          <div className="info-box">
            <span>e.g Generate a question paper for 3 hour exam duration...</span>
            <Mic size={15} color="#222" />
          </div>
        </section>
      </div>

      <div className="form-actions">
        <Link href="/assignments" className="white-btn">
          Previous
        </Link>
        <Link href="/assignment/demo" className="black-btn">
          Next
        </Link>
      </div>
    </AppShell>
  );
}
