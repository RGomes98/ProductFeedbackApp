import { z } from 'zod';

export const feedbackUpvoteSchema = z.object({
  path: z.coerce.string(),
  feedbackId: z.coerce.number().int().positive(),
});

export type FeedbackUpvote = z.infer<typeof feedbackUpvoteSchema>;
