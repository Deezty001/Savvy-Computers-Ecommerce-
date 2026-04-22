'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Cpu, Zap, Database, HardDrive } from 'lucide-react';


interface ProductCardProps {
  name: string;
  cpu: string;
  gpu: string;
  price: string;
  savings?: string;
  img: string;
  specs: string[];
  slug: string;
}

export default function ProductCard({ name, cpu, gpu, price, savings, img, specs, slug }: ProductCardProps) {
  const specIcons = [Cpu, Zap, Database, HardDrive];

  return (
    <Link href={`/systems/${slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
      <div className="product-card group" style={{
        background: 'var(--bg-offset)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.4s ease',
        height: '100%',
        cursor: 'pointer'
      }}>
        
        {/* Header Block - Fixed height to prevent sagging */}
        <div style={{
          padding: '1.5rem 1rem',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid var(--border)',
          textAlign: 'center',
          minHeight: '110px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h3 style={{
            fontFamily: 'var(--font-d)',
            fontWeight: 900,
            fontSize: '1.25rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--white)',
            marginBottom: '0.4rem'
          }}>
            {name}
          </h3>
          <p style={{
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            lineHeight: 1.4,
            opacity: 0.8
          }}>
            {cpu} <br/> {gpu}
          </p>
        </div>

        {/* Image & Hover Specs */}
        <div style={{
          position: 'relative',
          aspectRatio: '1/1',
          overflow: 'hidden',
          background: '#000'
        }}>
          <Image 
            src={img} 
            alt={name} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: 'cover',
              opacity: 0.9,
              filter: 'grayscale(1)',
              transition: 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.6s ease'
            }}
            className="product-img"
          />

          
          {/* Specs Overlay - TRUE DARK SEETHROUGH */}
          <div className="specs-overlay" style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.45)', // Dark Translucent Tint
            backdropFilter: 'none', // Removed blur for true see-through as per ref
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '2.5rem',
            opacity: 0,
            transform: 'translateY(10px)',
            transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
            zIndex: 10
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {specs.map((spec, i) => {
                const Icon = specIcons[i] || Cpu;
                return (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(255,255,255,0.05)'
                    }}>
                      <Icon size={16} color="var(--white)" style={{ opacity: 0.9 }} />
                    </div>
                    <div style={{
                      color: 'var(--white)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                      lineHeight: 1.4,
                      maxWidth: '180px',
                      textShadow: '0 2px 4px rgba(0,0,0,0.8)' // Stronger shadow for legibility on see-through
                    }}>
                      {spec}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Block */}
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          marginTop: 'auto'
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-d)',
              fontWeight: 900,
              fontSize: '1.75rem',
              color: 'var(--white)',
              letterSpacing: '0.05em'
            }}>
              {price}
            </div>
            {savings && (
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                color: 'var(--accent-light)',
                marginTop: '0.25rem',
                textTransform: 'uppercase'
              }}>
                SAVE {savings}
              </div>
            )}
          </div>

          <div className="btn btn-solid" style={{
            width: '100%',
            justifyContent: 'center',
            padding: '1rem',
            fontSize: '0.8rem',
            letterSpacing: '0.2em'
          }}>
            VIEW PRODUCT
          </div>
        </div>
      </div>
    </Link>
  );
}
