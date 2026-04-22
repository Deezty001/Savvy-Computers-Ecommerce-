'use client';

import React from 'react';
import ProductCard from "@/components/common/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/data/products";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

interface FilterOption {
  label: string;
  value: string;
  param: string;
  href: string;
}

interface FilterGroup {
  label: string;
  options: FilterOption[];
}

interface CategoryLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  products: Product[];
  accentColor?: string;
  filterGroups?: FilterGroup[];
}

export default function CategoryLayout({ 
  title, 
  subtitle, 
  description, 
  products: initialProducts, 
  accentColor = 'var(--accent-light)',
  filterGroups = []
}: CategoryLayoutProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  // Filtering & Sorting Logic
  const filteredProducts = React.useMemo(() => {
    let result = [...initialProducts];
    
    const cpuFilter = searchParams.get('cpu');
    const gpuFilter = searchParams.get('gpu');
    const sort = searchParams.get('sort');

    // Spec Filters
    if (cpuFilter === 'intel') result = result.filter(p => p.specs.cpu.toLowerCase().includes('intel'));
    if (cpuFilter === 'amd') result = result.filter(p => p.specs.cpu.toLowerCase().includes('amd') || p.specs.cpu.toLowerCase().includes('ryzen'));
    
    if (gpuFilter === 'nvidia') result = result.filter(p => p.specs.gpu.toLowerCase().includes('rtx') || p.specs.gpu.toLowerCase().includes('nvidia'));
    if (gpuFilter === 'amd') result = result.filter(p => p.specs.gpu.toLowerCase().includes('radeon'));

    // Sort Logic
    if (sort === 'price_asc') result.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') result.sort((a, b) => b.price - a.price);

    return result;
  }, [initialProducts, searchParams]);

  // Helper to update search params
  const getFilterHref = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    return `?${params.toString()}`;
  };

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      
      {/* Category Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(6rem, 15vh, 10rem) 0 4rem' }}>
        <div className="wrap">
          <div style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 800, 
            fontSize: '0.65rem', 
            letterSpacing: '0.3em', 
            textTransform: 'uppercase', 
            color: accentColor, 
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '1.25rem', opacity: 0.3 }}>*</span> {subtitle}
          </div>
          <h1 style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 900, 
            fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', 
            textTransform: 'uppercase', 
            lineHeight: 1, 
            letterSpacing: '0.02em', 
            marginBottom: '2rem' 
          }}>
            {title.split(' ').length > 1 ? (
              <>
                {title.split(' ')[0]} <span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', color: 'transparent' }}>{title.split(' ').slice(1).join(' ')}</span>
              </>
            ) : title}
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', lineHeight: 1.6, color: 'var(--text-dim)', maxWidth: '60ch', letterSpacing: '0.01em', marginBottom: '3.5rem' }}>
            {description}
          </p>

          {/* Directory / Sub-Categories (Horizontal Scroll on Mobile) */}
          {filterGroups.length > 0 && (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem',
              marginTop: '1.5rem',
              width: '100%'
            }}>
              {filterGroups.map((group) => (
                <div 
                  key={group.label} 
                  className="filter-bar"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '2px',
                    overflowX: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ 
                    fontFamily: 'var(--font-d)', 
                    fontSize: '0.65rem', 
                    fontWeight: 800, 
                    letterSpacing: '0.15em', 
                    color: accentColor, 
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    opacity: 0.8
                  }}>
                    {group.label.replace('BY ', '')}
                  </div>
                  
                  <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />

                  <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                    {group.options.map((opt) => {
                      const isActive = pathname === opt.href || searchParams.get(opt.param) === opt.value;
                      return (
                        <Link 
                          key={opt.value} 
                          href={opt.href}
                          scroll={false}
                          style={{
                            fontFamily: 'var(--font-d)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            color: isActive ? 'var(--white)' : 'rgba(255,255,255,0.3)',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '2px',
                            background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap'
                          }}
                          className="filter-link-clean"
                        >
                          {opt.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="wrap category-content" style={{ display: 'flex', gap: '4rem', padding: '3rem 0 8rem' }}>
        {/* Sidebar Filters */}
        <aside className="hide-tablet" style={{ width: '220px', flexShrink: 0 }}>
          <div style={{ position: 'sticky', top: '140px', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <SidebarGroup 
              label="PROCESSOR" 
              param="cpu" 
              options={[
                { label: 'ALL SYSTEMS', value: null },
                { label: 'INTEL CORE', value: 'intel' },
                { label: 'AMD RYZEN', value: 'amd' }
              ]}
              getHref={getFilterHref}
              accentColor={accentColor}
            />
            <SidebarGroup 
              label="GRAPHICS" 
              param="gpu" 
              options={[
                { label: 'ALL SYSTEMS', value: null },
                { label: 'NVIDIA RTX', value: 'nvidia' },
                { label: 'AMD RADEON', value: 'amd' }
              ]}
              getHref={getFilterHref}
              accentColor={accentColor}
            />
          </div>
        </aside>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          {/* Top Bar (Count & Sort) */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            paddingBottom: '2rem', 
            marginBottom: '2.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            flexWrap: 'wrap',
            gap: '1.25rem'
          }}>
            <div style={{ 
              fontFamily: 'var(--font-d)', 
              fontSize: '0.75rem', 
              fontWeight: 800, 
              letterSpacing: '0.15em', 
              color: 'var(--text-dim)',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem'
            }}>
              <span>SHOWING <span style={{ color: 'var(--white)' }}>{filteredProducts.length}</span> SYSTEMS</span>
              
              <MobileSpecFilter accentColor={accentColor} getHref={getFilterHref} />
            </div>

            <SortDropdown 
              currentSort={searchParams.get('sort')}
              getHref={getFilterHref}
              accentColor={accentColor}
            />
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="res-grid-3">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <ProductCard 
                    name={product.name}
                    cpu={product.specs?.cpu?.split('|')[0]?.trim() || 'Custom Spec'}
                    gpu={product.specs?.gpu?.split('|')[0]?.trim() || 'Bespoke GPU'}
                    price={`$${(product.price || 0).toLocaleString()}`}
                    slug={product.slug}
                    img={product.images?.[0] || "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800"}
                    specs={[
                      product.specs?.cpu,
                      product.specs?.gpu,
                      product.specs?.ram,
                      product.specs?.storage
                    ].filter(Boolean)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '10rem 0', textAlign: 'center', opacity: 0.5, fontFamily: 'var(--font-d)', letterSpacing: '0.2em', fontSize: '1.1rem' }}>
              NO SYSTEMS MATCHING THESE SPECIFICATIONS
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .filter-link-clean:hover { color: var(--white) !important; }
        .sidebar-opt { cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.75rem; }
        .sidebar-opt:hover { color: var(--white) !important; padding-left: 4px; }
        
        .filter-bar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .filter-bar::-webkit-scrollbar { display: none; }

        @media (max-width: 768px) {
          .category-content { flex-direction: column; gap: 4rem !important; }
          .filter-bar {
            width: calc(100vw) !important;
            margin-left: -1.5rem !important;
            border-left: none !important;
            border-right: none !important;
            border-radius: 0 !important;
            padding: 0.75rem 1.5rem !important;
          }
        }
      `}} />
    </main>
  );
}

function SidebarGroup({ label, param, options, getHref, accentColor }: any) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentValue = searchParams.get(param);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ 
        fontFamily: 'var(--font-d)', 
        fontSize: '0.85rem', 
        fontWeight: 900, 
        letterSpacing: '0.25em', 
        color: 'var(--white)',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        paddingBottom: '1rem'
      }}>
        <div style={{ width: '2px', height: '12px', background: accentColor }} />
        {label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1.25rem' }}>
        {options.map((opt: any) => {
          const isActive = pathname === opt.href || (opt.value === null && !currentValue) || currentValue === opt.value;
          return (
            <Link 
              key={opt.label} 
              href={getHref(param, opt.value)}
              scroll={false}
              style={{
                fontFamily: 'var(--font-d)',
                fontSize: '0.9rem',
                fontWeight: isActive ? 900 : 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--white)' : 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                position: 'relative'
              }}
              className="sidebar-opt"
            >
              {isActive && (
                <motion.div 
                  layoutId={`sidebar-dot-${param}`}
                  style={{ 
                    position: 'absolute', 
                    left: '-1.25rem', 
                    width: '5px', 
                    height: '5px', 
                    background: accentColor, 
                    borderRadius: '50%',
                    boxShadow: `0 0 12px ${accentColor}` 
                  }} 
                />
              )}
              {opt.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function SortDropdown({ currentSort, getHref, accentColor }: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const options = [
    { label: 'FEATURED', value: null },
    { label: 'PRICE: LOW TO HIGH', value: 'price_asc' },
    { label: 'PRICE: HIGH TO LOW', value: 'price_desc' }
  ];

  const currentLabel = options.find(o => o.value === currentSort)?.label || 'FEATURED';

  return (
    <div style={{ position: 'relative' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem', 
          cursor: 'pointer',
          fontFamily: 'var(--font-d)',
          fontSize: '0.75rem',
          fontWeight: 900,
          letterSpacing: '0.15em',
          color: 'var(--white)',
          padding: '0.6rem 1.25rem',
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '2px',
          whiteSpace: 'nowrap'
        }}
      >
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>SORT:</span> {currentLabel}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click outside to close */}
            <div 
              style={{ position: 'fixed', inset: 0, zIndex: 40 }} 
              onClick={() => setIsOpen(false)} 
            />
            
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                width: '200px',
                zIndex: 50,
                paddingTop: '0.5rem'
              }}
            >
              <div style={{
                background: '#141414',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '0.5rem',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
              }}>
                {options.map((opt) => (
                  <Link
                    key={opt.label}
                    href={getHref('sort', opt.value)}
                    onClick={() => setIsOpen(false)}
                    scroll={false}
                    style={{
                      display: 'block',
                      padding: '0.75rem 1rem',
                      fontFamily: 'var(--font-d)',
                      fontSize: '0.7rem',
                      fontWeight: 900,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      color: currentSort === opt.value ? accentColor : 'rgba(255,255,255,0.5)',
                      transition: 'all 0.3s ease'
                    }}
                    className="hover-white"
                  >
                    {opt.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileSpecFilter({ accentColor, getHref }: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  const searchParams = useSearchParams();
  
  const groups = [
    {
      label: "PROCESSOR",
      param: "cpu",
      options: [
        { label: 'ALL', value: null },
        { label: 'INTEL', value: 'intel' },
        { label: 'AMD', value: 'amd' }
      ]
    },
    {
      label: "GRAPHICS",
      param: "gpu",
      options: [
        { label: 'ALL', value: null },
        { label: 'NVIDIA', value: 'nvidia' },
        { label: 'AMD', value: 'amd' }
      ]
    }
  ];

  return (
    <div className="show-tablet">
      <button 
        onClick={() => setIsOpen(true)}
        style={{ 
          background: 'none', 
          border: 'none', 
          color: accentColor, 
          fontFamily: 'var(--font-d)', 
          fontSize: '0.75rem', 
          fontWeight: 900, 
          letterSpacing: '0.15em',
          cursor: 'pointer',
          padding: '0.5rem 0',
          borderBottom: `1px solid ${accentColor}`
        }}
      >
        SPEC FILTERS
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#0a0a0a',
              zIndex: 1000,
              padding: '2rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em' }}>FILTERS</h2>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--white)', fontSize: '2rem', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {groups.map(group => (
                <div key={group.label}>
                  <h3 style={{ 
                    fontFamily: 'var(--font-d)', 
                    fontSize: '0.8rem', 
                    fontWeight: 900, 
                    letterSpacing: '0.2em', 
                    color: 'var(--text-dim)',
                    marginBottom: '1.5rem',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    paddingBottom: '0.5rem'
                  }}>
                    {group.label}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    {group.options.map(opt => {
                      const isActive = searchParams.get(group.param) === opt.value || (opt.value === null && !searchParams.get(group.param));
                      return (
                        <Link
                          key={opt.label}
                          href={getHref(group.param, opt.value)}
                          onClick={() => setIsOpen(false)}
                          scroll={false}
                          style={{
                            padding: '1rem 0.5rem',
                            textAlign: 'center',
                            background: isActive ? accentColor : 'rgba(255,255,255,0.03)',
                            color: isActive ? 'var(--black)' : 'var(--white)',
                            fontFamily: 'var(--font-d)',
                            fontSize: '0.7rem',
                            fontWeight: 900,
                            letterSpacing: '0.1em',
                            textDecoration: 'none',
                            borderRadius: '2px',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {opt.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="btn btn-solid" 
              onClick={() => setIsOpen(false)}
              style={{ width: '100%', marginTop: '6rem' }}
            >
              APPLY FILTERS
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
