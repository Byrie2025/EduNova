import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oppztypwzaygvyysxkqb.supabase.co'
const supabaseKey = 'sb_publishable_Xl4lgAB2W12meMDNR8OngA_2QQujjWo'

export const supabase = createClient(supabaseUrl, supabaseKey)