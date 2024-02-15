import { z } from 'zod';

export const feedbackCommentSchema = z.object({
  feedbackId: z.coerce.number().int().positive(),
  content: z
    .string()
    .trim()
    .min(1, { message: 'required' })
    .max(250, { message: 'content must not exceed 250 characters' }),
});

export type FeedbackComment = z.infer<typeof feedbackCommentSchema>;
