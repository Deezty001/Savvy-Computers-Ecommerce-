'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveRight, Cpu, Thermometer, ShieldCheck, MapPin } from "lucide-react";
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SPOTLIGHTS = [
  {
    title: "Simulation Series",
    subtitle: "Engineered for the Apex.",
    desc: "Built around the absolute peak of gaming silicon—the AMD Ryzen 7 7800X3D. Relentless stability for marathon endurance racing, engineered to hold maximum boost clocks when mere milliseconds decide the podium.",
    img: "/spotlight_sim_1776584501500.png",
    reverse: false,
  },
  {
    title: "Studio Series",
    subtitle: "The Architect's Engine.",
    desc: "Uncompromising computational density. Calibrated specifically for Revit, AutoCAD, and heavy 3D rendering workloads. Silent acoustics masked behind a monolithic, distraction-free aesthetic.",
    img: "/spotlight_studio_1776584514294.png",
    reverse: true,
  },
  {
    title: "Performance Series",
    subtitle: "Raw Competitive Power.",
    desc: "Zero-latency, high-refresh supremacy. Stripped of bloatware, thermally optimized, and stress-tested to ensure every frame reaches your display without hesitation in competitive FPS arenas.",
    img: "/spotlight_perf_1776584528093.png",
    reverse: false,
  }
];

export default function Spotlights() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.spotlight-section');
    
    sections.forEach((sec: any) => {
      const img = sec.querySelector('.spotlight-img');
      const text = sec.querySelector('.spotlight-text');
      const features = sec.querySelectorAll('.feature-item');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top 70%",
        }
      });

      tl.from(img, { opacity: 0, scale: 1.05, duration: 1.5, ease: "power3.out" })
        .from(text, { opacity: 0, x: sec.classList.contains('reverse') ? -30 : 30, duration: 1.2, ease: "power3.out" }, "-=1")
        .from(features, { opacity: 0, y: 15, stagger: 0.1, duration: 0.8, ease: "power3.out" }, "-=0.8");
    });
  }, { scope: container });

  return (
    <section ref={container} style={{ padding: '8rem 0', background: 'var(--bg)' }}>
      {SPOTLIGHTS.map((spot, idx) => (
        <div key={idx} className={`spotlight-section ${spot.reverse ? 'reverse' : ''}`} style={{
          display: 'flex',
          flexDirection: spot.reverse ? 'row-reverse' : 'row',
          alignItems: 'stretch',
          minHeight: '85vh',
          marginBottom: '2rem',
          borderTop: '1px solid var(--border)',
          borderBottom: idx === SPOTLIGHTS.length - 1 ? '1px solid var(--border)' : 'none',
          flexWrap: 'wrap',
          background: 'var(--bg)'
        }}>
          {/* Image Side */}
          <div className="spotlight-img" style={{
            flex: '1 1 50%',
            position: 'relative',
            minHeight: '500px',
            borderRight: spot.reverse ? 'none' : '1px solid var(--border)',
            borderLeft: spot.reverse ? '1px solid var(--border)' : 'none',
          }}>
            <img 
              src={spot.img} 
              alt={spot.title} 
              style={{
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                filter: 'grayscale(100%) contrast(1.1) brightness(0.9)'
              }} 
            />
          </div>

          {/* Text Side */}
          <div className="spotlight-text" style={{
            flex: '1 1 50%',
            padding: '8vw 6vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-d)',
              fontSize: 'var(--fs-2xl)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 800,
              lineHeight: 0.9,
              marginBottom: '2rem',
              color: 'var(--white)'
            }}>
              {spot.title}
            </h2>
            <h3 style={{
              fontSize: 'var(--fs-lg)',
              letterSpacing: '0.1em',
              fontWeight: 300,
              color: 'var(--text-muted)',
              marginBottom: '3rem',
              borderLeft: '2px solid var(--white)',
              paddingLeft: '1.5rem'
            }}>
              {spot.subtitle}
            </h3>
            <p style={{
              fontSize: 'var(--fs-sm)',
              lineHeight: 1.8,
              color: 'var(--text-dim)',
              letterSpacing: '0.05em',
              maxWidth: '600px',
              marginBottom: '5rem'
            }}>
              {spot.desc}
            </p>

            {/* 2x2 Feature Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2.5rem 1.5rem',
              marginBottom: '5rem'
            }}>
              {[
                { icon: Thermometer, text: "Thermal Optimized" },
                { icon: ShieldCheck, text: "Zero Bloatware" },
                { icon: Cpu, text: "Absolute Stability" },
                { icon: MapPin, text: "Tested in Sydney" }
              ].map((f, i) => (
                <div key={i} className="feature-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <f.icon size={20} color="var(--white)" style={{ marginTop: '3px', opacity: 0.7 }} />
                  <span style={{ 
                    fontSize: '0.85rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.15em', 
                    color: 'var(--white)',
                    fontWeight: 500
                  }}>{f.text}</span>
                </div>
              ))}
            </div>

            <Link href="/shop" className="btn btn-ghost" style={{ 
              alignSelf: 'flex-start',
              padding: '1.25rem 3rem',
              border: '1px solid var(--border-heavy)',
              letterSpacing: '0.2em'
            }}>
              EXPLORE SERIES <MoveRight size={16} style={{ marginLeft: '0.5rem' }} />
            </Link>
          </div>
        </div>
      ))}
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 992px) {
          .spotlight-section { flex-direction: column !important; }
          .spotlight-img, .spotlight-text { flex: 1 1 100% !important; border: none !important; border-bottom: 1px solid var(--border) !important; }
          .spotlight-text { padding: 4rem 2rem !important; }
        }
      `}} />
    </section>
  );
}
