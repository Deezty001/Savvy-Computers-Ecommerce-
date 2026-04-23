'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase/client';
import { 
  Plus, Search, Edit2, Trash2, Database, 
  Cpu, Zap, HardDrive, ShieldCheck, Box,
  Info, Save, X, Loader2, CheckCircle, 
  AlertCircle, Filter, MoreVertical, LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- STYLES ---
const thStyle: React.CSSProperties = { padding: '1rem 1.5rem', fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.05)' };
const tdStyle: React.CSSProperties = { padding: '1rem 1.5rem', verticalAlign: 'middle', borderBottom: '1px solid rgba(255,255,255,0.03)' };

const CATEGORIES = ['CPU', 'GPU', 'RAM', 'Storage', 'PSU', 'Motherboard', 'Cooling', 'Case', 'Peripheral', 'Other'];

export default function CataloguePage() {
  const [parts, setParts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('identity');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // --- Form State ---
  const [formData, setFormData] = useState<any>({
    internal_sku: '',
    name: '',
    manufacturer: '',
    category: 'GPU',
    model_number: '',
    typical_cost_price: 0,
    supplier_name: '',
    supplier_part_number: '',
    default_warranty_months: 24,
    warranty_type: 'Manufacturer',
    status: 'Active',
    notes: '',
    specs: {
      kit_size: 1
    }
  });

  useEffect(() => {
    fetchCatalogue();
  }, []);

  const fetchCatalogue = async () => {
    setIsLoading(true);
    // Note: Attempting to fetch from supabase, fallback to mock if table doesn't exist yet
    try {
      const { data, error } = await supabase
        .from('parts_catalogue')
        .select('*')
        .order('name', { ascending: true });
      
      if (data) setParts(data);
      else if (error) console.warn('Database table "parts_catalogue" not found. Showing mock data.');
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const openEditor = (part: any = null) => {
    setMessage(null);
    setActiveTab('identity');
    if (part) {
      setFormData({ ...part });
    } else {
      setFormData({
        internal_sku: `SV-${Math.floor(1000 + Math.random() * 9000)}`,
        name: '',
        manufacturer: '',
        category: 'GPU',
        model_number: '',
        typical_cost_price: 0,
        supplier_name: '',
        supplier_part_number: '',
        default_warranty_months: 24,
        warranty_type: 'Manufacturer',
        status: 'Active',
        notes: '',
        specs: { kit_size: 1 }
      });
    }
    setIsEditorOpen(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    const { error } = await supabase.from('parts_catalogue').upsert([formData]);
    
    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'PART SYNCED TO CATALOGUE' });
      setTimeout(() => {
        setIsEditorOpen(false);
        fetchCatalogue();
      }, 1000);
    }
    setIsLoading(false);
  };

  return (
    <AdminLayout title="MASTER CATALOGUE">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-light)', letterSpacing: '0.4em', marginBottom: '0.5rem' }}>BLUEPRINT REPOSITORY</div>
            <h1 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', fontWeight: 900, margin: 0, letterSpacing: '0.02em' }}>COMPONENT LIBRARY</h1>
          </div>
          <button onClick={() => openEditor()} className="btn btn-solid" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1.5rem' }}>
            <Plus size={18} /> DEFINE NEW PART
          </button>
        </div>

        {/* Registry Controls */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '4px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={14} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
            <input 
              type="text" 
              placeholder="SEARCH CATALOGUE BY SKU, NAME, OR MODEL..." 
              style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.7rem 1rem 0.7rem 2.75rem', fontSize: '0.75rem', color: 'var(--white)', outline: 'none', borderRadius: '4px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <select style={selectStyle}>
              <option>ALL CATEGORIES</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select style={selectStyle}>
              <option>ALL STATUS</option>
              <option>ACTIVE</option>
              <option>DISCONTINUED</option>
            </select>
          </div>
        </div>

        {/* High-Density Registry Table */}
        <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                <th style={thStyle}>INTERNAL SKU</th>
                <th style={thStyle}>IDENTIFICATION</th>
                <th style={thStyle}>CATEGORY</th>
                <th style={thStyle}>TYPICAL COST</th>
                <th style={thStyle}>WARRANTY</th>
                <th style={thStyle}>STATUS</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {parts.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '4rem', textAlign: 'center', opacity: 0.3, fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em' }}>
                    {isLoading ? 'INITIALIZING REGISTRY...' : 'NO COMPONENTS DEFINED IN CATALOGUE'}
                  </td>
                </tr>
              ) : (
                parts.map(part => (
                  <tr key={part.id} className="hover-row">
                    <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--accent-light)', fontWeight: 600 }}>{part.internal_sku}</td>
                    <td style={tdStyle}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--white)' }}>{part.name}</div>
                      <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', fontWeight: 600 }}>{part.manufacturer.toUpperCase()} <span style={{ opacity: 0.2 }}>|</span> {part.model_number}</div>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '2px' }}>{part.category.toUpperCase()}</span>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--white)' }}>${parseFloat(part.typical_cost_price).toLocaleString()}</div>
                      <div style={{ fontSize: '0.55rem', color: 'var(--text-dim)', fontWeight: 800 }}>EST. REFERENCE</div>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--white)' }}>{part.default_warranty_months} MO</div>
                      <div style={{ fontSize: '0.55rem', color: 'var(--text-dim)', fontWeight: 800 }}>{part.warranty_type.toUpperCase()}</div>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ 
                        fontSize: '0.6rem', fontWeight: 900, padding: '3px 8px', borderRadius: '2px',
                        background: part.status === 'Active' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255,255,255,0.05)',
                        color: part.status === 'Active' ? '#4ade80' : 'var(--text-dim)',
                        border: `1px solid ${part.status === 'Active' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255,255,255,0.1)'}`
                      }}>{part.status.toUpperCase()}</span>
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button onClick={() => openEditor(part)} className="icon-btn"><Edit2 size={14} /></button>
                        <button className="icon-btn"><MoreVertical size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Part Architect Modal */}
      <AnimatePresence>
        {isEditorOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          >
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }}
              style={{ width: '100%', maxWidth: '1000px', height: '90vh', background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '4px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 50px 100px rgba(0,0,0,0.8)' }}
            >
              {/* Modal Header */}
              <div style={{ padding: '1.5rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#141414' }}>
                <div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--accent-light)', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>PART ARCHITECT</div>
                  <h2 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.6rem', margin: 0, letterSpacing: '0.02em' }}>{formData.name || 'NEW COMPONENT DEFINITION'}</h2>
                </div>
                <button onClick={() => setIsEditorOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', opacity: 0.5 }} className="hover-white"><X size={24} /></button>
              </div>

              {/* Modal Content */}
              <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {/* Internal Tabs */}
                <div style={{ width: '240px', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <TabItem label="IDENTITY" active={activeTab === 'identity'} onClick={() => setActiveTab('identity')} icon={<Box size={16} />} />
                  <TabItem label="COMMERCIAL" active={activeTab === 'commercial'} onClick={() => setActiveTab('commercial')} icon={<Zap size={16} />} />
                  <TabItem label="TECHNICAL" active={activeTab === 'technical'} onClick={() => setActiveTab('technical')} icon={<Cpu size={16} />} />
                  <TabItem label="WARRANTY" active={activeTab === 'warranty'} onClick={() => setActiveTab('warranty')} icon={<ShieldCheck size={16} />} />
                  <TabItem label="METADATA" active={activeTab === 'meta'} onClick={() => setActiveTab('meta')} icon={<Info size={16} />} />
                </div>

                {/* Form Fields */}
                <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                  {message && (
                    <div style={{ marginBottom: '2rem', padding: '1rem', borderRadius: '4px', background: message.type === 'success' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)', border: `1px solid ${message.type === 'success' ? '#4ade80' : '#f87171'}`, color: message.type === 'success' ? '#4ade80' : '#f87171', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                       {message.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                       {message.text}
                    </div>
                  )}

                  {activeTab === 'identity' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                      <FormRow label="INTERNAL SKU" value={formData.internal_sku} onChange={(v: string) => setFormData({...formData, internal_sku: v})} placeholder="e.g. SV-GPU-5090" />
                      <FormRow label="PART NAME" value={formData.name} onChange={(v: string) => setFormData({...formData, name: v})} placeholder="e.g. GeForce RTX 5090 Founders Edition" />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                        <FormRow label="MANUFACTURER" value={formData.manufacturer} onChange={(v: string) => setFormData({...formData, manufacturer: v})} placeholder="NVIDIA" />
                        <FormRow label="MODEL NUMBER" value={formData.model_number} onChange={(v: string) => setFormData({...formData, model_number: v})} placeholder="900-1G133-2530-000" />
                      </div>
                      <FormRow label="CATEGORY" type="select" options={CATEGORIES} value={formData.category} onChange={(v: string) => setFormData({...formData, category: v})} />
                    </div>
                  )}

                  {activeTab === 'commercial' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                      <FormRow label="TYPICAL COST PRICE ($)" type="number" value={formData.typical_cost_price} onChange={(v: string) => setFormData({...formData, typical_cost_price: parseFloat(v)})} />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                        <FormRow label="PRIMARY SUPPLIER" value={formData.supplier_name} onChange={(v: string) => setFormData({...formData, supplier_name: v})} placeholder="MWave / Scorptec" />
                        <FormRow label="SUPPLIER PART #" value={formData.supplier_part_number} onChange={(v: string) => setFormData({...formData, supplier_part_number: v})} />
                      </div>
                    </div>
                  )}

                  {activeTab === 'technical' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                      {formData.category === 'RAM' && (
                        <FormRow label="KIT SIZE (STICKS)" type="select" options={['1', '2', '4']} value={formData.specs.kit_size.toString()} onChange={(v: string) => setFormData({...formData, specs: { ...formData.specs, kit_size: parseInt(v) }})} />
                      )}
                      <div style={{ padding: '2rem', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '4px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.7rem' }}>
                        CATEGORY-SPECIFIC TECHNICAL SCHEMA INJECTED HERE
                      </div>
                    </div>
                  )}

                  {activeTab === 'warranty' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                      <FormRow label="DEFAULT WARRANTY (MONTHS)" type="number" value={formData.default_warranty_months} onChange={(v: string) => setFormData({...formData, default_warranty_months: parseInt(v)})} />
                      <FormRow label="WARRANTY TYPE" type="select" options={['Manufacturer', 'Supplier', 'Savvy Premium']} value={formData.warranty_type} onChange={(v: string) => setFormData({...formData, warranty_type: v})} />
                    </div>
                  )}

                  {activeTab === 'meta' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                      <FormRow label="STATUS" type="select" options={['Active', 'Discontinued', 'Under Review']} value={formData.status} onChange={(v: string) => setFormData({...formData, status: v})} />
                      <FormRow label="INTERNAL NOTES" type="textarea" value={formData.notes} onChange={(v: string) => setFormData({...formData, notes: v})} placeholder="Prone to coil whine in early batches..." />
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div style={{ padding: '1.5rem 2.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'flex-end', gap: '1.25rem', background: '#141414' }}>
                <button onClick={() => setIsEditorOpen(false)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', padding: '0.8rem 2rem', borderRadius: '2px', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}>DISCARD</button>
                <button 
                  onClick={handleSave}
                  style={{ background: 'var(--white)', color: 'var(--black)', border: 'none', padding: '0.8rem 2.5rem', borderRadius: '2px', fontSize: '0.75rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                >
                  <Save size={18} /> SYNC TO CATALOGUE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .hover-row { cursor: pointer; transition: background 0.2s ease; }
        .hover-row:hover { background: rgba(255,255,255,0.02) !important; }
        .icon-btn { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.3); padding: 0.5rem; border-radius: 2px; cursor: pointer; transition: all 0.2s; }
        .icon-btn:hover { color: var(--white); border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.08); }
        .hover-white:hover { opacity: 1 !important; }
      `}} />
    </AdminLayout>
  );
}

function TabItem({ label, active, onClick, icon }: { label: string, active: boolean, onClick: () => void, icon: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{ 
      display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1.25rem',
      background: active ? 'rgba(255,255,255,0.05)' : 'transparent', border: '1px solid', borderColor: active ? 'rgba(255,255,255,0.1)' : 'transparent',
      borderRadius: '2px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
      color: active ? 'var(--white)' : 'var(--text-dim)'
    }}>
      <span style={{ opacity: active ? 1 : 0.4 }}>{icon}</span>
      <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.15em' }}>{label}</span>
    </button>
  );
}

function FormRow({ label, value, onChange, placeholder, type = 'text', options = [] }: { 
  label: string, value: any, onChange: (v: string) => void, placeholder?: string, 
  type?: 'text' | 'number' | 'select' | 'textarea', options?: string[] 
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <label style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--accent-light)', letterSpacing: '0.2em' }}>{label}</label>
      {type === 'select' ? (
        <select value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle}>
          {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ ...inputStyle, height: '120px', resize: 'none' }} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} />
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
  padding: '1rem', borderRadius: '2px', color: 'var(--white)', fontSize: '0.85rem', outline: 'none',
  fontFamily: 'inherit'
};

const selectStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
  padding: '0.7rem 1rem', borderRadius: '4px', color: 'var(--white)', fontSize: '0.7rem',
  fontWeight: 800, outline: 'none'
};
