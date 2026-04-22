'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Search, Filter, Plus, MoreVertical, 
  Clock, Package, Cpu, Monitor, 
  CheckCircle2, AlertCircle, X,
  ArrowRight, User, Truck, CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATA ---
const INITIAL_ORDERS = [
  { 
    id: 'SV-2940', customer: 'Adam Karim', status: 'Allocating Parts', 
    total: '$6,499', email: 'adam@savvy.com', phone: '0400 000 000',
    address: '123 Tech Lane, Sydney NSW 2000',
    items: [
      { name: 'APEX CORE V3', cpu: 'Intel i9-14900K', gpu: 'RTX 4090 FE', ram: '64GB DDR5', price: '$6,499' }
    ]
  },
  { 
    id: 'SV-2941', customer: 'Sarah Miller', status: 'Allocating Parts', 
    total: '$8,598', email: 'sarah@miller.com', phone: '0411 111 111',
    address: '45 Gaming Rd, Melbourne VIC 3000',
    items: [
      { name: 'STEALTH V1', cpu: 'AMD Ryzen 7 7800X3D', gpu: 'RTX 4080 Super', ram: '32GB DDR5', price: '$4,299' },
      { name: 'STEALTH V1', cpu: 'AMD Ryzen 7 7800X3D', gpu: 'RTX 4080 Super', ram: '32GB DDR5', price: '$4,299' }
    ]
  },
  { 
    id: 'SV-2942', customer: 'Julian Rossi', status: 'In Build', 
    total: '$3,899', email: 'julian@rossi.com', phone: '0422 222 222',
    address: '88 Studio St, Brisbane QLD 4000',
    items: [
      { name: 'STUDIO WORKSTATION', cpu: 'Intel i7-14700K', gpu: 'RTX 4070 Ti Super', ram: '32GB DDR5', price: '$3,899' }
    ]
  },
  { 
    id: 'SV-2945', customer: 'Elena Vance', status: 'In Testing', 
    total: '$7,199', email: 'elena@vance.com', phone: '0433 333 333',
    address: '1 Black Mesa Dr, Adelaide SA 5000',
    items: [
      { name: 'LAB UNIT 01', cpu: 'Intel i9-14900K', gpu: 'RTX 4090 Founders', ram: '128GB DDR5', price: '$7,199' }
    ]
  }
];

const COLUMNS = ['Allocating Parts', 'In Build', 'In Testing', 'Completed'];

export default function OrdersPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const getOrdersByStatus = (status: string) => orders.filter(o => o.status === status);

  return (
    <AdminLayout title="ORDER KANBAN">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minHeight: '100%' }}>
        
        {/* Header Actions Area (Now compact) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <div style={controlButtonStyle}><Search size={14} /> SEARCH</div>
          <div style={controlButtonStyle}><Filter size={14} /> FILTERS</div>
          <button className="btn btn-solid" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem' }}>
            <Plus size={14} style={{ marginRight: '0.4rem' }} /> NEW ORDER
          </button>
        </div>


        {/* Status Summary Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
          <StatusMetric label="OUTSTANDING" value="24" color="var(--accent-light)" />
          <StatusMetric label="IN ASSEMBLY" value="8" color="#60a5fa" />
          <StatusMetric label="READY FOR SHIP" value="5" color="#4ade80" />
          <StatusMetric label="REVENUE (MTD)" value="$142K" color="var(--white)" />
        </div>

        {/* Kanban Board */}
        <div style={{ 
          display: 'flex', 
          gap: '0.75rem', 
          overflowX: 'auto', 
          paddingBottom: '1rem',
          flex: 1
        }}>
          {COLUMNS.map(column => (
            <div key={column} style={{ minWidth: '220px', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.25rem' }}>
                <h3 style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  {column} <span style={{ marginLeft: '0.25rem', opacity: 0.3 }}>({getOrdersByStatus(column).length})</span>
                </h3>
                <MoreVertical size={12} style={{ color: 'var(--text-dim)', cursor: 'pointer' }} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {getOrdersByStatus(column).map(order => (
                  <OrderCard key={order.id} order={order} onClick={() => setSelectedOrder(order)} />
                ))}
                {getOrdersByStatus(column).length === 0 && (
                  <div style={{ 
                    height: '60px', border: '1px dashed rgba(255,255,255,0.05)', 
                    borderRadius: '6px', display: 'flex', alignItems: 'center', 
                    justifyContent: 'center', fontSize: '0.6rem', color: 'rgba(255,255,255,0.1)',
                    fontWeight: 600, letterSpacing: '0.1em'
                  }}>
                    EMPTY
                  </div>
                )}
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

function StatusMetric({ label, value, color }: any) {
  return (
    <div style={{ 
      background: 'rgba(255,255,255,0.02)', borderLeft: `2px solid ${color}`,
      padding: '0.75rem 1.25rem', borderRadius: '4px' 
    }}>
      <div style={{ fontSize: '0.55rem', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.15em', marginBottom: '0.25rem' }}>{label}</div>
      <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--white)' }}>{value}</div>
    </div>
  );
}

function OrderCard({ order, onClick }: any) {
  const itemCount = order.items?.length || 1;
  const firstItem = order.items?.[0] || {};

  return (
    <motion.div 
      whileHover={{ y: -2, borderColor: 'rgba(173, 133, 106, 0.3)' }}
      onClick={onClick}
      style={{ 
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
        padding: '1rem', borderRadius: '8px', cursor: 'pointer', transition: 'border-color 0.3s ease'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--accent-light)', letterSpacing: '0.1em' }}>{order.id}</span>
          {itemCount > 1 && (
            <span style={{ fontSize: '0.55rem', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '2px', color: 'var(--text-dim)' }}>{itemCount} ITEMS</span>
          )}
        </div>
        <Clock size={12} style={{ color: 'var(--text-dim)' }} />
      </div>
      
      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--white)', marginBottom: '0.75rem' }}>{order.customer}</div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem' }}>
        <SpecItem icon={<Cpu size={10} />} text={firstItem.cpu} />
        <SpecItem icon={<Monitor size={10} />} text={firstItem.gpu} />
        {itemCount > 1 && (
          <div style={{ fontSize: '0.6rem', color: 'var(--accent-light)', fontWeight: 700, marginTop: '0.2rem', letterSpacing: '0.05em' }}>
            + {itemCount - 1} MORE ITEMS IN THIS ORDER
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SpecItem({ icon, text }: any) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 400 }}>
      <span style={{ opacity: 0.5 }}>{icon}</span>
      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}</span>
    </div>
  );
}

function OrderModal({ order, onClose }: any) {
  const statusColors: any = {
    'Allocating Parts': '#60a5fa',
    'In Build': '#facc15',
    'In Testing': '#c084fc',
    'Completed': '#4ade80'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ 
        position: 'fixed', inset: 0, zIndex: 1000, 
        background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        style={{ 
          background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)',
          width: '100%', maxWidth: '950px', height: '85vh', borderRadius: '8px',
          display: 'flex', flexDirection: 'column', overflow: 'hidden'
        }}
      >
        {/* Modal Header */}
        <div style={{ padding: '1.25rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0c0c0c' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div>
              <div style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--accent-light)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>ORDER DETAILS</div>
              <h2 style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '1.4rem', margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {order.id} <span style={{ opacity: 0.2 }}>/</span> {order.customer}
              </h2>
            </div>
            <div style={{ 
              background: 'rgba(255,255,255,0.02)', 
              border: `1px solid ${statusColors[order.status] || 'var(--border)'}`,
              padding: '0.4rem 1rem', borderRadius: '4px',
              display: 'flex', alignItems: 'center', gap: '0.75rem'
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusColors[order.status], boxShadow: `0 0 10px ${statusColors[order.status]}` }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--white)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{order.status}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--white)' }}>
            <X size={16} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '2.5rem' }}>
          
          {/* Left Column: Customer & Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <DetailSection title="CUSTOMER INFORMATION">
              <InfoRow icon={<User size={13} />} label="Client" value={order.customer} />
              <InfoRow icon={<Search size={13} />} label="Email" value={order.email} />
              <InfoRow icon={<Search size={13} />} label="Phone" value={order.phone} />
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                {order.address}
              </div>
            </DetailSection>

            <DetailSection title="FINANCIAL SUMMARY">
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', fontWeight: 700, marginBottom: '0.2rem' }}>TOTAL INVOICED</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-light)' }}>{order.total}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', fontWeight: 700, marginBottom: '0.2rem' }}>PAYMENT STATUS</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#4ade80' }}>FULL PAYMENT RECEIVED</div>
                </div>
              </div>
            </DetailSection>
          </div>

          {/* Right Column: Multi-Item Manifest */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <DetailSection title={`ORDER MANIFEST (${order.items?.length || 0} ITEMS)`}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {order.items?.map((item: any, idx: number) => (
                  <div key={idx} style={{ 
                    background: 'rgba(255,255,255,0.01)', 
                    border: '1px solid rgba(255,255,255,0.03)',
                    padding: '0.75rem 1.25rem', borderRadius: '4px',
                    display: 'flex', alignItems: 'center', gap: '1.5rem',
                    transition: 'all 0.3s ease'
                  }}>
                    {/* Item Thumbnail */}
                    <div style={{ position: 'relative', width: '60px', height: '60px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.2 }}>
                        <Monitor size={24} color="var(--white)" />
                      </div>
                      {/* Quantity Badge */}
                      <div style={{ 
                        position: 'absolute', top: '-2px', right: '-2px', 
                        width: '18px', height: '18px', background: 'var(--accent-light)', 
                        color: 'var(--black)', fontSize: '0.65rem', fontWeight: 900,
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                      }}>1</div>
                    </div>

                    {/* Item Info */}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--white)', margin: 0, letterSpacing: '0.02em', textTransform: 'uppercase' }}>{item.name}</h4>
                      <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginTop: '0.2rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {item.cpu} <span style={{ color: 'var(--accent-light)', opacity: 0.5, margin: '0 0.5rem' }}>|</span> {item.gpu} <span style={{ color: 'var(--accent-light)', opacity: 0.5, margin: '0 0.5rem' }}>|</span> {item.ram}
                      </div>
                    </div>

                    {/* Item Price */}
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--white)', fontFamily: 'var(--font-d)' }}>
                        {item.price || '$2,499'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DetailSection>
          </div>

        </div>


        {/* Modal Footer */}
        <div style={{ padding: '1.25rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '1rem' }}>
          <button className="btn btn-solid" style={{ flex: 1, padding: '0.75rem' }}>UPDATE STATUS</button>
          <button style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}>PRINT SHIPPING LABEL</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DetailSection({ title, children }: any) {
  return (
    <div>
      <h4 style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-light)', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>{title}</h4>
      {children}
    </div>
  );
}

function InfoRow({ icon, label, value }: any) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
      <div style={{ color: 'var(--text-dim)', opacity: 0.5 }}>{icon}</div>
      <div>
        <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', fontWeight: 800 }}>{label}</div>
        <div style={{ fontSize: '1rem', color: 'var(--white)', fontWeight: 400 }}>{value}</div>
      </div>
    </div>
  );
}


const controlButtonStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.05)',
  padding: '0.75rem 1.25rem',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  color: 'var(--text-dim)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  cursor: 'pointer'
};
