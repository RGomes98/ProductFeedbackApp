'use server';

import { feedbackReplySchema } from '@/lib/schemas/feedback-reply-schema';
import { FormState } from '@/hooks/useServerActionFormState';
import { getFeedbackComment } from '@/data-access/comment';
import { createFeedbackReply } from '@/data-access/reply';
import { assertIsError } from '@/utils/assertIsError';
import { auth } from '@/auth';

import {
  authenticationErrorResponse,
  invalidFieldsErrorResponse,
  resolveHTTPResponse,
} from '@/utils/serverActionsResponses';

export const createFeedbackReplyAction = async (
  formState: FormState,
  formData: FormData
): Promise<FormState> => {
  const feedbackReply = feedbackReplySchema.safeParse(Object.fromEntries(formData));
  const fields = new Set(['content', 'repliedTo', 'commentId']);
  const userId = (await auth())?.user?.id;

  if (!userId) return authenticationErrorResponse(fields);

  if (!feedbackReply.success) return invalidFieldsErrorResponse(formData, feedbackReply.error, fields);

  try {
    const feedbackComment = await getFeedbackComment(feedbackReply.data.commentId);
    await createFeedbackReply(userId, { ...feedbackReply.data, commentId: feedbackComment.id });

    return resolveHTTPResponse('OK', 'reply successfully created', fields);
  } catch (error) {
    assertIsError(error);
    return resolveHTTPResponse('NOT_FOUND', error.message, fields);
  }
};
