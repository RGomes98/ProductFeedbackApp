import { FeedbackPage } from '@/components/FeedbackPage/FeedbackPage';
import { queryFeedback } from '@/helpers/queryFeedback';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const feedback = await queryFeedback(id);
  return <FeedbackPage {...feedback} />;
}
