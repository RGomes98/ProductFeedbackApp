'use server';

import { productFeedbackSchema } from '@/lib/schemas/productFeedback.schema';
import { parseZodFieldErrors } from '@/helpers/parseZodFieldErrors ';
import { FormState } from '@/hooks/useServerActionFormState';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

import HttpStatusCode from '@/utils/HttpStatusCodeEnum';

export const createProductFeedback = async (formState: FormState, formData: FormData): Promise<FormState> => {
  const productFeedback = productFeedbackSchema.safeParse(Object.fromEntries(formData));
  const userId = (await auth())?.user?.id;

  if (!userId) {
    return {
      fieldErrors: undefined,
      fieldValues: { title: '', category: '', description: '' },
      status: { code: HttpStatusCode['UNAUTHORIZED'], message: 'Authentication required.' },
    };
  }

  if (!productFeedback.success) {
    return {
      fieldValues: {
        title: String(formData.get('title')),
        category: String(formData.get('category')),
        description: String(formData.get('description')),
      },
      fieldErrors: parseZodFieldErrors(productFeedback.error),
      status: { code: HttpStatusCode['BAD_REQUEST'], message: 'Invalid form submission.' },
    };
  }

  const { title, description, category } = productFeedback.data;
  await prisma.productFeedback.create({ data: { userId, title, category, description } });

  return {
    fieldErrors: undefined,
    fieldValues: { title: '', category: '', description: '' },
    status: { code: HttpStatusCode['OK'], message: 'Product feedback successfully created.' },
  };
};
