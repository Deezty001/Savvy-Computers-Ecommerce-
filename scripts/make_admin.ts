import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function makeAdmin(email: string) {
  console.log(`Attempting to promote ${email} to Master Architect...`);

  // 1. Get user by email
  const { data: users, error: userError } = await supabase.auth.admin.listUsers();
  
  if (userError) {
    console.error('Error fetching users:', userError.message);
    return;
  }

  const user = users.users.find(u => u.email === email);

  if (!user) {
    console.error(`User with email ${email} not found.`);
    return;
  }

  // 2. Update profile
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ is_admin: true })
    .eq('id', user.id);

  if (updateError) {
    console.error('Error updating profile:', updateError.message);
    return;
  }

  console.log(`Success! ${email} is now an Admin.`);
  console.log('You can now access /admin after completing the 2FA setup.');
}

// Pass the email as an argument
const email = process.argv[2];
if (!email) {
  console.error('Please provide an email address: npx ts-node scripts/make_admin.ts user@example.com');
} else {
  makeAdmin(email);
}
