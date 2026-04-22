'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Settings2, Loader2 } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { products as staticProducts } from "@/lib/data/products";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function NewTopSellers() {
  const container = useRef<HTMLDivElement>(null);
  const [topSellers, setTopSellers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTopSellers() {
      setIsLoading(true);
      if (isSupabaseConfigured) {
        const { data } = await supabase
          .from('products')
          .select('*')
          .eq('is_top_seller', true)
          .limit(3)
          .order('sort_order', { ascending: true });
        
        if (data) setTopSellers(data);
      } else {
        // Fallback to static featured products
        setTopSellers(staticProducts.filter(p => p.featured).slice(0, 3).map(p => ({
          ...p,
          images: p.images.length > 0 ? p.images : ["https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1000"]
        })));
      }
      setIsLoading(false);
    }
    fetchTopSellers();
  }, []);

  useGSAP(() => {
    if (!isLoading && topSellers.length > 0) {
      gsap.from('.seller-card', {
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out"
      });
    }
  }, { scope: container, dependencies: [isLoading, topSellers] });

  return (
    <section ref={container} style={{ padding: '8rem 0', background: 'var(--bg)' }}>
      <div className="wrap">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '5rem',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '2rem'
        }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-d)',
              fontSize: 'var(--fs-xl)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 800,
              color: 'var(--white)'
            }}>THE FOUNDATION</h2>
            <p style={{ color: 'var(--text-muted)', letterSpacing: '0.1em', marginTop: '0.5rem', textTransform: 'uppercase', fontSize: '0.8rem' }}>
              OUR MOST COVETED ARCHITECTURES
            </p>
          </div>
          <Link href="/shop" style={{
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'var(--white)',
            borderBottom: '1px solid var(--white)',
            paddingBottom: '0.25rem'
          }}>
            VIEW ALL BUILDS
          </Link>
        </div>

        <div className="sys-grid">
          {isLoading ? (
            <div style={{ gridColumn: 'span 3', display: 'flex', justifyContent: 'center', padding: '4rem 0', opacity: 0.3 }}>
              <Loader2 className="animate-spin" size={24} />
            </div>
          ) : (
            topSellers.map((item, i) => (
              <div key={item.id} className="seller-card" style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--bg-offset)',
                border: '1px solid var(--border)',
                transition: 'transform 0.4s ease, border-color 0.4s ease',
              }}>
                <div style={{
                  position: 'relative',
                  aspectRatio: '1/1',
                  overflow: 'hidden',
                  background: '#0a0a0a',
                  borderBottom: '1px solid var(--border)'
                }}>
                  <img 
                    src={item.images?.[0] || "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1000&auto=format&fit=crop"} 
                    alt={item.name} 
                    style={{
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      filter: 'grayscale(100%) contrast(1.1)',
                      transition: 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)'
                    }} 
                    className="seller-img"
                  />
                </div>

                <div style={{ padding: '2.5rem 2rem' }}>
                  <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    {item.stock_status?.replace('_', ' ').toUpperCase() || 'READY TO BUILD'}
                  </p>
                  <h3 style={{
                    fontFamily: 'var(--font-d)',
                    fontSize: 'var(--fs-lg)',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    color: 'var(--white)',
                    marginBottom: '1rem'
                  }}>
                    {item.name}
                  </h3>

                  <p style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--white)',
                    marginBottom: '2rem',
                    letterSpacing: '0.05em'
                  }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400, marginRight: '0.5rem' }}>STARTING FROM</span> 
                    ${item.price.toLocaleString()}
                  </p>

                  <Link href={`/product/${item.slug}`} className="btn seller-btn" style={{
                    width: '100%',
                    justifyContent: 'center',
                    background: 'transparent',
                    color: 'var(--white)',
                    border: '1px solid var(--white)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem'
                  }}>
                    <Settings2 size={16} /> CONFIGURE
                  </Link>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .seller-card:hover { border-color: var(--white); }
        .seller-card:hover .seller-img { transform: scale(1.05); }
        .seller-btn:hover { background: var(--white) !important; color: var(--black) !important; }
      `}} />
    </section>
  );
}
