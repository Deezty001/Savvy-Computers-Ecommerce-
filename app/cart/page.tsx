// @ts-nocheck
'use client';

import Link from "next/link";
import { MoveRight, Trash2, Minus, Plus, ShoppingBag, ChevronLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/lib/cart/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, gst, total } = useCart();

  if (cart.length === 0) {
    return (
      <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
        <Header />
        <div className="wrap" style={{ padding: '12rem 0', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3.5rem' }}>
            <div style={{ padding: '3rem', border: '1px solid var(--border)', background: 'var(--bg-offset)', borderRadius: '50%' }}>
              <ShoppingBag size={64} strokeWidth={1} color="var(--accent-light)" />
            </div>
          </div>
          <h1 style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 900, 
            fontSize: 'var(--fs-xl)', 
            textTransform: 'uppercase', 
            marginBottom: '2rem',
            letterSpacing: '0.04em'
          }}>
            YOUR CART IS <span className="text-outline" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)', color: 'transparent' }}>EMPTY</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '4rem', maxWidth: '40ch', margin: '0 auto 4rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
            It looks like you haven't added any precision builds to your registry yet.
          </p>
          <Link href="/shop" className="btn btn-solid" style={{ padding: '1.5rem 3rem', display: 'inline-flex', gap: '1rem', alignItems: 'center' }}>
            BROWSE COLLECTION <MoveRight size={20} />
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

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
            <span style={{ fontSize: '1.5rem', opacity: 0.3 }}>*</span> YOUR REGISTRY — SYDNEY HQ
          </div>
          <h1 style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 900, 
            fontSize: 'clamp(3.5rem, 8vw, 7rem)', 
            textTransform: 'uppercase', 
            lineHeight: 0.8, 
            letterSpacing: '0.02em'
          }}>
            SHOPPING <span className="text-outline" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)', color: 'transparent' }}>CART</span>
          </h1>
        </div>
      </div>

      <div className="wrap" style={{ padding: '8rem 0 15rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '8rem' }} className="cart-grid">
          
          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ 
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 40px', 
              padding: '1.5rem 0', borderBottom: '1px solid var(--border)',
              fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.75rem', 
              letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-dim)'
            }} className="hide-mobile">
              <div>PRODUCT</div>
              <div style={{ textAlign: 'center' }}>QUANTITY</div>
              <div style={{ textAlign: 'right' }}>TOTAL</div>
              <div></div>
            </div>

            {cart.map((item) => (
              <div key={item.id} style={{ 
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 40px', 
                padding: '3rem 0', borderBottom: '1px solid var(--border)',
                alignItems: 'center'
              }} className="cart-item">
                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                  <div style={{ 
                    width: '120px', 
                    aspectRatio: '1/1', 
                    background: 'var(--bg-offset)', 
                    border: '1px solid var(--border)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'var(--accent)', opacity: 0.1 }} />
                    <img 
                      src={`https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=200&auto=format&fit=crop`} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, filter: 'grayscale(1)' }}
                    />
                  </div>
                  <div>
                    <Link href={`/product/${item.id}`} style={{ 
                      fontFamily: 'var(--font-d)', 
                      fontWeight: 900, 
                      fontSize: '1.5rem', 
                      textTransform: 'uppercase', 
                      color: 'var(--white)', 
                      textDecoration: 'none',
                      letterSpacing: '0.02em'
                    }}>
                      {item.name}
                    </Link>
                    <div style={{ 
                      fontFamily: 'var(--font-d)', 
                      fontWeight: 700, 
                      fontSize: '0.7rem', 
                      letterSpacing: '0.15em', 
                      textTransform: 'uppercase', 
                      color: 'var(--text-dim)', 
                      marginTop: '0.5rem' 
                    }}>
                      Sydney Studio Build
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}>
                  <button 
                    onClick={() => updateQuantity(item.id, -1)} 
                    style={{ background: 'none', border: '1px solid var(--border)', cursor: 'pointer', padding: '6px', color: 'var(--text-muted)' }}
                    className="hover-white transition-all"
                  >
                    <Minus size={16} />
                  </button>
                  <span style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '1.1rem', width: '30px', textAlign: 'center' }}>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)} 
                    style={{ background: 'none', border: '1px solid var(--border)', cursor: 'pointer', padding: '6px', color: 'var(--text-muted)' }}
                    className="hover-white transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div style={{ textAlign: 'right', fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.5rem', color: 'var(--white)' }}>
                  ${(item.price * item.quantity).toLocaleString()}
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', display: 'flex', justifyContent: 'flex-end' }}
                  className="hover-accent transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ position: 'sticky', top: '160px', height: 'fit-content' }}>
            <div style={{ 
              background: 'var(--bg-offset)',
              border: '1px solid var(--border)', 
              padding: '4rem' 
            }}>
              <h2 style={{ 
                fontFamily: 'var(--font-d)', 
                fontWeight: 900, 
                fontSize: '1.8rem', 
                textTransform: 'uppercase', 
                marginBottom: '3rem',
                letterSpacing: '0.04em'
              }}>
                ORDER SUMMARY
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  <span style={{ color: 'var(--text-dim)' }}>SUBTOTAL</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  <span style={{ color: 'var(--text-dim)' }}>SHIPPING</span>
                  <span style={{ color: 'var(--accent-light)' }}>CALCULATED LATER</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  <span style={{ color: 'var(--text-dim)' }}>ESTIMATED GST</span>
                  <span>${gst.toLocaleString()}</span>
                </div>
              </div>

              <div style={{ 
                borderTop: '1px solid var(--border)', 
                paddingTop: '2.5rem', 
                marginBottom: '3.5rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'baseline' 
              }}>
                <span style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.25rem', textTransform: 'uppercase' }}>TOTAL</span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '3rem', lineHeight: 1 }}>${total.toLocaleString()}</div>
                  <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginTop: '0.5rem', letterSpacing: '0.1em' }}>PRICES IN AUD</div>
                </div>
              </div>

              <Link href="/checkout" className="btn btn-solid" style={{ width: '100%', justifyContent: 'center', padding: '1.5rem', fontSize: '1rem', letterSpacing: '0.2em' }}>
                CHECKOUT <MoveRight size={20} />
              </Link>
            </div>
            
            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <Link href="/shop" style={{ 
                fontFamily: 'var(--font-d)', 
                fontWeight: 800, 
                fontSize: '0.75rem', 
                textTransform: 'uppercase', 
                color: 'var(--text-muted)', 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.75rem',
                letterSpacing: '0.15em'
              }} className="hover-white transition-all">
                <ChevronLeft size={14} /> CONTINUE SHOPPING
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
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
