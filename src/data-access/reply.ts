import type { FeedbackReply } from '@/lib/schemas/feedback-reply-schema';
import { prisma } from '@/lib/prisma';

export const createFeedbackReply = async (userId: string, feedbackReply: FeedbackReply) => {
  await prisma.reply.create({ data: { userId, ...feedbackReply } });
};
