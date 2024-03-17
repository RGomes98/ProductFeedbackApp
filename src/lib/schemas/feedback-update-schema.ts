import { Category, Status } from '@prisma/client';
import { z } from 'zod';

export const feedbackUpdateSchema = z.object({
  path: z.string(),
  feedbackId: z.coerce.number().int().positive(),
  title: z.string().trim().min(1, { message: 'Can`t be empty' }),
  status: z.nativeEnum(Status, { errorMap: () => ({ message: 'Invalid status' }) }),
  category: z.nativeEnum(Category, { errorMap: () => ({ message: 'Invalid category' }) }),
  description: z.string().trim().min(10, { message: 'Must be at least 10 characters long' }),
});

export type FeedbackUpdate = z.infer<typeof feedbackUpdateSchema>;
