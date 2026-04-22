'use client';

import * as React from 'react';
import Link from "next/link";
import { ShoppingCart, Menu, X, MoveRight } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import MegaMenu from './MegaMenu';
import { useAuth } from '@/lib/auth/AuthContext';

export default function Header() {
  const { setIsOpen: setIsCartOpen, itemCount } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: 'GAMING', type: 'gaming', href: '/gaming' },
    { label: 'WORKSTATION', type: 'workstation', href: '/workstations' },
    { label: 'SIMULATORS', type: 'sim', href: '/sim-rigs' },
  ];

  return (
    <header onMouseLeave={() => setActiveMenu(null)} style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 110, 
      background: 'rgba(18, 18, 18, 0.95)', 
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      height: 'var(--header-h)',
      display: 'flex',
      alignItems: 'center'
    }}>
        <div className="wrap" style={{ width: '100%', position: 'relative', zIndex: 101 }}>
          <nav style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            width: '100%'
          }}>
            {/* Logo */}
            <Link href="/" style={{ 
              fontFamily: 'var(--font-d)', 
              fontWeight: 900, 
              fontSize: '1.25rem', 
              letterSpacing: '0.05em', 
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              color: 'var(--white)',
              textDecoration: 'none',
              zIndex: 110
            }}>
              Savvy <span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', color: 'transparent' }}>Computers</span>
            </Link>

            {/* Nav Links */}
            <div className="hide-mobile" style={{ display: 'flex', gap: '3.5rem', alignItems: 'center' }}>
              {navLinks.map((link) => (
                <Link 
                  href={link.href}
                  key={link.type}
                  onMouseEnter={() => setActiveMenu(link.type)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.85rem',
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: activeMenu === link.type ? 'var(--white)' : 'var(--text-muted)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    padding: '0.5rem 0',
                    textDecoration: 'none'
                  }}
                >
                  {link.label}
                  {activeMenu === link.type && (
                    <motion.div 
                      layoutId="header-underline"
                      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'var(--accent-light)' }} 
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Action Group */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <Link 
                href={!isAuthenticated ? "/account/login" : isAdmin ? "/admin" : "/account"} 
                style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.15em', color: 'var(--text-muted)', textDecoration: 'none' }} 
                className="hover-white hide-tablet"
              >
                {!isAuthenticated ? "LOGIN" : isAdmin ? "COMMAND CENTRE" : "ACCOUNT"}
              </Link>

              <div 
                onClick={() => setIsCartOpen(true)}
                style={{ position: 'relative', cursor: 'pointer', color: '#fff' }}
                className="hover-accent"
              >
                <ShoppingCart size={20} strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span style={{ 
                    position: 'absolute', top: '-8px', right: '-12px', 
                    background: 'var(--accent-light)', color: 'var(--bg)', 
                    fontSize: '0.65rem', fontWeight: 900, borderRadius: '50%', 
                    width: '18px', height: '18px', display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-d)' 
                  }}>
                    {itemCount}
                  </span>
                )}
              </div>

              {/* Mobile Toggle */}
              <button 
                className="show-tablet"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', zIndex: 110, padding: '0.5rem' }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>
      <MegaMenu activeType={activeMenu} onClose={() => setActiveMenu(null)} />

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', 
              top: 0, 
              right: 0, 
              bottom: 0, 
              left: 0,
              background: '#0a0a0a', // Use absolute black for total coverage
              zIndex: 1000, // Very high z-index
              padding: '8rem 2rem 4rem', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '4rem',
              overflowY: 'auto'
            }}
          >
            {/* Close button inside drawer for redundant safety */}
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
               <button 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', padding: '1rem' }}
              >
                <X size={32} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ color: 'var(--accent-light)', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.4em', marginBottom: '-1rem' }}>MENU</div>
              {navLinks.map((link) => (
                <Link 
                  key={link.type} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ 
                    fontFamily: 'var(--font-d)', 
                    fontSize: '3.5rem', 
                    fontWeight: 900, 
                    color: 'var(--white)', 
                    textDecoration: 'none', 
                    lineHeight: 0.9,
                    textTransform: 'uppercase'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '3rem' }}>
               <Link 
                href={!isAuthenticated ? "/account/login" : isAdmin ? "/admin" : "/account"} 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ 
                  fontFamily: 'var(--font-d)', 
                  fontWeight: 900, 
                  fontSize: '1.5rem', 
                  letterSpacing: '0.1em', 
                  color: 'var(--white)', 
                  textDecoration: 'none', 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }} 
              >
                {!isAuthenticated ? "LOGIN / REGISTER" : "MY ACCOUNT"} <MoveRight size={20} color="var(--accent-light)" />
              </Link>
              
              <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem' }}>
                <div style={{ width: '2px', height: '12px', background: 'var(--accent-light)' }} />
                <div style={{ color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }}>SYDNEY, AUSTRALIA</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
