import type { CategoryFilter, OrderByFilter } from '@/helpers/queryAndSortProductFeedbacks';
import type { Feedback } from '@/lib/schemas/feedback-schema';
import { prisma } from '@/lib/prisma';

export const createFeedback = async (userId: string, feedback: Feedback) => {
  await prisma.productFeedback.create({ data: { userId, ...feedback } });
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
    where: { category: categoryFilter },
    include: { _count: { select: { comments: true } } },
  });
};

export const getFeedback = async (feedbackId: number) => {
  const feedback = await prisma.productFeedback.findFirst({ where: { id: feedbackId } });
  if (!feedback) throw new Error('feedback not found');
  return feedback;
};
