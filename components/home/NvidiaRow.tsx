'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ProductCard from '@/components/common/ProductCard';

const nvidiaProducts = [
  { 
    name: 'TITAN X', 
    slug: 'titan-x',
    cpu: 'I9 14900K', 
    gpu: 'RTX 4090 24GB',
    price: '$4,999', 
    savings: '$1000',
    specs: ['128GB DDR5 6400MHz', '8TB NVMe Gen5 SSD', 'Z790 Hero Board', '1600W Titanium PSU'],
    img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800'
  },
  { 
    name: 'FORCE RTX', 
    slug: 'force-rtx',
    cpu: 'RYZEN 9 7950X3D', 
    gpu: 'RTX 4080 SUPER',
    price: '$3,799', 
    savings: '$800',
    specs: ['64GB DDR5 6000MHz', '4TB NVMe Gen4 SSD', 'X670E Carbon WiFi', '1000W Platinum PSU'],
    img: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?q=80&w=800'
  },
  { 
    name: 'RAY TRACER', 
    slug: 'ray-tracer',
    cpu: 'I7 14700K', 
    gpu: 'RTX 4070 Ti SUPER',
    price: '$2,899', 
    savings: '$500',
    specs: ['32GB DDR5 6000MHz', '2TB NVMe SSD', 'Z790-A Gaming WiFi', '850W Gold PSU'],
    img: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=800'
  },
  { 
    name: 'NEON 40', 
    slug: 'neon-40',
    cpu: 'I5 14600K', 
    gpu: 'RTX 4070 SUPER',
    price: '$2,149', 
    savings: '$300',
    specs: ['32GB DDR5 5600MHz', '1TB NVMe SSD', 'B760 Motherboard', '750W Gold PSU'],
    img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800'
  }
];

export default function NvidiaRow() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    gsap.from('.nv-card-anim', {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%'
      }
    });
  }, { scope: container });

  return (
    <section ref={container} style={{ background: '#0a0a0a', padding: 'var(--section-padding) 0', position: 'relative', overflow: 'hidden' }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ 
            fontFamily: 'var(--font-d)', 
            fontSize: '0.65rem', 
            fontWeight: 700, 
            letterSpacing: '0.3em', 
            color: 'var(--text-muted)',
            marginBottom: '1rem',
            textTransform: 'uppercase'
          }}>POWERED BY</div>
          <h2 style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 900, 
            fontSize: 'var(--fs-2xl)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.04em',
            color: 'var(--white)'
          }}>
            NVIDIA GEFORCE <span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', color: 'transparent' }}>RTX™ RANGE</span>
          </h2>
          <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '1.5rem auto' }}></div>
        </div>

        <div className="res-grid-4">
          {nvidiaProducts.map((p, idx) => (
            <div key={idx} className="nv-card-anim">
              <ProductCard {...p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
