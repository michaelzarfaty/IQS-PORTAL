import { createClient } from '@supabase/supabase-js';

// Read from localStorage first (for the Settings UI), fallback to env vars, fallback to dummy
const supabaseUrl = localStorage.getItem('supabaseUrl') || import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = localStorage.getItem('supabaseAnonKey') || import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
