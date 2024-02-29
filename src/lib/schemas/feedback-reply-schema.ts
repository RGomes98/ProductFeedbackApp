import { z } from 'zod';

export const feedbackReplySchema = z.object({
  path: z.string(),
  repliedTo: z.string(),
  commentId: z.string().uuid(),
  content: z
    .string()
    .trim()
    .min(1, { message: 'Can`t be empty' })
    .max(250, { message: 'Content must not exceed 250 characters' }),
});

export type FeedbackReply = z.infer<typeof feedbackReplySchema>;
