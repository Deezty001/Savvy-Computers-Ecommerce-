'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { 
  Plus, Search, Edit2, Trash2, Globe, Box, 
  Settings, Image as ImageIcon, Layout,
  Cpu, Monitor, Package, DollarSign, Eye, X, Save,
  Loader2, CheckCircle, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const thStyle: React.CSSProperties = { padding: '1rem 1.5rem', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase' };
const tdStyle: React.CSSProperties = { padding: '1rem 1.5rem', verticalAlign: 'middle' };

export default function SystemsSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [formData, setFormData] = useState<any>({
    name: '',
    slug: '',
    price: 0,
    category: 'GAMING',
    status: 'LIVE',
    description: '',
    short_description: '',
    specs: {
      cpu: '', cooler: '', motherboard: '', ram: '',
      primary_storage: '', secondary_storage: '', gpu: '',
      psu: '', case: '', fans: ''
    },
    seo: { title: '', description: '' },
    image_url: '',
    tags: []
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setProducts(data);
    setIsLoading(false);
  };

  const openEditor = (product: any = null) => {
    setMessage(null);
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        category: product.category_id || 'GAMING',
        status: product.stock_status === 'in_stock' ? 'LIVE' : 'DRAFT',
        description: product.description || '',
        short_description: product.short_description || '',
        specs: product.specs || {},
        seo: { title: product.meta_title || '', description: product.meta_description || '' },
        image_url: product.images?.[0] || '',
        tags: product.tags || []
      });
    } else {
      setFormData({
        name: '', slug: '', price: 0, category: 'GAMING', status: 'LIVE',
        description: '', short_description: '',
        specs: {
          cpu: '', cooler: '', motherboard: '', ram: '',
          primary_storage: '', secondary_storage: '', gpu: '',
          psu: '', case: '', fans: ''
        },
        seo: { title: '', description: '' },
        image_url: '', tags: []
      });
    }
    setIsEditorOpen(true);
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    setMessage(null);

    const payload = {
      name: formData.name,
      slug: formData.slug,
      price: formData.price,
      description: formData.description,
      short_description: formData.short_description,
      specs: formData.specs,
      images: [formData.image_url].filter(Boolean),
      stock_status: formData.status === 'LIVE' ? 'in_stock' : 'out_of_stock',
      meta_title: formData.seo.title,
      meta_description: formData.seo.description,
      tags: formData.tags
    };

    let result;
    if (formData.id) {
      result = await supabase.from('products').update(payload).eq('id', formData.id);
    } else {
      result = await supabase.from('products').insert([payload]);
    }

    if (result.error) {
      setMessage({ type: 'error', text: result.error.message });
    } else {
      setMessage({ type: 'success', text: 'SYSTEM DEPLOYED SUCCESSFULLY' });
      setTimeout(() => {
        setIsEditorOpen(false);
        fetchProducts();
      }, 1500);
    }
    setIsDeploying(false);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('PERMANENTLY REMOVE THIS SYSTEM FROM REPOSITORY?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) fetchProducts();
  };

  const updateFormData = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const updateSpec = (key: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      specs: { ...prev.specs, [key]: value }
    }));
  };

  const updateSEO = (key: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      seo: { ...prev.seo, [key]: value }
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Action Header */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button onClick={() => openEditor()} className="btn btn-solid" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1.5rem', fontSize: '0.7rem' }}>
          <Plus size={16} /> CREATE SYSTEM
        </button>
      </div>

      {/* Stats Area */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        <StatCard label="LIVE SYSTEMS" value={products.filter(p => p.stock_status === 'in_stock').length.toString()} />
        <StatCard label="TOTAL VALUE" value={`$${(products.reduce((acc, p) => acc + (p.price || 0), 0) / 1000).toFixed(1)}k`} />
        <StatCard label="LOW STOCK" value={products.filter(p => (p.stock_quantity || 0) < 5).length.toString()} warning />
        <StatCard label="DRAFTS" value={products.filter(p => p.stock_status !== 'in_stock').length.toString()} />
      </div>

      {/* Registry Table */}
      <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
        {isLoading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-dim)' }}>
            <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 1rem' }} />
            <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em' }}>INITIALIZING...</div>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                <th style={thStyle}>SYSTEM</th>
                <th style={thStyle}>CATEGORY</th>
                <th style={thStyle}>PRICING</th>
                <th style={thStyle}>STATUS</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="hover-row">
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                        <img src={product.images?.[0] || 'https://via.placeholder.com/40'} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--white)', letterSpacing: '0.02em' }}>{product.name}</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>{product.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.1em' }}>{product.category_id?.toUpperCase() || 'GAMING'}</span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--white)' }}>${(product.price || 0).toLocaleString()}</div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ 
                      fontSize: '0.6rem', fontWeight: 800, padding: '0.25rem 0.6rem', borderRadius: '2px',
                      background: product.stock_status === 'in_stock' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      color: product.stock_status === 'in_stock' ? '#4ade80' : 'var(--text-dim)',
                      border: `1px solid ${product.stock_status === 'in_stock' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`
                    }}>{product.stock_status === 'in_stock' ? 'LIVE' : 'DRAFT'}</span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => openEditor(product)} className="action-btn"><Edit2 size={14} /></button>
                      <button onClick={() => deleteProduct(product.id)} className="action-btn"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isEditorOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          >
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }}
              style={{ width: '100%', maxWidth: '1000px', height: '90vh', background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '4px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            >
              <div style={{ padding: '1.5rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#141414' }}>
                <h2 style={{ fontFamily: 'var(--font-d)', fontWeight: 900, fontSize: '1.4rem', margin: 0 }}>PRODUCT ARCHITECT</h2>
                <button onClick={() => setIsEditorOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', opacity: 0.5 }}><X size={24} /></button>
              </div>
              
              <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <div style={{ width: '220px', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                   <EditorNavItem icon={<Layout size={16} />} label="GENERAL" active={activeTab === 'general'} onClick={() => setActiveTab('general')} />
                   <EditorNavItem icon={<Settings size={16} />} label="TECHNICAL" active={activeTab === 'technical'} onClick={() => setActiveTab('technical')} />
                </div>
                <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                  {activeTab === 'general' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                       <FieldGroup label="SYSTEM NAME" value={formData.name} onChange={(v: string) => updateFormData('name', v)} />
                       <FieldGroup label="URL SLUG" value={formData.slug} onChange={(v: string) => updateFormData('slug', v)} />
                       <FieldGroup label="BASE PRICE ($)" value={formData.price} onChange={(v: string) => updateFormData('price', parseFloat(v))} />
                    </div>
                  )}
                  {activeTab === 'technical' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                      <FieldGroup label="CPU" value={formData.specs.cpu} onChange={(v: string) => updateSpec('cpu', v)} />
                      <FieldGroup label="GRAPHICS CARD" value={formData.specs.gpu} onChange={(v: string) => updateSpec('gpu', v)} />
                      <FieldGroup label="RAM" value={formData.specs.ram} onChange={(v: string) => updateSpec('ram', v)} />
                    </div>
                  )}
                </div>
              </div>

              <div style={{ padding: '1.5rem 2.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'flex-end', gap: '1.25rem', background: '#141414' }}>
                <button onClick={handleDeploy} className="btn btn-solid" style={{ padding: '0.8rem 2.5rem' }}>DEPLOY SYSTEM</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .hover-row:hover { background: rgba(255,255,255,0.02) !important; }
        .action-btn { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.3); padding: 0.5rem; border-radius: 2px; cursor: pointer; }
        .action-btn:hover { color: var(--white); border-color: rgba(255,255,255,0.2); }
      `}} />
    </div>
  );
}

function StatCard({ label, value, trend, warning }: any) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.25rem', borderRadius: '4px' }}>
      <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{label}</div>
      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: warning ? '#f87171' : 'var(--white)' }}>{value}</div>
    </div>
  );
}

function EditorNavItem({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} style={{ 
      display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem',
      background: active ? 'rgba(255,255,255,0.05)' : 'transparent', border: '1px solid', borderColor: active ? 'rgba(255,255,255,0.1)' : 'transparent',
      borderRadius: '4px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s'
    }}>
      <div style={{ color: active ? 'var(--accent-light)' : 'var(--text-dim)' }}>{icon}</div>
      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: active ? 'var(--white)' : 'var(--text-dim)', letterSpacing: '0.1em' }}>{label}</span>
    </button>
  );
}

function FieldGroup({ label, placeholder, type = 'text', options = [], value, onChange }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.1em' }}>{label}</label>
      <input 
        type="text" value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} 
        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem 1rem', borderRadius: '4px', color: 'var(--white)', fontSize: '0.8rem' }}
      />
    </div>
  );
}
