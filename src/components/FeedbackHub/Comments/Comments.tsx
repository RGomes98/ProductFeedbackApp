import { CommentIcon } from '@/components/Icons/CommentIcon';
import styles from './Comments.module.scss';
import { FilteredFeedbacks } from '@/helpers/queryAndSortProductFeedbacks';

export const Comments = ({ _count }: Pick<FilteredFeedbacks, '_count'>) => {
  return (
    <div className={styles.container}>
      <CommentIcon className={styles.icon} />
      <span className={styles.count} data-empty={_count.comments === 0}>
        {_count.comments}
      </span>
    </div>
  );
};
