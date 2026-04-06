// @ts-nocheck
'use client';

import * as React from 'react';

export default function AnnouncementBar() {
  return (
    <div 
      style={{
        background: '#ad856a', // Balanced signature bronze
        color: 'var(--black)',
        padding: '0.85rem 0',
        position: 'relative',
        zIndex: 110,
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className="wrap">
        <p style={{
          fontFamily: 'var(--font-d)',
          fontWeight: 700,
          fontSize: 'var(--fs-sm)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          textAlign: 'center',
          margin: 0
        }}>
          SUMMER SYSTEM SALE • SAVVY X BRONZE • SHIPS WORLDWIDE
        </p>
      </div>
    </div>
  );
}
