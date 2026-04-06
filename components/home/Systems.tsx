// @ts-nocheck
'use client';

import React from 'react';

const systems = [
  { name: 'AXIS', price: '$2,499', desc: 'SC-Series Workstation - Optimized for multi-threaded creative workflows and 3D rendering.' },
  { name: 'ORION', price: '$1,999', desc: 'Elite Gaming Rig - High-refresh performance for competitive 4K gaming and simulation.' },
  { name: 'ARES', price: '$1,599', desc: 'Compact Powerhouse - Small form factor systems engineered for space efficiency and raw speed.' }
];

export default function Systems() {
  return (
    <section className="systems" style={{ background: 'var(--bg)', padding: '6rem 0' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '3.5rem', textTransform: 'uppercase' }}>System Grid</h2>
          <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>VIEW ALL →</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {systems.map((sys, idx) => (
            <div key={idx} style={{ 
              background: 'var(--bg-offset)', 
              border: '1px solid var(--border)', 
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '520px',
              transition: 'border-color 0.3s ease'
            }} className="hover-border-accent">
              <div style={{ 
                flex: 1, 
                background: '#000', 
                marginBottom: '2rem', 
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                {/* Bronze Overlay to reach the target theme look without new files */}
                <div style={{ position: 'absolute', inset: 0, background: 'var(--accent)', opacity: 0.1, mixBlendMode: 'overlay', pointerEvents: 'none' }} />
                <img 
                  src={`https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800&auto=format&fit=crop`} 
                  alt={sys.name} 
                  style={{ width: '85%', opacity: 0.8, filter: 'grayscale(1) contrast(1.1) brightness(0.9) sepia(0.15)' }}
                />
              </div>
              <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{sys.name}</div>
              <p style={{ fontSize: '0.72rem', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '2rem', flex: 1 }}>{sys.desc}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.4rem' }}>{sys.price}</div>
                <button className="btn btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.6rem', borderColor: 'rgba(255,255,255,0.1)' }}>PRODUCT →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .hover-border-accent:hover {
          border-color: var(--accent) !important;
        }
      `}</style>
    </section>
  );
}
