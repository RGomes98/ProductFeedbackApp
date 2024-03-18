import { CreateFeedbackPage } from '@/components/CreateFeedbackPage/CreateFeedbackPage';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function Page() {
  const userId = (await auth())?.user?.id;
  if (!userId) redirect('/');

  return <CreateFeedbackPage />;
}
