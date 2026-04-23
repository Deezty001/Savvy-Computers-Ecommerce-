import React from 'react';

export default function Loading() {
  return (
    <div style={{ 
      background: '#121212', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      paddingTop: '2rem'
    }}>
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '5rem', opacity: 0.1 }}>
        {/* Gallery Skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ aspectRatio: '1/1', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.05)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ aspectRatio: '1/1', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.05)' }} />
            ))}
          </div>
        </div>

        {/* Info Skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <div style={{ width: '120px', height: '10px', background: '#ad856a', marginBottom: '1rem' }} />
            <div style={{ width: '80%', height: '60px', background: '#ffffff', marginBottom: '1rem' }} />
          </div>
          <div style={{ width: '100%', height: '100px', background: '#1a1a1a' }} />
          <div style={{ width: '100%', height: '300px', background: '#1a1a1a' }} />
        </div>
      </div>
      
      {/* Floating Bar Skeleton */}
      <div style={{ 
        position: 'fixed', bottom: 0, left: 0, right: 0, 
        height: '80px', background: 'rgba(12, 12, 12, 0.95)', 
        borderTop: '1px solid rgba(255,255,255,0.08)' 
      }} />
    </div>
  );
}
