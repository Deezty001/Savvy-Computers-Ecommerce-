'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wrench, Flame, Headphones } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STANDARDS = [
  {
    icon: Wrench,
    title: "PRECISION ASSEMBLY",
    desc: "Hand-built by master technicians with an obsessive approach to cable management and component synergy. Not a single wire out of place."
  },
  {
    icon: Flame,
    title: "THE 48-HOUR BURN",
    desc: "Every system is subjected to a punishing 48-hour synthetic stress test. Thermal limits are pushed, stability is guaranteed before it leaves the lab."
  },
  {
    icon: Headphones,
    title: "LIFETIME SUPPORT",
    desc: "Skip the call center. You get direct access to the engineers who assembled your rig. Uncompromising support for an uncompromising machine."
  }
];

export default function SavvyStandard() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.standard-item', {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <section ref={container} style={{ 
      padding: '8rem 0', 
      background: 'var(--bg)', 
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)'
    }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <p style={{ 
            fontSize: '0.75rem', 
            letterSpacing: '0.3em', 
            color: 'var(--text-muted)', 
            textTransform: 'uppercase', 
            marginBottom: '1rem' 
          }}>
            THE ENGINEERING LAB
          </p>
          <h2 style={{
            fontFamily: 'var(--font-d)',
            fontSize: 'var(--fs-2xl)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 800,
            color: 'var(--white)'
          }}>
            THE SAVVY STANDARD
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
        }}>
          {STANDARDS.map((std, i) => (
            <div key={i} className="standard-item" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                border: '1px solid var(--border-heavy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem',
                background: 'var(--bg-offset)'
              }}>
                <std.icon size={28} color="var(--white)" />
              </div>
              
              <h3 style={{
                fontFamily: 'var(--font-d)',
                fontSize: '1.5rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: 'var(--white)',
                marginBottom: '1.5rem'
              }}>
                {std.title}
              </h3>
              
              <p style={{
                color: 'var(--text-dim)',
                lineHeight: 1.8,
                letterSpacing: '0.05em',
                fontSize: '0.95rem'
              }}>
                {std.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
