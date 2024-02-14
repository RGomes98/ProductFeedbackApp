import { z } from 'zod';

export const productFeedbackCommentSchema = z.object({
  productFeedbackId: z.coerce.number().int().positive(),
  content: z
    .string()
    .min(1, { message: 'required' })
    .max(250, { message: 'content must not exceed 250 characters' }),
});
