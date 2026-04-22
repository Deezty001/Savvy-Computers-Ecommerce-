import { createClient } from '@supabase/supabase-js';
import { products, categories } from '../lib/data/products'; 

// NOTE: You must have these in your .env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrate() {
  console.log('--- STARTING MIGRATION ---');

  // 1. Insert Categories
  console.log('Migrating categories...');
  const { data: catData, error: catError } = await supabase
    .from('categories')
    .upsert(
      categories.filter(c => c.id !== 'all').map(c => ({
        name: c.name,
        slug: c.id, // Using existing ID as slug
        is_active: true
      })),
      { onConflict: 'slug' }
    )
    .select();

  if (catError) {
    console.error('Error migrating categories:', catError);
    return;
  }
  console.log('Categories migrated successfully.');

  // Create a mapping of slug to ID
  const catMap: Record<string, string> = {};
  catData?.forEach(c => {
    catMap[c.slug] = c.id;
  });

  // 2. Insert Products
  console.log('Migrating products...');
  const productsToInsert = products.map(p => ({
    name: p.name,
    slug: p.slug,
    price: p.price,
    description: p.desc,
    specs: p.specs,
    images: p.images,
    category_id: catMap[p.category],
    stock_status: p.stock > 0 ? 'in_stock' : 'build_to_order',
    stock_quantity: p.stock,
    is_top_seller: p.featured || false,
    is_featured: p.featured || false,
    meta_title: `${p.name} | Savvy Computers`,
    meta_description: p.shortDesc
  }));

  const { error: prodError } = await supabase
    .from('products')
    .upsert(productsToInsert, { onConflict: 'slug' });

  if (prodError) {
    console.error('Error migrating products:', prodError);
    return;
  }

  console.log('--- MIGRATION COMPLETE ---');
}

migrate();
