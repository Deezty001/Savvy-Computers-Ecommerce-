'use client';

import React from 'react';

const testimonials = [
  { id: '01', text: 'Thougthfully white while above approach, consectetur adipiscing elit. Adipisicing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' },
  { id: '02', text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.' },
  { id: '03', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.' }
];

export default function Testimonials() {
  return (
    <section className="testimonials" style={{ background: 'var(--bg)', padding: '8rem 0', borderBottom: '1px solid var(--border)' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5rem' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 900, 
            fontSize: 'var(--fs-2xl)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.04em',
            lineHeight: 0.85
          }}>
            WHAT THEY SAY<br/>
            <span className="text-outline">*</span>
          </h2>
          <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: 'var(--fs-xs)', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>REVIEWS →</div>
        </div>

        <div className="res-grid-3">
          {testimonials.map((t, idx) => (
            <div key={idx} className="testimonial-card" style={{ 
              background: 'var(--bg-offset)', 
              padding: '2.5rem', 
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem'
            }}>
              <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.25rem', color: 'var(--accent-light)' }}>{t.id}</div>
              <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-muted)', flex: 1 }}>"{t.text}"</p>
              <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.1rem' }}>*</span> VERIFIED USER
              </div>
            </div>
          ))}
        </div>
        <style jsx>{`
          @media (max-width: 768px) {
            .testimonial-card { padding: 1.5rem !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
