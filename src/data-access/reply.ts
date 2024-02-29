import type { FeedbackReply } from '@/lib/schemas/feedback-reply-schema';
import { prisma } from '@/lib/prisma';

export const createFeedbackReply = async (userId: string, feedbackReply: FeedbackReply) => {
  const { path, ...dataToCreate } = feedbackReply;
  await prisma.reply.create({ data: { userId, ...dataToCreate } });
};
