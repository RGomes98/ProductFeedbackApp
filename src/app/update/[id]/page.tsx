import { UpdateFeedbackPage } from '@/components/UpdateFeedbackPage/UpdateFeedbackPage';
import { queryFeedback } from '@/helpers/queryFeedback';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const feedback = await queryFeedback(id);
  const userId = (await auth())?.user?.id;

  if (!userId || feedback.userId !== userId) redirect('/');

  return <UpdateFeedbackPage feedback={feedback} />;
}
