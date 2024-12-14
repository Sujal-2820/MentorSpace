// app/api/auth/signout/route.js
import { supabase } from '@/lib/supabase-client';

export async function POST() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ message: 'Logged out successfully' }), { status: 200 });
}
