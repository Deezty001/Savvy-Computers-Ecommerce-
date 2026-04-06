'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Showcase() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;
    
    // Reveal text in a staggered sequence
    gsap.from('.sc-reveal', {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%'
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="showcase" style={{ background: 'var(--bg)', padding: '12rem 0', borderTop: '1px solid var(--border)' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '10rem', alignItems: 'center' }}>
          
          <div style={{ background: 'var(--bg-offset)', aspectRatio: '1.2/1', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }} className="sc-reveal">
            <div style={{ position: 'absolute', inset: 0, background: 'var(--accent)', opacity: 0.1, zIndex: 1 }} />
            <img 
              src="https://images.unsplash.com/photo-1587202372471-802996e897c7?q=80&w=2000&auto=format&fit=crop" 
              alt="Showcase System" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, filter: 'grayscale(1) sepia(0.12)' }}
            />
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: 'var(--fs-xs)', letterSpacing: '0.4em', color: 'var(--accent-light)', marginBottom: '3rem' }} className="sc-reveal">
              <span style={{ fontSize: '1.8rem', opacity: 0.4 }}>*</span> FEATURED SYSTEM
            </div>
            
            <h2 style={{ 
              fontFamily: 'var(--font-d)', 
              fontWeight: 900, 
              fontSize: 'var(--fs-2xl)', 
              textTransform: 'uppercase', 
              lineHeight: 0.85, 
              letterSpacing: '0.04em',
              marginBottom: '2rem',
              color: 'var(--white)'
            }} className="sc-reveal">
              AXIS<br/>
              <span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', color: 'transparent' }}>ELITE</span>
            </h2>
            
            <h3 style={{ 
              fontFamily: 'var(--font-d)', 
              fontWeight: 700, 
              fontSize: '1.8rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.12em',
              marginBottom: '5rem',
              color: 'var(--text-muted)'
            }} className="sc-reveal">
              LIMITLESS <span className="text-outline" style={{ WebkitTextStroke: '1px var(--text-muted)', color: 'transparent' }}>POWER</span>
            </h3>

            <p style={{ fontSize: 'var(--fs-base)', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '6rem', maxWidth: '35ch' }} className="sc-reveal">
              The pinnacle of Savvy engineering. Hand-selected components stress-tested for maximum thermal efficiency and stability in boutique workstation environments.
            </p>
            
            <button className="btn btn-solid sc-reveal px-12 py-4">CONFIGURE NOW</button>
          </div>
        </div>
      </div>
    </section>
  );
}
