'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Package, Settings, ShieldCheck, Heart, ChevronRight, User } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/lib/auth/AuthContext';

export default function DashboardPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/account/login');
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  const orders = [
    { id: 'SC-A8F2K9', date: '24 Mar 2024', status: 'Delivered', total: '4,299', items: 'APEX PRO' },
    { id: 'SC-B1J3L0', date: '12 Jan 2024', status: 'Delivered', total: '2,499', items: 'APEX CORE' }
  ];

  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <div style={{ borderBottom: 'var(--border-heavy)', padding: '5rem 0 3rem' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--zinc-400)', marginBottom: '1rem' }}>
              * Personal Dashboard — Savvy ID
            </div>
            <h1 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-0.01em' }}>
              Hello, <span style={{ WebkitTextStroke: '1px var(--black)', color: 'transparent' }}>{user.firstName}</span>
            </h1>
          </div>
          <button 
            onClick={logout}
            style={{ 
              background: 'none', border: 'none', cursor: 'pointer', 
              fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.65rem', 
              letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--zinc-400)',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>

      <div className="wrap" style={{ padding: '4rem 0 10rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '5rem' }} className="dash-grid">
          
          {/* Sidebar Nav */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <NavItem icon={<User size={18} />} label="Profile Overview" active />
            <NavItem icon={<Package size={18} />} label="Order History" />
            <NavItem icon={<Heart size={18} />} label="Saved Builds" />
            <NavItem icon={<ShieldCheck size={18} />} label="Warranties" />
            <NavItem icon={<Settings size={18} />} label="Account Settings" />
          </div>

          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            
            {/* Orders Section */}
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.25rem', textTransform: 'uppercase' }}>Recent Orders</h2>
                <Link href="#" style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--zinc-400)' }}>View All Orders</Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', border: 'var(--border-heavy)' }}>
                {orders.map((order, idx) => (
                  <div key={order.id} style={{ 
                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 40px', 
                    padding: '2rem', borderBottom: idx === orders.length - 1 ? 'none' : 'var(--border-light)',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.62rem', color: 'var(--zinc-400)', textTransform: 'uppercase' }}>Order ID</div>
                      <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.9rem' }}>#{order.id}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.62rem', color: 'var(--zinc-400)', textTransform: 'uppercase' }}>Date</div>
                      <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.9rem' }}>{order.date}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.62rem', color: 'var(--zinc-400)', textTransform: 'uppercase' }}>Items</div>
                      <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.9rem' }}>{order.items}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.62rem', color: 'var(--zinc-400)', textTransform: 'uppercase' }}>Total</div>
                      <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.9rem', color: '#166534' }}>${order.total}</div>
                    </div>
                    <ChevronRight size={18} color="var(--zinc-300)" />
                  </div>
                ))}
              </div>
            </section>

            {/* Support/Warranty Section */}
            <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="promo-grid">
              <div style={{ background: 'var(--zinc-100)', padding: '3rem', border: 'var(--border-light)' }}>
                <ShieldCheck size={32} style={{ marginBottom: '1.5rem', color: 'var(--black)' }} />
                <h3 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.5rem', textTransform: 'uppercase', marginBottom: '1rem' }}>Active Warranty</h3>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--zinc-600)', marginBottom: '2rem' }}>
                  Your APEX PRO build is covered under the 2-year Savvy Elite warranty until March 2026.
                </p>
                <Link href="#" className="section-link" style={{ fontSize: '0.7rem' }}>Warranty Details →</Link>
              </div>
              <div style={{ background: 'var(--black)', color: 'var(--white)', padding: '3rem' }}>
                <Package size={32} style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.5rem', textTransform: 'uppercase', marginBottom: '1rem' }}>Next Build</h3>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--zinc-400)', marginBottom: '2rem' }}>
                  Planning your next masterpiece? Loyalty members get 5% off their third custom system.
                </p>
                <Link href="/shop" style={{ color: 'var(--white)', fontSize: '0.7rem' }} className="section-link">Shop Collection →</Link>
              </div>
            </section>
          </div>

        </div>
      </div>

      <Footer />
      <style jsx>{`
        @media (max-width: 1024px) {
          .dash-grid { grid-template-columns: 1fr !important; gap: 4rem !important; }
        }
        @media (max-width: 768px) {
          .promo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button style={{ 
      display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', 
      background: active ? 'var(--zinc-100)' : 'none', border: 'none', cursor: 'pointer',
      width: '100%', textAlign: 'left', transition: 'background 0.15s'
    }}>
      <span style={{ color: active ? 'var(--black)' : 'var(--zinc-300)' }}>{icon}</span>
      <span style={{ 
        fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.75rem', 
        textTransform: 'uppercase', color: active ? 'var(--black)' : 'var(--zinc-500)'
      }}>
        {label}
      </span>
    </button>
  );
}
