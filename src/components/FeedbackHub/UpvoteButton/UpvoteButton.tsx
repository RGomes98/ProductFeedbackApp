import type { ProductFeedback } from '@prisma/client';
import { ArrowUpIcon } from '@/components/Icons/ArrowUpIcon';

import styles from './UpvoteButton.module.scss';

export const UpvoteButton = ({ id, upvotes }: Pick<ProductFeedback, 'id' | 'upvotes'>) => {
  return (
    <div className={styles.container}>
      <ArrowUpIcon className={styles.icon} />
      <span className={styles.count}>{upvotes}</span>
    </div>
  );
};
