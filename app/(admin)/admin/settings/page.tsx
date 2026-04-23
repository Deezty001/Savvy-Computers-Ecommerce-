import AdminLayout from '@/components/admin/AdminLayout';
import ModuleHub from '@/components/admin/ModuleHub';
import { Settings, Truck, CreditCard, Mail, Users, Share2 } from 'lucide-react';

export default function SettingsHub() {
  const sections = [
    {
      id: 'general',
      title: 'General',
      icon: <Settings size={18} />,
      content: <Placeholder label="STORE IDENTITY & DEFAULTS" />
    },
    {
      id: 'shipping',
      title: 'Shipping',
      icon: <Truck size={18} />,
      content: <Placeholder label="LOGISTICS CONFIGURATION" />
    },
    {
      id: 'payments',
      title: 'Payments',
      icon: <CreditCard size={18} />,
      content: <Placeholder label="GATEWAY INTEGRATIONS" />
    },
    {
      id: 'email',
      title: 'Email',
      icon: <Mail size={18} />,
      content: <Placeholder label="COMMUNICATION TEMPLATES" />
    },
    {
      id: 'users',
      title: 'Admin Users',
      icon: <Users size={18} />,
      content: <Placeholder label="STAFF ACCESS CONTROL" />
    },
    {
      id: 'integrations',
      title: 'Integrations',
      icon: <Share2 size={18} />,
      content: <Placeholder label="EXTERNAL API HUB" />
    }
  ];

  return (
    <AdminLayout title="SETTINGS HUB">
      <ModuleHub 
        title="SYSTEM CONFIGURATION" 
        subtitle="INFRASTRUCTURE & PREFERENCES" 
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
