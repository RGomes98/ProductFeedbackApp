import type { FilteredFeedbacks } from '@/helpers/queryAndSortProductFeedbacks';
import { getFeedbackTotalComments } from '@/utils/getFeedbackTotalComments';
import { formatCategoryName } from '@/utils/formatCategoryName';
import { UpvoteButton } from '../UpvoteButton/UpvoteButton';
import { Comments } from '../Comments/Comments';

import styles from './Feedback.module.scss';
import Link from 'next/link';

export const Feedback = async (feedback: FilteredFeedbacks) => {
  return (
    <Link href={`/feedback/${feedback.id}`} className={styles.container}>
      <UpvoteButton feedback={feedback} />
      <div className={styles.wrapper}>
        <div className={styles.contentWrapper}>
          <p className={styles.title}>{feedback.title}</p>
          <p className={styles.description}>{feedback.description}</p>
        </div>
        <span className={styles.category}>{formatCategoryName(feedback.category)}</span>
      </div>
      <Comments {...{ _count: { comments: getFeedbackTotalComments(feedback) } }} />
    </Link>
  );
};
