import type { FeedbackComment } from '@/lib/schemas/feedback-comment-schema';
import { prisma } from '@/lib/prisma';

export const createFeedbackComment = async (userId: string, feedbackComment: FeedbackComment) => {
  await prisma.comment.create({ data: { userId, ...feedbackComment } });
};

export const getFeedbackComment = async (feedbackCommentId: string) => {
  const comment = await prisma.comment.findFirst({ where: { id: feedbackCommentId } });
  if (!comment) throw new Error('feedback comment not found');
  return comment;
};
