'use client';

import React from 'react';

export default function Gallery() {
  return (
    <section className="gallery" style={{ background: 'var(--bg)', padding: '8rem 0', borderBottom: '1px solid var(--border)' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 900, 
            fontSize: 'var(--fs-2xl)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.04em',
            lineHeight: 0.85
          }}>
            ARCHIVE<br/>
            <span className="text-outline">GALLERY</span>
          </h2>
          <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: 'var(--fs-xs)', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>VIEW ALL BUILDS →</div>
        </div>

        <div className="gallery-grid">
          {/* Main Large Shot */}
          <div className="g-cell" style={{ background: '#0a0a0a', overflow: 'hidden', border: '1px solid var(--border)' }}>
             <img 
              src="https://images.unsplash.com/photo-1541140134513-85a161dc4a00?q=80&w=2000&auto=format&fit=crop" 
              alt="Gallery 1" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, filter: 'grayscale(1) sepia(0.08)' }}
            />
          </div>
          {/* Top Right Shot */}
          <div style={{ background: '#0a0a0a', overflow: 'hidden', border: '1px solid var(--border)' }}>
             <img 
              src="https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=1000&auto=format&fit=crop" 
              alt="Gallery 2" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, filter: 'grayscale(1) sepia(0.12)' }}
            />
          </div>
          {/* Top Far Right Shot */}
          <div style={{ background: '#0a0a0a', overflow: 'hidden', border: '1px solid var(--border)' }}>
             <img 
              src="https://images.unsplash.com/photo-1587202372471-802996e897c7?q=80&w=1000&auto=format&fit=crop" 
              alt="Gallery 3" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, filter: 'grayscale(1) sepia(0.12)' }}
            />
          </div>
          {/* Bottom Right Shot */}
          <div style={{ background: '#0a0a0a', overflow: 'hidden', border: '1px solid var(--border)', gridColumn: 'span 2' }} className="hide-mobile">
             <img 
              src="https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=2000&auto=format&fit=crop" 
              alt="Gallery 4" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, filter: 'grayscale(1) sepia(0.15)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
