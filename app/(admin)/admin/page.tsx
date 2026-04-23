'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Clock, Package, CheckCircle2, 
  ChevronDown, ChevronUp, AlertCircle,
  Truck, Search, Filter, ArrowUpDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BuildLab() {
  const [expandedId, setExpandedId] = useState<string | null>('#SV-9021');

  return (
    <AdminLayout title="BUILD LAB">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Header Actions Area (Now compact) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <div style={filterButtonStyle}>
            <Filter size={14} /> FILTERS
          </div>
          <div style={filterButtonStyle}>
            <ArrowUpDown size={14} /> SORT BY DEADLINE
          </div>
        </div>

        {/* Action Priority Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <PriorityNotice icon={<AlertCircle color="#f87171" size={18} />} label="CRITICAL DELAYS" count="0" />
          <PriorityNotice icon={<Clock color="var(--accent-light)" size={18} />} label="DUE FOR DISPATCH" count="0" />
          <PriorityNotice icon={<Package color="#60a5fa" size={18} />} label="PARTS AWAITING" count="0" />
        </div>

        {/* The Build Queue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h2 style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.15em', marginBottom: '0.25rem' }}>ACTIVE DEPLOYMENTS</h2>
          
          <div style={{ 
            padding: '4rem', textAlign: 'center', background: 'rgba(255,255,255,0.01)', 
            border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '4px' 
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>
              NO ACTIVE DEPLOYMENTS IN QUEUE
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

function PriorityNotice({ icon, label, count }: { icon: React.ReactNode, label: string, count: string }) {
  return (
    <div style={{ 
      background: 'rgba(255,255,255,0.03)', 
      border: '1px solid rgba(255,255,255,0.08)', 
      padding: '1.25rem 1.5rem', 
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '1.25rem',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    }}>
      <div style={{ padding: '0.6rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>{icon}</div>
      <div>
        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--white)', lineHeight: 1 }}>{count}</div>
        <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.15em', marginTop: '0.4rem', textTransform: 'uppercase' }}>{label}</div>
      </div>
    </div>
  );
}

function BuildCard({ id, name, customer, deadline, status, progress, specs, isExpanded, onToggle }: { 
  id: string, name: string, customer: string, deadline: string, status: string, 
  progress: number, specs: string[], isExpanded: boolean, onToggle: () => void 
}) {
  const stages = [
    { label: "PARTS", reached: progress >= 20 },
    { label: "PREP", reached: progress >= 40 },
    { label: "ASSEMBLY", reached: progress >= 60 },
    { label: "CABLES", reached: progress >= 80 },
    { label: "TESTING", reached: progress >= 100 },
  ];

  return (
    <div style={{ 
      background: isExpanded ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)', 
      border: isExpanded ? '1px solid rgba(173, 133, 106, 0.4)' : '1px solid rgba(255,255,255,0.08)',
      borderRadius: '4px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      boxShadow: isExpanded ? '0 10px 30px rgba(0,0,0,0.4)' : 'none'
    }}>
      {/* Main Header Row */}
      <div 
        onClick={onToggle}
        style={{ 
          padding: '1.25rem 1.5rem', 
          display: 'grid', 
          gridTemplateColumns: '100px 2.5fr 2fr 1.2fr 40px', 
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 800, letterSpacing: '0.05em' }}>{id}</span>
        
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--white)', letterSpacing: '0.02em' }}>{name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem', fontWeight: 500 }}>{customer}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '2rem' }}>
            {stages.map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ 
                  width: '8px', height: '8px', borderRadius: '1px', // Square dots for engineering look
                  background: s.reached ? 'var(--accent-light)' : 'rgba(255,255,255,0.1)',
                  boxShadow: s.reached ? '0 0 10px var(--accent-light)' : 'none'
                }} />
                <span style={{ fontSize: '0.5rem', fontWeight: 900, color: s.reached ? 'var(--white)' : 'var(--text-dim)', letterSpacing: '0.05em' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'right', paddingRight: '2rem' }}>
          <div style={{ 
            fontSize: '0.7rem', 
            fontWeight: 900, 
            color: deadline.includes('4H') ? '#f87171' : 'var(--accent-light)', 
            letterSpacing: '0.1em',
            background: deadline.includes('4H') ? 'rgba(248, 113, 113, 0.1)' : 'rgba(173, 133, 106, 0.1)',
            padding: '0.4rem 0.75rem',
            borderRadius: '2px',
            display: 'inline-block'
          }}>
            {deadline}
          </div>
        </div>

        <div style={{ color: 'var(--text-dim)', textAlign: 'right' }}>
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)' }}
          >
            <div style={{ padding: '2rem 2.5rem', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
              
              {/* Build Manifest */}
              <div>
                <h4 style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--accent-light)', letterSpacing: '0.2em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>SYSTEM MANIFEST</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {specs.map((spec: string, i: number) => (
                    <div key={i} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      background: 'rgba(255,255,255,0.02)', 
                      padding: '0.75rem',
                      borderRadius: '2px',
                      border: '1px solid rgba(255,255,255,0.03)'
                    }}>
                      <div style={{ width: '4px', height: '4px', background: 'var(--accent-light)', borderRadius: '1px' }} />
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Logs / Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--accent-light)', letterSpacing: '0.2em', marginBottom: '1rem', textTransform: 'uppercase' }}>INTERNAL NOTES</h4>
                  <div style={{ 
                    padding: '1rem', 
                    background: 'rgba(173, 133, 106, 0.03)', 
                    borderLeft: '2px solid var(--accent-light)',
                    fontSize: '0.8rem', 
                    color: 'var(--text-muted)', 
                    lineHeight: 1.6, 
                    fontWeight: 400 
                  }}>
                    Customer requested a custom bronze badge on the PSU shroud. Motherboard bios updated to v1.4.
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                  <button className="btn btn-solid" style={{ flex: 1, padding: '0.75rem', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.1em' }}>PRINT LABELS</button>
                  <button style={{ 
                    flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)',
                    fontSize: '0.7rem', fontWeight: 900, borderRadius: '4px', cursor: 'pointer',
                    letterSpacing: '0.1em'
                  }}>MARK COMPLETE</button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const filterButtonStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.05)',
  padding: '0.5rem 0.75rem',
  borderRadius: '4px',
  fontSize: '0.65rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  color: 'var(--text-dim)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

