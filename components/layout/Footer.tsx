'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Youtube, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '8rem 0 0',
      background: 'var(--bg)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="wrap">
        {/* Main Footer Content */}
        <div className="res-grid-4" style={{ 
          paddingBottom: '4rem'
        }}>
          {/* Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Link href="/" style={{ 
              fontFamily: 'var(--font-d)', 
              fontWeight: 900, 
              fontSize: '1.5rem', 
              letterSpacing: '0.05em', 
              textTransform: 'uppercase',
              color: 'var(--white)',
              textDecoration: 'none'
            }}>
              Savvy <span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', color: 'transparent' }}>Computers</span>
            </Link>
            <p style={{ 
              fontSize: '0.9rem', 
              lineHeight: 1.8, 
              color: 'var(--text-dim)', 
              maxWidth: '30ch',
              letterSpacing: '0.02em' 
            }}>
              Boutique high-performance systems engineered for elite gaming and professional workflows. Built in Sydney, shipped worldwide.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', opacity: 0.5 }}>
              <Instagram size={20} style={{ cursor: 'pointer' }} />
              <Twitter size={20} style={{ cursor: 'pointer' }} />
              <Youtube size={20} style={{ cursor: 'pointer' }} />
            </div>
          </div>

          {/* Quick Links */}
          <FooterColumn title="SYSTEMS" links={[
            { label: 'Gaming PCs', href: '/gaming' },
            { label: 'Workstations', href: '/workstations' },
            { label: 'Sim Rigs', href: '/sim-rigs' },
            { label: 'Shop All', href: '/shop' }
          ]} />

          <FooterColumn title="SUPPORT" links={[
            { label: 'Technical Support', href: '/support' },
            { label: 'Warranty Info', href: '/support' },
            { label: 'Shipping & Returns', href: '/support' },
            { label: 'Contact Us', href: '/support' }
          ]} />

          <FooterColumn title="COMPANY" links={[
            { label: 'Our Story', href: '/about' },
            { label: 'Build Quality', href: '/about' },
            { label: 'Showroom', href: '/support' },
            { label: 'Careers', href: '#' }
          ]} />
        </div>

        {/* Payment & Copyright Row */}
        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.05)', 
          padding: '2.5rem 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', gap: '2rem', opacity: 0.3 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.2em' }}>VISA</div>
            <div style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.2em' }}>MASTERCARD</div>
            <div style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.2em' }}>AMEX</div>
            <div style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.2em' }}>AFTERPAY</div>
          </div>
          <div style={{ 
            fontFamily: 'var(--font-d)', 
            fontSize: '0.65rem', 
            fontWeight: 700, 
            letterSpacing: '0.15em', 
            color: 'var(--text-dim)',
            textTransform: 'uppercase'
          }}>
            © 2024 SAVVY COMPUTERS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>

      {/* Massive Background Text */}
      <div style={{ 
        width: '100%', 
        padding: '2rem 0 6rem', 
        textAlign: 'center',
        userSelect: 'none',
        pointerEvents: 'none'
      }}>
        <div style={{ 
          fontFamily: 'var(--font-d)', 
          fontSize: 'clamp(5rem, 20vw, 25rem)', 
          fontWeight: 900, 
          lineHeight: 0.7, 
          letterSpacing: '-0.02em', 
          color: 'var(--white)',
          opacity: 0.03,
          marginBottom: '-0.1em'
        }}>
          SAVVY
        </div>
        <div style={{ 
          fontFamily: 'var(--font-d)', 
          fontSize: 'clamp(5rem, 20vw, 25rem)', 
          fontWeight: 900, 
          lineHeight: 0.7, 
          letterSpacing: '-0.02em', 
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.08)',
          textTransform: 'uppercase'
        }}>
          COMPUTERS
        </div>
      </div>

      <style jsx>{`
        .hover-white:hover { color: var(--white) !important; }
      `}</style>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string, links: any[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h4 style={{ 
        fontFamily: 'var(--font-d)', 
        fontSize: '0.75rem', 
        fontWeight: 900, 
        letterSpacing: '0.25em', 
        color: 'var(--white)',
        textTransform: 'uppercase'
      }}>
        {title}
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {links.map((link) => (
          <Link 
            key={link.label} 
            href={link.href}
            style={{ 
              fontSize: '0.85rem', 
              color: 'var(--text-dim)', 
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              letterSpacing: '0.02em'
            }}
            className="hover-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
