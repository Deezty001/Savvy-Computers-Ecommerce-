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

  const [activeSubMenu, setActiveSubMenu] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const subMenuData: Record<string, { label: string, items: { label: string, href: string }[] }> = {
    gaming: {
      label: 'GAMING SYSTEMS',
      items: [
        { label: 'ALL GAMING PCs', href: '/gaming' },
        { label: 'RTX 4090 ULTIMATE', href: '/gaming?gpu=4090' },
        { label: 'SFF COMPACT BUILDS', href: '/gaming?type=sff' },
        { label: 'PRO STREAMING RIGS', href: '/gaming?type=streaming' },
      ]
    },
    workstation: {
      label: 'WORKSTATIONS',
      items: [
        { label: 'ALL WORKSTATIONS', href: '/workstations' },
        { label: '3D & RENDERING', href: '/workstations?type=rendering' },
        { label: 'AI & DEEP LEARNING', href: '/workstations?type=ai' },
        { label: 'VIDEO PRODUCTION', href: '/workstations?type=video' },
      ]
    },
    sim: {
      label: 'SIMULATORS',
      items: [
        { label: 'ALL SIM RIGS', href: '/sim-rigs' },
        { label: 'RACING SIMULATORS', href: '/sim-rigs?type=racing' },
        { label: 'FLIGHT SIMULATORS', href: '/sim-rigs?type=flight' },
      ]
    }
  };

  return (
    <>
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
                  onClick={() => {
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                    setActiveSubMenu(null);
                  }}
                  style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', zIndex: 110, padding: '0.5rem' }}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </nav>
          </div>
        <MegaMenu activeType={activeMenu} onClose={() => setActiveMenu(null)} />
      </header>

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
              backgroundColor: '#0a0a0a',
              zIndex: 9999,
              padding: '7rem 2rem 4rem', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '4rem',
              overflowY: 'auto',
              height: '100dvh',
              width: '100vw'
            }}
          >
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10001 }}>
               <button 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', padding: '1rem' }}
              >
                <X size={32} />
              </button>
            </div>

            <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <AnimatePresence mode="wait">
                {!activeSubMenu ? (
                  <motion.div 
                    key="main"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                  >
                    <div style={{ color: 'var(--accent-light)', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.4em', marginBottom: '-1rem' }}>MENU</div>
                    {navLinks.map((link) => (
                      <button 
                        key={link.type} 
                        onClick={() => setActiveSubMenu(link.type)}
                        style={{ 
                          background: 'none',
                          border: 'none',
                          textAlign: 'left',
                          padding: 0,
                          fontFamily: 'var(--font-d)', 
                          fontSize: 'clamp(3rem, 12vw, 4.5rem)', 
                          fontWeight: 900, 
                          color: 'var(--white)', 
                          textDecoration: 'none', 
                          lineHeight: 0.9,
                          textTransform: 'uppercase',
                          cursor: 'pointer'
                        }}
                      >
                        {link.label}
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="sub"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
                  >
                    <button 
                      onClick={() => setActiveSubMenu(null)}
                      style={{ 
                        background: 'none', border: 'none', color: 'var(--accent-light)', 
                        fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.8rem', 
                        letterSpacing: '0.2em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                        padding: 0
                      }}
                    >
                      ← BACK TO MENU
                    </button>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div style={{ color: 'var(--white)', fontFamily: 'var(--font-d)', fontSize: '2.5rem', fontWeight: 900, letterSpacing: '0.05em' }}>
                        {subMenuData[activeSubMenu].label}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
                        {subMenuData[activeSubMenu].items.map((item, i) => (
                          <Link 
                            key={i}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{ 
                              fontFamily: 'var(--font-d)', 
                              fontSize: '1.25rem', 
                              fontWeight: 700, 
                              color: 'rgba(255,255,255,0.6)', 
                              textDecoration: 'none',
                              letterSpacing: '0.1em'
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
