import { Suspense } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import GamingClient from '../GamingClient';
import { products as staticProducts } from '@/lib/data/products';

export const revalidate = 900; // Balanced: 15 minutes


export async function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ['1080p'] },
    { slug: ['1440p'] },
    { slug: ['4k'] },
    { slug: ['8k'] },
    { slug: ['stealth'] },
    { slug: ['rgb'] },
    { slug: ['compact'] },
  ];
}

export default async function GamingPage({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.[0];
  let products = [];

  try {
    if (isSupabaseConfigured) {
      const { data: prodData, error } = await supabase
        .from('products')
        .select('*, categories!inner(slug)')
        .eq('categories.slug', 'gaming')
        .order('sort_order', { ascending: true });
      
      if (prodData && prodData.length > 0) {
        products = prodData;
      } else {
        throw new Error('No products found in DB');
      }
    } else {

      throw new Error('Supabase not configured');
    }
  } catch (err: any) {
    console.warn('Gaming Page: Falling back to static data due to:', err?.message || 'Unknown error');
    products = staticProducts.filter(p => p.category === 'gaming');
  }

  return (
    <Suspense fallback={<div style={{ background: '#0a0a0a', minHeight: '100vh' }} />}>
      <GamingClient slug={slug} initialProducts={products} />
    </Suspense>
  );
}
