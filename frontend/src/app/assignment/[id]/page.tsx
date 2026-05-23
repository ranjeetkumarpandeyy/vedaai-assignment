'use client';

import AppShell from '@/components/AppShell';
import { Download } from 'lucide-react';

const questions = [
  '[Easy] Define electroplating. Explain its purpose. [2 Marks]',
  '[Moderate] What is the role of a conductor in the process of electrolysis? [2 Marks]',
  '[Easy] Why does a solution of copper sulfate conduct electricity? [2 Marks]',
  '[Moderate] Describe one example of the chemical effect of electric current in daily life. [2 Marks]',
  '[Moderate] Explain why electric current is said to have chemical effects. [2 Marks]',
  '[Challenging] How is sodium hydroxide prepared during the electrolysis of brine? Write the chemical reaction involved. [2 Marks]',
  '[Challenging] What happens at the cathode and anode during the electrolysis of water? Name the gases evolved. [2 Marks]',
  '[Easy] Mention the type of current used in electroplating and justify why it is used. [2 Marks]',
  '[Moderate] What is the importance of electric current in the field of metallurgy? [2 Marks]',
  '[Challenging] Explain with a chemical equation how copper is deposited during the electroplating of an object. [2 Marks]',
];

const answers = [
  'Electroplating is the process of depositing a thin layer of metal on the surface of another metal using electric current. Its purpose is to prevent corrosion, improve appearance, or increase thickness.',
  'A conductor allows the flow of electric current, causing ions in the electrolyte to move and enabling chemical changes at electrodes.',
  'Copper sulfate solution contains free copper and sulfate ions which carry electric charge, thus conducting electricity.',
  'An example is the electroplating of silver on jewelry to prevent tarnishing.',
  'Electric current causes the movement of ions leading to chemical changes at the electrodes, hence it shows chemical effects.',
  'Sodium hydroxide is formed at the cathode during brine electrolysis as water gains electrons.',
  'At the cathode water is reduced to hydrogen gas and hydroxide ions. At the anode water is oxidized to oxygen gas and hydrogen ions.',
];

export default function AssignmentDetailPage() {
  return (
    <AppShell title="Create New">
      <div className="output-layout">
        <section className="hero-output">
          <h2>
            Certainly, Lakshya! Here are customized Question Paper for your CBSE Grade 8 Science
            classes on the NCERT chapters:
          </h2>
          <button className="download">
            <Download size={13} />
            Download as PDF
          </button>
        </section>

        <article className="paper">
          <h1>Delhi Public School Sector-4, Bokaro</h1>
          <div className="sub">
            <div>Subject: English</div>
            <div>Class: 5th</div>
          </div>

          <div className="paper-meta">
            <strong>Time Allowed: 45 minutes</strong>
            <strong>Maximum Marks: 20</strong>
          </div>

          <p>
            <strong>All questions are compulsory unless stated otherwise.</strong>
          </p>

          <div className="student-lines">
            <div>Name: ________________________</div>
            <div>Roll Number: ________________</div>
            <div>Class: 5th Section: __________</div>
          </div>

          <h2>Section A</h2>
          <h3>Short Answer Questions</h3>
          <p>
            <em>Attempt all questions. Each question carries 2 marks</em>
          </p>

          <ol>
            {questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>

          <p>
            <strong>End of Question Paper</strong>
          </p>

          <div className="answer-key">
            <h3>Answer Key:</h3>
            <ol>
              {answers.map((answer) => (
                <li key={answer}>{answer}</li>
              ))}
            </ol>
          </div>
        </article>
      </div>
    </AppShell>
  );
}
