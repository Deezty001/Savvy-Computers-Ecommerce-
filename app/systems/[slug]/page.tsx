import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import ProductPageClient from '../ProductPageClient';

export const revalidate = 900; // Balanced: 15 minutes


export async function generateStaticParams() {
  const { data: products } = await supabase.from('products').select('slug');
  return (products || []).map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  // 1. Fetch core product data and upgrades in a single trip
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      categories(slug),
      product_upgrades(*)
    `)
    .eq('slug', params.slug)
    .order('sort_order', { foreignTable: 'product_upgrades', ascending: true })
    .single();

  if (error || !product) notFound();

  // 2. Fetch recommendations in parallel
  const { data: recommendations } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', product.category_id)
    .neq('id', product.id)
    .limit(4);

  const upgrades = product.product_upgrades;


  return (
    <Suspense fallback={<div style={{ background: '#0a0a0a', minHeight: '100vh' }} />}>
      <ProductPageClient 
        product={product} 
        upgrades={upgrades || []} 
        recommendations={recommendations || []} 
      />
    </Suspense>
  );
}
