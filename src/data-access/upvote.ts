import { decrementFeedbackUpvote, incrementFeedbackUpvote } from './product-feedback';
import { prisma } from '@/lib/prisma';

export const getUpvote = async (userId: string, feedbackId: number) => {
  return await prisma.upvote.findUnique({ where: { userId_feedbackId: { userId, feedbackId } } });
};

export const createUpvote = async (userId: string, feedbackId: number) => {
  await prisma.upvote.create({ data: { userId, feedbackId } });
};

export const deleteUpvote = async (upvoteId: string) => {
  await prisma.upvote.delete({ where: { id: upvoteId } });
};

export const updateUpvote = async (userId: string, feedbackId: number) => {
  await prisma.$transaction(async () => {
    const upvote = await getUpvote(userId, feedbackId);
    if (upvote) await Promise.all([deleteUpvote(upvote.id), decrementFeedbackUpvote(feedbackId)]);
    else await Promise.all([createUpvote(userId, feedbackId), incrementFeedbackUpvote(feedbackId)]);
  });
};
