'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, ArrowRight, ShieldAlert, CheckCircle2, Loader2, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/lib/auth/AuthContext';

export default function AdminAuthPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('Initializing Security Handshake...');
  const [mode, setMode] = useState<'enroll' | 'verify'>('verify');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [factorId, setFactorId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const timeout = setTimeout(() => {
      if (isMounted && loading) {
        setLoading(false);
        setStatusMessage('');
      }
    }, 8000); // 8 second hard timeout

    async function checkMFA() {
      if (!user || isProcessing) return;
      setIsProcessing(true);
      
      try {
        setStatusMessage('Syncing Security Factors...');
        const { data, error } = await supabase.auth.mfa.listFactors();
        
        if (error) {
          setError(error.message);
          return;
        }

        const verifiedFactor = data.all.find(f => f.status === 'verified');
        const unverifiedFactor = data.all.find(f => f.status === 'unverified');
        
        if (verifiedFactor) {
          setStatusMessage('Authorizing Verified Session...');
          setFactorId(verifiedFactor.id);
          setMode('verify');
        } else if (unverifiedFactor) {
          setStatusMessage('Updating Security Credentials...');
          await supabase.auth.mfa.unenroll({ factorId: unverifiedFactor.id });
          await new Promise(resolve => setTimeout(resolve, 800));
          await enrollMFA();
        } else {
          setStatusMessage('Generating New Security Key...');
          await enrollMFA();
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        if (isMounted) {
          setLoading(false);
          setIsProcessing(false);
          setStatusMessage('');
          clearTimeout(timeout);
        }
      }
    }

    checkMFA();
    return () => { isMounted = false; clearTimeout(timeout); };
  }, [user]);






  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const challenge = await supabase.auth.mfa.challenge({ factorId });
    if (challenge.error) {
      setError(challenge.error.message);
      setLoading(false);
      return;
    }

    const verify = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.data.id,
      code
    });

    if (verify.error) {
      setError('Invalid verification code. Please try again.');
      setLoading(false);
      return;
    }

    // CRITICAL: Refresh the session on the client to ensure cookies are updated
    await supabase.auth.refreshSession();
    
    // Give it a tiny moment to sync
    setStatusMessage('Synchronizing session...');
    await new Promise(resolve => setTimeout(resolve, 800));

    // Hard redirect to ensure middleware sees the new cookies
    window.location.href = '/admin';
  };

  const handleEnrollVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const challenge = await supabase.auth.mfa.challenge({ factorId });
    if (challenge.error) {
      setError(challenge.error.message);
      setLoading(false);
      return;
    }

    const verify = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.data.id,
      code
    });

    if (verify.error) {
      setError('Invalid code. Check your authenticator app.');
      setLoading(false);
      return;
    }

    // CRITICAL: Refresh the session on the client to ensure cookies are updated
    await supabase.auth.refreshSession();
    
    // Give it a tiny moment to sync
    setStatusMessage('Synchronizing security protocol...');
    await new Promise(resolve => setTimeout(resolve, 800));

    // Hard redirect to ensure middleware sees the new cookies
    window.location.href = '/admin';
  };

  const handleReset = async () => {
    if (!confirm('This will clear ALL current security factors and generate a brand new QR code. This cannot be undone. Proceed?')) return;
    setLoading(true);
    setError('');
    setStatusMessage('Deauthorizing all current factors...');
    
    try {
      // 1. Fetch ALL factors
      const { data, error: listError } = await supabase.auth.mfa.listFactors();
      if (listError) throw listError;

      // 2. Unenroll EVERYTHING
      for (const factor of data.all) {
        const { error: unenrollError } = await supabase.auth.mfa.unenroll({ factorId: factor.id });
        if (unenrollError) console.warn('Failed to unenroll factor:', factor.id, unenrollError);
      }

      // 3. Clear local state
      setFactorId('');
      setQrCode('');
      setMode('enroll');
      
      // 4. Wait a beat for the server to sync
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 5. Trigger FRESH enrollment
      setStatusMessage('Generating fresh security credentials...');
      await enrollMFA();
      
    } catch (err: any) {
      setError('Nuclear reset failed: ' + err.message);
    } finally {
      setLoading(false);
      setStatusMessage('');
    }
  };

  const enrollMFA = async () => {

    // Generate a unique friendly name to avoid "already exists" errors
    const uniqueId = Math.random().toString(36).substring(2, 7).toUpperCase();
    const friendlyName = `Savvy Admin [${uniqueId}]`;

    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      issuer: 'Savvy Computers',
      friendlyName: friendlyName
    });

    if (error) {
      setError(error.message);
      return;
    }

    setFactorId(data.id);
    setQrCode(data.totp.qr_code);
    setMode('enroll');
  };

  if (loading) {


    return (
      <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
        <Loader2 className="animate-spin" size={32} color="var(--accent-light)" />
        {statusMessage && (
          <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 800 }}>
            {statusMessage}
          </p>
        )}
      </div>

    );
  }

  return (
    <main style={{ 
      background: '#050505', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{ position: 'fixed', inset: 0, opacity: 0.05, pointerEvents: 'none' }}>
        <div style={{ 
          position: 'absolute', inset: 0, 
          backgroundImage: 'radial-gradient(circle at 50% 50%, #ad856a 0%, transparent 50%)',
          filter: 'blur(100px)'
        }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          width: '100%', maxWidth: '440px', 
          background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)',
          padding: '3.5rem', position: 'relative', zIndex: 1,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ 
            width: '64px', height: '64px', background: 'rgba(173, 133, 106, 0.1)', 
            border: '1px solid rgba(173, 133, 106, 0.2)', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 2rem'
          }}>
            {mode === 'enroll' ? <Key size={28} color="#ad856a" /> : <ShieldCheck size={28} color="#ad856a" />}
          </div>
          <h1 style={{ 
            fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.75rem', 
            textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--white)' 
          }}>
            {mode === 'enroll' ? 'SECURE ACCESS' : 'VERIFY IDENTITY'}
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.05em', marginTop: '0.75rem', textTransform: 'uppercase', fontWeight: 700 }}>
            {mode === 'enroll' ? 'ESTABLISH TWO-FACTOR ARCHITECTURE' : 'SAVVY COMMAND CENTRE 2FA'}
          </p>
        </div>

        {error && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)',
            padding: '1rem', borderRadius: '4px', marginBottom: '2rem', display: 'flex', gap: '0.75rem', alignItems: 'center'
          }}>
            <ShieldAlert size={16} color="#ef4444" />
            <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 600 }}>{error}</span>
          </div>
        )}

        <form onSubmit={mode === 'enroll' ? handleEnrollVerify : handleVerify}>
          {mode === 'enroll' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Scan this code with your authenticator app (Google Authenticator, Authy) to link your Savvy ID.
                </p>
                <div style={{ 
                  background: 'white', padding: '1rem', borderRadius: '8px', 
                  display: 'inline-block', border: '4px solid #ad856a' 
                }}>
                  <img src={qrCode} alt="Scan QR Code" style={{ width: '180px', height: '180px' }} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>VERIFICATION CODE</label>
                <input 
                  type="text" 
                  maxLength={6}
                  value={code} 
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  style={inputStyle} 
                  placeholder="000 000"
                  required
                />
              </div>
              <button type="submit" className="btn btn-solid" style={{ width: '100%', justifyContent: 'center', padding: '1.25rem' }}>
                ESTABLISH SECURITY <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textAlign: 'center', lineHeight: 1.6 }}>
                Enter the 6-digit code from your authenticator app to authorize this session.
              </p>
              <div>
                <label style={labelStyle}>ADMIN CODE</label>
                <input 
                  type="text" 
                  maxLength={6}
                  value={code} 
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  style={inputStyle} 
                  placeholder="000 000"
                  autoFocus
                  required
                />
              </div>
              <button type="submit" className="btn btn-solid" style={{ width: '100%', justifyContent: 'center', padding: '1.25rem' }}>
                AUTHORIZE ACCESS <ArrowRight size={18} />
              </button>
            </div>
          )}
        </form>

        <div style={{ marginTop: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <button 
            onClick={handleReset}
            style={{ 
              background: 'none', border: 'none', color: 'var(--text-dim)', 
              fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.15em', 
              textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'underline'
            }}
            className="hover-accent"
          >
            Reset Security Factor
          </button>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 800 }}>
            ENCRYPTED COMMAND CHANNEL
          </p>
        </div>

      </motion.div>
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-d)',
  fontWeight: 800,
  fontSize: '0.65rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--text-dim)',
  marginBottom: '0.75rem'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '1.25rem',
  border: '1px solid rgba(255,255,255,0.05)',
  fontFamily: 'var(--font-d)',
  fontSize: '1.5rem',
  fontWeight: 900,
  background: 'rgba(255,255,255,0.02)',
  color: 'var(--white)',
  outline: 'none',
  transition: 'all 0.3s ease',
  textAlign: 'center',
  letterSpacing: '0.5em'
};
