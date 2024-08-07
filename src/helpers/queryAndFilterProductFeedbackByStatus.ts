import { Status } from '@/components/UpdateFeedbackPage/UpdateFeedbackPage';
import { getFeedbackByStatus } from '@/data-access/feedback';

export const queryAndFilterProductFeedbackByStatus = async (status: Status) => {
  const statusFilter = !status ? 'PLANNED' : status;
  try {
    return (await getFeedbackByStatus(statusFilter)).sort((a, b) => b.upvotes - a.upvotes);
  } catch (error) {
    return [];
  }
};
