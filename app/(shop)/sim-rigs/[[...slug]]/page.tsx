import { Suspense } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import SimRigsClient from '../SimRigsClient';
import { products as staticProducts } from '@/lib/data/products';

export const revalidate = 900; // Balanced: 15 minutes


export async function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ['racing'] },
    { slug: ['flight'] },
  ];
}

export default async function SimRigsPage({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.[0];
  let products = [];

  try {
    if (isSupabaseConfigured) {
      const { data: prodData } = await supabase
        .from('products')
        .select('*, categories!inner(slug)')
        .eq('categories.slug', 'sim')
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
    console.warn('Sim Rigs Page: Falling back to static data due to:', err?.message || 'Unknown error');
    products = staticProducts.filter((p: any) => p.category === 'sim');
  }

  return (
    <Suspense fallback={<div style={{ background: '#0a0a0a', minHeight: '100vh' }} />}>
      <SimRigsClient slug={slug} initialProducts={products} />
    </Suspense>
  );
}
