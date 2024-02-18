import { queryAndSortProductFeedbacks } from '@/helpers/queryAndSortProductFeedbacks';
import type { SearchParamsFilter } from '@/helpers/queryAndSortProductFeedbacks';
import { Feedback } from './Feedback/Feedback';
import { SortBy } from './SortBy/SortBy';

import styles from './FeedbackHub.module.scss';
import { EmptyFeedbacks } from './EmptyFeedbacks/EmptyFeedbacks';

export const FeedbackHub = async ({ order, filter, orderBy }: SearchParamsFilter) => {
  const feedbacks = await queryAndSortProductFeedbacks({ order, filter, orderBy });

  return (
    <section className={styles.container}>
      <SortBy suggestionsCount={feedbacks.length} />
      <div className={styles.feedbackContainer}>
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => <Feedback key={feedback.id} {...feedback} />)
        ) : (
          <EmptyFeedbacks />
        )}
      </div>
    </section>
  );
};
