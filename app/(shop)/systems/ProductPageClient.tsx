'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Cpu, Zap, Database, HardDrive, 
  Layers, Power, Wind, Monitor, 
  ArrowLeft, ShieldCheck, 
  Truck, Clock, Package, ShoppingCart,
  Wifi, Laptop, Gift, ChevronLeft, ChevronRight,
  Plus, Minus, Flame, HardDriveDownload, Fan,
  ChevronDown, Info
} from 'lucide-react';
import ProductCard from '@/components/common/ProductCard';
import { useCart } from '@/lib/cart/CartContext';

interface ProductPageClientProps {
  product: any;
  upgrades: any[];
  recommendations: any[];
}

export default function ProductPageClient({ product, upgrades, recommendations }: ProductPageClientProps) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc'>('specs');
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);
  const { addToCart } = useCart();

  // --- Technical Manifest Logic ---
  const coreSpecKeys = [
    { key: 'cpu', label: 'CPU', icon: Cpu },
    { key: 'cooler', label: 'CPU COOLER', icon: Wind },
    { key: 'motherboard', label: 'MOTHERBOARD', icon: Layers },
    { key: 'ram', label: 'RAM', icon: Database },
    { key: 'primary_storage', label: 'PRIMARY STORAGE', icon: HardDrive },
    { key: 'secondary_storage', label: 'SECONDARY STORAGE', icon: HardDriveDownload },
    { key: 'gpu', label: 'GRAPHICS CARD', icon: Zap },
    { key: 'psu', label: 'POWER SUPPLY', icon: Power },
    { key: 'case', label: 'CASE', icon: Package },
    { key: 'fans', label: 'FANS', icon: Fan },
  ];

  const specList = [
    // 1. Core Manifest (Strict conditional rendering)
    ...coreSpecKeys.map(s => ({
      icon: s.icon,
      label: s.label,
      value: product.specs[s.key]
    })).filter(s => s.value && s.value.trim() !== ''),
    
    // 2. Custom Architect Fields
    ...Object.entries(product.specs || {})
      .filter(([key]) => !coreSpecKeys.some(c => c.key === key))
      .map(([key, value]: [string, any]) => ({
        icon: Info,
        label: key.replace(/_/g, ' ').toUpperCase(),
        value: value
      })).filter(s => s.value && s.value.trim() !== '')
  ];

  const images = product.images.length > 0 ? product.images : [
    "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2000",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000",
    "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2000",
    "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2000"
  ];

  const nextImg = () => setSelectedImg((prev) => (prev + 1) % images.length);
  const prevImg = () => setSelectedImg((prev) => (prev - 1 + images.length) % images.length);

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', paddingBottom: '0' }}>
      
      {/* Breadcrumb */}
      <div className="wrap" style={{ padding: '1.5rem 0' }}>
        <Link href={`/${product.categories?.slug || 'collection'}`} style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          fontSize: '0.75rem', 
          fontWeight: 700, 
          letterSpacing: '0.1em', 
          color: 'var(--text-dim)', 
          textDecoration: 'none',
          textTransform: 'uppercase'
        }} className="hover-white">
          <ArrowLeft size={14} /> BACK TO {product.categories?.slug || 'COLLECTION'}
        </Link>
      </div>

      {/* Main Product Section */}
      <section className="wrap res-grid-product" style={{ display: 'grid', marginBottom: '8rem' }}>
        
        {/* Left: Gallery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div 
            onMouseEnter={() => setIsGalleryHovered(true)}
            onMouseLeave={() => setIsGalleryHovered(false)}
            style={{ 
              aspectRatio: '1/1', 
              maxHeight: '65vh',
              background: 'var(--bg-offset)', 
              border: '1px solid var(--border)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <Image 
              src={images[selectedImg]} 
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover', filter: 'grayscale(1)' }}
            />
            
            <AnimatePresence>
              {isGalleryHovered && images.length > 1 && (
                <>
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    onClick={prevImg}
                    style={{
                      position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
                      background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white', padding: '1rem', borderRadius: '50%', cursor: 'pointer', zIndex: 10
                    }}
                  >
                    <ChevronLeft size={24} />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    onClick={nextImg}
                    style={{
                      position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
                      background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white', padding: '1rem', borderRadius: '50%', cursor: 'pointer', zIndex: 10
                    }}
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </>
              )}
            </AnimatePresence>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
            {images.slice(0, 4).map((img: string, i: number) => (
              <div 
                key={i}
                onClick={() => setSelectedImg(i)}
                style={{ 
                  aspectRatio: '1/1', 
                  background: 'var(--bg-offset)', 
                  border: `1px solid ${selectedImg === i ? 'var(--accent-light)' : 'var(--border)'}`,
                  cursor: 'pointer',
                  opacity: selectedImg === i ? 1 : 0.4,
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <Image 
                  src={img} 
                  alt="thumbnail" 
                  fill
                  sizes="100px"
                  style={{ objectFit: 'cover', filter: 'grayscale(1)' }} 
                />
              </div>
            ))}
          </div>

        </div>

        {/* Right: Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <div style={{ 
              fontFamily: 'var(--font-d)', 
              fontSize: '0.7rem', 
              fontWeight: 800, 
              letterSpacing: '0.35em', 
              color: 'var(--accent-light)', 
              marginBottom: '0.5rem',
              textTransform: 'uppercase'
            }}>
              {product.stock_status === 'discontinued' ? 'UNAVAILABLE' : '* THE FORGE SERIES'}
            </div>
            <h1 style={{ 
              fontFamily: 'var(--font-d)', 
              fontWeight: 900, 
              fontSize: 'var(--fs-2xl)', 
              lineHeight: 1, 
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              display: 'flex',
              gap: '0.4em',
              flexWrap: 'wrap'
            }}>
              {product.name.split(' ')[0]} 
              <span className="text-outline" style={{ WebkitTextStroke: '1.5px var(--white)', color: 'transparent' }}>
                {product.name.split(' ').slice(1).join(' ')}
              </span>
            </h1>
          </div>

          <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-dim)', maxWidth: '48ch' }}>
            {product.meta_description || 'Handcrafted performance, engineered for reliability.'}
          </p>

          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '3rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <TabButton active={activeTab === 'specs'} onClick={() => setActiveTab('specs')} label="SPECIFICATIONS" />
              <TabButton active={activeTab === 'desc'} onClick={() => setActiveTab('desc')} label="DESCRIPTION" />
            </div>

            <div style={{ paddingTop: '2rem', minHeight: '300px' }}>
              <AnimatePresence mode="wait">
                {activeTab === 'specs' ? (
                  <motion.div key="specs" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {specList.map((spec, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div style={{ width: '1.5rem', display: 'flex', justifyContent: 'center' }}><spec.icon size={18} color="var(--white)" style={{ opacity: 0.6 }} /></div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{spec.value}</div>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key="desc" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                    <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-dim)' }}>{product.description}</p>
                    <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                      <ValueProp icon={ShieldCheck} title="3 YEAR WARRANTY" sub="Premium Parts & Labor" />
                      <ValueProp icon={Truck} title="GLOBAL SHIPPING" sub="Express Insured Service" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Upgrade Strategy Section */}
      {upgrades.length > 0 && (
        <section style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)', padding: '8rem 0' }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
              <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2.5rem', fontWeight: 900, letterSpacing: '0.1em' }}>
                UPGRADE <span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', color: 'transparent' }}>STRATEGY</span>
              </h2>
              <p style={{ color: 'var(--text-dim)', letterSpacing: '0.3em', fontSize: '0.7rem', marginTop: '1rem' }}>TECHNICAL DEEP DIVE INTO YOUR PERFORMANCE PATH</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
              {upgrades.map((upgrade) => (
                <div key={upgrade.id} style={{ 
                  background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', 
                  padding: '2.5rem', transition: 'all 0.4s ease', display: 'flex', flexDirection: 'column', gap: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'rgba(173, 133, 106, 0.1)', padding: '0.75rem', borderRadius: '4px' }}>
                      <Zap size={20} color="#ad856a" />
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-d)', fontSize: '0.9rem', fontWeight: 900, letterSpacing: '0.15em', color: 'var(--white)' }}>{upgrade.name}</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{upgrade.description}</p>
                  {upgrade.price_delta > 0 && (
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-light)', letterSpacing: '0.1em' }}>+ ${upgrade.price_delta.toLocaleString()} UPGRADE</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ & Recommendations (keeping same UI) */}
      <section style={{ padding: '8rem 0', borderTop: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', fontWeight: 900, marginBottom: '4rem', textAlign: 'center' }}>QUESTIONS & <span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', color: 'transparent' }}>ANSWERS</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <FaqItem q="WHAT IS THE BUILD TIME?" a="Every Savvy PC is handcrafted and undergoes a 72-hour stress test. Standard lead time is 5-7 business days." />
            <FaqItem q="HOW DOES SHIPPING WORK?" a="We use express insured couriers globally. Every system is packed in multi-layer expanding foam for zero-movement transit." />
            <FaqItem q="WHAT WARRANTY IS INCLUDED?" a="All systems include a 3-Year Premium Warranty covering parts, labor, and lifetime technical support from our Sydney team." />
          </div>
        </div>
      </section>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <section style={{ padding: '8rem 0', borderTop: '1px solid var(--border)' }}>
          <div className="wrap">
            <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2.5rem', fontWeight: 900, letterSpacing: '0.05em', marginBottom: '4rem' }}>OTHER HOT <span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', color: 'transparent' }}>SYSTEMS</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              {recommendations.map((p, idx) => (
                <ProductCard 
                  key={idx}
                  name={p.name}
                  cpu={p.specs.cpu?.split('|')[0]}
                  gpu={p.specs.gpu?.split('|')[0]}
                  price={`$${p.price.toLocaleString()}`}
                  slug={p.slug}
                  img={p.images[0] || "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800"}
                  specs={[p.specs.cpu, p.specs.gpu, p.specs.ram, p.specs.storage].filter(Boolean)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Floating Action Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          background: 'rgba(12, 12, 12, 0.95)', backdropFilter: 'blur(30px)',
          borderTop: '1px solid rgba(255,255,255,0.08)', padding: '1.25rem 0', zIndex: 100
        }}
      >
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '3rem' }} className="hide-mobile">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Truck size={20} color="var(--accent-light)" />
              <div>
                <div style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--text-dim)', letterSpacing: '0.15em' }}>DELIVERY</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--white)' }}>Ships in 5-7 Days</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Package size={20} color="var(--accent-light)" />
              <div>
                <div style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--text-dim)', letterSpacing: '0.15em' }}>AVAILABILITY</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--white)' }}>{product.stock_status?.replace('_', ' ').toUpperCase() || 'IN STOCK'}</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', width: 'auto', justifyContent: 'flex-end', flex: 1 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <span style={{ fontFamily: 'var(--font-d)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--white)' }}>${product.price.toLocaleString()}</span>
              </div>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-light)', letterSpacing: '0.1em' }}>INC. GST</div>
            </div>
            <button 
              disabled={product.stock_status === 'out_of_stock' || product.stock_status === 'discontinued'}
              onClick={() => addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: images[0],
                quantity: 1
              })}
              className="btn btn-solid" 
              style={{ 
                padding: '1rem 2.5rem', fontSize: '0.85rem', letterSpacing: '0.25em', fontWeight: 900, 
                fontFamily: 'var(--font-d)', display: 'flex', alignItems: 'center', gap: '0.75rem', borderRadius: '2px',
                opacity: (product.stock_status === 'out_of_stock' || product.stock_status === 'discontinued') ? 0.4 : 1,
                cursor: (product.stock_status === 'out_of_stock' || product.stock_status === 'discontinued') ? 'not-allowed' : 'pointer'
              }}
            >
              <ShoppingCart size={16} /> <span className="hide-mobile">ADD TO CART</span><span className="show-mobile">ADD</span>
            </button>
          </div>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hover-white:hover { color: var(--white) !important; }
        .faq-item:hover { background: rgba(255,255,255,0.03); }
      `}} />
    </main>
  );
}

function TabButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button onClick={onClick} style={{ background: 'none', border: 'none', padding: '1.25rem 0', fontFamily: 'var(--font-d)', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.2em', color: active ? 'var(--white)' : 'rgba(255,255,255,0.3)', cursor: 'pointer', position: 'relative', transition: 'all 0.3s ease' }}>
      {label}
      {active && <motion.div layoutId="tab-underline-product" style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: '2px', background: '#ad856a' }} />}
    </button>
  );
}

function ValueProp({ icon: Icon, title, sub }: { icon: any, title: string, sub: string }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Icon size={20} color="var(--accent-light)" strokeWidth={1.5} />
      <div>
        <div style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.1em', color: 'var(--white)' }}>{title}</div>
        <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{sub}</div>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string, a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="faq-item" style={{ border: '1px solid var(--border)', transition: 'all 0.3s ease', background: 'rgba(255,255,255,0.01)' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', background: 'none', border: 'none', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontFamily: 'var(--font-d)', fontSize: '1rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--white)' }}>{q}</span>
        {isOpen ? <Minus size={18} color="var(--accent-light)" /> : <Plus size={18} color="var(--white)" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '0 2rem 2rem', color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.7, borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '1.5rem' }}>{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
