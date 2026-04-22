'use client';

import React from 'react';
import Link from 'next/link';
import { MoveRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  specs: string;
  img: string;
  href?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  specs, 
  img, 
  href = "/collection"
}) => {
  return (
    <Link 
      href={href} 
      className="cat-card group"
      style={{
        height: '320px',
        background: 'var(--bg-offset)',
        border: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
        display: 'block',
        textDecoration: 'none'
      }}
    >
      <img
        src={img}
        alt={title}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          opacity: 0.5, 
          filter: 'grayscale(1) brightness(0.7)',
          transition: 'transform 0.8s ease, opacity 0.4s ease' 
        }}
        className="cat-img"
      />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent 30%, rgba(10,10,10,0.9) 100%)',
        zIndex: 2
      }} />

      <div style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        width: '100%', 
        zIndex: 10, 
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem'
      }}>
        <div style={{
          fontFamily: 'var(--font-d)',
          fontSize: '0.6rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          color: 'var(--accent-light)',
          textTransform: 'uppercase',
          opacity: 0.8
        }}>
          {specs}
        </div>
        <h3 style={{
          fontFamily: 'var(--font-d)',
          fontWeight: 800,
          fontSize: '1.4rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--white)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          {title} <MoveRight size={16} className="cat-arrow" style={{ transition: 'transform 0.3s ease', opacity: 0.4 }} />
        </h3>
      </div>

      <style jsx>{`
        .cat-card:hover .cat-img { transform: scale(1.05); opacity: 0.7; }
        .cat-card:hover .cat-arrow { transform: translateX(5px); opacity: 1 !important; }
        .cat-card:hover { border-color: rgba(255,255,255,0.2); }
      `}</style>
    </Link>
  );
};

export default function Categories() {
  return (
    <section className="categories" style={{ background: 'var(--bg)', padding: 'var(--section-padding) 0' }}>
      <div className="wrap">

        <div className="res-grid-3">
          <CategoryCard 
            title="GAMING"
            specs="4K ULTRA • 240FPS"
            img="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000"
          />
          <CategoryCard 
            title="WORKSTATION"
            specs="STUDIO READY • RTX"
            img="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1000"
          />
          <CategoryCard 
            title="SIM RIGS"
            specs="ZERO LATENCY • MOTION"
            img="https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=2000"
          />
        </div>
      </div>
    </section>
  );
}
