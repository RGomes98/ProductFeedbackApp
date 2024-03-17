'use server';

import { feedbackDeleteSchema } from '@/lib/schemas/feedback-delete-schema';
import { deleteFeedback, getFeedback } from '@/data-access/feedback';
import type { FormState } from '@/hooks/useServerActionFormState';
import { assertIsError } from '@/utils/assertIsError';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

import {
  authenticationErrorResponse,
  invalidFieldsErrorResponse,
  resolveHTTPResponse,
} from '@/utils/serverActionsResponses';

export const deleteFeedbackAction = async (formState: FormState, formData: FormData): Promise<FormState> => {
  const feedbackComment = feedbackDeleteSchema.safeParse(Object.fromEntries(formData));
  const fields = new Set(['path', 'feedbackId']);
  const userId = (await auth())?.user?.id;

  if (!userId) return authenticationErrorResponse(fields);

  if (!feedbackComment.success) return invalidFieldsErrorResponse(formData, feedbackComment.error, fields);

  try {
    const feedback = await getFeedback(feedbackComment.data.feedbackId);
    deleteFeedback(userId, feedback.id);

    revalidatePath(feedbackComment.data.path);
    return resolveHTTPResponse('OK', 'feedback successfully deleted', fields);
  } catch (error) {
    assertIsError(error);
    return resolveHTTPResponse('INTERNAL_SERVER_ERROR', error.message, fields);
  }
};
