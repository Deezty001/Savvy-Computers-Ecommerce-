'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface Product {
  name: string;
  price: string;
  specs: string[];
}

const products: Product[] = [
  { name: 'AXIS PRO', price: '$3,499', specs: ['RTX 4090 24GB', 'i9 14900K', '64GB DDR5', '4TB NVMe'] },
  { name: 'ORION ELITE', price: '$2,899', specs: ['RTX 4080 SUPER', 'i7 14700K', '32GB DDR5', '2TB NVMe'] },
  { name: 'ARES MINI', price: '$2,199', specs: ['RTX 4070 Ti', 'i5 14600K', '16GB DDR5', '1TB NVMe'] }
];

export default function TopSellers() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    // Initial reveal
    gsap.from('.product-card', {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%'
      }
    });

    // Hover logic for spec overlay
    const cards = container.current.querySelectorAll('.product-card');
    cards.forEach((card) => {
      const overlay = card.querySelector('.spec-overlay');
      const specs = card.querySelectorAll('.spec-item');

      card.addEventListener('mouseenter', () => {
        gsap.to(overlay, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        gsap.to(specs, { y: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: 'back.out(1.7)' });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in' });
        gsap.to(specs, { y: 20, opacity: 0, duration: 0.3, ease: 'power2.in' });
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="top-sellers" style={{ background: 'var(--bg)', padding: '12rem 0' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8rem', borderBottom: '1px solid var(--border)', paddingBottom: '4rem' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 900, 
            fontSize: 'var(--fs-2xl)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.04em',
            lineHeight: 0.85,
            color: 'var(--white)'
          }}>
            TOP<br/>
            <span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', color: 'transparent' }}>SELLERS</span>
          </h2>
          <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: 'var(--fs-xs)', letterSpacing: '0.2rem', color: 'var(--text-muted)', cursor: 'pointer' }}>VIEW ALL →</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {products.map((p, idx) => (
            <div key={idx} style={{ background: 'var(--bg-offset)', border: '1px solid var(--border)', padding: '4rem', cursor: 'pointer', position: 'relative' }} className="product-card group">
              
              {/* Spec Overlay */}
              <div 
                className="spec-overlay" 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'rgba(0,0,0,0.85)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  opacity: 0, 
                  zIndex: 20, 
                  backdropFilter: 'blur(10px)',
                  transition: 'opacity 0.4s'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
                  {p.specs.map((spec, sidx) => (
                    <div key={sidx} className="spec-item" style={{ color: 'white', fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.2rem', opacity: 0, transform: 'translateY(20px)' }}>
                      {spec}
                    </div>
                  ))}
                  <div style={{ marginTop: '2rem' }} className="spec-item">
                    <button className="btn btn-solid" style={{ fontSize: '0.8rem', padding: '0.6rem 1.2rem' }}>CONFIGURE</button>
                  </div>
                </div>
              </div>

              <div style={{ background: '#000', aspectRatio: '1/1', marginBottom: '4rem', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img 
                  src="https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800&auto=format&fit=crop" 
                  alt={p.name} 
                  style={{ width: '80%', opacity: 0.8, filter: 'grayscale(1) sepia(0.12)' }}
                />
              </div>
              
              <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '2rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em', color: 'var(--white)' }}>{p.name}</div>
              <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--accent-light)', marginBottom: '4rem' }}>{p.price}</div>
              <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>VIEW DETAILS</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
