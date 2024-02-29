import { z } from 'zod';

export const feedbackCommentSchema = z.object({
  path: z.string(),
  feedbackId: z.coerce.number().int().positive(),
  content: z
    .string()
    .trim()
    .min(1, { message: 'Can`t be empty' })
    .max(250, { message: 'Content must not exceed 250 characters' }),
});

export type FeedbackComment = z.infer<typeof feedbackCommentSchema>;
