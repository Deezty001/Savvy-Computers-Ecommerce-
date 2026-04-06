'use client';

import { useParams, notFound, useRouter } from "next/navigation";
import { MoveRight, ChevronLeft, Shield, Truck, Zap, Star, Check } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/lib/data/products";
import { useCart } from "@/lib/cart/CartContext";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProductPage() {
  const { slug } = useParams();
  const router = useRouter();
  const product = products.find(p => p.slug === slug);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return notFound();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: '', // Can add actual image path later
      quantity: 1
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Header />

      <div style={{ padding: '4rem 0 8rem' }}>
        <div className="wrap">
          {/* Breadcrumb */}
          <button 
            onClick={() => router.back()}
            style={{ 
              background: 'none', border: 'none', cursor: 'pointer', 
              fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.62rem', 
              letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--zinc-400)',
              display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4rem'
            }}
          >
            <ChevronLeft size={14} /> Back to Collection
          </button>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'minmax(0, 1fr) 520px', 
            gap: '6rem' 
          }} className="pdp-grid">
            
            {/* Gallery Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                  background: 'var(--zinc-100)', 
                  aspectRatio: '1/1', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  border: 'var(--border-light)',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', opacity: 0.15 }}>
                  <svg width="140" height="180" viewBox="0 0 70 88" fill="none">
                    <rect x="5" y="5" width="60" height="78" rx="2" stroke="#000" strokeWidth="3"/>
                  </svg>
                  <span style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{product.id} — Signature Build</span>
                </div>
              </motion.div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ aspectRatio: '1/1', background: 'var(--zinc-50)', border: 'var(--border-light)' }}></div>
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--zinc-400)' }}>
                  {product.tag} — SC-{product.id.slice(-2).toUpperCase()}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--black)' }}>
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, marginLeft: '0.25rem', fontFamily: 'var(--font-d)' }}>5.0 (12)</span>
                </div>
              </div>

              <h1 style={{ 
                fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: 'clamp(3.5rem, 6vw, 5rem)', 
                textTransform: 'uppercase', lineHeight: 0.85, letterSpacing: '-0.02em', marginBottom: '1.5rem' 
              }}>
                {product.name}
              </h1>
              
              <div style={{ 
                fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.85rem', 
                textTransform: 'uppercase', color: 'var(--zinc-500)', 
                borderBottom: 'var(--border-light)', paddingBottom: '2rem', marginBottom: '2.5rem' 
              }}>
                {product.series}
              </div>

              <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--zinc-700)', marginBottom: '3rem', maxWidth: '42ch' }}>
                {product.shortDesc}
              </p>

              {/* Price & Status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', marginBottom: '3.5rem' }}>
                <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '2.8rem' }}>
                  ${product.price.toLocaleString()}<span style={{ fontSize: '1rem', color: 'var(--zinc-400)', fontWeight: 600 }}> AUD</span>
                </div>
                <div style={{ 
                  background: '#f0fff4', color: '#166534', 
                  fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.65rem', 
                  letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.5rem 0.85rem', 
                  border: '1px solid #166534' 
                }}>
                  In Stock — Sydney Warehouse
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '4.5rem' }}>
                <button 
                  onClick={handleAddToCart}
                  className="btn btn-solid" 
                  style={{ 
                    flex: 1, padding: '1.5rem', fontSize: '0.8rem', justifyContent: 'center',
                    background: isAdded ? '#166534' : 'var(--black)',
                    borderColor: isAdded ? '#166534' : 'var(--black)'
                  }}
                >
                  {isAdded ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={18} /> Added to Cart</span>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Configure & Add to Cart <MoveRight size={18} /></span>
                  )}
                </button>
                <button className="btn btn-ghost" style={{ padding: '1.5rem' }}>
                  <Star size={18} />
                </button>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', borderTop: 'var(--border-heavy)', paddingTop: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <Shield size={22} color="var(--black)" />
                  <div>
                    <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '0.2rem' }}>2 Year Warranty</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--zinc-400)', lineHeight: 1.4 }}>Full parts and labor coverage with direct AU support.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <Truck size={22} color="var(--black)" />
                  <div>
                    <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Express Delivery</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--zinc-400)', lineHeight: 1.4 }}>Fully insured, tracked shipping nationwide within 48h.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <Zap size={22} color="var(--black)" />
                  <div>
                    <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Stress Tested</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--zinc-400)', lineHeight: 1.4 }}>Each component verified over 72h under maximum load.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specs Section */}
          <div style={{ marginTop: '10rem', borderTop: 'var(--border-heavy)', paddingTop: '6rem' }}>
            <h2 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '3rem', textTransform: 'uppercase', marginBottom: '4rem' }}>Technical Specifications</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0 4rem' }} className="spec-grid">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'baseline', padding: '2rem 0', borderBottom: 'var(--border-light)' }}>
                  <div style={{ width: '160px', fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--zinc-400)' }}>{key}</div>
                  <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '1.1rem', textTransform: 'uppercase', flex: 1 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products */}
          <div style={{ marginTop: '10rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '4rem' }}>
              <h2 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '3rem', textTransform: 'uppercase' }}>Related Systems</h2>
              <button 
                onClick={() => router.push('/shop')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--zinc-400)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                View All <MoveRight size={14} />
              </button>
            </div>
            <div style={{ display: 'grid', gap: '2rem' }} className="sys-grid">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} {...p} price={p.price.toLocaleString()} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
