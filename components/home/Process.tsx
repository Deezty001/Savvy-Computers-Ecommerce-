// @ts-nocheck
'use client';

import React from 'react';
import { Target, Cpu, Zap, Search } from "lucide-react";

const milestones = [
  { id: 'CONCEPT', icon: <Target size={32} />, desc: 'Engineered from zero to serve beyond the needs of even your elite GPUs.' },
  { id: 'DEVELOPMENT', icon: <Cpu size={32} />, desc: 'Empowered internal features designed to raise status elements across your station.' },
  { id: 'TESTING', icon: <Search size={32} />, desc: 'Rigorous interactive compatibility and stress testing in extreme conditions.' },
  { id: 'OPTIMIZATION', icon: <Zap size={32} />, desc: 'Expert performance drivers for an ultra responsive extreme collection.' }
];

export default function Process() {
  return (
    <section className="process" style={{ background: 'var(--bg)', padding: '12rem 0', borderBottom: '1px solid var(--border)' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', marginBottom: '8rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ 
              fontFamily: 'var(--font-d)', 
              fontWeight: 900, 
              fontSize: 'var(--fs-2xl)', 
              textTransform: 'uppercase', 
              lineHeight: 0.85,
              letterSpacing: '0.04em'
            }}>
              ENGINEERED<br/>
              <span className="text-outline">FROM ZERO</span>
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 'var(--fs-lg)', lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: '35ch' }}>
              Precision is not an option. It is the fundamental principle behind every Savvy system.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', background: 'var(--border)', border: '1px solid var(--border)' }}>
          {milestones.map((m, idx) => (
            <div key={idx} style={{ 
              background: 'var(--bg)', 
              padding: '5rem 3rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '4rem',
              transition: 'background 0.4s ease'
            }} className="process-step">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'top' }}>
                <div style={{ color: 'var(--accent-light)' }}>{m.icon}</div>
                <div style={{ 
                  fontFamily: 'var(--font-d)', 
                  fontWeight: 900, 
                  fontSize: '1.5rem', 
                  color: 'var(--border-heavy)',
                  opacity: 0.5
                }}>0{idx + 1}</div>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.75rem', textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '0.12em' }}>{m.id}</h3>
                <p style={{ fontSize: 'var(--fs-sm)', lineHeight: 1.7, color: 'var(--text-dim)', maxWidth: '20ch' }}>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .process-step:hover {
          background: #151311 !important;
        }
        .process-step:hover h3 {
          color: var(--accent-light);
        }
      `}</style>
    </section>
  );
}
