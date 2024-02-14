import { Category } from '@prisma/client';
import { z } from 'zod';

export const productFeedbackSchema = z.object({
  title: z.string().trim().min(1, { message: 'title required' }),
  category: z.nativeEnum(Category, { errorMap: () => ({ message: 'invalid category' }) }),
  description: z.string().trim().min(10, { message: 'must be at least 10 characters long' }),
});
