import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check for real configuration
export const isSupabaseConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder') && 
  !supabaseAnonKey.includes('placeholder') &&
  !supabaseUrl.includes('your-project-id');

if (!isSupabaseConfigured) {
  console.warn('⚠️ Supabase credentials missing or using default placeholders.');
}

// Create client
export const supabase = createBrowserClient(
  supabaseUrl!,
  supabaseAnonKey!
);

