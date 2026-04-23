import AdminLayout from '@/components/admin/AdminLayout';
import ModuleHub from '@/components/admin/ModuleHub';
import { Monitor, Cpu } from 'lucide-react';
import PartsSection from '@/components/admin/sections/PartsSection';
import SystemsSection from '@/components/admin/sections/SystemsSection';

export default function CatalogueHub() {
  const sections = [
    {
      id: 'systems',
      title: 'Systems',
      icon: <Monitor size={18} />,
      content: <SystemsSection />
    },
    {
      id: 'parts',
      title: 'Parts',
      icon: <Cpu size={18} />,
      content: <PartsSection />
    }
  ];

  return (
    <AdminLayout title="CATALOGUE HUB">
      <ModuleHub 
        title="PRODUCT REGISTRY" 
        subtitle="DEFINITIONS & BLUEPRINTS" 
        sections={sections} 
      />
    </AdminLayout>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.01)', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '4px' }}>
      <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em' }}>{label} SECTION INITIALIZING...</div>
    </div>
  );
}
