import type { FilteredFeedbacks } from './queryAndSortProductFeedbacks';
import { getFeedbacks } from '@/data-access/feedback';

export type FeedbacksByStatus = Record<string, FilteredFeedbacks[]>;

export const queryFeedbacksByStatus = async () => {
  return (await getFeedbacks()).reduce<FeedbacksByStatus>((obj, feedback) => {
    if (!obj[feedback.status]) obj[feedback.status] = [];
    obj[feedback.status].push(feedback);
    obj[feedback.status].sort((a, b) => b.upvotes - a.upvotes);
    return obj;
  }, {});
};
