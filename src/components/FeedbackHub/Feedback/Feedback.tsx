import type { FilteredFeedbacks } from '@/helpers/queryAndSortProductFeedbacks';
import { formatCategoryName } from '@/utils/formatCategoryName';
import { UpvoteButton } from '../UpvoteButton/UpvoteButton';
import { Comments } from '../Comments/Comments';
import { auth } from '@/auth';

import styles from './Feedback.module.scss';
import Link from 'next/link';

export const Feedback = async ({
  id,
  upvotes,
  title,
  description,
  category,
  _count,
  Upvote,
}: FilteredFeedbacks) => {
  const sessionId = (await auth())?.user?.id;
  const isUpvotedByUser = Upvote.some(({ userId }) => userId === sessionId);

  return (
    <Link href='#' className={styles.container}>
      <UpvoteButton {...{ id, upvotes, isUpvotedByUser }} />
      <div className={styles.wrapper}>
        <div className={styles.contentWrapper}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </div>
        <span className={styles.category}>{formatCategoryName(category)}</span>
      </div>
      <Comments {...{ _count }} />
    </Link>
  );
};
