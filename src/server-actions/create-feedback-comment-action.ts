'use server';

import { feedbackCommentSchema } from '@/lib/schemas/feedback-comment-schema';
import type { FormState } from '@/hooks/useServerActionFormState';
import { createFeedbackComment } from '@/data-access/comment';
import { assertIsError } from '@/utils/assertIsError';
import { getFeedback } from '@/data-access/feedback';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

import {
  authenticationErrorResponse,
  invalidFieldsErrorResponse,
  resolveHTTPResponse,
} from '@/utils/serverActionsResponses';

export const createFeedbackCommentAction = async (
  formState: FormState,
  formData: FormData
): Promise<FormState> => {
  const feedbackComment = feedbackCommentSchema.safeParse(Object.fromEntries(formData));
  const fields = new Set(['path', 'content', 'feedbackId']);
  const userId = (await auth())?.user?.id;

  if (!userId) return authenticationErrorResponse(fields);

  if (!feedbackComment.success) return invalidFieldsErrorResponse(formData, feedbackComment.error, fields);

  try {
    const feedback = await getFeedback(feedbackComment.data.feedbackId);
    createFeedbackComment(userId, { ...feedbackComment.data, feedbackId: feedback.id });

    revalidatePath(feedbackComment.data.path);
    return resolveHTTPResponse('OK', 'comment successfully created', fields);
  } catch (error) {
    assertIsError(error);
    return resolveHTTPResponse('INTERNAL_SERVER_ERROR', error.message, fields);
  }
};
