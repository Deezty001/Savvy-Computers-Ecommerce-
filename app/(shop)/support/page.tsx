// @ts-nocheck
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, ShieldCheck, Truck, Clock, Plus, Minus, Send, Phone, User, Smartphone } from "lucide-react";

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const faqs = [
    { q: "HOW CAN I GET IN TOUCH?", a: "The best way to reach us is via the contact form on this page or by emailing our dedicated sales or support teams directly. We aim to respond to all inquiries within 4-6 business hours." },
    { q: "WHEN WILL I RECEIVE MY ORDER?", a: "Every Savvy system is handcrafted and undergoes a mandatory 72-hour stress test. Standard lead time is 5-7 business days for assembly and validation before express dispatch." },
    { q: "CAN I CUSTOMISE MY ORDER AFTER PLACING IT?", a: "If your build has not yet entered the 'Component Allocation' phase, we can often make adjustments. Please contact our sales team immediately with your order number to discuss changes." },
    { q: "WHAT WARRANTY IS INCLUDED?", a: "All Savvy systems include a 3-Year Premium Warranty covering all parts and labor. We also provide lifetime technical support for as long as you own the machine." },
    { q: "DO YOU OFFER FINANCE OPTIONS?", a: "Yes. We support various flexible payment solutions including Zip and Afterpay, allowing you to secure your high-performance system today and pay over time." },
    { q: "WILL I RECEIVE THE ORIGINAL COMPONENT BOXES?", a: "Absolutely. We ship all original component boxes, manuals, and extra cables in a separate 'Savvy Archive' box alongside your PC for your future reference and resale value." },
    { q: "WHAT STRESS TESTING IS PERFORMED?", a: "Every system undergoes 'The Forge'—a rigorous 72-hour stress test suite including Prime95 for CPU stability, Furmark for GPU thermals, and MemTest86 for memory integrity." }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('sent'), 1500);
  };

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', paddingTop: '80px' }}>
      
      {/* Hero Section */}
      <section style={{ borderBottom: '1px solid var(--border)', padding: '8rem 0 6rem' }}>
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
            <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>*</span> CONTACT CONCIERGE — SYDNEY HQ
          </div>
          <h1 style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 900, 
            fontSize: 'clamp(3.5rem, 8vw, 6rem)', 
            textTransform: 'uppercase', 
            lineHeight: 1, 
            letterSpacing: '0.02em',
            maxWidth: '20ch'
          }}>
            NEED TO GET <br/> 
            <span className="text-outline" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.4)', color: 'transparent' }}>IN TOUCH?</span>
          </h1>
          <p style={{ marginTop: '2.5rem', fontSize: '1.1rem', color: 'var(--text-dim)', maxWidth: '55ch', lineHeight: 1.6 }}>
            Whether you have questions about our products, need technical support, or are interested in partnerships, our team is ready to assist.
          </p>
        </div>
      </section>

      {/* Contact Channels Grid */}
      <section className="wrap" style={{ padding: '8rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '8rem' }}>
          
          {/* Sales Card */}
          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', padding: '4rem' }}>
            <div style={{ color: '#ad856a', marginBottom: '2.5rem' }}><Mail size={32} strokeWidth={1} /></div>
            <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>EMAIL US</h2>
            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.2rem', color: 'var(--white)', marginBottom: '1rem' }}>sales@savvycomputers.com.au</div>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Got a question about purchasing a new custom system? Looking for bulk options? We’re here to help.
            </p>
          </div>

          {/* Support Card */}
          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', padding: '4rem' }}>
            <div style={{ color: '#ad856a', marginBottom: '2.5rem' }}><MessageSquare size={32} strokeWidth={1} /></div>
            <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>NEED SUPPORT?</h2>
            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.2rem', color: 'var(--white)', marginBottom: '1rem' }}>support@savvycomputers.com.au</div>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Have a technical issue? Our dedicated support team is ready to assist with troubleshooting and maintenance.
            </p>
          </div>

        </div>

        {/* Form Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '8rem' }} className="form-grid">
          <div>
            <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '2rem', lineHeight: 1 }}>STILL NEED <br/><span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', color: 'transparent' }}>HELP?</span></h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: 1.6 }}>
              If you prefer, you can also reach out to us directly by filling out the form. Our technical architects review every submission.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div style={{ position: 'relative' }}>
                <label style={labelStyle}>YOUR NAME</label>
                <div style={{ position: 'relative' }}>
                  <input type="text" placeholder="FULL NAME" style={{ ...inputStyle, paddingLeft: '3rem' }} required />
                  <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <label style={labelStyle}>YOUR EMAIL</label>
                <div style={{ position: 'relative' }}>
                  <input type="email" placeholder="NAME@EMAIL.COM" style={{ ...inputStyle, paddingLeft: '3rem' }} required />
                  <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                </div>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <label style={labelStyle}>YOUR PHONE NUMBER</label>
              <div style={{ position: 'relative' }}>
                <input type="tel" placeholder="+61 400 000 000" style={{ ...inputStyle, paddingLeft: '3rem' }} />
                <Smartphone size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={labelStyle}>YOUR MESSAGE</label>
              <textarea 
                required
                style={{ ...inputStyle, minHeight: '180px', resize: 'vertical' }}
                placeholder="How can we help with your technical requirement?"
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-solid" 
              style={{ padding: '1.5rem 4rem', width: 'fit-content', fontSize: '0.9rem', letterSpacing: '0.25em' }}
              disabled={formStatus !== 'idle'}
            >
              {formStatus === 'idle' ? 'SEND MESSAGE' : formStatus === 'sending' ? 'TRANSMITTING...' : 'MESSAGE SENT'} 
              {formStatus === 'idle' && <Send size={16} style={{ marginLeft: '1rem' }} />}
            </button>
          </form>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{ padding: '10rem 0', borderTop: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }}>
        <div className="wrap" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '3rem', fontWeight: 900, letterSpacing: '0.05em' }}>FREQUENTLY ASKED <span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', color: 'transparent' }}>QUESTIONS</span></h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {faqs.map((faq, idx) => (
              <FaqItem key={idx} q={faq.q} a={faq.a} isOpen={openFaq === idx} onToggle={() => setOpenFaq(openFaq === idx ? null : idx)} />
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 1024px) {
          .form-grid { grid-template-columns: 1fr !important; gap: 4rem !important; }
          .support-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </main>
  );
}

function FaqItem({ q, a, isOpen, onToggle }: any) {
  return (
    <div style={{ border: '1px solid var(--border)', background: 'var(--bg)', transition: 'all 0.3s ease' }}>
      <button 
        onClick={onToggle}
        style={{ width: '100%', background: 'none', border: 'none', padding: '2rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', fontWeight: 900, letterSpacing: '0.05em', color: isOpen ? '#ad856a' : 'var(--white)' }}>{q}</span>
        {isOpen ? <Minus size={20} color="#ad856a" /> : <Plus size={20} color="var(--white)" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '0 2.5rem 2.5rem', color: 'var(--text-dim)', fontSize: '1rem', lineHeight: 1.8, borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '1.5rem' }}>{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-d)',
  fontWeight: 800,
  fontSize: '0.65rem',
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  color: 'var(--text-dim)',
  marginBottom: '0.75rem',
  display: 'block'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '1.25rem',
  border: '1px solid var(--border)',
  background: 'rgba(255,255,255,0.02)',
  color: 'var(--white)',
  fontFamily: 'var(--font-d)',
  fontWeight: 700,
  fontSize: '0.9rem',
  outline: 'none',
  borderRadius: '2px',
  letterSpacing: '0.05em'
};
