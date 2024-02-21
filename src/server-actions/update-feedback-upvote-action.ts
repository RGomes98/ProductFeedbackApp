'use server';

import { invalidFieldsErrorResponse, resolveHTTPResponse } from '@/utils/serverActionsResponses';
import { feedbackUpvoteSchema } from '@/lib/schemas/feedback-upvote-schema';
import { FormState } from '@/hooks/useServerActionFormState';
import { updateFeedbackUpvote } from '@/data-access/upvote';
import { assertIsError } from '@/utils/assertIsError';
import { getFeedback } from '@/data-access/feedback';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export const updateFeedbackUpvoteAction = async (
  formState: FormState,
  formData: FormData
): Promise<FormState> => {
  const feedbackUpvote = feedbackUpvoteSchema.safeParse(Object.fromEntries(formData));
  const fields = new Set(['path', 'feedbackId']);
  const userId = (await auth())?.user?.id;

  if (!userId) redirect('/login');

  if (!feedbackUpvote.success) return invalidFieldsErrorResponse(formData, feedbackUpvote.error, fields);

  try {
    const feedback = await getFeedback(feedbackUpvote.data.feedbackId);
    await updateFeedbackUpvote(userId, feedback.id);
    revalidatePath(feedbackUpvote.data.path);

    return resolveHTTPResponse('OK', 'upvote successfully updated', fields);
  } catch (error) {
    assertIsError(error);
    return resolveHTTPResponse('INTERNAL_SERVER_ERROR', error.message, fields);
  }
};
