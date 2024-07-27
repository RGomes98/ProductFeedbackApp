import { getFeedbackComments } from '@/data-access/comment';

export type FeedbackReplies = Awaited<ReturnType<typeof getFeedbackComments>>[number]['replies'][number];
export type FeedbackComment = Awaited<ReturnType<typeof getFeedbackComments>>[number];

export const queryComments = async (feedbackId: number) => {
  try {
    return await getFeedbackComments(feedbackId);
  } catch (error) {
    return [];
  }
};
