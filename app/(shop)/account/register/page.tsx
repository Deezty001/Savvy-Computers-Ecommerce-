// @ts-nocheck
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MoveRight, Lock, Mail, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';
import { supabase } from '@/lib/supabase/client';

export default function RegisterPage() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("PASSWORDS DO NOT MATCH");
      setIsLoading(false);
      return;
    }

    const { error } = await register(formData);
    
    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      setIsSuccess(true);
      setIsLoading(false);
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

  if (isSuccess) {
    return (
      <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
        <div style={{ width: '100%', maxWidth: '480px', padding: '0 2rem', textAlign: 'center' }}>
          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', padding: '4rem 3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '2.5rem', textTransform: 'uppercase', marginBottom: '2rem' }}>
              CHECK YOUR <span className="text-outline" style={{ WebkitTextStroke: '1px var(--white)', color: 'transparent' }}>EMAIL</span>
            </h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '3rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              We've sent a verification link to <strong>{formData.email}</strong>. Please confirm your email to activate your Savvy Elite account.
            </p>
            <Link href="/account/login" className="btn btn-solid" style={{ justifyContent: 'center' }}>
              RETURN TO LOGIN
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 0' }}>
      
      <div style={{ width: '100%', maxWidth: '520px', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              fontFamily: 'var(--font-d)', 
              fontWeight: 800, 
              fontSize: '0.7rem', 
              letterSpacing: '0.4em', 
              color: 'var(--accent-light)', 
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem'
            }}
          >
            <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>*</span> JOIN THE ELITE — SYDNEY HQ
          </motion.div>
          <h1 style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 900, 
            fontSize: 'clamp(3rem, 6vw, 4rem)', 
            textTransform: 'uppercase', 
            lineHeight: 1, 
            letterSpacing: '0.04em' 
          }}>
            CREATE <span className="text-outline" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)', color: 'transparent' }}>ACCOUNT</span>
          </h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ 
            background: 'rgba(255,255,255,0.01)', 
            border: '1px solid var(--border)', 
            padding: '3rem',
            position: 'relative'
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>FIRST NAME</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>LAST NAME</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} style={inputStyle} required />
              </div>
            </div>

            <div>
              <label style={labelStyle}>EMAIL ADDRESS</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  style={{ ...inputStyle, paddingLeft: '3rem' }} 
                  placeholder="ARCH@SAVVY.COM"
                  required 
                />
                <Mail size={16} style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>PASSWORD</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleInputChange} 
                    style={{ ...inputStyle, paddingLeft: '2.5rem' }} 
                    required 
                  />
                  <Lock size={14} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>CONFIRM</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleInputChange} 
                    style={{ ...inputStyle, paddingLeft: '2.5rem' }} 
                    required 
                  />
                  <Lock size={14} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                </div>
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: 'rgba(173, 133, 106, 0.05)', border: '1px solid rgba(173, 133, 106, 0.1)', display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <ShieldCheck size={20} color="#ad856a" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '0.65rem', lineHeight: 1.6, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                BY CREATING AN ACCOUNT, YOU AGREE TO OUR TERMS OF SERVICE AND PRIVACY POLICY. ALL SYSTEMS ARE PROTECTED UNDER THE SAVVY ELITE GUARANTEE.
              </p>
            </div>

            <button 
              type="submit" 
              className="btn btn-solid" 
              style={{ width: '100%', padding: '1.5rem', justifyContent: 'center', marginTop: '1rem', fontSize: '0.9rem', letterSpacing: '0.25em' }}
              disabled={isLoading}
            >
              {isLoading ? 'CREATING...' : 'CREATE ACCOUNT'} <MoveRight size={20} />
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
              JOIN WITH GOOGLE
            </button>
          </form>
        </motion.div>

        <div style={{ marginTop: '4rem', textAlign: 'center', fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
          <span style={{ color: 'var(--text-dim)' }}>ALREADY A MEMBER?</span>{' '}
          <Link href="/account/login" style={{ color: 'var(--white)', textDecoration: 'underline' }}>SIGN IN</Link>
        </div>
      </div>
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-d)',
  fontWeight: 800,
  fontSize: '0.65rem',
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  color: 'var(--text-dim)',
  marginBottom: '0.75rem'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '1.25rem',
  border: '1px solid var(--border)',
  fontFamily: 'var(--font-d)',
  fontWeight: 800,
  fontSize: '0.9rem',
  background: 'rgba(255,255,255,0.02)',
  color: 'var(--white)',
  outline: 'none',
  transition: 'all 0.3s ease',
  borderRadius: '2px',
  letterSpacing: '0.05em'
};
