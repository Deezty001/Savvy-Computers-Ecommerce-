// @ts-nocheck
'use client';

import { useRef } from 'react';
import Link from "next/link";
import { MoveRight, Cpu, Thermometer, Zap } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ProductCardProps {
  id: string;
  name: string;
  series: string;
  desc: string;
  price: string | number;
  tag: string;
  [key: string]: any;
}

export default function ProductCard({ id, name, series, desc, price, tag }: ProductCardProps) {
  const { addToCart } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    
    const tl = gsap.timeline({ paused: true });
    tl.to(imgRef.current, { scale: 1.05, duration: 0.6, ease: 'power2.out' })
      .to(cardRef.current, { borderColor: 'rgba(255,255,255,0.3)', duration: 0.3 }, 0);

    cardRef.current.addEventListener('mouseenter', () => tl.play());
    cardRef.current.addEventListener('mouseleave', () => tl.reverse());

    return () => {
      cardRef.current?.removeEventListener('mouseenter', () => tl.play());
      cardRef.current?.removeEventListener('mouseleave', () => tl.reverse());
    };
  }, { scope: cardRef });

  const handleAddToCart = (e: any) => {
    e.preventDefault();
    const numericPrice = typeof price === 'number' ? price : parseFloat(price.toString().replace(/[^0-9.]/g, ''));
    addToCart({
      id,
      name,
      price: numericPrice,
      image: '', 
      quantity: 1
    });
  };

  return (
    <div ref={cardRef} style={{ 
      background: 'var(--bg-offset)', 
      border: '1px solid var(--border)', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Link href={`/product/${id}`} style={{ 
        aspectRatio: '1/1', 
        position: 'relative', 
        overflow: 'hidden', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#000'
      }}>
        <img 
          ref={imgRef}
          src={`https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop`} 
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, filter: 'grayscale(1)' }}
        />
        <div style={{ 
          position: 'absolute', top: '1.25rem', left: '1.25rem', 
          background: 'var(--white)', color: 'var(--black)', 
          padding: '0.35rem 0.75rem', fontFamily: 'var(--font-d)', 
          fontWeight: 800, fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase' 
        }}>{tag}</div>
      </Link>
      
      <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>{series}</div>
            <Link href={`/product/${id}`} style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.75rem', textTransform: 'uppercase', lineHeight: 1, color: 'var(--text)', textDecoration: 'none' }}>{name}</Link>
          </div>
          <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--text)' }}>${price}</div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', fontSize: '0.65rem', fontFamily: 'var(--font-d)', fontWeight: 600 }}>
            <Cpu size={12} /> i9-14900K
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', fontSize: '0.65rem', fontFamily: 'var(--font-d)', fontWeight: 600 }}>
            <Zap size={12} /> RTX 4090
          </div>
        </div>

        <button onClick={handleAddToCart} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
          Configure Build <MoveRight size={14} />
        </button>
      </div>
    </div>
  );
}
