'use client';

import Link from "next/link";
import { CheckCircle2, MoveRight, ShoppingBag, Package, Truck, ShieldCheck } from "lucide-react";

export default function OrderConfirmationPage() {
  const orderNumber = "SC-" + Math.random().toString(36).substring(2, 9).toUpperCase();

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      
      <div className="wrap" style={{ padding: '8rem 0 12rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3.5rem' }}>
          <div style={{ 
            width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', 
            color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(34, 197, 94, 0.2)' 
          }}>
            <CheckCircle2 size={48} />
          </div>
        </div>

        <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--accent-light)', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>*</span> DEPLOYMENT SUCCESSFUL — {orderNumber}
        </div>
        
        <h1 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: 'clamp(3rem, 7vw, 6rem)', textTransform: 'uppercase', lineHeight: 0.85, letterSpacing: '0.02em', marginBottom: '2.5rem' }}>
          SYSTEM <span className="text-outline" style={{ WebkitTextStroke: '2px var(--white)', color: 'transparent' }}>CONFIRMED</span>
        </h1>

        <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '50ch', margin: '0 auto 5rem', letterSpacing: '0.02em' }}>
          Thank you for choosing Savvy. Your build has been added to our queue in Sydney. 
          A confirmation email has been sent to your address with full tracking details.
        </p>

        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem', 
          maxWidth: '900px', margin: '0 auto 7rem', borderTop: '1px solid var(--border)', 
          paddingTop: '5rem' 
        }} className="conf-grid">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
            <Package size={28} color="var(--accent-light)" />
            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Build Phase</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Estimated 3-5 Days</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
            <ShieldCheck size={28} color="var(--accent-light)" />
            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Stress Testing</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Mandatory 72H Load</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
            <Truck size={28} color="var(--accent-light)" />
            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Express Delivery</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>1-2 Biz Days (AU)</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
          <Link href="/account/dashboard" className="btn btn-ghost" style={{ padding: '1.25rem 3rem' }}>
            TRACK YOUR SYSTEM
          </Link>
          <Link href="/shop" className="btn btn-solid" style={{ padding: '1.25rem 3rem' }}>
            RETURN TO ARCHIVE <MoveRight size={18} />
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .conf-grid { grid-template-columns: 1fr !important; gap: 4rem !important; }
        }
      `}} />
    </main>
  );
}
