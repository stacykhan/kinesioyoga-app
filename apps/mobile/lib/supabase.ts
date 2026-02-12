import Constants from 'expo-constants';
import { createClient } from '@supabase/supabase-js';
import type { DB } from '../types/db';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl as string;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey as string;

export const supabase = createClient<DB>(supabaseUrl, supabaseAnonKey);
