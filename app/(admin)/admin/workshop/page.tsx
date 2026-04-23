import AdminLayout from '@/components/admin/AdminLayout';
import ModuleHub from '@/components/admin/ModuleHub';
import { Cpu, FileCheck, Monitor, Wrench, RotateCcw } from 'lucide-react';
import BuildQueueSection from '@/components/admin/sections/BuildQueueSection';

export default function WorkshopHub() {
  const sections = [
    {
      id: 'queue',
      title: 'Build Queue',
      icon: <Cpu size={18} />,
      content: <BuildQueueSection />
    },
    {
      id: 'slips',
      title: 'Build Slips',
      icon: <FileCheck size={18} />,
      content: <Placeholder label="TECHNICAL MANIFESTS" />
    },
    {
      id: 'machines',
      title: 'Machines',
      icon: <Monitor size={18} />,
      content: <Placeholder label="LAB HARDWARE MONITOR" />
    },
    {
      id: 'repairs',
      title: 'Repairs',
      icon: <Wrench size={18} />,
      content: <Placeholder label="SERVICING LOGS" />
    },
    {
      id: 'rma',
      title: 'RMA',
      icon: <RotateCcw size={18} />,
      content: <Placeholder label="SUPPLIER RETURNS" />
    }
  ];

  return (
    <AdminLayout title="WORKSHOP HUB">
      <ModuleHub 
        title="ENGINEERING LAB" 
        subtitle="PRODUCTION & TECHNICAL" 
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
