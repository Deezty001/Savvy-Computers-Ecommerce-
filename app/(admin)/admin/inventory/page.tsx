import AdminLayout from '@/components/admin/AdminLayout';
import ModuleHub from '@/components/admin/ModuleHub';
import { Package, Layers, Box, ClipboardList, Truck } from 'lucide-react';

export default function InventoryHub() {
  const sections = [
    {
      id: 'stock',
      title: 'Stock',
      icon: <Layers size={18} />,
      content: <Placeholder label="PHYSICAL STOCK LEVELS" />
    },
    {
      id: 'components',
      title: 'Components',
      icon: <Box size={18} />,
      content: <Placeholder label="LOOSE COMPONENT REGISTRY" />
    },
    {
      id: 'po',
      title: 'Purchase Orders',
      icon: <ClipboardList size={18} />,
      content: <Placeholder label="PROCUREMENT PIPELINE" />
    },
    {
      id: 'suppliers',
      title: 'Suppliers',
      icon: <Truck size={18} />,
      content: <Placeholder label="VENDOR DIRECTORY" />
    }
  ];

  return (
    <AdminLayout title="INVENTORY HUB">
      <ModuleHub 
        title="STOCK CONTROL" 
        subtitle="PHYSICAL ASSETS & PROCUREMENT" 
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
