import type { FilteredFeedbacks } from '@/helpers/queryAndSortProductFeedbacks';
import { formatCategoryName } from '@/utils/formatCategoryName';
import { UpvoteButton } from '../UpvoteButton/UpvoteButton';
import { Comments } from '../Comments/Comments';

import styles from './Feedback.module.scss';
import Link from 'next/link';

export const Feedback = ({ id, upvotes, title, description, category, _count }: FilteredFeedbacks) => {
  return (
    <Link href='#' className={styles.container}>
      <UpvoteButton {...{ id, upvotes }} />
      <div className={styles.wrapper}>
        <div className={styles.contentWrapper}>
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>{description}</span>
        </div>
        <span className={styles.category}>{formatCategoryName(category)}</span>
      </div>
      <Comments {...{ _count }} />
    </Link>
  );
};
