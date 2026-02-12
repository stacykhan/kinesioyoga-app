import { supabase } from './supabase';

export const fetchLessons = async () => {
  const { data, error } = await supabase.from('lessons').select('*').order('id');
  if (error) throw error;
  return data;
};

export const fetchCategories = async () => {
  const { data, error } = await supabase.from('categories').select('*').order('id');
  if (error) throw error;
  return data;
};

export const fetchProgramDays = async () => {
  const { data, error } = await supabase.from('program_days').select('day_number, lesson_id').order('day_number');
  if (error) throw error;
  return data;
};

export const saveFavorite = async (userId: string, lessonId: number) =>
  supabase.from('favorites').upsert({ user_id: userId, lesson_id: lessonId });

export const markDone = async (userId: string, lessonId: number) =>
  supabase.from('progress').upsert({ user_id: userId, lesson_id: lessonId });
