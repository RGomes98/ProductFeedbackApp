import { Category, Status } from '@prisma/client';
import { z } from 'zod';

export const feedbackUpdateSchema = z.object({
  feedbackId: z.coerce.number().int().positive(),
  title: z.string().trim().min(1, { message: 'required' }),
  status: z.nativeEnum(Status, { errorMap: () => ({ message: 'invalid status' }) }),
  category: z.nativeEnum(Category, { errorMap: () => ({ message: 'invalid category' }) }),
  description: z.string().trim().min(10, { message: 'must be at least 10 characters long' }),
});

export type FeedbackUpdate = z.infer<typeof feedbackUpdateSchema>;
