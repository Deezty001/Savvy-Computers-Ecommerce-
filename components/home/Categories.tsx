'use client';

import React from 'react';
import Link from 'next/link';
import { MoveRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  subtitle: string;
  specs: string;
  img: string;
  href?: string;
  height?: string;
  flex?: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  subtitle, 
  specs, 
  img, 
  href = "/shop",
  height = '640px', 
  flex = 1 
}) => {
  return (
    <Link 
      href={href} 
      className="cat-card"
      style={{
        flex: flex,
        height: height,
        background: 'var(--bg-offset)',
        border: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
        display: 'block',
        textDecoration: 'none'
      }}
    >
      {/* Background Image with Monochromatic Filter */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        zIndex: 1, 
        background: 'var(--accent)', 
        opacity: 0.15, 
        mixBlendMode: 'overlay',
        pointerEvents: 'none' 
      }} />
      <img
        src={img}
        alt={title}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          opacity: 0.65, 
          filter: 'grayscale(1) brightness(0.7) sepia(0.15)',
          transition: 'transform 1.8s cubic-bezier(0.19, 1, 0.22, 1), opacity 1s ease' 
        }}
        className="cat-img"
      />

      {/* Content Overlay - CENTRED */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        zIndex: 10, 
        padding: '4rem', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center' 
      }}>
        {/* Title Stack: Larger and Centered */}
        <div style={{ position: 'relative' }}>
          <h3 style={{
            fontFamily: 'var(--font-d)',
            fontWeight: 900,
            fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
            lineHeight: 0.8,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <span className="cat-title-top" style={{ 
              display: 'block', 
              transition: 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)' 
            }}>
              {title}
            </span>
            <span 
              className="cat-title-bottom text-outline" 
              style={{ 
                display: 'block',
                transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
                WebkitTextStroke: '1px rgba(255,255,255,0.4)',
                color: 'transparent'
              }}
            >
              {subtitle}
            </span>
          </h3>
        </div>

        {/* Specs Reveal on Hover - Center-aligned */}
        <div className="specs-reveal" style={{
          transform: 'translateY(40px)',
          opacity: 0,
          transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          position: 'absolute',
          bottom: '5rem'
        }}>
          <div style={{
            background: 'var(--accent-light)',
            color: 'var(--bg)',
            padding: '0.65rem 1.75rem',
            fontSize: '0.85rem',
            fontWeight: 900,
            letterSpacing: '0.25em',
            fontFamily: 'var(--font-d)',
            textTransform: 'uppercase'
          }}>
            {specs}
          </div>
          <MoveRight size={24} color="var(--accent-light)" />
        </div>
      </div>

      <style jsx>{`
        .cat-card:hover .cat-img {
          transform: scale(1.1);
          opacity: 0.8;
          filter: grayscale(0.2) brightness(0.8) sepia(0.05);
        }
        .cat-card:hover .cat-title-top {
          transform: translateY(-1.5rem);
        }
        .cat-card:hover .cat-title-bottom {
          transform: translateY(1.5rem) scale(1.05);
          color: rgba(255,255,255,0.05);
          WebkitTextStroke: 1px var(--accent-light);
        }
        .cat-card:hover .specs-reveal {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>
    </Link>
  );
};

export default function Categories() {
  return (
    <section className="categories" style={{ background: 'var(--bg)', padding: '12rem 0' }}>
      <div className="wrap">
        {/* Header Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', marginBottom: '12rem', alignItems: 'end' }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-d)',
              fontWeight: 900,
              fontSize: 'var(--fs-2xl)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              lineHeight: 0.85,
              color: 'var(--white)'
            }}>
              CHOOSE YOUR<br />
              <span className="text-outline">SPECIFICATION</span>
            </h2>
          </div>
          <div style={{ paddingBottom: '1.5rem' }}>
            <p style={{ fontSize: 'var(--fs-base)', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '40ch' }}>
              Handcrafted in Sydney. Precision-engineered for high-performance creative workflows and elite competitive gaming.
            </p>
          </div>
        </div>

        {/* Categories Grid: Asymmetrical Row 1 */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <CategoryCard 
            flex={1.5}
            title="GAMING"
            subtitle="SERIES"
            specs="4K ULTRA • 240FPS • AI DRIVEN"
            img="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000"
            href="/shop?category=gaming"
          />
          <CategoryCard 
            flex={1}
            title="WORK"
            subtitle="STATION"
            specs="STUDIO READY • RTX 6000"
            img="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1000"
            href="/shop?category=workstations"
          />
        </div>

        {/* Category Row 2: Full Width feature */}
        <div style={{ display: 'flex' }}>
          <CategoryCard 
            flex={1}
            height="520px"
            title="SIM"
            subtitle="RIGS"
            specs="MOTION CAPABLE • ZERO LATENCY"
            img="https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=2000"
            href="/shop?category=sim-rigs"
          />
        </div>

      </div>
    </section>
  );
}
