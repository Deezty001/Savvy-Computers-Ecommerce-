// @ts-nocheck
'use client';

import { useState, useMemo } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { Product, products, categories } from "@/lib/data/products";
import { SlidersHorizontal, ChevronDown, LayoutGrid, List, MoveRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => 
      activeCategory === 'all' || p.category === activeCategory
    );

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, sortBy]);

  const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'newest', label: 'Newest Arrivals' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
  ];

  const currentSortLabel = sortOptions.find(o => o.id === sortBy)?.label;

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      <Header />
      
      {/* Page Header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '10rem 0 4rem' }}>
        <div className="wrap">
          <div style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 800, 
            fontSize: '0.75rem', 
            letterSpacing: '0.3em', 
            textTransform: 'uppercase', 
            color: 'var(--accent-light)', 
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <span style={{ fontSize: '1.5rem', opacity: 0.3 }}>*</span> THE REGISTRY — BUILT IN SYDNEY, AU
          </div>
          <h1 style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 900, 
            fontSize: 'clamp(4rem, 12vw, 9.5rem)', 
            textTransform: 'uppercase', 
            lineHeight: 0.8, 
            letterSpacing: '0.02em', 
            marginBottom: '4rem' 
          }}>
            THE <br/> 
            <span className="text-outline" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)', color: 'transparent' }}>COLLECTION</span>
          </h1>
          <p style={{ fontSize: 'var(--fs-base)', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '50ch' }}>
            Explore our curated selection of high-performance machines. Each build is a unique intersection of engineering and art, stress-tested for 72 hours before dispatch.
          </p>
        </div>
      </div>

      {/* Controls Bar - Elite Frosted Look */}
      <div style={{ 
        borderBottom: '1px solid var(--border)', 
        background: 'rgba(18, 18, 18, 0.9)', 
        backdropFilter: 'blur(15px)',
        position: 'sticky', 
        top: 'var(--header-h)', 
        zIndex: 10 
      }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
          {/* Categories */}
          <div style={{ display: 'flex', gap: '3rem', height: '100%' }}>
            {['all', ...categories.map(c => c.id)].map(catId => {
              const catName = catId === 'all' ? 'ALL SYSTEMS' : categories.find(c => c.id === catId)?.name;
              return (
                <button 
                  key={catId}
                  onClick={() => setActiveCategory(catId)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.75rem',
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: activeCategory === catId ? 'var(--white)' : 'var(--text-dim)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    padding: '0 0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%'
                  }}
                  className="hover-white"
                >
                  {catName}
                  {activeCategory === catId && (
                    <motion.div 
                      layoutId="activeCat"
                      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'var(--accent-light)' }} 
                    />
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Sort & Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                style={{ 
                  background: 'none', border: 'none', cursor: 'pointer', 
                  display: 'flex', alignItems: 'center', gap: '0.75rem', 
                  fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.75rem', 
                  textTransform: 'uppercase', color: 'var(--text-muted)',
                  letterSpacing: '0.1em'
                }}
                className="hover-white"
              >
                <span style={{ color: 'var(--text-dim)' }}>Sort:</span> {currentSortLabel} <ChevronDown size={14} style={{ transform: isSortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <>
                    <div 
                      onClick={() => setIsSortOpen(false)}
                      style={{ position: 'fixed', inset: 0, zIndex: 99 }}
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      style={{ 
                        position: 'absolute', top: '100%', right: 0, marginTop: '1rem',
                        background: 'rgba(26, 26, 26, 0.98)', 
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--border-heavy)',
                        padding: '1.25rem', width: '240px', zIndex: 100,
                        display: 'flex', flexDirection: 'column', gap: '0.75rem',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                      }}
                    >
                      {sortOptions.map(option => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSortBy(option.id);
                            setIsSortOpen(false);
                          }}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            textAlign: 'left', fontFamily: 'var(--font-d)', fontWeight: 800,
                            fontSize: '0.7rem', textTransform: 'uppercase',
                            padding: '0.75rem', color: sortBy === option.id ? 'var(--accent-light)' : 'var(--text-muted)',
                            transition: 'all 0.2s ease',
                            letterSpacing: '0.1rem'
                          }}
                          className="hover-white"
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="wrap" style={{ padding: '8rem 0 15rem' }}>
        <motion.div 
          layout
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem 2rem' }} 
          className="sys-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product: Product, idx: number) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: idx * 0.05, ease: 'circOut' }}
              >
                <ProductCard 
                  {...product} 
                  price={product.price.toLocaleString()}
                  tag={product.tag || "ELITE SERIES"}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div style={{ padding: '12rem 0', textAlign: 'center', fontFamily: 'var(--font-d)', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.25em', fontSize: '1.25rem' }}>
            No systems matching your criteria.
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
