import { createClient } from '@supabase/supabase-js';
import { getEnvVar } from '@/utils/env';
import type { Database } from './types';

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey); 