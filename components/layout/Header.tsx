'use client';

import * as React from 'react';
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";

interface NavItem {
  label: string;
  href: string;
}

export default function Header() {
  const { setIsOpen: setIsCartOpen, itemCount } = useCart();

  const menuItems: NavItem[] = [
    { label: 'ABOUT', href: '/about' },
    { label: 'PRODUCTS', href: '/shop' },
    { label: 'SYSTEMS', href: '/shop' },
    { label: 'BLOG', href: '/shop' },
    { label: 'CONTACT', href: '/support' }
  ];

  return (
    <header style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 100, 
      background: 'rgba(18, 18, 18, 0.9)', 
      backdropFilter: 'blur(15px)',
      borderBottom: '1px solid var(--border)',
      height: 'var(--header-h)',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="wrap" style={{ width: '100%' }}>
        <nav style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          width: '100%',
          gap: '4rem' 
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
            textDecoration: 'none'
          }}>
            Savvy <span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', color: 'transparent' }}>Computers</span>
          </Link>

          {/* Nav Links Group */}
          <div className="hide-mobile" style={{ display: 'flex', gap: '3.5rem', alignItems: 'center' }}>
            {menuItems.map((item, idx) => (
              <Link 
                key={idx}
                href={item.href}
                style={{
                  fontFamily: 'var(--font-d)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none'
                }}
                className="hover-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Unified Action Group */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>
            <Link 
              href="/account/login" 
              style={{ 
                fontFamily: 'var(--font-d)', 
                fontWeight: 800, 
                fontSize: '0.85rem', 
                letterSpacing: '0.15em', 
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
                textDecoration: 'none'
              }} 
              className="hover-white"
            >
              LOGIN
            </Link>

            {/* Cart Icon */}
            <div 
              onClick={() => setIsCartOpen(true)}
              style={{ 
                position: 'relative', 
                cursor: 'pointer', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center'
              }}
              className="hover-accent transition-all"
            >
              <ShoppingCart size={24} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span style={{ 
                  position: 'absolute', 
                  top: '-8px', 
                  right: '-12px', 
                  background: 'var(--accent-light)', 
                  color: 'var(--bg)', 
                  fontSize: '0.65rem', 
                  fontWeight: 900, 
                  borderRadius: '50%', 
                  width: '18px', 
                  height: '18px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontFamily: 'var(--font-d)'
                }}>
                  {itemCount}
                </span>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
