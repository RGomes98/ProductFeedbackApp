import { Category } from '@prisma/client';
import { z } from 'zod';

export const feedbackSchema = z.object({
  path: z.string(),
  title: z.string().trim().min(1, { message: 'Can`t be empty' }),
  category: z.nativeEnum(Category, { errorMap: () => ({ message: 'Invalid category' }) }),
  description: z.string().trim().min(10, { message: 'Must be at least 10 characters long' }),
});

export type Feedback = z.infer<typeof feedbackSchema>;
