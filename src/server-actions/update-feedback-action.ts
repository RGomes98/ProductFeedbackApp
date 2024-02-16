'use server';

import { feedbackUpdateSchema } from '@/lib/schemas/feedback-update-schema';
import { getFeedback, updateFeedback } from '@/data-access/feedback';
import type { FormState } from '@/hooks/useServerActionFormState';
import { assertIsError } from '@/utils/assertIsError';
import { auth } from '@/auth';

import {
  authenticationErrorResponse,
  invalidFieldsErrorResponse,
  resolveHTTPResponse,
} from '@/utils/serverActionsResponses';

export const updateFeedbackAction = async (formState: FormState, formData: FormData): Promise<FormState> => {
  const fields = new Set(['category', 'title', 'status', 'description', 'feedbackId']);
  const feedback = feedbackUpdateSchema.safeParse(Object.fromEntries(formData));
  const userId = (await auth())?.user?.id;

  if (!userId) return authenticationErrorResponse(fields);

  if (!feedback.success) return invalidFieldsErrorResponse(formData, feedback.error, fields);

  try {
    const feedbackToUpdate = await getFeedback(feedback.data.feedbackId);
    await updateFeedback(userId, { ...feedback.data, feedbackId: feedbackToUpdate.id });

    return resolveHTTPResponse('OK', 'feedback successfully updated', fields);
  } catch (error) {
    assertIsError(error);
    return resolveHTTPResponse('INTERNAL_SERVER_ERROR', error.message, fields);
  }
};
