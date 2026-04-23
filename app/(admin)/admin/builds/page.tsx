'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Search, Filter, Plus, MoreVertical, 
  Clock, Package, Cpu, Monitor, 
  CheckCircle2, AlertCircle, X,
  Zap, Database, HardDrive, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK BUILD DATA ---
const INITIAL_BUILDS: any[] = [];

const STAGES = ['Allocating Parts', 'In Build', 'In Testing', 'Completed'];

export default function BuildsPage() {
  const [builds, setBuilds] = useState(INITIAL_BUILDS);
  const [selectedBuild, setSelectedBuild] = useState<any>(null);

  const getBuildsByStage = (stage: string) => builds.filter(b => b.status === stage);

  return (
    <AdminLayout title="BUILD COMMAND CENTRE">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%' }}>
        
        {/* Lab Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={statBoxStyle}>
              <span style={{ color: 'var(--text-dim)' }}>ACTIVE BUILDS</span>
              <span style={{ color: 'var(--white)' }}>12</span>
            </div>
            <div style={statBoxStyle}>
              <span style={{ color: 'var(--text-dim)' }}>AVG LEAD TIME</span>
              <span style={{ color: 'var(--white)' }}>3.2 DAYS</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={controlButtonStyle}><Filter size={14} /> ALL STATIONS</div>
            <div style={controlButtonStyle}><Plus size={14} /> ADD BUILD SLIP</div>
          </div>
        </div>

        {/* Build Kanban */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          overflowX: 'auto', 
          paddingBottom: '1.5rem',
          flex: 1
        }}>
          {STAGES.map(stage => (
            <div key={stage} style={{ minWidth: '280px', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem' }}>
                <h3 style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-dim)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  {stage} <span style={{ marginLeft: '0.5rem', opacity: 0.3 }}>({getBuildsByStage(stage).length})</span>
                </h3>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {getBuildsByStage(stage).map(build => (
                  <BuildCard key={build.id} build={build} onClick={() => setSelectedBuild(build)} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Build Detail Overlay */}
        <AnimatePresence>
          {selectedBuild && (
            <BuildDetailModal build={selectedBuild} onClose={() => setSelectedBuild(null)} />
          )}
        </AnimatePresence>

      </div>
    </AdminLayout>
  );
}

function BuildCard({ build, onClick }: { build: any, onClick: () => void }) {
  const priorityColor = build.priority === 'Urgent' ? '#ef4444' : build.priority === 'High' ? 'var(--accent-light)' : 'rgba(255,255,255,0.4)';

  return (
    <motion.div 
      whileHover={{ y: -2, background: 'rgba(255,255,255,0.04)' }}
      onClick={onClick}
      style={{ 
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        padding: '1.25rem', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.3s ease',
        position: 'relative', overflow: 'hidden'
      }}
    >
      {/* Priority Indicator */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '40px', height: '4px', background: priorityColor }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--accent-light)', letterSpacing: '0.1em' }}>{build.id}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-dim)', opacity: 0.5 }}>
          <Clock size={10} />
          <span style={{ fontSize: '0.55rem', fontWeight: 800 }}>{build.timeElapsed}</span>
        </div>
      </div>

      <div style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--white)', marginBottom: '0.25rem', fontFamily: 'var(--font-d)', letterSpacing: '0.02em' }}>{build.systemName}</div>
      <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '1.25rem' }}>CLIENT: {build.client.toUpperCase()}</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '1rem' }}>
        <BuildPart icon={<Cpu size={10} />} text={build.parts.cpu} />
        <BuildPart icon={<Zap size={10} />} text={build.parts.gpu} />
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <div style={{ fontSize: '0.55rem', fontWeight: 800, color: 'var(--text-dim)', opacity: 0.4 }}>ORDER: {build.parentOrder}</div>
         <ArrowRight size={12} color="var(--accent-light)" />
      </div>
    </motion.div>
  );
}

function BuildPart({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
      <span style={{ opacity: 0.4 }}>{icon}</span>
      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}</span>
    </div>
  );
}

function BuildDetailModal({ build, onClose }: { build: any, onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
    >
      <motion.div 
        initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }}
        style={{ 
          background: '#141414', border: '1px solid rgba(255,255,255,0.12)', 
          width: '100%', maxWidth: '1000px', height: 'auto', maxHeight: '90vh', 
          borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
          boxShadow: '0 50px 100px rgba(0,0,0,0.8)'
        }}
      >
        <div style={{ padding: '1.75rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1a1a1a' }}>
           <div>
              <div style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--accent-light)', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>SYSTEM BUILD MANIFEST</div>
              <h2 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.8rem', margin: 0, letterSpacing: '0.02em' }}>{build.id} <span style={{ opacity: 0.1 }}>/</span> {build.systemName}</h2>
           </div>
           <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px', width: '40px', height: '40px', color: 'var(--white)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={20} /></button>
        </div>

        <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '3rem', overflowY: 'auto' }}>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <DetailLabel label="CLIENT" value={build.client} />
              <DetailLabel label="PARENT ORDER" value={build.parentOrder} />
              <DetailLabel label="STATION STATUS" value={build.status} />
              <DetailLabel label="TIME ELAPSED" value={build.timeElapsed} />
           </div>

           <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--accent-light)', letterSpacing: '0.2em', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '12px', height: '1px', background: 'var(--accent-light)' }} />
                TECHNICAL SPECIFICATIONS
              </div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '2rem 3rem',
                background: 'rgba(255,255,255,0.01)',
                padding: '2rem',
                borderRadius: '2px',
                border: '1px solid rgba(255,255,255,0.03)'
              }}>
                <ManifestPart label="CPU" value={build.parts.cpu} />
                <ManifestPart label="GPU" value={build.parts.gpu} />
                <ManifestPart label="MOTHERBOARD" value={build.parts.mobo || 'ASUS ROG MAXIMUS Z790 HERO'} />
                <ManifestPart label="MEMORY (RAM)" value={build.parts.ram} />
                <ManifestPart label="POWER SUPPLY" value={build.parts.psu || '1200W CORSAIR SHIFT ATX 3.0'} />
                <ManifestPart label="PRIMARY CHASSIS" value={build.parts.case} />
                <ManifestPart label="STORAGE DRIVE" value={build.parts.storage || '4TB SAMSUNG 990 PRO NVME'} />
                <ManifestPart label="THERMAL SOLUTION" value={build.parts.cooler || 'LIAN LI GALAHAD II LCD 360'} />
                <ManifestPart label="FANS & AIRFLOW" value="6X LIAN LI UNI FAN TL-LCD" />
              </div>
           </div>
        </div>

        <div style={{ padding: '1.5rem 2.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '1.25rem', background: '#1a1a1a' }}>
          <button className="btn btn-solid" style={{ flex: 1, padding: '1rem', fontWeight: 900, letterSpacing: '0.1em' }}>PROGRESS TO NEXT STAGE</button>
          <button style={{ flex: 1, padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', borderRadius: '2px', fontWeight: 900, cursor: 'pointer', fontSize: '0.75rem', letterSpacing: '0.1em' }}>PRINT BUILD SLIP</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ManifestPart({ label, value }: { label: string, value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ fontSize: '0.55rem', fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.5 }}>{label}</div>
      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--white)', lineHeight: 1.4 }}>{value}</div>
    </div>
  );
}

function DetailLabel({ label, value }: { label: string, value: string }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.15em', marginBottom: '0.3rem' }}>{label}</div>
      <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--white)' }}>{value}</div>
    </div>
  );
}

const statBoxStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
  padding: '0.6rem 1rem', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 800,
  letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '1rem'
};

const controlButtonStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
  padding: '0.6rem 1rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800,
  letterSpacing: '0.1em', color: 'var(--text-dim)', display: 'flex', alignItems: 'center',
  gap: '0.6rem', cursor: 'pointer'
};

function ArrowRight({ size, color }: { size: number, color: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>;
}
