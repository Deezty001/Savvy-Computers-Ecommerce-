// @ts-nocheck
'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight, Trash2, Minus, Plus, ShoppingBag, ChevronLeft, Truck, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, gst, total } = useCart();

  if (cart.length === 0) {
    return (
      <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="wrap" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: '3.5rem' }}
          >
            <div style={{ padding: '3rem', border: '1px solid var(--border)', background: 'var(--bg-offset)', borderRadius: '50%' }}>
              <ShoppingBag size={64} strokeWidth={1} color="var(--accent-light)" />
            </div>
          </motion.div>
          <h1 style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 900, 
            fontSize: '3.5rem', 
            textTransform: 'uppercase', 
            marginBottom: '2rem',
            letterSpacing: '0.04em'
          }}>
            YOUR CART IS <span className="text-outline" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)', color: 'transparent' }}>EMPTY</span>
          </h1>
          <p style={{ color: 'var(--text-dim)', marginBottom: '4rem', maxWidth: '40ch', margin: '0 auto 4rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
            It looks like you haven't added any precision builds to your registry yet.
          </p>
          <Link href="/collection" className="btn btn-solid" style={{ padding: '1.5rem 3rem', display: 'inline-flex', gap: '1rem', alignItems: 'center' }}>
            BROWSE COLLECTION <MoveRight size={20} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', paddingTop: '80px' }}>
      
      {/* Page Header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '6rem 0 4rem' }}>
        <div className="wrap">
          <div style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 800, 
            fontSize: '0.7rem', 
            letterSpacing: '0.4em', 
            textTransform: 'uppercase', 
            color: 'var(--accent-light)', 
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>*</span> YOUR REGISTRY — SYDNEY HQ
          </div>
          <h1 style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 900, 
            fontSize: 'clamp(3rem, 7vw, 5rem)', 
            textTransform: 'uppercase', 
            lineHeight: 1, 
            letterSpacing: '0.02em'
          }}>
            SHOPPING <span className="text-outline" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.4)', color: 'transparent' }}>CART</span>
          </h1>
        </div>
      </div>

      <div className="wrap" style={{ padding: '6rem 0 10rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '6rem' }} className="cart-grid">
          
          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ 
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 40px', 
              padding: '1rem 0', borderBottom: '1px solid var(--border)',
              fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.65rem', 
              letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-dim)'
            }} className="hide-mobile">
              <div>PRODUCT</div>
              <div style={{ textAlign: 'center' }}>QUANTITY</div>
              <div style={{ textAlign: 'right' }}>TOTAL</div>
              <div></div>
            </div>

            {cart.map((item) => (
              <motion.div 
                key={item.id} 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                  display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 40px', 
                  padding: '2.5rem 0', borderBottom: '1px solid var(--border)',
                  alignItems: 'center'
                }} className="cart-item"
              >
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                  <div style={{ 
                    width: '100px', 
                    aspectRatio: '1/1', 
                    background: 'var(--bg-offset)', 
                    border: '1px solid var(--border)',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={item.image || "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=400"} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }}
                    />
                  </div>
                  <div>
                    <Link href={`/systems/${item.slug || item.id}`} style={{ 
                      fontFamily: 'var(--font-d)', 
                      fontWeight: 900, 
                      fontSize: '1.25rem', 
                      textTransform: 'uppercase', 
                      color: 'var(--white)', 
                      textDecoration: 'none',
                      letterSpacing: '0.02em',
                      display: 'block',
                      marginBottom: '0.25rem'
                    }}>
                      {item.name}
                    </Link>
                    <div style={{ 
                      fontFamily: 'var(--font-d)', 
                      fontWeight: 700, 
                      fontSize: '0.65rem', 
                      letterSpacing: '0.1em', 
                      textTransform: 'uppercase', 
                      color: 'var(--accent-light)'
                    }}>
                      Handcrafted in Sydney
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                  <button 
                    onClick={() => updateQuantity(item.id, -1)} 
                    style={{ background: 'none', border: '1px solid var(--border)', cursor: 'pointer', padding: '4px', color: 'var(--text-dim)' }}
                    className="hover-white transition-all"
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '1rem', width: '25px', textAlign: 'center' }}>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)} 
                    style={{ background: 'none', border: '1px solid var(--border)', cursor: 'pointer', padding: '4px', color: 'var(--text-dim)' }}
                    className="hover-white transition-all"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div style={{ textAlign: 'right', fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.4rem', color: 'var(--white)' }}>
                  ${(item.price * item.quantity).toLocaleString()}
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', display: 'flex', justifyContent: 'flex-end' }}
                  className="hover-accent transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
            <div style={{ 
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid var(--border)', 
              padding: '3rem' 
            }}>
              <h2 style={{ 
                fontFamily: 'var(--font-d)', 
                fontWeight: 900, 
                fontSize: '1.5rem', 
                textTransform: 'uppercase', 
                marginBottom: '2.5rem',
                letterSpacing: '0.05em'
              }}>
                ORDER <span className="text-outline" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)', color: 'transparent' }}>SUMMARY</span>
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <SummaryRow label="SUBTOTAL" value={`$${subtotal.toLocaleString()}`} />
                <SummaryRow label="SHIPPING" value="CALCULATED LATER" color="var(--accent-light)" />
                <SummaryRow label="ESTIMATED GST" value={`$${gst.toLocaleString()}`} />
              </div>

              <div style={{ 
                borderTop: '1px solid var(--border)', 
                paddingTop: '2rem', 
                marginBottom: '2.5rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'baseline' 
              }}>
                <span style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase' }}>TOTAL</span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '2.5rem', lineHeight: 1 }}>${total.toLocaleString()}</div>
                  <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginTop: '0.5rem', letterSpacing: '0.1em' }}>AUD</div>
                </div>
              </div>

              <Link href="/checkout" className="btn btn-solid" style={{ width: '100%', justifyContent: 'center', padding: '1.25rem', fontSize: '0.9rem', letterSpacing: '0.2em' }}>
                CHECKOUT <MoveRight size={20} />
              </Link>
              
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>
                  <Truck size={14} color="var(--accent-light)" /> Express Insured Shipping
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>
                  <ShieldCheck size={14} color="var(--accent-light)" /> 3-Year Premium Warranty
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <Link href="/collection" style={{ 
                fontFamily: 'var(--font-d)', 
                fontWeight: 800, 
                fontSize: '0.7rem', 
                textTransform: 'uppercase', 
                color: 'var(--text-dim)', 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.75rem',
                letterSpacing: '0.2em'
              }} className="hover-white transition-all">
                <ChevronLeft size={14} /> CONTINUE SHOPPING
              </Link>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .cart-grid { grid-template-columns: 1fr !important; gap: 6rem !important; }
          .hide-mobile { display: none !important; }
          .cart-item { grid-template-columns: 1fr 1fr 40px !important; }
          .cart-item > div:first-child { grid-column: span 3; margin-bottom: 1.5rem; }
        }
      `}</style>
    </main>
  );
}

function SummaryRow({ label, value, color }: { label: string, value: string, color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
      <span style={{ color: 'var(--text-dim)' }}>{label}</span>
      <span style={{ color: color || 'var(--text)' }}>{value}</span>
    </div>
  );
}
