'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnnouncementBar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = React.useState(true);

  // Restricted pages: Hide on admin, account, and auth paths
  const isRestrictedPage = pathname?.startsWith('/admin') || pathname?.startsWith('/account') || pathname?.startsWith('/auth');

  
  // Home page is a direct match
  const isHome = pathname === '/' || pathname === '/Savvy-Computers-Site-/';

  React.useEffect(() => {
    if (isRestrictedPage) return;

    // Force visible on home page
    if (isHome) {
      setIsVisible(true);
      return;
    }

    // On other pages, check scroll position immediately and on scroll
    const checkScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Run once on mount
    checkScroll();

    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [isHome, pathname, isRestrictedPage]);

  if (isRestrictedPage) return null;

  return (
    <AnimatePresence initial={false}>

      {isVisible && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: '#ad856a', // Signature bronze
            color: 'var(--black)',
            position: 'relative',
            zIndex: 110,
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}
        >
          <div className="wrap" style={{ padding: '0.85rem 0' }}>
            <p 
              className="announcement-text"
              style={{
                fontFamily: 'var(--font-d)',
                fontWeight: 800,
                fontSize: '0.75rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                textAlign: 'center',
                margin: 0
              }}
            >
              SUMMER SYSTEM SALE • SAVVY X BRONZE • SHIPS WORLDWIDE
            </p>
          </div>
          <style jsx>{`
            @media (max-width: 768px) {
              .announcement-text { letter-spacing: 0.15em !important; font-size: 0.6rem !important; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
