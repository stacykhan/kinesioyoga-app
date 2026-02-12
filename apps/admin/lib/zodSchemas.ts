import { z } from 'zod';

export const translationsSchema = z.object({
  en: z.any(),
  ru: z.any(),
  it: z.any()
});

export const lessonSchema = z.object({
  slug: z.string().min(2),
  duration_minutes: z.number().int().positive(),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  category_id: z.number().int().positive(),
  youtube_id: z.string().min(3),
  is_premium: z.boolean(),
  translations: translationsSchema
});

export const categorySchema = z.object({ slug: z.string().min(2), translations: z.object({ en: z.string(), ru: z.string(), it: z.string() }) });
export const programSchema = z.object({ slug: z.string().min(2), translations: z.object({ en: z.string(), ru: z.string(), it: z.string() }) });
