'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MoveRight } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { products as staticProducts } from "@/lib/data/products";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const [featuredProduct, setFeaturedProduct] = useState<any>(null);

  useEffect(() => {
    async function fetchFeatured() {
      if (isSupabaseConfigured) {
        const { data } = await supabase
          .from('products')
          .select('*')
          .eq('is_featured', true)
          .limit(1)
          .single();
        
        if (data) setFeaturedProduct(data);
      } else {
        // Fallback to first featured static product
        setFeaturedProduct(staticProducts.find(p => p.featured));
      }
    }
    fetchFeatured();
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.from(headline.current, { y: 100, opacity: 0, duration: 1.5, delay: 0.3 })
      .from('.hero-btn', { y: 30, opacity: 0, stagger: 0.15, duration: 1 }, "-=1")
      .from('.hero-img-box', { scale: 1.1, opacity: 0, duration: 2, ease: 'expo.out' }, "-=1.5");
  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="hero" 
      style={{ 
        background: 'var(--bg)', 
        padding: 'clamp(6rem, 15vh, 12rem) 0',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)'
      }}
    >
      {/* Abstract Background Elements */}
      <div style={{ 
        position: 'absolute', 
        top: '-10%', 
        right: '-5%', 
        width: '60%', 
        height: '120%', 
        background: 'radial-gradient(circle, rgba(173, 133, 106, 0.08) 0%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="res-grid-hero" style={{ display: 'grid', alignItems: 'center' }}>
          <div>
            <div className="stagger-item" style={{
              fontFamily: 'var(--font-d)',
              fontWeight: 800,
              fontSize: '0.75rem',
              letterSpacing: '0.5em',
              color: 'var(--accent-light)',
              marginBottom: '3rem',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem'
            }}>
              <div style={{ width: '40px', height: '1px', background: 'var(--accent-light)', opacity: 0.5 }} />
              BEYOND THE LIMITS OF PERFORMANCE
            </div>

            <h1 ref={headline} style={{
              fontFamily: 'var(--font-d)',
              fontWeight: 900,
              fontSize: 'var(--fs-hero)',
              lineHeight: '0.85',
              textTransform: 'uppercase',
              marginBottom: '4.5rem',
              color: 'var(--white)',
              letterSpacing: '-0.02em'
            }}>
              <span style={{ display: 'block' }}>ENGINEERING</span>
              <span className="text-outline" style={{ WebkitTextStroke: '1.5px var(--white)', color: 'transparent', display: 'block', margin: '0.1em 0' }}>
                PERFECTION
              </span>
              <span style={{ color: 'var(--accent-light)', fontSize: '0.45em', letterSpacing: '0.2em', display: 'block', marginTop: '0.5rem', opacity: 0.9 }}>
                SAVVY COMPUTERS EST. 2024
              </span>
            </h1>

            <div className="hero-btn-group" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <Link 
                href={featuredProduct ? `/systems/${featuredProduct.slug}` : "/collection"} 
                className="btn btn-solid hero-btn" 
                style={{ 
                  textDecoration: 'none', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  padding: '1.5rem 3rem'
                }}
              >
                {featuredProduct ? `EXPLORE ${featuredProduct.name}` : "ENTER THE LAB"} <MoveRight size={20} />
              </Link>
              
              <Link 
                href="/collection" 
                className="btn btn-ghost hero-btn" 
                style={{ 
                  textDecoration: 'none',
                  padding: '1.5rem 3rem'
                }}
              >
                VIEW COLLECTION
              </Link>
            </div>

            {/* Micro Stats */}
            <div className="stagger-item hide-mobile" style={{ display: 'flex', gap: '4rem', marginTop: '6rem', borderTop: '1px solid var(--border)', paddingTop: '3rem' }}>
              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em', marginBottom: '0.5rem' }}>SYDNEY HQ</div>
                <div style={{ color: 'var(--white)', fontFamily: 'var(--font-d)', fontSize: '1.2rem', fontWeight: 900 }}>HANDCRAFTED</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em', marginBottom: '0.5rem' }}>TESTING</div>
                <div style={{ color: 'var(--white)', fontFamily: 'var(--font-d)', fontSize: '1.2rem', fontWeight: 900 }}>72H BURN-IN</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em', marginBottom: '0.5rem' }}>WARRANTY</div>
                <div style={{ color: 'var(--white)', fontFamily: 'var(--font-d)', fontSize: '1.2rem', fontWeight: 900 }}>3Y PREMIUM</div>
              </div>
            </div>
          </div>

          <div className="hero-img-box" style={{
            aspectRatio: '0.9/1',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #121212 100%)',
            border: '1px solid var(--border-heavy)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 80px 160px -40px rgba(0,0,0,0.8)'
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--accent)', opacity: 0.1, mixBlendMode: 'overlay', zIndex: 1 }} />
            
            {/* Tech Overlay lines */}
            <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(173, 133, 106, 0.15)', margin: '2rem', pointerEvents: 'none', zIndex: 2 }} />
            
            <img
              src={featuredProduct?.images[0] || "https://images.unsplash.com/photo-1587202372471-802996e897c7?q=80&w=2000&auto=format&fit=crop"}
              alt={featuredProduct?.name || "Elite PC Station"}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                opacity: 0.85, 
                filter: 'contrast(1.15) brightness(0.9) grayscale(0.2)' 
              }}
            />
            
            {/* Image Corner Specs */}
            <div style={{ 
              position: 'absolute', 
              bottom: '3rem', 
              right: '3rem', 
              zIndex: 3, 
              textAlign: 'right',
              fontFamily: 'var(--font-d)'
            }}>
              <div style={{ color: 'var(--accent-light)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.3em', marginBottom: '0.4rem' }}>ESTIMATED FPS</div>
              <div style={{ color: 'var(--white)', fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>500+</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em' }}>ULTRA 4K // READY</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
