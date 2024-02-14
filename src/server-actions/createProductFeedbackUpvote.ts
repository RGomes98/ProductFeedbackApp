'use server';

import { productFeedbackUpvoteSchema } from '@/lib/schemas/productFeedbackUpvote.schema';
import { parseZodFieldErrors } from '@/helpers/parseZodFieldErrors ';
import { FormState } from '@/hooks/useServerActionFormState';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

import HttpStatusCode from '@/utils/HttpStatusCodeEnum';

export const createProductFeedbackUpvote = async (
  formState: FormState,
  formData: FormData
): Promise<FormState> => {
  const productFeedbackUpvote = productFeedbackUpvoteSchema.safeParse(Object.fromEntries(formData));
  const userId = (await auth())?.user?.id;

  if (!userId) {
    return {
      fieldErrors: undefined,
      fieldValues: { title: '', category: '', description: '' },
      status: { code: HttpStatusCode['UNAUTHORIZED'], message: 'Authentication required.' },
    };
  }

  if (!productFeedbackUpvote.success) {
    return {
      fieldErrors: parseZodFieldErrors(productFeedbackUpvote.error),
      fieldValues: { productFeedbackId: String(formData.get('productFeedbackId')) },
      status: { code: HttpStatusCode['BAD_REQUEST'], message: 'Invalid form submission.' },
    };
  }

  const { productFeedbackId } = productFeedbackUpvote.data;

  try {
    await prisma.productFeedback.findFirstOrThrow({ where: { id: productFeedbackId } });

    await prisma.$transaction(async (prisma) => {
      const upvote = await prisma.upvote.findUnique({
        where: {
          userId_feedbackId: {
            userId: userId,
            feedbackId: productFeedbackId,
          },
        },
      });

      if (!upvote) {
        const incrementUpvote = prisma.productFeedback.update({
          where: { id: productFeedbackId },
          data: { upvotes: { increment: 1 } },
        });
        const createUpvote = prisma.upvote.create({ data: { userId, feedbackId: productFeedbackId } });

        await Promise.all([incrementUpvote, createUpvote]);
      } else {
        const decrementUpvote = prisma.productFeedback.update({
          where: { id: productFeedbackId },
          data: { upvotes: { decrement: 1 } },
        });
        const deleteUpvote = prisma.upvote.delete({ where: { id: upvote.id } });

        await Promise.all([decrementUpvote, deleteUpvote]);
      }
    });

    return {
      fieldErrors: undefined,
      fieldValues: { title: '', category: '', description: '' },
      status: { code: HttpStatusCode['OK'], message: 'Upvote successfully updated.' },
    };
  } catch (error) {
    return {
      fieldErrors: undefined,
      fieldValues: { title: '', category: '', description: '' },
      status: { code: HttpStatusCode['NOT_FOUND'], message: 'Product feedback not found.' },
    };
  }
};
