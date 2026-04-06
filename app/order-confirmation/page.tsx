'use client';

import Link from "next/link";
import { CheckCircle2, MoveRight, ShoppingBag, Package, Truck, ShieldCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function OrderConfirmationPage() {
  const orderNumber = "SC-" + Math.random().toString(36).substring(2, 9).toUpperCase();

  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Header />
      
      <div className="wrap" style={{ padding: '8rem 0 12rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '50%', background: '#f0fff4', 
            color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid currentColor' 
          }}>
            <CheckCircle2 size={40} />
          </div>
        </div>

        <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--zinc-400)', marginBottom: '1.25rem' }}>
          Payment Successful — Order {orderNumber}
        </div>
        
        <h1 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: 'clamp(3rem, 7vw, 6rem)', textTransform: 'uppercase', lineHeight: 0.85, letterSpacing: '-0.02em', marginBottom: '2rem' }}>
          System <span style={{ WebkitTextStroke: '2px var(--black)', color: 'transparent' }}>Confirmed</span>
        </h1>

        <p style={{ color: 'var(--zinc-700)', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '50ch', margin: '0 auto 4rem' }}>
          Thank you for choosing Savvy. Your build has been added to our queue in Sydney. 
          A confirmation email has been sent to your address with full tracking details.
        </p>

        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', 
          maxWidth: '800px', margin: '0 auto 6rem', borderTop: 'var(--border-heavy)', 
          paddingTop: '4rem' 
        }} className="conf-grid">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <Package size={24} color="var(--zinc-300)" />
            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase' }}>Build Phase</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--zinc-500)' }}>Estimated 3-5 Days</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <ShieldCheck size={24} color="var(--zinc-300)" />
            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase' }}>Stress Testing</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--zinc-500)' }}>Mandatory 72H Load</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <Truck size={24} color="var(--zinc-300)" />
            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase' }}>Express Delivery</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--zinc-500)' }}>1-2 Biz Days (AU)</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <Link href="/account" className="btn btn-ghost" style={{ padding: '1.25rem 2.5rem' }}>
            Track Your Order
          </Link>
          <Link href="/shop" className="btn btn-solid" style={{ padding: '1.25rem 2.5rem' }}>
            Return to Collection <MoveRight size={16} />
          </Link>
        </div>
      </div>

      <Footer />
      <style jsx>{`
        @media (max-width: 768px) {
          .conf-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </main>
  );
}
