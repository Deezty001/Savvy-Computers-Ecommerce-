'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Cpu, Zap, Database, Activity, ChevronRight } from 'lucide-react';

export default function Showcase() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;
    
    gsap.from('.sc-reveal', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%'
      }
    });
  }, { scope: container });

  const specs = [
    { icon: Cpu, label: 'PROCESSOR', value: 'i9-14900K' },
    { icon: Zap, label: 'GRAPHICS', value: 'RTX 4090' },
    { icon: Database, label: 'MEMORY', value: '64GB DDR5' },
    { icon: Activity, label: 'COOLING', value: '360MM AIO' }
  ];

  return (
    <section ref={container} className="showcase" style={{ 
      background: 'var(--bg)', 
      padding: 'var(--section-padding) 0', 
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)'
    }}>
      <div className="wrap">
        <div className="res-grid-showcase" style={{ display: 'grid', alignItems: 'center' }}>
          
          {/* System Image Container */}
          <div style={{ 
            background: 'var(--bg-offset)', 
            aspectRatio: '4/3', 
            border: '1px solid var(--border)', 
            position: 'relative', 
            overflow: 'hidden' 
          }} className="sc-reveal">
            <img 
              src="https://images.unsplash.com/photo-1587202372471-802996e897c7?q=80&w=2000&auto=format&fit=crop" 
              alt="Showcase System" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, filter: 'grayscale(1)' }}
            />
            {/* Subtle corner accent */}
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '40px', height: '40px', borderRight: '1px solid var(--white)', borderTop: '1px solid var(--white)', opacity: 0.3 }} />
          </div>

          {/* System Content */}
          <div>
            <div style={{ 
              fontFamily: 'var(--font-d)', 
              fontWeight: 800, 
              fontSize: '0.7rem', 
              letterSpacing: '0.4em', 
              color: 'var(--accent-light)', 
              marginBottom: '1.5rem',
              opacity: 0.8
            }} className="sc-reveal">
              FEATURED ARCHITECTURE
            </div>
            
            <h2 style={{ 
              fontFamily: 'var(--font-d)', 
              fontWeight: 900, 
              fontSize: 'var(--fs-2xl)', 
              textTransform: 'uppercase', 
              lineHeight: 1, 
              letterSpacing: '0.05em',
              marginBottom: '2rem',
              color: 'var(--white)',
              whiteSpace: 'nowrap'
            }} className="sc-reveal">
              AXIS <span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', color: 'transparent' }}>ELITE</span>
            </h2>
            
            <p style={{ 
              fontSize: '1rem', 
              lineHeight: 1.7, 
              color: 'var(--text-muted)', 
              marginBottom: '3.5rem', 
              maxWidth: '45ch',
              letterSpacing: '0.02em'
            }} className="sc-reveal">
              The pinnacle of Savvy engineering. Hand-selected components stress-tested for maximum thermal efficiency and stability in boutique workstation environments.
            </p>

            {/* 2x2 Spec Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '2.5rem 2rem', 
              marginBottom: '4rem',
              borderTop: '1px solid var(--border)',
              paddingTop: '3rem'
            }} className="sc-reveal">
              {specs.map((spec, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    border: '1px solid var(--border)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.02)'
                  }}>
                    <spec.icon size={18} color="var(--white)" style={{ opacity: 0.7 }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{spec.label}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--white)', fontWeight: 700, letterSpacing: '0.05em' }}>{spec.value}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="btn btn-solid sc-reveal" style={{ padding: '1.25rem 3.5rem', letterSpacing: '0.2em' }}>
              CONFIGURE SYSTEM <ChevronRight size={16} style={{ marginLeft: '0.5rem' }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
