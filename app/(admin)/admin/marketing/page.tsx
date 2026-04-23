import AdminLayout from '@/components/admin/AdminLayout';
import ModuleHub from '@/components/admin/ModuleHub';
import { Megaphone, Tag, Percent, ShoppingCart } from 'lucide-react';

export default function MarketingHub() {
  const sections = [
    {
      id: 'promotions',
      title: 'Promotions',
      icon: <Megaphone size={18} />,
      content: <Placeholder label="CAMPAIGN MANAGER" />
    },
    {
      id: 'discounts',
      title: 'Discount Codes',
      icon: <Tag size={18} />,
      content: <Placeholder label="COUPON REGISTRY" />
    },
    {
      id: 'abandoned',
      title: 'Abandoned Carts',
      icon: <ShoppingCart size={18} />,
      content: <Placeholder label="RECOVERY PIPELINE" />
    }
  ];

  return (
    <AdminLayout title="MARKETING HUB">
      <ModuleHub 
        title="GROWTH & CONVERSION" 
        subtitle="COMMERCIAL CAMPAIGNS" 
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
