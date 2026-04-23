import AdminLayout from '@/components/admin/AdminLayout';
import ModuleHub from '@/components/admin/ModuleHub';
import { ShieldCheck, ClipboardList, CheckCircle, BarChart2 } from 'lucide-react';

export default function WarrantyHub() {
  const sections = [
    {
      id: 'claims',
      title: 'Claims',
      icon: <ClipboardList size={18} />,
      content: <Placeholder label="WARRANTY CLAIM QUEUE" />
    },
    {
      id: 'active',
      title: 'Active Warranties',
      icon: <ShieldCheck size={18} />,
      content: <Placeholder label="COVERAGE REGISTRY" />
    },
    {
      id: 'reports',
      title: 'Reliability Report',
      icon: <BarChart2 size={18} />,
      content: <Placeholder label="FAILURE RATE ANALYTICS" />
    }
  ];

  return (
    <AdminLayout title="WARRANTY HUB">
      <ModuleHub 
        title="SUPPORT ASSURANCE" 
        subtitle="POST-SALES & RELIABILITY" 
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
