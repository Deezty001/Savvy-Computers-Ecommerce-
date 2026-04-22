'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Package, Settings, ShieldCheck, Heart, ChevronRight, User, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';
import { supabase } from '@/lib/supabase/client';

export default function DashboardPage() {
  const { user, profile, logout, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (data) setOrders(data);
      setIsLoading(false);
    }

    if (!authLoading && !user) {
      router.push('/account/login');
    } else if (user) {
      fetchOrders();
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" size={32} color="var(--white)" />
      </div>
    );
  }

  const firstName = profile?.first_name || user.email?.split('@')[0] || 'Member';

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header Section */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '6rem 0 4rem' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.7rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--accent-light)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>*</span> PERSONAL ARCHIVE — SAVVY ID
            </div>
            <h1 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: 'clamp(3rem, 6vw, 5rem)', textTransform: 'uppercase', lineHeight: 0.85, letterSpacing: '0.02em' }}>
              HELLO, <span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', color: 'transparent' }}>{firstName}</span>
            </h1>
          </div>
          <button 
            onClick={() => {
              console.log('Signout initiated');
              logout();
            }}
            style={{ 
              background: 'none', border: '1px solid var(--border)', padding: '0.75rem 1.5rem', cursor: 'pointer', 
              fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.7rem', 
              letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.3s ease'
            }}
            className="hover-white"
          >
            <LogOut size={14} /> SIGN OUT
          </button>
        </div>
      </div>

      <div className="wrap" style={{ padding: '5rem 0 10rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '6rem' }} className="dash-grid">
          
          {/* Sidebar Nav */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <NavItem icon={<User size={18} />} label="PROFILE OVERVIEW" active />
            <NavItem icon={<Package size={18} />} label="ORDER HISTORY" />
            <NavItem icon={<Heart size={18} />} label="SAVED ARCHIVES" />
            <NavItem icon={<ShieldCheck size={18} />} label="ELITE WARRANTIES" />
            <NavItem icon={<Settings size={18} />} label="SYSTEM SETTINGS" />
          </div>

          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
            
            {/* Orders Section */}
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>RECENT ORDERS</h2>
                <Link href="#" style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-dim)', textDecoration: 'none', letterSpacing: '0.15em' }} className="hover-white">VIEW ALL HISTORY</Link>
              </div>

              {isLoading ? (
                <div style={{ padding: '5rem', textAlign: 'center', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }}>
                  <Loader2 className="animate-spin mx-auto" size={24} color="var(--accent-light)" />
                </div>
              ) : orders.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }}>
                  {orders.map((order, idx) => (
                    <div key={order.id} style={{ 
                      display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.2fr 40px', 
                      padding: '2.5rem', borderBottom: idx === orders.length - 1 ? 'none' : '1px solid var(--border)',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.6rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>ARCHIVE ID</div>
                        <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1rem', letterSpacing: '0.05em' }}>#{order.order_number || order.id.slice(0, 8).toUpperCase()}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.6rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DEPLOYMENT</div>
                        <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1rem', letterSpacing: '0.05em' }}>{new Date(order.created_at).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.6rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>STATUS</div>
                        <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1rem', color: 'var(--accent-light)', letterSpacing: '0.05em' }}>{order.status.toUpperCase()}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.6rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>TOTAL VALUE</div>
                        <div style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.1rem', color: 'var(--white)', letterSpacing: '0.05em' }}>${order.total_amount.toLocaleString()}</div>
                      </div>
                      <ChevronRight size={18} color="var(--text-dim)" />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '6rem', textAlign: 'center', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }}>
                  <Package size={32} style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
                  <p style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                    NO MISSION HISTORY FOUND.
                  </p>
                  <Link href="/collection" style={{ display: 'inline-block', marginTop: '2rem', padding: '1rem 2rem', background: 'var(--white)', color: 'var(--black)', fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', textDecoration: 'none', letterSpacing: '0.15em' }}>
                    START FIRST BUILD
                  </Link>
                </div>
              )}
            </section>

            {/* Support/Warranty Section */}
            <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }} className="promo-grid">
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '3.5rem', border: '1px solid var(--border)' }}>
                <ShieldCheck size={32} color="var(--accent-light)" style={{ marginBottom: '2rem' }} />
                <h3 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.6rem', textTransform: 'uppercase', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>ACTIVE PROTECTION</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
                  Savvy Elite members receive lifetime technical support and a 3-year premium warranty on all custom-built architectures.
                </p>
                <Link href="#" className="section-link" style={{ fontSize: '0.7rem', textDecoration: 'none', fontWeight: 800, color: 'var(--white)', letterSpacing: '0.2em' }}>PROTECTION DETAILS →</Link>
              </div>
              <div style={{ background: 'var(--accent)', padding: '3.5rem', border: '1px solid var(--border)' }}>
                <Package size={32} color="var(--white)" style={{ marginBottom: '2rem' }} />
                <h3 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.6rem', textTransform: 'uppercase', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>LOYALTY REWARD</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem' }}>
                  Planning your next masterpiece? Loyalty members get 5% off their third custom system when ordering through their Savvy ID.
                </p>
                <Link href="/collection" style={{ color: 'var(--white)', fontSize: '0.7rem', textDecoration: 'none', fontWeight: 800, letterSpacing: '0.2em' }} className="section-link">SHOP COLLECTION →</Link>
              </div>
            </section>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1024px) {
          .dash-grid { grid-template-columns: 1fr !important; gap: 4rem !important; }
        }
        @media (max-width: 768px) {
          .promo-grid { grid-template-columns: 1fr !important; }
        }
        .section-link:hover { text-decoration: underline !important; }
      `}} />
    </main>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button style={{ 
      display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem 2rem', 
      background: active ? 'rgba(255,255,255,0.03)' : 'none', 
      border: active ? '1px solid var(--border)' : '1px solid transparent', 
      cursor: 'pointer',
      width: '100%', textAlign: 'left', transition: 'all 0.3s ease'
    }}>
      <span style={{ color: active ? 'var(--accent-light)' : 'var(--text-dim)' }}>{icon}</span>
      <span style={{ 
        fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.8rem', 
        textTransform: 'uppercase', color: active ? 'var(--white)' : 'var(--text-muted)',
        letterSpacing: '0.2em'
      }}>
        {label}
      </span>
    </button>
  );
}
