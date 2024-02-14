import { z } from 'zod';

export const productFeedbackUpvoteSchema = z.object({
  productFeedbackId: z.coerce.number().int().positive(),
});
