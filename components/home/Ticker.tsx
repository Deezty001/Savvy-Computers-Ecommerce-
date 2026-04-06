// @ts-nocheck
'use client';

import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface TickerProps {
  text: string;
  speed?: number;
  reverse?: boolean;
  dark?: boolean;
}

export default function Ticker({ text, speed = 40, reverse = false, dark = false }: TickerProps) {
  const container = React.useRef<HTMLDivElement>(null);
  const ticker = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ticker.current) return;
    const totalWidth = ticker.current.scrollWidth / 2;

    gsap.to(ticker.current, {
      x: reverse ? totalWidth : -totalWidth,
      duration: speed,
      ease: 'none',
      repeat: -1,
    });
  }, { scope: container });

  return (
    <div 
      ref={container}
      style={{ 
        background: dark ? 'var(--bg)' : 'var(--white)',
        color: dark ? 'var(--white)' : 'var(--black)', 
        overflow: 'hidden', 
        padding: '1rem 0', // Reduced from 2.5rem
        whiteSpace: 'nowrap',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div 
        ref={ticker}
        style={{ display: 'flex', width: 'fit-content' }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ 
              fontFamily: 'var(--font-d)', 
              fontWeight: 500, 
              fontSize: '0.85rem', // Reduced from 1.4rem
              letterSpacing: '0.35rem', 
              textTransform: 'uppercase',
              margin: '0 5rem'
            }}>
              {text}
            </span>
            <span style={{ fontSize: '1.25rem', fontWeight: 300, color: 'var(--accent-light)', opacity: 0.25 }}>*</span>
          </div>
        ))}
      </div>
    </div>
  );
}
