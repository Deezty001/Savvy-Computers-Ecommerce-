// @ts-nocheck
'use client';

import { useState, useMemo, useEffect } from 'react';
import ProductCard from "@/components/common/ProductCard";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { products as staticProducts, categories as staticCategories } from "@/lib/data/products";
import { ChevronDown, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      
      if (isSupabaseConfigured) {
        try {
          const { data: catData } = await supabase
            .from('categories')
            .select('*')
            .eq('is_active', true)
            .order('sort_order', { ascending: true });
          
          const allCats = [{ id: 'all', name: 'All Systems' }, ...(catData || [])];
          setCategories(allCats);

          const { data: prodData } = await supabase
            .from('products')
            .select('*, categories(slug)')
            .order('sort_order', { ascending: true });
          
          setProducts(prodData || []);
        } catch (error) {
          console.error('Error fetching shop data:', error);
          // Fallback on error
          setCategories(staticCategories.map(c => ({ ...c, slug: c.id })));
          setProducts(staticProducts);
        }
      } else {
        // Fallback to static data
        setCategories(staticCategories.map(c => ({ ...c, slug: c.id })));
        setProducts(staticProducts);
      }
      
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      if (activeCategory === 'all') return true;
      return (p.categories?.slug === activeCategory || p.category_id === activeCategory || p.category === activeCategory);
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, sortBy, products]);

  const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
  ];

  const currentSortLabel = sortOptions.find(o => o.id === sortBy)?.label;

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      
      {/* Page Header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '6rem 0 3rem' }}>
        <div className="wrap">
          <div style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 800, 
            fontSize: '0.65rem', 
            letterSpacing: '0.3em', 
            textTransform: 'uppercase', 
            color: 'var(--accent-light)', 
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '1.25rem', opacity: 0.3 }}>*</span> THE REGISTRY — {isSupabaseConfigured ? 'LIVE DATA' : 'FALLBACK MODE'}
          </div>
          <h1 style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 900, 
            fontSize: 'var(--fs-2xl)', 
            textTransform: 'uppercase', 
            lineHeight: 1, 
            letterSpacing: '0.04em', 
            marginBottom: '1.5rem' 
          }}>
            THE <span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', color: 'transparent' }}>COLLECTION</span>
          </h1>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: '55ch', letterSpacing: '0.02em' }}>
            Explore our curated selection of high-performance machines. Each build is a unique intersection of engineering and art, stress-tested for 72 hours before dispatch.
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div style={{ 
        borderBottom: '1px solid var(--border)', 
        background: 'rgba(18, 18, 18, 0.95)', 
        backdropFilter: 'blur(15px)',
        position: 'sticky', 
        top: 'var(--header-h)', 
        zIndex: 10 
      }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
          {/* Categories */}
          <div style={{ display: 'flex', gap: '2.5rem', height: '100%' }}>
            {categories.map(cat => {
              const catName = cat.name.toUpperCase();
              const catId = cat.slug || cat.id; 
              return (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(catId)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.7rem',
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: activeCategory === catId ? 'var(--white)' : 'var(--text-dim)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    padding: '0',
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
                      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'var(--accent-light)' }} 
                    />
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                style={{ 
                  background: 'none', border: 'none', cursor: 'pointer', 
                  display: 'flex', alignItems: 'center', gap: '0.6rem', 
                  fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.7rem', 
                  textTransform: 'uppercase', color: 'var(--text-muted)',
                  letterSpacing: '0.1em'
                }}
                className="hover-white"
              >
                <span style={{ color: 'var(--text-dim)' }}>Sort:</span> {currentSortLabel} <ChevronDown size={12} style={{ transform: isSortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <>
                    <div 
                      onClick={() => setIsSortOpen(false)}
                      style={{ position: 'fixed', inset: 0, zIndex: 99 }}
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      style={{ 
                        position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem',
                        background: 'rgba(26, 26, 26, 0.98)', 
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--border-heavy)',
                        padding: '0.75rem', width: '220px', zIndex: 100,
                        display: 'flex', flexDirection: 'column', gap: '0.25rem',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
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
                            fontSize: '0.65rem', textTransform: 'uppercase',
                            padding: '0.6rem', color: sortBy === option.id ? 'var(--accent-light)' : 'var(--text-dim)',
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

      {/* Product Grid */}
      <div className="wrap" style={{ padding: '4rem 0 10rem' }}>
        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '10rem 0', opacity: 0.5 }}>
            <Loader2 className="animate-spin" size={32} />
            <div style={{ fontFamily: 'var(--font-d)', fontSize: '0.7rem', letterSpacing: '0.2em' }}>SYNCHRONIZING...</div>
          </div>
        ) : (
          <motion.div 
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }} 
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: 'circOut' }}
                >
                  <ProductCard 
                    name={product.name}
                    cpu={product.specs.cpu?.split('|')[0].trim() || 'Custom Spec'}
                    gpu={product.specs.gpu?.split('|')[0].trim() || 'Bespoke GPU'}
                    price={`$${product.price.toLocaleString()}`}
                    img={product.images?.[0] || "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800"}
                    slug={product.slug}
                    specs={[
                      product.specs.cpu,
                      product.specs.gpu,
                      product.specs.ram,
                      product.specs.storage
                    ].filter(Boolean)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div style={{ padding: '8rem 0', textAlign: 'center', fontFamily: 'var(--font-d)', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.25em', fontSize: '1rem' }}>
            No systems matching your criteria.
          </div>
        )}
      </div>

    </main>
  );
}
