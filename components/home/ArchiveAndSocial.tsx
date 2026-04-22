'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ShieldCheck, MapPin } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ARCHIVE_PHOTOS = [
  "https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1624704764687-d1a293b6e768?q=80&w=1000&auto=format&fit=crop"
];

const TESTIMONIALS = [
  {
    name: "James T.",
    text: "The cleanest build I've ever seen. The attention to detail is staggering. It runs silently even under full load.",
    build: "TITAN / 4090"
  },
  {
    name: "Sarah M.",
    text: "Savvy Computers understood exactly what I needed for rendering. The Studio Series cut my render times in half.",
    build: "STUDIO / 4080 SUPER"
  },
  {
    name: "David K.",
    text: "Unbeatable esports performance. The 7800X3D setup holds 360fps flawlessly. Support was incredibly knowledgeable.",
    build: "PERFORMANCE / 4070 Ti"
  }
];

export default function ArchiveAndSocial() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Archive Grid Animation
    gsap.from('.archive-img', {
      scrollTrigger: {
        trigger: '.archive-grid',
        start: "top 80%",
      },
      scale: 0.9,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "expo.out"
    });

    // Testimonials Animation
    gsap.from('.test-card', {
      scrollTrigger: {
        trigger: '.testimonials-section',
        start: "top 85%",
      },
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <section ref={container} style={{ background: 'var(--bg)' }}>
      
      {/* Archive Grid */}
      <div className="wrap" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-d)',
          fontSize: 'var(--fs-xl)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 800,
          color: 'var(--white)',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          THE ARCHIVE
        </h2>
        
        <div className="archive-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '250px',
          gap: '1rem'
        }}>
          {ARCHIVE_PHOTOS.map((src, i) => (
            <div key={i} className="archive-img" style={{
              overflow: 'hidden',
              background: '#0a0a0a',
              gridColumn: i === 0 ? 'span 2' : 'span 1',
              gridRow: i === 0 ? 'span 2' : 'span 1'
            }}>
              <img 
                src={src} 
                alt="Archive Build" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%) contrast(1.2) brightness(0.9)',
                  transition: 'transform 0.6s ease, filter 0.6s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.filter = 'grayscale(0%) contrast(1.1) brightness(1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.filter = 'grayscale(100%) contrast(1.2) brightness(0.9)';
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials-section wrap" style={{ paddingBottom: '8rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {TESTIMONIALS.map((test, i) => (
            <div key={i} className="test-card" style={{
              padding: '3rem 2.5rem',
              border: '1px solid var(--border-heavy)',
              background: 'var(--bg-offset)'
            }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem' }}>
                {[1,2,3,4,5].map(star => <Star key={star} size={16} color="var(--white)" fill="var(--white)" />)}
              </div>
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.8,
                color: 'var(--white)',
                marginBottom: '2rem',
                fontStyle: 'italic',
                fontWeight: 300
              }}>
                "{test.text}"
              </p>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--white)', letterSpacing: '0.05em' }}>{test.name}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                    <ShieldCheck size={12} /> VERIFIED OWNER
                  </p>
                </div>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  {test.build}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Trust Badges */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '4rem 0',
        background: 'var(--bg-offset)'
      }}>
        <div className="wrap" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <MapPin size={20} color="var(--white)" />
            <span style={{
              fontFamily: 'var(--font-d)',
              fontSize: '1.2rem',
              fontWeight: 800,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--white)'
            }}>
              BUILT IN SYDNEY, AUSTRALIA
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', opacity: 0.6 }}>
            {/* Monochrome Payment Icons placeholders */}
            <div style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em' }}>VISA</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em' }}>MASTERCARD</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em' }}>AMEX</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em' }}>AFTERPAY</div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 992px) {
          .archive-grid { grid-template-columns: 1fr 1fr !important; }
          .archive-img:first-child { grid-column: span 2 !important; }
        }
        @media (max-width: 600px) {
          .archive-grid { grid-template-columns: 1fr !important; }
          .archive-img { grid-column: span 1 !important; grid-row: span 1 !important; }
          .archive-img:first-child { grid-column: span 1 !important; }
        }
      `}} />
    </section>
  );
}
