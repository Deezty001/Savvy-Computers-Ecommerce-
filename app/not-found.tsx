'use client';

import Link from "next/link";
import { MoveRight, Search, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 0' }}>
      <div style={{ textAlign: 'center', maxWidth: '600px', padding: '0 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
          <div style={{ 
            width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.02)', 
            border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Terminal size={40} strokeWidth={1.5} color="var(--accent-light)" />
          </div>
        </div>

        <div style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--accent-light)', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>*</span> ERROR RESPONSE — CODE 404
        </div>
        
        <h1 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: 'clamp(3rem, 8vw, 6rem)', textTransform: 'uppercase', lineHeight: 0.85, letterSpacing: '0.02em', marginBottom: '2.5rem' }}>
          SYSTEM <span className="text-outline" style={{ WebkitTextStroke: '2px var(--white)', color: 'transparent' }}>NOT FOUND</span>
        </h1>

        <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '5rem', letterSpacing: '0.02em' }}>
          The requested resource is unavailable or has been moved to a different archive. 
          Redirecting to known systems is recommended.
        </p>

        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
          <button className="btn btn-ghost" style={{ padding: '1.25rem 3rem' }}>
            <Search size={18} /> SEARCH ARCHIVES
          </button>
          <Link href="/" className="btn btn-solid" style={{ padding: '1.25rem 3rem', textDecoration: 'none' }}>
            RETURN HOME <MoveRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
