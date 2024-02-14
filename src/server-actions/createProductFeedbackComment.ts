'use server';

import { productFeedbackCommentSchema } from '@/lib/schemas/productFeedbackComment.schema';
import { parseZodFieldErrors } from '@/helpers/parseZodFieldErrors ';
import { FormState } from '@/hooks/useServerActionFormState';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

import HttpStatusCode from '@/utils/HttpStatusCodeEnum';

export const createProductFeedbackComment = async (
  formState: FormState,
  formData: FormData
): Promise<FormState> => {
  const productFeedbackComment = productFeedbackCommentSchema.safeParse(Object.fromEntries(formData));
  const userId = (await auth())?.user?.id;

  if (!userId) {
    return {
      fieldErrors: undefined,
      fieldValues: { title: '', category: '', description: '' },
      status: { code: HttpStatusCode['UNAUTHORIZED'], message: 'Authentication required.' },
    };
  }

  if (!productFeedbackComment.success) {
    return {
      fieldValues: {
        content: String(formData.get('content')),
        productFeedbackId: String(formData.get('productFeedbackId')),
      },
      fieldErrors: parseZodFieldErrors(productFeedbackComment.error),
      status: { code: HttpStatusCode['BAD_REQUEST'], message: 'Invalid form submission.' },
    };
  }

  const { content, productFeedbackId } = productFeedbackComment.data;

  try {
    const productFeedback = await prisma.productFeedback.findFirstOrThrow({
      where: { id: productFeedbackId },
    });

    await prisma.comment.create({ data: { content, userId, feedbackId: productFeedback.id } });

    return {
      fieldErrors: undefined,
      fieldValues: { title: '', category: '', description: '' },
      status: { code: HttpStatusCode['OK'], message: 'Comment successfully created.' },
    };
  } catch (error) {
    return {
      fieldErrors: undefined,
      fieldValues: { title: '', category: '', description: '' },
      status: { code: HttpStatusCode['NOT_FOUND'], message: 'Product feedback not found.' },
    };
  }
};
