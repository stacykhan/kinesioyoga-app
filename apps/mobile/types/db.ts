export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type DB = {
  public: {
    Tables: {
      lessons: {
        Row: {
          id: number;
          slug: string;
          duration_minutes: number;
          level: 'beginner' | 'intermediate' | 'advanced';
          category_id: number;
          youtube_id: string;
          is_premium: boolean;
          translations: Record<string, { title: string; description: string; contraindications: string }>;
        };
      };
      categories: {
        Row: { id: number; slug: string; translations: Record<string, string> };
      };
      favorites: { Row: { user_id: string; lesson_id: number } };
      progress: { Row: { user_id: string; lesson_id: number; completed_at: string } };
      programs: { Row: { id: number; slug: string; translations: Record<string, string> } };
      program_days: { Row: { program_id: number; day_number: number; lesson_id: number } };
    };
  };
};
