'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Search, Filter, Plus, MoreVertical, 
  Clock, Package, Cpu, Monitor, 
  CheckCircle2, AlertCircle, X,
  ArrowRight, User, Truck, CreditCard, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATA ---
const INITIAL_ORDERS: any[] = [];

const COLUMNS = ['Processing', 'In Production', 'Quality Control', 'Completed'];

export default function OrdersPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const getOrdersByStatus = (status: string) => orders.filter(o => o.status === status);

  return (
    <AdminLayout title="SALES & ORDERS">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minHeight: '100%' }}>
        
        {/* Header Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <div style={controlButtonStyle}><Search size={14} /> SEARCH</div>
          <div style={controlButtonStyle}><Filter size={14} /> FILTERS</div>
          <button className="btn btn-solid" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem' }}>
            <Plus size={14} style={{ marginRight: '0.4rem' }} /> CREATE ORDER
          </button>
        </div>

        {/* Kanban Board */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          overflowX: 'auto', 
          paddingBottom: '1rem',
          flex: 1
        }}>
          {COLUMNS.map(column => (
            <div key={column} style={{ minWidth: '280px', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem' }}>
                <h3 style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-dim)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  {column} <span style={{ marginLeft: '0.25rem', opacity: 0.3 }}>({getOrdersByStatus(column).length})</span>
                </h3>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {getOrdersByStatus(column).map(order => (
                  <OrderCard key={order.id} order={order} onClick={() => setSelectedOrder(order)} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Order Detail Modal */}
        <AnimatePresence>
          {selectedOrder && (
            <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
          )}
        </AnimatePresence>

      </div>
    </AdminLayout>
  );
}

function OrderCard({ order, onClick }: { order: any, onClick: () => void }) {
  return (
    <motion.div 
      whileHover={{ y: -2, borderColor: 'rgba(255,255,255,0.1)' }}
      onClick={onClick}
      style={{ 
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        padding: '1.25rem', borderRadius: '4px', cursor: 'pointer', transition: 'border-color 0.3s ease'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--accent-light)', letterSpacing: '0.1em' }}>{order.id}</span>
        <span style={{ fontSize: '0.6rem', color: 'var(--text-dim)', fontWeight: 700 }}>{order.paymentStatus.toUpperCase()}</span>
      </div>
      
      <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--white)', marginBottom: '0.5rem', fontFamily: 'var(--font-d)' }}>{order.customer}</div>
      <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 700, marginBottom: '1rem' }}>{order.itemCount} SYSTEMS IN ORDER</div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--white)', fontFamily: 'var(--font-d)' }}>{order.total}</div>
        <ArrowRight size={14} color="var(--accent-light)" />
      </div>
    </motion.div>
  );
}

function OrderModal({ order, onClose }: { order: any, onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
    >
      <motion.div 
        initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }}
        style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', width: '100%', maxWidth: '600px', borderRadius: '4px', overflow: 'hidden' }}
      >
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0d0d0d' }}>
           <h2 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.4rem', margin: 0 }}>{order.id} <span style={{ opacity: 0.2 }}>/</span> ORDER OVERVIEW</h2>
           <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer' }}><X size={20} /></button>
        </div>

        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <DetailLabel label="CUSTOMER" value={order.customer} />
              <DetailLabel label="TOTAL" value={order.total} />
              <DetailLabel label="PAYMENT" value={order.paymentStatus} />
              <DetailLabel label="SYSTEMS" value={order.itemCount} />
           </div>
           <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.2em', marginBottom: '1rem' }}>SHIPPING ADDRESS</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--white)', lineHeight: 1.5 }}>{order.address}</div>
           </div>
        </div>

        <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '1rem', background: '#0d0d0d' }}>
          <button className="btn btn-solid" style={{ flex: 1, padding: '0.75rem' }}>MANAGE BUILDS</button>
          <button style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', borderRadius: '2px', fontWeight: 800, cursor: 'pointer', fontSize: '0.75rem' }}>PRINT INVOICE</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DetailLabel({ label, value }: { label: string, value: string | number }) {
  return (
    <div>
      <div style={{ fontSize: '0.55rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.15em', marginBottom: '0.25rem' }}>{label}</div>
      <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--white)' }}>{value}</div>
    </div>
  );
}

const controlButtonStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
  padding: '0.6rem 1rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800,
  letterSpacing: '0.1em', color: 'var(--text-dim)', display: 'flex', alignItems: 'center',
  gap: '0.6rem', cursor: 'pointer'
};
