import { z } from 'zod';

export const feedbackDeleteSchema = z.object({
  path: z.string(),
  feedbackId: z.coerce.number().int().positive(),
});

export type FeedbackDelete = z.infer<typeof feedbackDeleteSchema>;
