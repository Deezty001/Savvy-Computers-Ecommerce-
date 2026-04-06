'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  stagger?: boolean;
}

export default function ScrollReveal({ children, stagger = false }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.07,
        rootMargin: '0px 0px -32px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`${stagger ? 'stagger' : 'reveal'} ${isVisible ? (stagger ? 'stagger-in' : 'reveal-in') : ''}`}
    >
      {children}
    </div>
  );
}
