import { decrementFeedbackUpvote, incrementFeedbackUpvote } from '@/data-access/feedback';
import { prisma } from '@/lib/prisma';

export const getFeedbackUpvote = async (userId: string, feedbackId: number) => {
  return await prisma.upvote.findUnique({ where: { userId_feedbackId: { userId, feedbackId } } });
};

export const createFeedbackUpvote = async (userId: string, feedbackId: number) => {
  await prisma.upvote.create({ data: { userId, feedbackId } });
};

export const deleteFeedbackUpvote = async (upvoteId: string) => {
  await prisma.upvote.delete({ where: { id: upvoteId } });
};

export const updateFeedbackUpvote = async (userId: string, feedbackId: number) => {
  await prisma.$transaction(async () => {
    const upvote = await getFeedbackUpvote(userId, feedbackId);
    if (upvote) await Promise.all([deleteFeedbackUpvote(upvote.id), decrementFeedbackUpvote(feedbackId)]);
    else await Promise.all([createFeedbackUpvote(userId, feedbackId), incrementFeedbackUpvote(feedbackId)]);
  });
};
