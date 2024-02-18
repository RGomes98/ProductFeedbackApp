import type { SearchParamsFilter } from '@/helpers/queryAndSortProductFeedbacks';
import { FeedbackHub } from '@/components/FeedbackHub/FeedbackHub';
import { Sidebar } from '@/components/Sidebar/Sidebar';

export default async function Home({
  searchParams: { order, filter, orderBy },
}: {
  searchParams: SearchParamsFilter;
}) {
  return (
    <main>
      <Sidebar />
      <FeedbackHub {...{ order, filter, orderBy }} />
    </main>
  );
}
