import AdminLayout from '@/components/admin/AdminLayout';
import ModuleHub from '@/components/admin/ModuleHub';
import { ShoppingCart, Users, MessageSquare, Briefcase } from 'lucide-react';
import OrdersSection from '@/components/admin/sections/OrdersSection';

export default function OperationsHub() {
  const sections = [
    {
      id: 'orders',
      title: 'Orders',
      icon: <ShoppingCart size={18} />,
      content: <OrdersSection />
    },
    {
      id: 'customers',
      title: 'Customers',
      icon: <Users size={18} />,
      content: <Placeholder label="CUSTOMER DIRECTORY" />
    },
    {
      id: 'enquiries',
      title: 'Enquiries',
      icon: <MessageSquare size={18} />,
      content: <Placeholder label="SUPPORT TICKETS" />
    },
    {
      id: 'leads',
      title: 'B2B Leads',
      icon: <Briefcase size={18} />,
      content: <Placeholder label="PROCUREMENT LEADS" />
    }
  ];

  return (
    <AdminLayout title="OPERATIONS HUB">
      <ModuleHub 
        title="OPERATIONS CONTROL" 
        subtitle="COMMERCIAL & LOGISTICS" 
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
