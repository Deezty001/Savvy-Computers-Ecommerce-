// @ts-nocheck
'use client';

import * as React from 'react';

export default function Benchmark() {
  return (
    <section className="benchmark" style={{ background: 'var(--bg)', padding: '1rem 0 2rem 0' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', minHeight: '640px' }}>
          
          <div style={{ 
            background: 'var(--accent)', 
            padding: '4rem', 
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{ position: 'absolute', top: '3rem', right: '3.5rem', display: 'flex', gap: '1.5rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.62rem', letterSpacing: '0.2em' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '4px', height: '4px', background: 'var(--white)', borderRadius: '50%' }} /> 3.6+</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '4px', height: '4px', background: 'var(--white)', borderRadius: '50%' }} /> 4.8+</div>
            </div>
            
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <img 
                src="https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=1000&auto=format&fit=crop" 
                alt="Benchmark" 
                style={{ width: '85%', filter: 'contrast(1.1) brightness(0.8) sepia(0.2)' }}
              />
            </div>

            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: 'clamp(3rem, 5vw, 5rem)', textTransform: 'uppercase', lineHeight: 0.85, color: '#fff' }}>
              PERFORMANCE<br/>BENCHMARK
            </div>
          </div>

          <div style={{ 
            background: 'var(--bg-offset)', 
            padding: '4rem', 
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            border: '1px solid var(--border)'
          }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <img 
                src="https://images.unsplash.com/photo-1541140134513-85a161dc4a00?q=80&w=1000&auto=format&fit=crop" 
                alt="Form Function" 
                style={{ width: '90%', opacity: 0.7, filter: 'grayscale(1)' }}
              />
            </div>

            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: 'clamp(3rem, 5vw, 5rem)', textTransform: 'uppercase', lineHeight: 0.85 }}>
              FORM<br/>FUNCTION
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
