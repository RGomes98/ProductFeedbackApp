import type { CategoryFilter, OrderByFilter } from '@/helpers/queryAndSortProductFeedbacks';
import type { FeedbackUpdate } from '@/lib/schemas/feedback-update-schema';
import type { Feedback } from '@/lib/schemas/feedback-schema';
import { prisma } from '@/lib/prisma';

export const createFeedback = async (userId: string, feedback: Feedback) => {
  const { path, ...dataToCreate } = feedback;
  await prisma.productFeedback.create({ data: { userId, ...dataToCreate } });
};

export const updateFeedback = async (userId: string, feedback: FeedbackUpdate) => {
  const { feedbackId, ...dataToUpdate } = feedback;
  await prisma.productFeedback.update({ where: { userId, id: feedbackId }, data: dataToUpdate });
};

export const incrementFeedbackUpvote = async (feedbackId: number) => {
  await prisma.productFeedback.update({ where: { id: feedbackId }, data: { upvotes: { increment: 1 } } });
};

export const decrementFeedbackUpvote = async (feedbackId: number) => {
  await prisma.productFeedback.update({ where: { id: feedbackId }, data: { upvotes: { decrement: 1 } } });
};

export const filterFeedback = async (orderByFilter: OrderByFilter, categoryFilter: CategoryFilter) => {
  return await prisma.productFeedback.findMany({
    orderBy: orderByFilter,
    where: { category: categoryFilter, status: 'SUGGESTION' },
    include: {
      Upvote: true,
      _count: { select: { comments: true } },
      comments: { select: { _count: { select: { replies: true } } } },
    },
  });
};

export const getFeedbackStatusesCount = async () => {
  return await prisma.productFeedback.groupBy({ by: ['status'], _count: { status: true } });
};

export const getFeedback = async (feedbackId: number) => {
  const feedback = await prisma.productFeedback.findFirst({
    where: { id: feedbackId },
    include: {
      Upvote: true,
      _count: { select: { comments: true } },
      comments: { select: { _count: { select: { replies: true } } } },
    },
  });

  if (!feedback) throw new Error('feedback not found');

  return feedback;
};
