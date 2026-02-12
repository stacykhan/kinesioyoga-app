import { supabase } from './supabaseClient';

export async function signInAdmin(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function requireAdmin() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return false;
  const { data } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
  return data?.role === 'admin';
}
