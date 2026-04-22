// @ts-nocheck
'use client';

import * as React from 'react';
import { useState } from 'react';
import type { CartItem } from '@/lib/cart/CartContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveRight, ChevronLeft, CreditCard, Truck, ShieldCheck, Lock, CheckCircle2, Info } from 'lucide-react';
import { useCart } from '@/lib/cart/CartContext';

export default function CheckoutPage() {
  const { cart, subtotal, gst, total, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postcode: '',
    phone: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  if (cart.length === 0) {
    return (
      <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '3rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            REGISTRY <span className="text-outline" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)', color: 'transparent' }}>UNAVAILABLE</span>
          </h1>
          <p style={{ color: 'var(--text-dim)', marginBottom: '3rem' }}>Your cart is empty. Add a precision system to proceed.</p>
          <Link href="/shop" className="btn btn-solid">RETURN TO SHOP</Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', paddingTop: '100px' }}>
      
      <div className="wrap" style={{ padding: '6rem 0 10rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 420px', gap: '8rem' }} className="checkout-grid">
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Step Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '5rem' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '36px', height: '36px', borderRadius: '50%', 
                    border: step >= i ? '1px solid #ad856a' : '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: step >= i ? 'rgba(173, 133, 106, 0.1)' : 'transparent',
                    color: step >= i ? '#ad856a' : 'var(--text-dim)',
                    fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '0.85rem',
                    transition: 'all 0.3s ease'
                  }}>
                    {step > i ? <CheckCircle2 size={18} /> : `0${i}`}
                  </div>
                  <span style={{ 
                    fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.7rem', 
                    letterSpacing: '0.25em', textTransform: 'uppercase',
                    color: step >= i ? 'var(--white)' : 'var(--text-dim)',
                    transition: 'all 0.3s ease'
                  }}>
                    {i === 1 ? 'LOGISTICS' : i === 2 ? 'PAYMENT' : 'CONFIRM'}
                  </span>
                  {i < 3 && <div style={{ width: '40px', height: '1px', background: 'var(--border)' }} />}
                </div>
              ))}
            </div>

            {/* Current Step Content */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <h2 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      SHIPPING <span className="text-outline" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)', color: 'transparent' }}>DETAILS</span>
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                      <div style={{ gridColumn: 'span 2' }}>
                        <label style={labelStyle}>EMAIL ADDRESS</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={inputStyle} placeholder="arch@savvy.com" />
                      </div>
                      <div>
                        <label style={labelStyle}>FIRST NAME</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>LAST NAME</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} style={inputStyle} />
                      </div>
                      <div style={{ gridColumn: 'span 2' }}>
                        <label style={labelStyle}>RESIDENTIAL ADDRESS</label>
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>CITY / SUBURB</label>
                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} style={inputStyle} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                          <label style={labelStyle}>STATE</label>
                          <input type="text" name="state" value={formData.state} onChange={handleInputChange} style={inputStyle} placeholder="NSW" />
                        </div>
                        <div>
                          <label style={labelStyle}>POSTCODE</label>
                          <input type="text" name="postcode" value={formData.postcode} onChange={handleInputChange} style={inputStyle} />
                        </div>
                      </div>
                    </div>
                    <button onClick={handleNextStep} className="btn btn-solid" style={{ marginTop: '2rem', padding: '1.5rem', justifyContent: 'center' }}>
                      CONTINUE TO PAYMENT <MoveRight size={20} />
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <h2 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      SECURE <span className="text-outline" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)', color: 'transparent' }}>PAYMENT</span>
                    </h2>
                    <div style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1rem' }}>
                      <div style={{ padding: '1rem', background: 'rgba(173, 133, 106, 0.1)', borderRadius: '4px' }}>
                        <Lock size={28} color="#ad856a" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>STRIPE SECURE GATEWAY</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.3rem', lineHeight: 1.5 }}>Encrypted, PCI-DSS compliant processing for high-value transactions.</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      <div>
                        <label style={labelStyle}>NAME ON CARD</label>
                        <input type="text" name="cardName" value={formData.cardName} onChange={handleInputChange} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>CARD NUMBER</label>
                        <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} style={inputStyle} placeholder="**** **** **** ****" />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                          <label style={labelStyle}>EXPIRY (MM/YY)</label>
                          <input type="text" name="expiry" value={formData.expiry} onChange={handleInputChange} style={inputStyle} placeholder="01/29" />
                        </div>
                        <div>
                          <label style={labelStyle}>CVC</label>
                          <input type="text" name="cvc" value={formData.cvc} onChange={handleInputChange} style={inputStyle} placeholder="***" />
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', alignItems: 'center' }}>
                      <button onClick={handlePrevStep} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.15em' }}>BACK</button>
                      <button onClick={handleNextStep} className="btn btn-solid" style={{ flex: 1, padding: '1.5rem', justifyContent: 'center' }}>
                        REVIEW ORDER <MoveRight size={20} />
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <h2 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      FINAL <span className="text-outline" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)', color: 'transparent' }}>REVIEW</span>
                    </h2>
                    <div style={{ padding: '3rem', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                          <div style={labelStyle}>DELIVERY DESTINATION</div>
                          <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '1rem', color: 'var(--white)', lineHeight: 1.6 }}>
                            {formData.firstName} {formData.lastName}<br/>
                            {formData.address}, {formData.city}<br/>
                            {formData.state} {formData.postcode}
                          </div>
                        </div>
                        <div>
                          <div style={labelStyle}>PAYMENT METHOD</div>
                          <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '1rem', color: 'var(--white)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <CreditCard size={18} color="#ad856a" /> Visa Card Ending {formData.cardNumber.slice(-4) || '4242'}
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ padding: '1.5rem', border: '1px solid rgba(173, 133, 106, 0.2)', background: 'rgba(173, 133, 106, 0.05)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Info size={16} color="#ad856a" />
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>By processing, you agree to Savvy's Bespoke Build Terms & Warranty policies.</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', alignItems: 'center' }}>
                      <button onClick={handlePrevStep} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.15em' }}>BACK</button>
                      <Link 
                        href="/order-confirmation" 
                        onClick={() => clearCart()}
                        className="btn btn-solid" 
                        style={{ flex: 1, padding: '1.5rem', justifyContent: 'center', textDecoration: 'none' }}
                      >
                        PROCESS PAYMENT — ${total.toLocaleString()} <MoveRight size={20} />
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          <div style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
            <div style={{ border: '1px solid var(--border)', padding: '3rem', background: 'rgba(255,255,255,0.01)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>REGISTRY</h3>
                <Link href="/cart" style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.65rem', color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none' }}>EDIT</Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                {cart.map((item: CartItem) => (
                  <div key={item.id} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                    <div style={{ width: '60px', height: '60px', background: 'var(--bg-offset)', border: '1px solid var(--border)', position: 'relative', flexShrink: 0 }}>
                      <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }} />
                      <div style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ad856a', color: 'var(--black)', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900 }}>{item.quantity}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '0.9rem', textTransform: 'uppercase', lineHeight: 1.1, color: 'var(--white)' }}>{item.name}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pre-Dispatch QC Passed</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.1rem' }}>${(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  <span style={{ color: 'var(--text-dim)' }}>SUBTOTAL</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  <span style={{ color: 'var(--text-dim)' }}>INSURED SHIPPING</span>
                  <span style={{ color: 'var(--accent-light)' }}>FREE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '2rem', marginTop: '1.5rem', alignItems: 'baseline' }}>
                  <span>TOTAL</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ lineHeight: 1 }}>${total.toLocaleString()}</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.1em', marginTop: '0.5rem' }}>INC. GST</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>
                <Lock size={16} color="var(--accent-light)" /> Encrypted, secure checkout
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>
                <ShieldCheck size={16} color="var(--accent-light)" /> Fully insured, global shipping
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .checkout-grid { grid-template-columns: 1fr !important; gap: 6rem !important; }
        }
      `}</style>
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-d)',
  fontWeight: 800,
  fontSize: '0.65rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--text-dim)',
  marginBottom: '0.75rem'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '1.25rem',
  border: '1px solid var(--border)',
  fontFamily: 'var(--font-b)',
  fontSize: '0.9rem',
  background: 'rgba(255,255,255,0.02)',
  color: 'var(--white)',
  outline: 'none',
  transition: 'all 0.3s ease',
  borderRadius: '2px'
};
