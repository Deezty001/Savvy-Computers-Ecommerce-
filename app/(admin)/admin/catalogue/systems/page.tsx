'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase/client';
import { 
  Plus, Search, Edit2, Trash2, Globe, Box, 
  Settings, Image as ImageIcon, Layout, ArrowUpRight,
  Cpu, Monitor, Package, DollarSign, Eye, X, Save,
  Loader2, CheckCircle, AlertCircle, Wind, HardDrive, HardDriveDownload, Fan, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // --- Form State ---
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
    <AdminLayout>
      <div style={{ padding: '2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent-light)', letterSpacing: '0.3em', marginBottom: '0.5rem' }}>SYSTEM REPOSITORY</div>
            <h1 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', fontWeight: 700, margin: 0 }}>PRODUCT ARCHITECT</h1>
          </div>
          <button onClick={() => openEditor()} className="btn btn-solid" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1.5rem' }}>
            <Plus size={18} /> CREATE SYSTEM
          </button>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2.5rem' }}>
          <StatCard label="LIVE SYSTEMS" value={products.filter(p => p.stock_status === 'in_stock').length.toString()} trend="+2" />
          <StatCard label="TOTAL VALUE" value={`$${(products.reduce((acc, p) => acc + (p.price || 0), 0) / 1000).toFixed(1)}k`} trend="+12%" />
          <StatCard label="LOW STOCK" value={products.filter(p => (p.stock_quantity || 0) < 5).length.toString()} warning />
          <StatCard label="DRAFTS" value={products.filter(p => p.stock_status !== 'in_stock').length.toString()} />
        </div>

        {/* Filters */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={14} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input 
              type="text" 
              placeholder="SEARCH REPOSITORY..." 
              style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '4px', color: 'var(--white)', fontSize: '0.75rem', letterSpacing: '0.05em' }}
            />
          </div>
          <select style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '0.75rem 1rem', borderRadius: '4px', color: 'var(--white)', fontSize: '0.75rem' }}>
            <option>ALL CATEGORIES</option>
            <option>1080P SYSTEMS</option>
            <option>1440P SYSTEMS</option>
            <option>4K SYSTEMS</option>
            <option>WORKSTATIONS</option>
          </select>
        </div>

        {/* Inventory Table */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
          {isLoading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-dim)' }}>
              <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 1rem' }} />
              <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em' }}>INITIALIZING REPOSITORY...</div>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                  <th style={thStyle}>SYSTEM</th>
                  <th style={thStyle}>CATEGORY</th>
                  <th style={thStyle}>PRICING</th>
                  <th style={thStyle}>STATUS</th>
                  <th style={thStyle}>LAST MODIFIED</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }} className="hover-row">
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
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
                        {product.tags?.includes('Workstation') ? 'WORKSTATION' : 'GAMING'}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--white)' }}>${(product.price || 0).toLocaleString()}</div>
                      <div style={{ fontSize: '0.6rem', color: 'var(--accent-light)', fontWeight: 800 }}>INC. GST</div>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ 
                        fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.1em',
                        padding: '0.25rem 0.6rem', borderRadius: '2px',
                        background: product.stock_status === 'in_stock' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                        color: product.stock_status === 'in_stock' ? '#4ade80' : 'var(--text-dim)',
                        border: `1px solid ${product.stock_status === 'in_stock' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`
                      }}>{product.stock_status === 'in_stock' ? 'LIVE' : 'DRAFT'}</span>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{new Date(product.updated_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</div>
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'flex-end' }}>
                        <button onClick={() => openEditor(product)} className="action-btn edit"><Edit2 size={14} /></button>
                        <button className="action-btn view"><Eye size={14} /></button>
                        <button onClick={() => deleteProduct(product.id)} className="action-btn delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Product Architect Editor Modal */}
      <AnimatePresence>
        {isEditorOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          >
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }}
              style={{ width: '100%', maxWidth: '1100px', height: '90vh', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            >
              {/* Editor Header */}
              <div style={{ padding: '1.25rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0c0c0c' }}>
                <div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--accent-light)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    {formData?.id ? 'DEPLOYED SYSTEM EDITOR' : 'NEW SYSTEM ARCHITECT'}
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '1.4rem', margin: 0 }}>
                    {formData?.name || 'INITIALIZING COMPONENT...'}
                  </h2>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {message && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                      style={{ 
                        display: 'flex', alignItems: 'center', gap: '0.5rem', 
                        padding: '0.5rem 1rem', borderRadius: '4px',
                        background: message.type === 'success' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                        border: `1px solid ${message.type === 'success' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(248, 113, 113, 0.2)'}`,
                        color: message.type === 'success' ? '#4ade80' : '#f87171',
                        fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em'
                      }}
                    >
                      {message.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                      {message.text}
                    </motion.div>
                  )}
                  <button onClick={() => setIsEditorOpen(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--white)' }}>
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Editor Content Area */}
              <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {/* Sidebar Navigation */}
                <div style={{ width: '220px', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <EditorNavItem icon={<Layout size={16} />} label="GENERAL" active={activeTab === 'general'} onClick={() => setActiveTab('general')} />
                  <EditorNavItem icon={<DollarSign size={16} />} label="COMMERCIAL" active={activeTab === 'commercial'} onClick={() => setActiveTab('commercial')} />
                  <EditorNavItem icon={<Settings size={16} />} label="TECHNICAL" active={activeTab === 'technical'} onClick={() => setActiveTab('technical')} />
                  <EditorNavItem icon={<ImageIcon size={16} />} label="MEDIA HUB" active={activeTab === 'media'} onClick={() => setActiveTab('media')} />
                  <EditorNavItem icon={<Globe size={16} />} label="SEO SUITE" active={activeTab === 'seo'} onClick={() => setActiveTab('seo')} />
                </div>

                {/* Main Form Fields */}
                <div style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }} className="custom-scroll">
                  {activeTab === 'general' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      <FormSection title="IDENTITY">
                        <FieldGroup label="SYSTEM NAME" value={formData.name} onChange={(v: string) => updateFormData('name', v)} placeholder="e.g. APEX CORE V4" />
                        <FieldGroup label="URL SLUG" value={formData.slug} onChange={(v: string) => updateFormData('slug', v)} placeholder="apex-core-v4" />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                          <FieldGroup label="PRIMARY CATEGORY" type="select" value={formData.category} onChange={(v: string) => updateFormData('category', v)} options={['GAMING', 'WORKSTATION', 'SIMULATORS']} />
                          <FieldGroup label="AVAILABILITY" type="select" value={formData.status} onChange={(v: string) => updateFormData('status', v)} options={['LIVE', 'DRAFT', 'ARCHIVED']} />
                        </div>
                      </FormSection>
                      <FormSection title="COLLECTIONS & TAGGING">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                          <div>
                            <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem' }}>GAMING ATTRIBUTES</div>
                            <TagGrid tags={['1080p', '1440p', '4K', '8K', 'Stealth', 'RGB', 'Compact']} selected={formData.tags} onChange={(t) => updateFormData('tags', t)} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem' }}>WORKSTATION ATTRIBUTES</div>
                            <TagGrid tags={['Content Creation', 'CAD / Engineering', 'AI / ML', 'Tower', 'Rack']} selected={formData.tags} onChange={(t) => updateFormData('tags', t)} />
                          </div>
                        </div>
                      </FormSection>
                      <FormSection title="EDITORIAL">
                        <FieldGroup label="SHORT DESCRIPTION" type="textarea" value={formData.short_description} onChange={(v: any) => updateFormData('short_description', v)} placeholder="Marketing hook..." />
                        <FieldGroup label="RICH DESCRIPTION" type="textarea" value={formData.description} onChange={(v: any) => updateFormData('description', v)} placeholder="Detailed overview..." height="150px" />
                      </FormSection>
                    </div>
                  )}

                  {activeTab === 'commercial' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      <FormSection title="PRICING">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                          <FieldGroup label="BASE PRICE ($)" value={formData.price} onChange={(v: string) => updateFormData('price', parseFloat(v))} placeholder="6499" />
                        </div>
                      </FormSection>
                    </div>
                  )}

                  {activeTab === 'technical' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      <FormSection title="CORE TECHNICAL MANIFEST">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                          <FieldGroup label="CPU" value={formData.specs.cpu} onChange={(v: string) => updateSpec('cpu', v)} placeholder="Intel Core i9-14900K" />
                          <FieldGroup label="CPU COOLER" value={formData.specs.cooler} onChange={(v: string) => updateSpec('cooler', v)} placeholder="360mm AIO" />
                          <FieldGroup label="MOTHERBOARD" value={formData.specs.motherboard} onChange={(v: string) => updateSpec('motherboard', v)} placeholder="Z790 DDR5" />
                          <FieldGroup label="RAM" value={formData.specs.ram} onChange={(v: string) => updateSpec('ram', v)} placeholder="64GB DDR5" />
                          <FieldGroup label="PRIMARY STORAGE" value={formData.specs.primary_storage} onChange={(v: string) => updateSpec('primary_storage', v)} placeholder="2TB NVMe SSD" />
                          <FieldGroup label="SECONDARY STORAGE" value={formData.specs.secondary_storage} onChange={(v: string) => updateSpec('secondary_storage', v)} placeholder="Optional..." />
                          <FieldGroup label="GRAPHICS CARD" value={formData.specs.gpu} onChange={(v: string) => updateSpec('gpu', v)} placeholder="RTX 4090" />
                          <FieldGroup label="POWER SUPPLY" value={formData.specs.psu} onChange={(v: string) => updateSpec('psu', v)} placeholder="1000W 80+" />
                          <FieldGroup label="CASE" value={formData.specs.case} onChange={(v: string) => updateSpec('case', v)} placeholder="Mid-Tower" />
                          <FieldGroup label="FANS" value={formData.specs.fans} onChange={(v: string) => updateSpec('fans', v)} placeholder="7x ARGB Fans" />
                        </div>
                      </FormSection>
                    </div>
                  )}

                  {activeTab === 'media' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      <FormSection title="PRIMARY SYSTEM IMAGERY">
                        <FieldGroup label="HERO IMAGE URL" value={formData.image_url} onChange={(v: string) => updateFormData('image_url', v)} placeholder="https://..." />
                        <div style={{ marginTop: '1rem', border: '1px dashed rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '4px', textAlign: 'center' }}>
                          {formData.image_url ? (
                            <img src={formData.image_url} style={{ width: '100%', height: '300px', objectFit: 'contain' }} />
                          ) : (
                            <ImageIcon size={32} opacity={0.2} />
                          )}
                        </div>
                      </FormSection>
                    </div>
                  )}

                  {activeTab === 'seo' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      <FormSection title="SEARCH ENGINE OPTIMIZATION">
                        <FieldGroup label="META TITLE" value={formData.seo.title} onChange={(v: string) => updateSEO('title', v)} placeholder="Max 60 characters..." />
                        <FieldGroup label="META DESCRIPTION" type="textarea" value={formData.seo.description} onChange={(v: string) => updateSEO('description', v)} placeholder="Max 160 characters..." height="100px" />
                      </FormSection>
                    </div>
                  )}
                </div>
              </div>

              {/* Editor Footer */}
              <div style={{ padding: '1.25rem 2.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', background: '#0c0c0c' }}>
                <button onClick={() => setIsEditorOpen(false)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', padding: '0.75rem 1.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>CANCEL</button>
                <button 
                  onClick={handleDeploy}
                  disabled={isDeploying}
                  className="btn btn-solid" 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 2rem' }}
                >
                  {isDeploying ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  {isDeploying ? 'DEPLOYING...' : 'DEPLOY SYSTEM'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}

function TagGrid({ tags, selected = [], onChange }: { tags: string[], selected?: string[], onChange: (tags: string[]) => void }) {
  const toggle = (tag: string) => {
    const next = selected.includes(tag) ? selected.filter(t => t !== tag) : [...selected, tag];
    onChange(next);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {tags.map(tag => {
        const isActive = selected.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => toggle(tag)}
            style={{
              padding: '0.4rem 0.75rem', borderRadius: '2px', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
              background: isActive ? 'var(--accent-light)' : 'rgba(255,255,255,0.03)',
              color: isActive ? 'var(--black)' : 'var(--text-dim)',
              border: `1px solid ${isActive ? 'var(--accent-light)' : 'rgba(255,255,255,0.05)'}`,
            }}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}

function StatCard({ label, value, trend, warning }: any) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.25rem', borderRadius: '4px' }}>
      <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: warning ? '#f87171' : 'var(--white)' }}>{value}</div>
      </div>
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

function FormSection({ title, children }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h3 style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-light)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>{children}</div>
    </div>
  );
}

function FieldGroup({ label, placeholder, type = 'text', options = [], value, onChange, height }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.1em' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        {type === 'select' ? (
          <select 
            value={value} onChange={(e) => onChange(e.target.value)}
            style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem 1rem', borderRadius: '4px', color: 'var(--white)', fontSize: '0.8rem' }}
          >
            {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ) : type === 'textarea' ? (
          <textarea 
            value={value} onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder} 
            style={{ width: '100%', height: height || '80px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem 1rem', borderRadius: '4px', color: 'var(--white)', fontSize: '0.8rem', resize: 'none' }}
          />
        ) : (
          <input 
            type="text" value={value} onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder} 
            style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem 1rem', borderRadius: '4px', color: 'var(--white)', fontSize: '0.8rem' }}
          />
        )}
        <style jsx global>{`
        .hover-row { cursor: pointer; transition: background 0.2s; }
        .hover-row:hover { background: rgba(255,255,255,0.02); }
        .action-btn { 
          background: transparent; border: 1px solid rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.3); padding: 0.5rem; border-radius: 2px; cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex; alignItems: center; justifyContent: center;
        }
        .action-btn:hover { border-color: rgba(255,255,255,0.2); color: var(--white); }
        .action-btn.edit:hover { background: rgba(173, 133, 106, 0.1); border-color: var(--accent-light); color: var(--accent-light); }
        .action-btn.view:hover { background: rgba(255, 255, 255, 0.05); }
        .action-btn.delete:hover { background: rgba(248, 113, 113, 0.1); border-color: #f87171; color: #f87171; }
      `}</style>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = { padding: '1rem 1.5rem', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase' };
const tdStyle: React.CSSProperties = { padding: '1rem 1.5rem', verticalAlign: 'middle' };
