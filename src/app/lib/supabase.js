// app/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const role = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !anon) {
  throw new Error(
    'Supabase env vars are missing. ' +
    'Did you forget NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY?'
  );
}

export const supabase = createClient(url, anon);

// ─── server-only admin client ───
export const supabaseAdmin =
  typeof window === 'undefined' && role
    ? createClient(url, role, { auth: { persistSession: false } })
    : null;
