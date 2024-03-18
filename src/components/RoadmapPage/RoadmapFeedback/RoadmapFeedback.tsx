import { UpvoteButton } from '@/components/FeedbackHub/UpvoteButton/UpvoteButton';
import { getFeedbackTotalComments } from '@/utils/getFeedbackTotalComments';
import { FilteredFeedbacks } from '@/helpers/queryAndSortProductFeedbacks';
import { Comments } from '@/components/FeedbackHub/Comments/Comments';
import { FeedbackStatus } from '../FeedbackStatus/FeedbackStatus';
import { formatCategoryName } from '@/utils/formatCategoryName';

import styles from './RoadmapFeedback.module.scss';
import Link from 'next/link';

export const RoadmapFeedback = async (feedback: FilteredFeedbacks) => {
  return (
    <Link href={`/feedback/${feedback.id}`} className={styles.container}>
      <span className={`${styles.bar} ${styles[`${feedback.status}`]}`} />
      <FeedbackStatus status={feedback.status} />
      <div className={styles.feedbackContent}>
        <span className={styles.feedbackTitle}>{feedback.title}</span>
        <p className={styles.feedbackDescription}>{feedback.description}</p>
      </div>
      <span className={styles.category}>{formatCategoryName(feedback.category)}</span>
      <div className={styles.feedbackActionsWrapper}>
        <UpvoteButton feedback={feedback} />
        <Comments {...{ _count: { comments: getFeedbackTotalComments(feedback) } }} />
      </div>
    </Link>
  );
};
