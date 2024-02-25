import type { SearchParamsFilter } from '@/helpers/queryAndSortProductFeedbacks';
import { FeedbackHub } from '@/components/FeedbackHub/FeedbackHub';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Navbar } from '@/components/Navbar/Navabar';
import { Fragment } from 'react';

export default function Home({
  searchParams: { order, filter, orderBy },
}: {
  searchParams: SearchParamsFilter;
}) {
  return (
    <Fragment>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Sidebar />
        <FeedbackHub {...{ order, filter, orderBy }} />
      </main>
    </Fragment>
  );
}
