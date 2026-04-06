// @ts-nocheck
'use client';

import { useState } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, ChevronDown, ChevronUp, MessageSquare, ShieldCheck, Truck } from "lucide-react";

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: "What is your typical build time?", a: "Each system is handcrafted to order. Typical lead time is 3-5 business days for assembly, followed by a mandatory 72-hour stress test before dispatch." },
    { q: "Do you ship internationally?", a: "Currently, we only ship within Australia to ensure the highest standards of transit safety and warranty support." },
    { q: "What does the 2-year warranty cover?", a: "Our Savvy Elite warranty covers all hardware failures, build defects, and technical support. We also offer free labor for future upgrades." },
    { q: "Can I customize a pre-built system?", a: "Yes. Use our 'Configure' tool on any product page or contact us for a completely bespoke component selection." }
  ];

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      <Header />
      
      {/* Page Header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '10rem 0 6rem' }}>
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
            <span style={{ fontSize: '1.5rem', opacity: 0.3 }}>*</span> SUPPORT HUB — SAVVY HQ
          </div>
          <h1 style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 900, 
            fontSize: 'clamp(4rem, 12vw, 9.5rem)', 
            textTransform: 'uppercase', 
            lineHeight: 0.8, 
            letterSpacing: '0.02em', 
            marginBottom: '4rem' 
          }}>
            ASK <br/> 
            <span className="text-outline" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)', color: 'transparent' }}>ANYTHING</span>
          </h1>
        </div>
      </div>

      <div className="wrap" style={{ padding: '12rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) 1fr', gap: '8rem' }} className="support-grid">
          
          {/* FAQ Section */}
          <div>
            <h2 style={{ 
              fontFamily: 'var(--font-d)', 
              fontWeight: 900, 
              fontSize: 'var(--fs-xl)', 
              textTransform: 'uppercase', 
              marginBottom: '3rem',
              letterSpacing: '0.04em' 
            }}>
              COMMON QUERIES
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border)' }}>
              {faqs.map((faq, idx) => (
                <div key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    style={{ 
                      width: '100%', padding: '2.5rem 0', background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left',
                      transition: 'all 0.3s ease'
                    }}
                    className="faq-trigger"
                  >
                    <span style={{ 
                      fontFamily: 'var(--font-d)', 
                      fontWeight: 800, 
                      fontSize: '1.25rem', 
                      textTransform: 'uppercase',
                      color: openFaq === idx ? 'var(--white)' : 'var(--text-muted)'
                    }}>{faq.q}</span>
                    {openFaq === idx ? <ChevronUp size={24} color="var(--accent-light)" /> : <ChevronDown size={24} color="var(--text-dim)" />}
                  </button>
                  {openFaq === idx && (
                    <div style={{ 
                      paddingBottom: '3.5rem', 
                      fontSize: '1rem', 
                      lineHeight: 1.8, 
                      color: 'var(--text-muted)', 
                      maxWidth: '55ch' 
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div style={{ position: 'sticky', top: '160px', height: 'fit-content' }}>
            <div style={{ 
              background: 'var(--bg-offset)', 
              border: '1px solid var(--border)',
              padding: '5rem 4rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--accent)', opacity: 0.05, zIndex: 0 }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ 
                  fontFamily: 'var(--font-d)', 
                  fontWeight: 900, 
                  fontSize: '2rem', 
                  textTransform: 'uppercase', 
                  marginBottom: '3.5rem',
                  letterSpacing: '0.04em'
                }}>
                  DIRECT LINE
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
                  <ContactInfo 
                    icon={<Mail strokeWidth={1.5} />} 
                    label="GENERAL ENQUIRIES" 
                    value="HELLO@SAVVYCOMPUTERS.COM" 
                  />
                  <ContactInfo 
                    icon={<MessageSquare strokeWidth={1.5} />} 
                    label="TECHNICAL SUPPORT" 
                    value="SUPPORT@SAVVYCOMPUTERS.COM" 
                  />
                  <ContactInfo 
                    icon={<MapPin strokeWidth={1.5} />} 
                    label="SYDNEY STUDIO" 
                    value="UNIT 14, 28-30 HANSARD ST, ZETLAND NSW" 
                  />
                </div>

                <div style={{ 
                  borderTop: '1px solid var(--border)', 
                  paddingTop: '3.5rem', 
                  marginTop: '4rem', 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '2rem' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <ShieldCheck size={24} color="var(--accent-light)" />
                    <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-dim)' }}>ELITE WARRANTY</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Truck size={24} color="var(--accent-light)" />
                    <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-dim)' }}>LOCAL EXPRESS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
      <style jsx>{`
        .faq-trigger:hover span { color: var(--white) !important; }
        @media (max-width: 1024px) {
          .support-grid { grid-template-columns: 1fr !important; gap: 8rem !important; }
        }
      `}</style>
    </main>
  );
}

function ContactInfo({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
      <div style={{ color: 'var(--accent-light)', marginTop: '4px' }}>{icon}</div>
      <div>
        <div style={{ 
          fontFamily: 'var(--font-d)', 
          fontWeight: 800, 
          fontSize: '0.7rem', 
          letterSpacing: '0.2em', 
          textTransform: 'uppercase', 
          color: 'var(--text-dim)', 
          marginBottom: '0.75rem' 
        }}>{label}</div>
        <div style={{ 
          fontFamily: 'var(--font-d)', 
          fontWeight: 900, 
          fontSize: '1.25rem', 
          color: 'var(--white)',
          letterSpacing: '0.02em'
        }}>{value}</div>
      </div>
    </div>
  );
}
