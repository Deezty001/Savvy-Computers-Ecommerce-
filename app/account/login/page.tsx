// @ts-nocheck
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MoveRight, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/lib/auth/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10rem 0' }}>
        <div style={{ width: '100%', maxWidth: '480px', padding: '0 2rem' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{ 
              fontFamily: 'var(--font-d)', 
              fontWeight: 800, 
              fontSize: '0.75rem', 
              letterSpacing: '0.3em', 
              textTransform: 'uppercase', 
              color: 'var(--accent-light)', 
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem'
            }}>
              <span style={{ fontSize: '1.5rem', opacity: 0.3 }}>*</span> SECURE ACCESS — SAVVY ID
            </div>
            <h1 style={{ 
              fontFamily: 'var(--font-d)', 
              fontWeight: 900, 
              fontSize: 'clamp(3rem, 6vw, 4.5rem)', 
              textTransform: 'uppercase', 
              lineHeight: 0.9, 
              letterSpacing: '0.04em' 
            }}>
              WELCOME <br/>
              <span className="text-outline" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)', color: 'transparent' }}>BACK</span>
            </h1>
          </div>

          <div style={{ 
            background: 'var(--bg-offset)', 
            border: '1px solid var(--border)', 
            padding: '4rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--accent)', opacity: 0.05, zIndex: 0 }} />
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', zIndex: 1 }}>
              <div style={{ position: 'relative' }}>
                <label style={labelStyle}>EMAIL ADDRESS</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    style={{ ...inputStyle, paddingLeft: '3.5rem' }} 
                    placeholder="NAME@EXAMPLE.COM"
                    required 
                  />
                  <Mail size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <label style={labelStyle}>PASSWORD</label>
                  <Link href="#" style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>FORGOT?</Link>
                </div>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    style={{ ...inputStyle, paddingLeft: '3.5rem', paddingRight: '3.5rem' }} 
                    placeholder="••••••••"
                    required 
                  />
                  <Lock size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-solid" 
                style={{ width: '100%', padding: '1.25rem', justifyContent: 'center', marginTop: '1.5rem', fontSize: '0.9rem', letterSpacing: '0.2em' }}
                disabled={isLoading}
              >
                {isLoading ? 'AUTHENTICATING...' : 'SIGN IN'} <MoveRight size={20} />
              </button>
            </form>
          </div>

          <div style={{ marginTop: '4rem', textAlign: 'center', fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            <span style={{ color: 'var(--text-muted)' }}>NEW TO SAVVY?</span>{' '}
            <Link href="/account/register" style={{ color: 'var(--white)', textDecoration: 'underline', transition: 'color 0.3s' }} className="hover-accent">CREATE ACCOUNT</Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-d)',
  fontWeight: 800,
  fontSize: '0.7rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--text-dim)',
  marginBottom: '0.75rem'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '1.25rem',
  border: '1px solid var(--border)',
  fontFamily: 'var(--font-d)',
  fontWeight: 700,
  fontSize: '0.9rem',
  background: 'rgba(255,255,255,0.03)',
  color: 'var(--white)',
  outline: 'none',
  transition: 'all 0.3s ease',
  letterSpacing: '0.05em'
};
