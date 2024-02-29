import { SelectedFeedback } from '@/helpers/queryFeedback';

export const getFeedbackTotalComments = (feedback: SelectedFeedback) => {
  return feedback.comments.reduce((acc, { _count }) => (acc += _count.replies), 0) + feedback._count.comments;
};
