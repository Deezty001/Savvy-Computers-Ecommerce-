'use client';

import { useCart } from "@/lib/cart/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
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
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', 
              zIndex: 1000, backdropFilter: 'blur(4px)' 
            }}
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ 
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', 
              maxWidth: '440px', background: 'var(--white)', zIndex: 1001, 
              borderLeft: 'var(--border-heavy)', display: 'flex', flexDirection: 'column' 
            }}
          >
            {/* Header */}
            <div style={{ padding: '1.5rem 2rem', borderBottom: 'var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.5rem', textTransform: 'uppercase' }}>
                Your Cart <span style={{ fontSize: '0.8rem', color: 'var(--zinc-400)' }}>({itemCount})</span>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--zinc-500)' }}>
                <X size={24} />
              </button>
            </div>
            
            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
              {cart.length === 0 ? (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '1.5rem' }}>
                  <div style={{ width: '64px', height: '64px', background: 'var(--zinc-100)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--zinc-400)' }}>
                    <ShoppingBag size={32} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '1.1rem', textTransform: 'uppercase' }}>Your cart is empty</div>
                  <button onClick={() => setIsOpen(false)} className="btn btn-solid">Continue Shopping</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1.5rem' }}>
                      <div style={{ width: '80px', height: '80px', background: 'var(--zinc-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         {/* Placeholder for SVG or Image */}
                         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.1 }}>
                           <rect x="4" y="4" width="16" height="16" rx="1" stroke="#000" strokeWidth="2"/>
                         </svg>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>{item.name}</div>
                          <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--zinc-400)' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--zinc-500)' }}>${item.price.toLocaleString()} AUD</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
                          <div style={{ display: 'flex', alignItems: 'center', border: 'var(--border-light)', padding: '2px' }}>
                            <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><Minus size={14} /></button>
                            <span style={{ minWidth: '30px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600 }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><Plus size={14} /></button>
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
              <div style={{ padding: '2rem', borderTop: 'var(--border-heavy)', background: 'var(--zinc-100)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--zinc-500)' }}>Subtotal</div>
                  <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.25rem' }}>${subtotal.toLocaleString()} AUD</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <Link href="/cart" className="btn btn-ghost" onClick={() => setIsOpen(false)} style={{ width: '100%', justifyContent: 'center' }}>View Cart</Link>
                  <Link href="/checkout" className="btn btn-solid" onClick={() => setIsOpen(false)} style={{ width: '100%', justifyContent: 'center' }}>Checkout</Link>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--zinc-400)', textAlign: 'center', marginTop: '1rem' }}>Shipping and taxes calculated at checkout.</div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
