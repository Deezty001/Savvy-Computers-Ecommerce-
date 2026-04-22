// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { MoveRight, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';
import { supabase } from '@/lib/supabase/client';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
    }
  }, [searchParams]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const { error } = await login(email, password);
    
    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      // AuthContext handles the redirect via useEffect/subscription if needed, 
      // but usually we redirect here too.
      window.location.href = '/account';
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
      <div style={{ width: '100%', maxWidth: '480px', padding: '0 2rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              fontFamily: 'var(--font-d)', 
              fontWeight: 800, 
              fontSize: '0.6rem', 
              letterSpacing: '0.4em', 
              color: 'var(--accent-light)', 
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem'
            }}
          >
            <span style={{ fontSize: '1rem', opacity: 0.5 }}>*</span> SECURE ACCESS — SAVVY ID
          </motion.div>
          <h1 style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 900, 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            textTransform: 'uppercase', 
            lineHeight: 0.9, 
            letterSpacing: '0.04em' 
          }}>
            WELCOME <br/>
            <span className="text-outline" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)', color: 'transparent' }}>BACK</span>
          </h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ 
            background: 'rgba(255,255,255,0.01)', 
            border: '1px solid var(--border)', 
            padding: '3rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'var(--accent)', opacity: 0.02, zIndex: 0 }} />
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
            
            {error && (
              <div style={{ 
                background: 'rgba(220, 38, 38, 0.1)', 
                border: '1px solid rgba(220, 38, 38, 0.2)', 
                padding: '1rem', 
                color: '#ef4444', 
                fontSize: '0.75rem', 
                fontFamily: 'var(--font-d)', 
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <div style={{ position: 'relative' }}>
              <label style={labelStyle}>EMAIL ADDRESS</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  style={{ ...inputStyle, paddingLeft: '3rem' }} 
                  placeholder="ARCH@SAVVY.COM"
                  required 
                />
                <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <label style={labelStyle}>PASSWORD</label>
                <Link href="#" style={{ fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.6rem', color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none' }}>FORGOT?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  style={{ ...inputStyle, paddingLeft: '3rem', paddingRight: '3rem' }} 
                  placeholder="••••••••"
                  required 
                />
                <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-solid" 
              style={{ width: '100%', padding: '1.25rem', justifyContent: 'center', marginTop: '0.5rem', fontSize: '0.85rem', letterSpacing: '0.2em' }}
              disabled={isLoading}
            >
              {isLoading ? 'AUTHENTICATING...' : 'SIGN IN'} <MoveRight size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.5rem 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 800, letterSpacing: '0.2em' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            <button 
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-ghost" 
              style={{ width: '100%', padding: '1.25rem', justifyContent: 'center', fontSize: '0.85rem', letterSpacing: '0.2em' }}
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px', marginRight: '10px' }} />
              SIGN IN WITH GOOGLE
            </button>
          </form>
        </motion.div>

        <div style={{ marginTop: '2.5rem', textAlign: 'center', fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
          <span style={{ color: 'var(--text-dim)' }}>NEW TO SAVVY?</span>{' '}
          <Link href="/account/register" style={{ color: 'var(--white)', textDecoration: 'underline', transition: 'color 0.3s' }} className="hover-accent">CREATE ACCOUNT</Link>
        </div>
      </div>
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-d)',
  fontWeight: 800,
  fontSize: '0.6rem',
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  color: 'var(--text-dim)',
  marginBottom: '0.5rem'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '1.1rem',
  border: '1px solid var(--border)',
  fontFamily: 'var(--font-d)',
  fontWeight: 800,
  fontSize: '0.85rem',
  background: 'rgba(255,255,255,0.02)',
  color: 'var(--white)',
  outline: 'none',
  transition: 'all 0.3s ease',
  letterSpacing: '0.1em',
  borderRadius: '2px'
};
