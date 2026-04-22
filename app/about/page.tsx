// @ts-nocheck
'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Award, Users, MoveRight, Flame, Cpu, Wind, Target } from "lucide-react";
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', paddingTop: '80px' }}>
      
      {/* Hero Section */}
      <section style={{ borderBottom: '1px solid var(--border)', padding: '10rem 0 8rem' }}>
        <div className="wrap">
          <div style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 800, 
            fontSize: '0.75rem', 
            letterSpacing: '0.4em', 
            textTransform: 'uppercase', 
            color: 'var(--accent-light)', 
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <span style={{ fontSize: '1.5rem', opacity: 0.3 }}>*</span> THE SAVVY STANDARD — EST. 2018
          </div>
          <h1 style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 900, 
            fontSize: 'clamp(3.5rem, 12vw, 9.5rem)', 
            textTransform: 'uppercase', 
            lineHeight: 0.8, 
            letterSpacing: '0.02em', 
            marginBottom: '5rem' 
          }}>
            PRECISION <br/> 
            <span className="text-outline" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)', color: 'transparent' }}>ARCHITECTS</span>
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem' }}>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--white)', fontWeight: 600, letterSpacing: '-0.01em' }}>
              We don't just assemble computers. We engineer high-performance ecosystems for the world's most demanding technical creators and competitive gamers.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-dim)' }}>
              Based in Sydney, Savvy Computers was founded on the belief that off-the-shelf is never enough. Every system that leaves our workshop is a testament to technical transparency, surgical precision, and the relentless pursuit of thermal efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy / DNA Grid */}
      <section className="wrap" style={{ padding: '12rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
          <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase' }}>THE SAVVY <span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', color: 'transparent' }}>DNA</span></h2>
          <p style={{ color: 'var(--text-dim)', letterSpacing: '0.3em', fontSize: '0.7rem', marginTop: '1rem', textTransform: 'uppercase' }}>OUR CORE ENGINEERING PRINCIPLES</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem' }} className="dna-grid">
          <DnaCard 
            icon={Target} 
            title="SILICON BINNING" 
            desc="We don't leave performance to chance. Every processor and GPU is binned and validated to ensure it meets our strict voltage-to-frequency requirements." 
          />
          <DnaCard 
            icon={Wind} 
            title="THERMAL ARCHITECTURE" 
            desc="Our 'Stealth-Flow' philosophy ensures maximum heat dissipation with minimal acoustic footprint. Every fan curve is hand-tuned for your specific environment." 
          />
          <DnaCard 
            icon={Cpu} 
            title="SURGICAL MANAGEMENT" 
            desc="Cable management is more than aesthetics—it's airflow. Our architects follow a strict grid-based routing system for zero-obstruction cooling." 
          />
        </div>
      </section>

      {/* The Workshop Section */}
      <section style={{ borderTop: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)', padding: '12rem 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '8rem', alignItems: 'center' }} className="workshop-grid">
            <div style={{ position: 'relative' }}>
              <div style={{ 
                position: 'absolute', top: '-2rem', left: '-2rem', 
                width: '120px', height: '120px', 
                border: '1px solid var(--accent-light)',
                opacity: 0.3, zIndex: 0
              }} />
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200" 
                style={{ width: '100%', aspectRatio: '1/1.2', objectFit: 'cover', filter: 'grayscale(1)', position: 'relative', zIndex: 1 }}
                alt="Workshop"
              />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '3rem' }}>
                THE SYDNEY <span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', color: 'transparent' }}>STUDIO</span>
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-dim)', marginBottom: '4rem' }}>
                Every build undergoes a mandatory 72-hour 'Forge' test. We stress-test the CPU, GPU, and RAM under extreme thermal loads to ensure your system is rock-solid from the moment it arrives. If a single frame drops during validation, we start again.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                <Stat icon={Award} label="BUILDS DELIVERED" value="5,000+" />
                <Stat icon={Flame} label="STRESS TEST HOURS" value="360,000+" />
              </div>
              
              <Link href="/shop" className="btn btn-solid" style={{ marginTop: '5rem', padding: '1.25rem 3rem' }}>
                EXPLORE THE ARCHIVE <MoveRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 1024px) {
          .dna-grid { grid-template-columns: 1fr !important; gap: 4rem !important; }
          .workshop-grid { grid-template-columns: 1fr !important; gap: 6rem !important; }
        }
      `}</style>
    </main>
  );
}

function DnaCard({ icon: Icon, title, desc }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ width: '60px', height: '60px', background: 'rgba(173, 133, 106, 0.1)', border: '1px solid rgba(173, 133, 106, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={28} color="#ad856a" strokeWidth={1.5} />
      </div>
      <div>
        <h4 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.25rem', textTransform: 'uppercase', marginBottom: '1.5rem', color: 'var(--white)' }}>{title}</h4>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-dim)' }}>{desc}</p>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: any) {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <Icon size={32} color="#ad856a" strokeWidth={1} />
      <div>
        <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.5rem', color: 'var(--white)' }}>{value}</div>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{label}</div>
      </div>
    </div>
  );
}
