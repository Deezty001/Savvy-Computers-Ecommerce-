'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, Package, ShoppingCart, 
  Settings, Users, BarChart3, 
  LogOut, Menu, X, Bell,
  Search, Plus, Filter,
  TrendingUp, DollarSign, Clock, CheckCircle
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';

export default function AdminLayout({ children, title }: { children: React.ReactNode, title?: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout, profile } = useAuth();
  const pathname = usePathname();

  return (
    <div style={{ background: '#0a0a0a', color: 'var(--white)', minHeight: '100vh', display: 'flex' }}>
      
      {/* Sidebar */}
      <aside style={{ 
        width: sidebarOpen ? '220px' : '64px', 
        borderRight: '1px solid rgba(255,255,255,0.05)',
        background: '#080808',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        zIndex: 100
      }}>
        {/* Logo Area */}
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ width: '24px', height: '24px', background: 'var(--accent-light)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontWeight: 900, color: 'var(--black)', fontSize: '0.6rem' }}>S</span>
          </div>
          {sidebarOpen && (
            <span style={{ fontFamily: 'var(--font-d)', fontWeight: 900, letterSpacing: '0.1em', fontSize: '0.85rem' }}>SAVVY ADMIN</span>
          )}
        </div>

        {/* Nav Links */}
        <nav style={{ padding: '1rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
          <AdminNavItem icon={<LayoutDashboard size={18} />} label="DASHBOARD" href="/admin" active={pathname === '/admin'} sidebarOpen={sidebarOpen} />
          <AdminNavItem icon={<ShoppingCart size={18} />} label="ORDERS" href="/admin/orders" active={pathname === '/admin/orders'} sidebarOpen={sidebarOpen} />
          <AdminNavItem icon={<Package size={18} />} label="INVENTORY" href="/admin/inventory" active={pathname === '/admin/inventory'} sidebarOpen={sidebarOpen} />
          <AdminNavItem icon={<BarChart3 size={18} />} label="ANALYTICS" href="/admin/analytics" active={pathname === '/admin/analytics'} sidebarOpen={sidebarOpen} />
          <AdminNavItem icon={<Users size={18} />} label="CUSTOMERS" href="/admin/customers" active={pathname === '/admin/customers'} sidebarOpen={sidebarOpen} />
          <div style={{ margin: '1rem 0 0.5rem', padding: '0 1rem', fontSize: '0.55rem', fontWeight: 800, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em' }}>
            {sidebarOpen ? 'SYSTEM' : '•••'}
          </div>
          <AdminNavItem icon={<Settings size={18} />} label="SETTINGS" href="/admin/settings" active={pathname === '/admin/settings'} sidebarOpen={sidebarOpen} />
        </nav>

        <div style={{ padding: '1.25rem 0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button 
            onClick={logout}
            style={{ 
              width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', 
              padding: '0.5rem 1rem', background: 'none', border: 'none', 
              color: 'var(--text-dim)', cursor: 'pointer', fontFamily: 'var(--font-d)',
              fontWeight: 800, fontSize: '0.65rem', letterSpacing: '0.1em'
            }}
            className="hover-white"
          >
            <LogOut size={16} />
            {sidebarOpen && 'SIGN OUT'}
          </button>
        </div>

        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ 
            position: 'absolute', right: '-10px', top: '70px', 
            width: '20px', height: '20px', background: 'var(--accent-light)', 
            border: 'none', borderRadius: '50%', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 101
          }}
        >
          {sidebarOpen ? <X size={10} color="var(--black)" /> : <Menu size={10} color="var(--black)" />}
        </button>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <header style={{ 
          height: '60px', borderBottom: '1px solid rgba(255,255,255,0.05)', 
          padding: '0 2rem', display: 'flex', alignItems: 'center', 
          justifyContent: 'space-between', background: '#080808'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
            {title && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h1 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, whiteSpace: 'nowrap' }}>{title}</h1>
                <div style={{ height: '16px', width: '1px', background: 'rgba(255,255,255,0.1)' }} />
              </div>
            )}
            <div style={{ position: 'relative', width: '320px' }}>
              <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} />
              <input 
                type="text" 
                placeholder="Search registry..." 
                style={{ 
                  width: '100%', background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(255,255,255,0.05)', padding: '0.5rem 1rem 0.5rem 2.5rem',
                  fontSize: '0.75rem', color: 'var(--white)', outline: 'none', borderRadius: '4px'
                }} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', position: 'relative' }}>
              <Bell size={18} />
              <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '6px', height: '6px', background: 'var(--accent-light)', borderRadius: '50%', border: '2px solid #080808' }} />
            </button>
            <div style={{ height: '20px', width: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--white)' }}>{profile?.first_name || 'Admin'}</div>
                <div style={{ fontSize: '0.55rem', fontWeight: 700, color: 'var(--accent-light)', letterSpacing: '0.1em' }}>MASTER ARCHITECT</div>
              </div>
              <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.1)' }} />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main style={{ flex: 1, padding: '1.25rem 2rem', overflowY: 'auto' }}>
          {children}
        </main>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hover-white:hover { color: var(--white) !important; }
        .nav-item:hover { background: rgba(255,255,255,0.03); color: var(--white); }
        .nav-item.active { background: rgba(173, 133, 106, 0.08); color: var(--accent-light); border-right: 2px solid var(--accent-light); }
      `}} />
    </div>
  );
}

function AdminNavItem({ icon, label, href, active = false, sidebarOpen }: { icon: React.ReactNode, label: string, href: string, active?: boolean, sidebarOpen: boolean }) {
  return (
    <Link 
      href={href}
      className={`nav-item ${active ? 'active' : ''}`}
      style={{ 
        display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', 
        borderRadius: '4px', textDecoration: 'none', color: active ? 'var(--accent-light)' : 'var(--text-dim)',
        transition: 'all 0.3s ease'
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</span>
      {sidebarOpen && (
        <span style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.65rem', letterSpacing: '0.1em' }}>{label}</span>
      )}
    </Link>

  );
}
