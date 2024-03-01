'use server';

import type { FormState } from '@/hooks/useServerActionFormState';
import { feedbackSchema } from '@/lib/schemas/feedback-schema';
import { createFeedback } from '@/data-access/feedback';
import { assertIsError } from '@/utils/assertIsError';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

import {
  authenticationErrorResponse,
  invalidFieldsErrorResponse,
  resolveHTTPResponse,
} from '@/utils/serverActionsResponses';

export const createFeedbackAction = async (formState: FormState, formData: FormData): Promise<FormState> => {
  const feedback = feedbackSchema.safeParse(Object.fromEntries(formData));
  const fields = new Set(['path', 'category', 'title', 'description']);
  const userId = (await auth())?.user?.id;

  if (!userId) return authenticationErrorResponse(fields);

  if (!feedback.success) return invalidFieldsErrorResponse(formData, feedback.error, fields);

  try {
    await createFeedback(userId, feedback.data);

    revalidatePath(feedback.data.path);
    return resolveHTTPResponse('OK', 'feedback successfully created', fields);
  } catch (error) {
    assertIsError(error);
    return resolveHTTPResponse('INTERNAL_SERVER_ERROR', error.message, fields);
  }
};
