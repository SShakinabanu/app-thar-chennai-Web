import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://smggqljhznutxauqafgb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_hcAfOAqp-MJbNyT0BKFS_A_VoA2RZrK';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
