import type { FeedbackComment } from '@/lib/schemas/feedback-comment-schema';
import { prisma } from '@/lib/prisma';

export const createFeedbackComment = async (userId: string, feedbackComment: FeedbackComment) => {
  const { path, ...dataToCreate } = feedbackComment;
  await prisma.comment.create({ data: { userId, ...dataToCreate } });
};

export const getFeedbackComment = async (feedbackCommentId: string) => {
  const comment = await prisma.comment.findFirst({ where: { id: feedbackCommentId } });
  if (!comment) throw new Error('comment not found');
  return comment;
};

export const getFeedbackComments = async (feedbackId: number) => {
  return await prisma.comment.findMany({
    where: { feedbackId },
    orderBy: { createdAt: 'asc' },
    include: {
      user: { select: { name: true, username: true, image: true } },
      replies: {
        orderBy: { createdAt: 'asc' },
        include: { user: { select: { name: true, username: true, image: true } } },
      },
    },
  });
};
