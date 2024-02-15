'use server';

import { feedbackUpvoteSchema } from '@/lib/schemas/feedback-upvote-schema';
import { FormState } from '@/hooks/useServerActionFormState';
import { getFeedback } from '@/data-access/product-feedback';
import { updateUpvote } from '@/data-access/upvote';
import { auth } from '@/auth';

import {
  authenticationErrorResponse,
  invalidFieldsErrorResponse,
  resolveHTTPResponse,
} from '@/utils/serverActionsResponses';

export const createFeedbackUpvoteAction = async (
  formState: FormState,
  formData: FormData
): Promise<FormState> => {
  const feedbackUpvote = feedbackUpvoteSchema.safeParse(Object.fromEntries(formData));
  const fields = new Set(['feedbackId']);
  const userId = (await auth())?.user?.id;

  if (!userId) return authenticationErrorResponse(fields);

  if (!feedbackUpvote.success) return invalidFieldsErrorResponse(formData, feedbackUpvote.error, fields);

  try {
    const feedback = await getFeedback(feedbackUpvote.data.feedbackId);
    await updateUpvote(userId, feedback.id);

    return resolveHTTPResponse('OK', 'upvote successfully updated', fields);
  } catch (error) {
    return resolveHTTPResponse('NOT_FOUND', 'product feedback not found', fields);
  }
};
