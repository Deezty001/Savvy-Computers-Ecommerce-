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
          <PriorityNotice icon={<AlertCircle color="#f87171" size={18} />} label="CRITICAL DELAYS" count="2" />
          <PriorityNotice icon={<Clock color="var(--accent-light)" size={18} />} label="DUE FOR DISPATCH" count="5" />
          <PriorityNotice icon={<Package color="#60a5fa" size={18} />} label="PARTS AWAITING" count="8" />
        </div>

        {/* The Build Queue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h2 style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.15em', marginBottom: '0.25rem' }}>ACTIVE DEPLOYMENTS</h2>
          
          <BuildCard 
            id="#SV-9021"
            name="APEX CORE V3"
            customer="Johnathan Davis"
            deadline="SHIPS IN 4H"
            status="BENCHMARKING"
            progress={90}
            isExpanded={expandedId === '#SV-9021'}
            onToggle={() => setExpandedId(expandedId === '#SV-9021' ? null : '#SV-9021')}
            specs={[
              "Intel Core i9-14900K",
              "NVIDIA RTX 4090 Founders Edition",
              "64GB DDR5 Dominator Titanium",
              "2TB Gen5 NVMe SSD"
            ]}
          />

          <BuildCard 
            id="#SV-9025"
            name="STEALTH WORKSTATION"
            customer="Elena Rodriguez"
            deadline="SHIPS TOMORROW"
            status="CABLES"
            progress={65}
            isExpanded={expandedId === '#SV-9025'}
            onToggle={() => setExpandedId(expandedId === '#SV-9025' ? null : '#SV-9025')}
            specs={[
              "AMD Ryzen 9 7950X",
              "NVIDIA RTX 4080 Super",
              "128GB Pro Memory Kit",
              "4TB Studio Storage Array"
            ]}
          />

          <BuildCard 
            id="#SV-9028"
            name="ULTRA SIM RIG"
            customer="Marcus Lynch"
            deadline="DUE IN 3 DAYS"
            status="ASSEMBLY"
            progress={30}
            isExpanded={expandedId === '#SV-9028'}
            onToggle={() => setExpandedId(expandedId === '#SV-9028' ? null : '#SV-9028')}
            specs={[
              "Intel Core i7-14700K",
              "NVIDIA RTX 4070 Ti Super",
              "32GB Gaming Memory"
            ]}
          />
        </div>

      </div>
    </AdminLayout>
  );
}

function PriorityNotice({ icon, label, count }: any) {
  return (
    <div style={{ 
      background: 'rgba(255,255,255,0.02)', 
      border: '1px solid rgba(255,255,255,0.05)', 
      padding: '0.75rem 1.25rem', 
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    }}>
      <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>{icon}</div>
      <div>
        <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--white)' }}>{count}</div>
        <div style={{ fontSize: '0.55rem', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.1em' }}>{label}</div>
      </div>
    </div>
  );
}

function BuildCard({ id, name, customer, deadline, status, progress, specs, isExpanded, onToggle }: any) {
  const stages = [
    { label: "PARTS", reached: progress >= 20 },
    { label: "PREP", reached: progress >= 40 },
    { label: "ASSEMBLY", reached: progress >= 60 },
    { label: "CABLES", reached: progress >= 80 },
    { label: "TESTING", reached: progress >= 100 },
  ];

  return (
    <div style={{ 
      background: isExpanded ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)', 
      border: isExpanded ? '1px solid rgba(173, 133, 106, 0.3)' : '1px solid rgba(255,255,255,0.05)',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    }}>
      {/* Main Header Row */}
      <div 
        onClick={onToggle}
        style={{ 
          padding: '1rem 1.5rem', 
          display: 'grid', 
          gridTemplateColumns: '80px 2.5fr 1.5fr 1fr 30px', 
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 600 }}>{id}</span>
        
        <div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--white)' }}>{name}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.1rem' }}>{customer}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '1.5rem' }}>
            {stages.map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
                <div style={{ 
                  width: '6px', height: '6px', borderRadius: '50%', 
                  background: s.reached ? 'var(--accent-light)' : 'rgba(255,255,255,0.1)',
                  boxShadow: s.reached ? '0 0 8px var(--accent-light)' : 'none'
                }} />
                <span style={{ fontSize: '0.45rem', fontWeight: 800, color: s.reached ? 'var(--white)' : 'var(--text-dim)', letterSpacing: '0.05em' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'right', paddingRight: '1.5rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: deadline.includes('4H') ? '#f87171' : 'var(--accent-light)', letterSpacing: '0.05em' }}>
            {deadline}
          </div>
        </div>

        <div style={{ color: 'var(--text-dim)' }}>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.1)' }}
          >
            <div style={{ padding: '1.5rem 2.5rem', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
              
              {/* Build Manifest */}
              <div>
                <h4 style={{ fontSize: '0.55rem', fontWeight: 800, color: 'var(--accent-light)', letterSpacing: '0.15em', marginBottom: '1rem' }}>SYSTEM MANIFEST</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {specs.map((spec: string, i: number) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '3px', height: '3px', background: 'var(--accent-light)', borderRadius: '50%' }} />
                      <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', fontWeight: 400 }}>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Logs / Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.55rem', fontWeight: 800, color: 'var(--accent-light)', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>INTERNAL NOTES</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.5, fontWeight: 400 }}>
                    Customer requested a custom bronze badge on the PSU shroud. Motherboard bios updated to v1.4.
                  </p>
                </div>
                
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                  <button className="btn btn-solid" style={{ flex: 1, padding: '0.6rem', fontSize: '0.65rem', fontWeight: 700 }}>PRINT LABELS</button>
                  <button style={{ 
                    flex: 1, padding: '0.6rem', background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)',
                    fontSize: '0.65rem', fontWeight: 700, borderRadius: '4px', cursor: 'pointer'
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

