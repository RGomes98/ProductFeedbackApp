'use server';

import { productFeedbackReplySchema } from '@/lib/schemas/productFeedbackReply.schema';
import { parseZodFieldErrors } from '@/helpers/parseZodFieldErrors ';
import { FormState } from '@/hooks/useServerActionFormState';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

import HttpStatusCode from '@/utils/HttpStatusCodeEnum';

export const createProductFeedbackReply = async (
  formState: FormState,
  formData: FormData
): Promise<FormState> => {
  const productFeedbackReply = productFeedbackReplySchema.safeParse(Object.fromEntries(formData));
  const userId = (await auth())?.user?.id;

  if (!userId) {
    return {
      fieldErrors: undefined,
      fieldValues: { title: '', category: '', description: '' },
      status: { code: HttpStatusCode['UNAUTHORIZED'], message: 'Authentication required.' },
    };
  }

  if (!productFeedbackReply.success) {
    return {
      fieldValues: {
        content: String(formData.get('content')),
        repliedTo: String(formData.get('repliedTo')),
        commentId: String(formData.get('commentId')),
      },
      fieldErrors: parseZodFieldErrors(productFeedbackReply.error),
      status: { code: HttpStatusCode['BAD_REQUEST'], message: 'Invalid form submission.' },
    };
  }

  const { content, commentId, repliedTo } = productFeedbackReply.data;

  try {
    const productFeedbackComment = await prisma.comment.findFirstOrThrow({ where: { id: commentId } });
    await prisma.reply.create({ data: { content, userId, repliedTo, commentId: productFeedbackComment.id } });

    return {
      fieldErrors: undefined,
      fieldValues: { title: '', category: '', description: '' },
      status: { code: HttpStatusCode['OK'], message: 'Reply successfully created.' },
    };
  } catch (error) {
    return {
      fieldErrors: undefined,
      fieldValues: { title: '', category: '', description: '' },
      status: { code: HttpStatusCode['NOT_FOUND'], message: 'Product feedback comment not found.' },
    };
  }
};
