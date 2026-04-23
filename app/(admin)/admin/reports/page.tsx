import AdminLayout from '@/components/admin/AdminLayout';
import ModuleHub from '@/components/admin/ModuleHub';
import { BarChart3, DollarSign, TrendingUp, UserPlus } from 'lucide-react';

export default function ReportsHub() {
  const sections = [
    {
      id: 'revenue',
      title: 'Revenue',
      icon: <DollarSign size={18} />,
      content: <Placeholder label="FINANCIAL ANALYTICS" />
    },
    {
      id: 'gst',
      title: 'GST',
      icon: <BarChart3 size={18} />,
      content: <Placeholder label="TAX LIABILITY LOGS" />
    },
    {
      id: 'performance',
      title: 'Performance',
      icon: <TrendingUp size={18} />,
      content: <Placeholder label="SITE PERFORMANCE METRICS" />
    },
    {
      id: 'customers',
      title: 'Customers',
      icon: <UserPlus size={18} />,
      content: <Placeholder label="DEMOGRAPHIC ANALYTICS" />
    }
  ];

  return (
    <AdminLayout title="REPORTS HUB">
      <ModuleHub 
        title="BUSINESS ANALYTICS" 
        subtitle="FINANCIALS & PERFORMANCE" 
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
