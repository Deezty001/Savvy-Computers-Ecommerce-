// @ts-nocheck
'use client';

import Link from "next/link";
import { MoveRight } from "lucide-react";
import { products } from "@/lib/data/products";

interface MegaMenuProps {
  category: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ category, isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  const categoryProducts = products.filter((p: any) => p.category === category.toLowerCase().replace(' ', ''));

  return (
    <div 
      onMouseLeave={onClose}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100vw',
        background: 'var(--white)',
        borderBottom: 'var(--border-heavy)',
        zIndex: 90,
        padding: '3rem 0',
        animation: 'slideDown 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '4rem' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.8rem', textTransform: 'uppercase', lineHeight: 1, marginBottom: '1rem' }}>
            {category}
          </h3>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--zinc-500)', marginBottom: '2rem' }}>
            Precision-engineered systems for {category.toLowerCase()}. Handcrafted in Sydney with a 2-year build warranty.
          </p>
          <Link 
            href="/shop" 
            onClick={onClose}
            className="section-link"
            style={{ color: 'var(--black)', fontSize: '0.75rem', fontWeight: 800, borderBottom: '2px solid var(--black)', paddingBottom: '4px' }}
          >
            View All {category} <MoveRight size={14} style={{ marginLeft: '4px' }} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {categoryProducts.map((product: any) => (
            <Link 
              key={product.id}
              href={`/product/${product.slug}`}
              onClick={onClose}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ aspectHeight: '4/3', background: 'var(--zinc-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <svg width="40" height="50" viewBox="0 0 70 88" fill="none" style={{ opacity: 0.15 }}>
                  <rect x="5" y="5" width="60" height="78" rx="2" stroke="#000" strokeWidth="3"/>
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase' }}>{product.name}</div>
                <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--zinc-400)', marginTop: '0.2rem' }}>
                  {product.tag}
                </div>
              </div>
            </Link>
          ))}
          {categoryProducts.length === 0 && (
            <div style={{ gridColumn: 'span 3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--zinc-400)', fontFamily: 'var(--font-d)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
              Coming Soon — Signature Series
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
