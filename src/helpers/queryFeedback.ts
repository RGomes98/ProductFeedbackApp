import { getFeedback } from '@/data-access/feedback';
import { redirect } from 'next/navigation';

export type SelectedFeedback = Awaited<ReturnType<typeof getFeedback>>;

export const queryFeedback = async (feedbackId: string) => {
  try {
    return await getFeedback(Number(feedbackId));
  } catch (error) {
    redirect('/');
  }
};
