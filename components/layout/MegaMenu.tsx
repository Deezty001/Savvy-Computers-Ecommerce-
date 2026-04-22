'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface MegaMenuProps {
  activeType: string | null;
  onClose: () => void;
}

const gamingMenu = [
  {
    category: 'BY RESOLUTION',
    items: [
      { name: '1080p', sub: 'Esport Ready', href: '/gaming/1080p' },
      { name: '1440p', sub: 'The Sweet Spot', href: '/gaming/1440p' },
      { name: '4K', sub: 'Future Proof', href: '/gaming/4k' },
      { name: '8K', sub: 'Ultimate Fidelity', href: '/gaming/8k' },
    ]
  },
  {
    category: 'BY STYLE',
    items: [
      { name: 'Stealth', sub: 'Zero RGB, All Power', href: '/gaming/stealth' },
      { name: 'RGB', sub: 'Infinite Spectrum', href: '/gaming/rgb' },
      { name: 'Compact', sub: 'Small Form Factor', href: '/gaming/compact' },
    ]
  }
];

const workstationMenu = [
  {
    category: 'BY PROFESSION',
    items: [
      { name: 'Content Creation', sub: 'Adobe & DaVinci Ready', href: '/workstations/content' },
      { name: 'CAD / Engineering', sub: 'Precision Modeling', href: '/workstations/cad' },
      { name: 'AI / Machine Learning', sub: 'GPU Accelerated Compute', href: '/workstations/ai' },
    ]
  },
  {
    category: 'BY FORM FACTOR',
    items: [
      { name: 'Tower', sub: 'Infinite Expandability', href: '/workstations/tower' },
      { name: 'Compact', sub: 'SFF Workspace Hero', href: '/workstations/compact' },
      { name: 'Rack', sub: 'Server-Grade Stability', href: '/workstations/rack' },
    ]
  }
];

const simMenu = [
  {
    category: 'SIMULATORS',
    items: [
      { name: 'Racing Bundles', sub: 'Pro Cockpits & Chassis', href: '/sim-rigs/racing' },
      { name: 'Flight Systems', sub: 'Full Avionic Control', href: '/sim-rigs/flight' },
    ]
  }
];

export default function MegaMenu({ activeType, onClose }: MegaMenuProps) {
  const getMenuData = () => {
    if (activeType === 'gaming') return gamingMenu;
    if (activeType === 'workstation') return workstationMenu;
    if (activeType === 'sim') return simMenu;
    return [];
  };

  const data = getMenuData();

  return (
    <AnimatePresence>
      {activeType && data.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', zIndex: 90 }}
          />

          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              background: '#0a0a0a',
              borderBottom: '1px solid rgba(173, 133, 106, 0.2)',
              zIndex: 100,
            }}
          >
            <div className="wrap" style={{ padding: '3rem 0 4rem 0', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
              {data.map((section, sIdx) => (
                <div key={section.category}>
                  {/* Category Header - Bigger & More Visible */}
                  <div style={{ 
                    fontFamily: 'var(--font-d)', 
                    fontWeight: 900, 
                    fontSize: '1rem', 
                    letterSpacing: '0.3em', 
                    color: '#ad856a', 
                    marginBottom: '2rem',
                    textTransform: 'uppercase', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1.5rem'
                  }}>
                    {section.category}
                    <div style={{ flex: 1, height: '1px', background: 'rgba(173, 133, 106, 0.15)' }} />
                  </div>

                  {/* Items Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', width: '100%' }}>
                    {section.items.map((item, iIdx) => (
                      <Link 
                        key={item.name} 
                        href={item.href} 
                        onClick={onClose}
                        className="nav-text-card"
                        style={{ textDecoration: 'none' }}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: (sIdx * 0.1) + (iIdx * 0.05) }}
                          className="nav-card-inner"
                          style={{ 
                            padding: '1.75rem 1.5rem', 
                            background: 'rgba(255,255,255,0.01)', 
                            border: '1px solid rgba(255,255,255,0.03)',
                            borderRadius: '2px',
                            transition: 'all 0.4s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.4rem',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                        >
                          <div className="nav-card-name" style={{ 
                            fontFamily: 'var(--font-d)', 
                            fontWeight: 900, 
                            fontSize: '1.2rem', 
                            color: 'var(--white)', 
                            letterSpacing: '0.04em', 
                            textTransform: 'uppercase',
                            transition: 'color 0.3s ease'
                          }}>
                            {item.name}
                          </div>
                          <div className="nav-card-sub" style={{ 
                            fontSize: '0.65rem', 
                            fontWeight: 800, 
                            color: 'var(--text-dim)', 
                            letterSpacing: '0.1em', 
                            textTransform: 'uppercase',
                            transition: 'color 0.3s ease'
                          }}>
                            {item.sub}
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
      <style dangerouslySetInnerHTML={{ __html: `
        .nav-text-card:hover .nav-card-inner {
          background: rgba(173, 133, 106, 0.05) !important;
          border-color: rgba(173, 133, 106, 0.3) !important;
          transform: translateY(-4px);
        }
        .nav-text-card:hover .nav-card-name {
          color: #ad856a !important;
        }
        .nav-text-card:hover .nav-card-sub {
          color: var(--white) !important;
        }
      `}} />
    </AnimatePresence>
  );
}
