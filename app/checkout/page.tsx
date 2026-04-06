'use client';

import * as React from 'react';
import { useState } from 'react';
import type { CartItem } from '@/lib/cart/CartContext';
import Link from 'next/link';
import { MoveRight, ChevronLeft, CreditCard, Truck, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
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
      <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
        <Header />
        <div className="wrap" style={{ padding: '8rem 0', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '3rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Checkout Unavailable</h1>
          <p style={{ color: 'var(--zinc-500)', marginBottom: '3rem' }}>Your cart is empty. Add a system to proceed.</p>
          <Link href="/shop" className="btn btn-solid">Return to Shop</Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Header />
      
      <div className="wrap" style={{ padding: '4rem 0 10rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 420px', gap: '6rem' }} className="checkout-grid">
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Step Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ 
                    width: '32px', height: '32px', borderRadius: '50%', border: '2px solid var(--black)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: step >= i ? 'var(--black)' : 'transparent',
                    color: step >= i ? 'var(--white)' : 'var(--black)',
                    fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '0.8rem'
                  }}>
                    {step > i ? <CheckCircle2 size={16} /> : i}
                  </div>
                  <span style={{ 
                    fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.65rem', 
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: step >= i ? 'var(--black)' : 'var(--zinc-300)'
                  }}>
                    {i === 1 ? 'Shipping' : i === 2 ? 'Payment' : 'Review'}
                  </span>
                  {i < 3 && <div style={{ width: '40px', height: '2px', background: 'var(--zinc-100)' }} />}
                </div>
              ))}
            </div>

            {/* Current Step Content */}
            <div key={step} style={{ animation: 'fadeIn 0.4s ease' }}>
              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '2rem', textTransform: 'uppercase' }}>Shipping Details</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={labelStyle}>Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={inputStyle} placeholder="you@example.com" />
                    </div>
                    <div>
                      <label style={labelStyle}>First Name</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} style={inputStyle} />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={labelStyle}>Residential Address</label>
                      <input type="text" name="address" value={formData.address} onChange={handleInputChange} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>City</label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} style={inputStyle} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={labelStyle}>State</label>
                        <input type="text" name="state" value={formData.state} onChange={handleInputChange} style={inputStyle} placeholder="NSW" />
                      </div>
                      <div>
                        <label style={labelStyle}>Postcode</label>
                        <input type="text" name="postcode" value={formData.postcode} onChange={handleInputChange} style={inputStyle} />
                      </div>
                    </div>
                  </div>
                  <button onClick={handleNextStep} className="btn btn-solid" style={{ marginTop: '2rem', padding: '1.25rem', justifyContent: 'center' }}>
                    Continue to Payment <MoveRight size={18} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '2rem', textTransform: 'uppercase' }}>Secure Payment</h2>
                  <div style={{ padding: '2rem', background: 'var(--zinc-100)', border: 'var(--border-light)', display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
                    <div style={{ padding: '0.8rem', background: 'var(--white)', borderRadius: '4px' }}>
                      <CreditCard size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>Stripe Secure Checkout</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--zinc-500)', marginTop: '0.2rem' }}>Encrypted & PCI Compliant Payment Processing</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <label style={labelStyle}>Name on Card</label>
                      <input type="text" name="cardName" value={formData.cardName} onChange={handleInputChange} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Card Number</label>
                      <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} style={inputStyle} placeholder="0000 0000 0000 0000" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <div>
                        <label style={labelStyle}>Expiry (MM/YY)</label>
                        <input type="text" name="expiry" value={formData.expiry} onChange={handleInputChange} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>CVC</label>
                        <input type="text" name="cvc" value={formData.cvc} onChange={handleInputChange} style={inputStyle} />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
                    <button onClick={handlePrevStep} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--zinc-400)' }}>Back</button>
                    <button onClick={handleNextStep} className="btn btn-solid" style={{ flex: 1, padding: '1.25rem', justifyContent: 'center' }}>
                      Review Order <MoveRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '2rem', textTransform: 'uppercase' }}>Final Review</h2>
                  <div style={{ padding: '2rem', border: 'var(--border-light)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <div style={labelStyle}>Shipping to</div>
                      <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.9rem', color: 'var(--black)' }}>
                        {formData.firstName} {formData.lastName}<br/>
                        {formData.address}, {formData.city}, {formData.state} {formData.postcode}
                      </div>
                    </div>
                    <div>
                      <div style={labelStyle}>Payment Method</div>
                      <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.9rem', color: 'var(--black)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CreditCard size={16} /> Visa ending in {formData.cardNumber.slice(-4) || '4242'}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
                    <button onClick={handlePrevStep} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--zinc-400)' }}>Back</button>
                    <Link 
                      href="/order-confirmation" 
                      onClick={() => clearCart()}
                      className="btn btn-solid" 
                      style={{ flex: 1, padding: '1.25rem', justifyContent: 'center', textDecoration: 'none' }}
                    >
                      Process Payment — ${total.toLocaleString()} <MoveRight size={18} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Sidebar */}
          <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            <div style={{ border: 'var(--border-heavy)', padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.25rem', textTransform: 'uppercase' }}>Summary</h3>
                <Link href="/cart" style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.6rem', color: 'var(--zinc-400)', textTransform: 'uppercase' }}>Edit Cart</Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {cart.map((item: CartItem) => (
                  <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '50px', height: '50px', background: 'var(--zinc-100)', position: 'relative', flexShrink: 0 }}>
                      <div style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--black)', color: 'var(--white)', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 900 }}>{item.quantity}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', lineHeight: 1 }}>{item.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--zinc-400)', marginTop: '0.1rem' }}>Pre-Dispatch QC Passed</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.9rem' }}>${(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: 'var(--border-light)', paddingTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <span style={{ color: 'var(--zinc-500)' }}>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <span style={{ color: 'var(--zinc-500)' }}>Shipping — Express</span>
                  <span style={{ color: '#166534' }}>Free</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.8rem', marginTop: '1rem' }}>
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.62rem', color: 'var(--zinc-400)', textTransform: 'uppercase', textAlign: 'right' }}>
                  Includes ${(total * (1/11)).toLocaleString()} GST (10%)
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--zinc-500)' }}>
                <Lock size={14} /> Encrypted, secure checkout
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--zinc-500)' }}>
                <ShieldCheck size={14} /> Fully insured shipping
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-d)',
  fontWeight: 700,
  fontSize: '0.62rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--zinc-400)',
  marginBottom: '0.5rem'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '1rem',
  border: 'var(--border-light)',
  fontFamily: 'var(--font-b)',
  fontSize: '0.9rem',
  background: 'var(--white)',
  outline: 'none',
  transition: 'border-color 0.15s'
};
