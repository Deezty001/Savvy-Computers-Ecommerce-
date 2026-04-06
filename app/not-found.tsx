'use client';

import Link from "next/link";
import { MoveRight, Search, Terminal } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 0' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
            <div style={{ padding: '2.5rem', background: 'var(--zinc-100)', border: 'var(--border-light)', borderRadius: '50%' }}>
              <Terminal size={48} strokeWidth={1.5} color="var(--zinc-300)" />
            </div>
          </div>

          <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--zinc-400)', marginBottom: '1.5rem' }}>
            * Error Response — Code 404
          </div>
          
          <h1 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: 'clamp(3rem, 8vw, 6rem)', textTransform: 'uppercase', lineHeight: 0.85, letterSpacing: '-0.02em', marginBottom: '2.5rem' }}>
            System <span style={{ WebkitTextStroke: '2px var(--black)', color: 'transparent' }}>Not Found</span>
          </h1>

          <p style={{ color: 'var(--zinc-600)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '4rem' }}>
            The requested resource is unavailable or has been moved to a different archive. 
            Redirecting to known systems is recommended.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button className="btn btn-ghost" style={{ padding: '1.25rem 2.5rem' }}>
              <Search size={18} /> Search Archives
            </button>
            <Link href="/" className="btn btn-solid" style={{ padding: '1.25rem 2.5rem' }}>
              Return Home <MoveRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
