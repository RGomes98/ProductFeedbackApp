import { CreateFeedback } from '@/components/CreateFeedback/CreateFeedback';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function Page() {
  const userId = (await auth())?.user?.id;
  if (!userId) redirect('/');

  return <CreateFeedback />;
}
