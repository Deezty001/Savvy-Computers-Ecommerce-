'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MoveRight, User, Mail, Lock, ShieldCheck } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/lib/auth/AuthContext';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 0' }}>
        <div style={{ width: '100%', maxWidth: '440px', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--zinc-400)', marginBottom: '1rem' }}>
              * New Registration — Sydney, AU
            </div>
            <h1 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '3.5rem', textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-0.01em' }}>
              Savvy <span style={{ WebkitTextStroke: '1px var(--black)', color: 'transparent' }}>Elite</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} style={inputStyle} required />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  style={{ ...inputStyle, paddingLeft: '3rem' }} 
                  required 
                />
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--zinc-300)' }} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleInputChange} 
                  style={{ ...inputStyle, paddingLeft: '3rem' }} 
                  required 
                />
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--zinc-300)' }} />
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: 'var(--zinc-100)', border: 'var(--border-light)', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <ShieldCheck size={20} color="var(--zinc-400)" />
              <p style={{ fontSize: '0.7rem', lineHeight: 1.5, color: 'var(--zinc-600)' }}>
                By creating an account, you agree to our Terms of Service and Privacy Policy. All systems are protected under our Savvy Guarantee.
              </p>
            </div>

            <button 
              type="submit" 
              className="btn btn-solid" 
              style={{ width: '100%', padding: '1.25rem', justifyContent: 'center', marginTop: '1rem' }}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'} <MoveRight size={18} />
            </button>
          </form>

          <div style={{ marginTop: '3rem', textAlign: 'center', fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>
            <span style={{ color: 'var(--zinc-400)' }}>Already a Member?</span>{' '}
            <Link href="/account/login" style={{ color: 'var(--black)', textDecoration: 'underline' }}>Sign In</Link>
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
  fontWeight: 700,
  fontSize: '0.62rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--zinc-400)',
  marginBottom: '0.5rem'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '1rem',
  border: 'var(--border-light)',
  fontFamily: 'var(--font-b)',
  fontSize: '0.9rem',
  background: 'var(--white)',
  outline: 'none',
  transition: 'border-color 0.15s'
};
