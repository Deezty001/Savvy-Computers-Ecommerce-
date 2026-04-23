'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModuleSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface ModuleHubProps {
  title: string;
  subtitle: string;
  sections: ModuleSection[];
}

export default function ModuleHub({ title, subtitle, sections }: ModuleHubProps) {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%' }}>
      {/* Hub Header & Sub-Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem' }}>
        <div>
          <div style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--accent-light)', letterSpacing: '0.4em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
            {subtitle}
          </div>
          <h1 style={{ fontFamily: 'var(--font-d)', fontSize: '1.8rem', fontWeight: 900, margin: 0, letterSpacing: '0.02em' }}>
            {title}
          </h1>
        </div>

        {/* Local Section Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.02)', padding: '0.25rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.6rem 1.25rem',
                background: activeSection === section.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                border: '1px solid',
                borderColor: activeSection === section.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                borderRadius: '3px',
                color: activeSection === section.id ? 'var(--white)' : 'var(--text-dim)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.65rem',
                fontWeight: 800,
                letterSpacing: '0.1em'
              }}
            >
              <span style={{ opacity: activeSection === section.id ? 1 : 0.4 }}>{section.icon}</span>
              {section.title.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Active Section Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ height: '100%' }}
          >
            {sections.find(s => s.id === activeSection)?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
