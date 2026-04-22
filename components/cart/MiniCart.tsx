'use client';

import { useCart } from "@/lib/cart/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag, MoveRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function MiniCart() {
  const { cart, isOpen, setIsOpen, updateQuantity, removeFromCart, subtotal, itemCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{ 
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', 
              zIndex: 1000, backdropFilter: 'blur(10px)' 
            }}
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{ 
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', 
              maxWidth: '500px', background: '#0a0a0a', zIndex: 1001, 
              borderLeft: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' 
            }}
          >
            {/* Header */}
            <div style={{ padding: '1.25rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0c0c0c' }}>
              <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--white)' }}>
                REGISTRY <span style={{ fontSize: '0.65rem', color: 'var(--accent-light)', marginLeft: '0.75rem', letterSpacing: '0.2em', opacity: 0.8 }}>/ {itemCount} SYSTEMS</span>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', transition: 'color 0.3s' }} className="hover-white">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            
            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }} className="custom-scroll">
              {cart.length === 0 ? (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '1.5rem' }}>
                  <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-light)' }}>
                    <ShoppingBag size={24} strokeWidth={1} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--white)', marginBottom: '0.5rem' }}>Your registry is empty</div>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem', letterSpacing: '0.05em', lineHeight: 1.5 }}>Add a high-performance architecture to begin.</p>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1.25rem', alignItems: 'center' }}>
                      <div style={{ 
                        width: '80px', height: '80px', background: 'rgba(255,255,255,0.02)', 
                        border: '1px solid var(--border)', overflow: 'hidden', position: 'relative'
                      }}>
                        {item.image ? (
                          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }} />
                        ) : (
                           <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                             <ShoppingBag size={20} color="var(--accent-light)" opacity={0.3} />
                           </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--white)', lineHeight: 1.2 }}>{item.name}</div>
                          <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', padding: '0.25rem' }} className="hover-white">
                            <Trash2 size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                        <div style={{ fontFamily: 'var(--font-d)', fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-light)' }}>${item.price.toLocaleString()}</div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
                            <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: 'var(--white)' }} className="hover-accent"><Minus size={10} /></button>
                            <span style={{ minWidth: '30px', textAlign: 'center', fontSize: '0.75rem', fontWeight: 900, fontFamily: 'var(--font-d)', color: 'var(--white)' }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: 'var(--white)' }} className="hover-accent"><Plus size={10} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer */}
            {cart.length > 0 && (
              <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>ESTIMATED TOTAL</div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.4rem', color: 'var(--white)', lineHeight: 1 }}>${subtotal.toLocaleString()}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Link href="/checkout" className="btn btn-solid" onClick={() => setIsOpen(false)} style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
                    SECURE CHECKOUT <MoveRight size={16} />
                  </Link>
                  <Link href="/cart" onClick={() => setIsOpen(false)} style={{ 
                    textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.65rem', 
                    letterSpacing: '0.15em', fontWeight: 800, textDecoration: 'none', 
                    padding: '0.5rem', textTransform: 'uppercase' 
                  }} className="hover-white">VIEW FULL REGISTRY</Link>
                </div>
                <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: '1.5rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Insured global delivery & 3-year warranty included.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: var(--accent-light); }
      `}</style>
    </AnimatePresence>
  );
}
