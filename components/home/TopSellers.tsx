'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ProductCard from '@/components/common/ProductCard';
import { products as allProducts } from '@/lib/data/products';

const products = allProducts.filter(p => p.featured).slice(0, 4);

export default function TopSellers() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    gsap.from('.pc-card-anim', {
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
    <section ref={container} className="top-sellers" style={{ background: 'var(--bg)', padding: 'var(--section-padding) 0' }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 900, 
            fontSize: 'var(--fs-2xl)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.04em',
            color: 'var(--white)'
          }}>
            TOP SELLING <span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', color: 'transparent' }}>COMPUTERS</span>
          </h2>
          <div style={{ width: '40px', height: '1px', background: 'var(--accent-light)', margin: '1.5rem auto', opacity: 0.3 }}></div>
        </div>

        <div 
          className="product-slider-container"
          style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            overflowX: 'auto', 
            paddingBottom: '2rem',
            paddingRight: 'var(--wrap-px)',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
          }}
        >
          {products.map((p, idx) => (
            <div 
              key={idx} 
              className="pc-card-anim" 
              style={{ 
                flex: '0 0 320px', // Smaller card width
                scrollSnapAlign: 'start' 
              }}
            >
              <ProductCard 
                name={p.name}
                cpu={p.specs.cpu?.split('|')[0] || p.specs.cpu}
                gpu={p.specs.gpu?.split('|')[0] || p.specs.gpu}
                price={`$${p.price.toLocaleString()}`}
                slug={p.slug}
                img={p.images[0] || "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800"}
                specs={[
                  p.specs.cpu,
                  p.specs.gpu,
                  p.specs.ram,
                  p.specs.storage
                ]}
              />
            </div>
          ))}
        </div>
        <style jsx>{`
          .product-slider-container::-webkit-scrollbar { display: none; } /* Chrome/Safari */
        `}</style>
      </div>
    </section>
  );
}
