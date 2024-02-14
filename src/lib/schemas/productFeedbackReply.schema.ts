import { z } from 'zod';

export const productFeedbackReplySchema = z.object({
  commentId: z.string().uuid(),
  repliedTo: z.string().trim().min(1, { message: 'required' }),
  content: z
    .string()
    .trim()
    .min(1, { message: 'required' })
    .max(250, { message: 'content must not exceed 250 characters' }),
});
