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
    <section ref={container} className="hero" style={{ background: 'var(--bg)', padding: 'var(--section-padding) 0' }}>
      <div className="wrap">
        <div className="res-grid-hero" style={{ display: 'grid', alignItems: 'center' }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-d)',
              fontWeight: 800,
              fontSize: 'var(--fs-xs)',
              letterSpacing: '0.3em',
              color: 'var(--accent-light)',
              marginBottom: '3.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem'
            }}>
              <span style={{ fontSize: '1.8rem', opacity: 0.3 }}>*</span> THE PRESTIGE OF PERFORMANCE
            </div>

            <h1 ref={headline} style={{
              fontFamily: 'var(--font-d)',
              fontWeight: 900,
              fontSize: 'var(--fs-hero)',
              lineHeight: '0.8',
              textTransform: 'uppercase',
              marginBottom: '5rem',
              color: 'var(--white)'
            }}>
              <span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', letterSpacing: '0.04em', color: 'transparent' }}>SAVVY</span><br />
              <span style={{ letterSpacing: '0.04em' }}>COMPUTERS</span>
            </h1>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link href={featuredProduct ? `/systems/${featuredProduct.slug}` : "/collection"} className="btn btn-solid hero-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
                {featuredProduct ? `DISCOVER ${featuredProduct.name}` : "BUILD YOUR CUSTOM RIG"} <MoveRight size={18} />
              </Link>
              <Link href="/collection" className="btn btn-ghost hero-btn" style={{ textDecoration: 'none' }}>
                READY TO SHIP
              </Link>
            </div>
          </div>

          <div className="hero-img-box" style={{
            aspectRatio: '0.85/1',
            background: '#0a0a0a',
            border: '1px solid var(--border)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 60px 120px -30px rgba(0,0,0,0.6)'
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--accent)', opacity: 0.15, mixBlendMode: 'overlay', zIndex: 1 }} />
            <img
              src={featuredProduct?.images[0] || "https://images.unsplash.com/photo-1587202372471-802996e897c7?q=80&w=2000&auto=format&fit=crop"}
              alt={featuredProduct?.name || "Elite PC Station"}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, filter: 'contrast(1.1) brightness(0.85) sepia(0.18)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
