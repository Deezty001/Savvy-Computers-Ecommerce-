// @ts-nocheck
'use client';

import React, { useRef } from 'react';
import Link from "next/link";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Github, Twitter, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  const container = useRef(null);

  useGSAP(() => {
    // Staggered reveal for footer links and elements
    gsap.from('.footer-stagger', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 85%'
      }
    });

    // Branding reveal
    gsap.from('.footer-brand-reveal', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%'
      }
    });
  }, { scope: container });

  return (
    <footer ref={container} style={{ background: 'var(--bg)', paddingTop: '15rem', paddingBottom: '8rem', borderTop: '1px solid var(--border)' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr', gap: '10rem', marginBottom: '15rem' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }} className="footer-stagger">
            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>SAVVY COMPUTERS</div>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)', maxWidth: '35ch' }}>
              Handcrafting elite custom PCs and workstations in our Sydney studio. Engineered for those who demand the prestige of performance.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }} className="footer-stagger">
            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '1rem', letterSpacing: '0.3em', color: 'var(--text-dim)' }}>SHOP</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.25rem', fontFamily: 'var(--font-d)', fontWeight: 700 }}>
              <Link href="/shop" className="hover-white transition-all">SYSTEMS</Link>
              <Link href="/shop" className="hover-white transition-all">WORKSTATIONS</Link>
              <Link href="/shop" className="hover-white transition-all">SIM RIGS</Link>
              <Link href="/shop" className="hover-white transition-all">CUSTOM</Link>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }} className="footer-stagger">
            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '1rem', letterSpacing: '0.3em', color: 'var(--text-dim)' }}>SUPPORT</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.25rem', fontFamily: 'var(--font-d)', fontWeight: 700 }}>
              <Link href="/support" className="hover-white transition-all">WARRANTY</Link>
              <Link href="/support" className="hover-white transition-all">SHIPPING</Link>
              <Link href="/support" className="hover-white transition-all">RETURNS</Link>
              <Link href="/support" className="hover-white transition-all">CONTACT</Link>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }} className="footer-stagger">
            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '1rem', letterSpacing: '0.3em', color: 'var(--text-dim)' }}>FOLLOW</div>
            <div style={{ display: 'flex', gap: '3rem', color: 'var(--text-muted)' }}>
              <Instagram size={32} className="hover-white cursor-pointer" />
              <Twitter size={32} className="hover-white cursor-pointer" />
              <Youtube size={32} className="hover-white cursor-pointer" />
              <Github size={32} className="hover-white cursor-pointer" />
            </div>
            <div style={{ marginTop: 'auto' }}>
              <div style={{ position: 'relative', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
                <input
                  type="text"
                  placeholder="ENTER YOUR EMAIL"
                  style={{ background: 'none', border: 'none', outline: 'none', color: '#fff', fontFamily: 'var(--font-d)', fontSize: '1.25rem', letterSpacing: '0.25em', width: '100%' }}
                />
                <span style={{ position: 'absolute', right: 0, top: 0, fontSize: '1.5rem' }}>→</span>
              </div>
            </div>
          </div>

        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10rem' }}>
          <h1 className="footer-brand-reveal" style={{
            fontFamily: 'var(--font-d)',
            fontWeight: 900,
            fontSize: 'clamp(4rem, 15vw, 16rem)',
            lineHeight: '0.7',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '8rem'
          }}>
            <span className="text-outline" style={{ letterSpacing: '0.04em' }}>SAVVY</span><br />
            <span style={{ letterSpacing: '0.04em' }}>COMPUTERS</span>
          </h1>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontFamily: 'var(--font-d)', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.2em' }} className="footer-stagger">
            <div>© SAVVY COMPUTERS 2024</div>
            <div style={{ display: 'flex', gap: '4rem' }}>
              <Link href="/support" className="hover-white">PRIVACY POLICY ↗</Link>
              <Link href="/support" className="hover-white">TERMS AND CONDITIONS ↗</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
