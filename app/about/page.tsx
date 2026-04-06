// @ts-nocheck
'use client';

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, Zap, Award, Users, MoveRight } from "lucide-react";
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      <Header />
      
      {/* Page Header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '10rem 0 6rem' }}>
        <div className="wrap">
          <div style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 800, 
            fontSize: '0.75rem', 
            letterSpacing: '0.3em', 
            textTransform: 'uppercase', 
            color: 'var(--accent-light)', 
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <span style={{ fontSize: '1.5rem', opacity: 0.3 }}>*</span> THE SAVVY STANDARD — SINCE 2018
          </div>
          <h1 style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 900, 
            fontSize: 'clamp(4rem, 12vw, 9.5rem)', 
            textTransform: 'uppercase', 
            lineHeight: 0.8, 
            letterSpacing: '0.02em', 
            marginBottom: '4rem' 
          }}>
            ENGINEERING <br/> 
            <span className="text-outline" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)', color: 'transparent' }}>PERFECTION</span>
          </h1>
          <p style={{ fontSize: 'var(--fs-base)', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '50ch' }}>
            Savvy Computers was founded on a simple premise: your hardware should be as ambitious as your vision. We don't just assemble parts; we engineer high-performance systems for the world's most demanding users.
          </p>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="wrap" style={{ padding: '12rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8rem', alignItems: 'center' }} className="about-grid">
          <div>
            <h2 style={{ 
              fontFamily: 'var(--font-d)', 
              fontWeight: 900, 
              fontSize: 'var(--fs-xl)', 
              textTransform: 'uppercase', 
              marginBottom: '3rem',
              letterSpacing: '0.04em' 
            }}>
              OUR PHILOSOPHY
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '4rem' }}>
              Every Savvy system is handcrafted in our Sydney studio. We believe in transparency, precision, and the relentless pursuit of thermal efficiency. From the selection of premium silicon to the surgical precision of our cable management, every detail is considered.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <ShieldCheck size={32} color="var(--accent-light)" />
                <h4 style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>RELIABILITY</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>72ndst-hour mandatory stress testing on all builds before dispatch.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Zap size={32} color="var(--accent-light)" />
                <h4 style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>PERFORMANCE</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>Component binning ensures every chip reaches its maximum potential.</p>
              </div>
            </div>
          </div>
          
          <div style={{ 
            background: 'var(--bg-offset)', 
            border: '1px solid var(--border)',
            padding: '6rem 4rem', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--accent)', opacity: 0.05, zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '6rem', lineHeight: 0.9, marginBottom: '1.5rem' }}>S / COMP</div>
              <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent-light)' }}>
                ARCHIVAL SERIES // SYDNEY AU
              </div>
              <Link href="/shop" className="btn btn-ghost" style={{ marginTop: '4rem' }}>
                EXPLORE COLLECTION <MoveRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <style jsx>{`
        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 6rem !important; }
        }
      `}</style>
    </main>
  );
}
