import { Status } from '@/components/UpdateFeedbackPage/UpdateFeedbackPage';
import { formatStatusName } from '@/utils/formatStatusName';

import styles from './FeedbackStatus.module.scss';

export const FeedbackStatus = ({ status }: { status: Status }) => {
  return (
    <div className={styles.container}>
      <span className={`${styles.circle} ${styles[`${status}`]}`} />
      <span className={styles.text}>{formatStatusName(status)}</span>
    </div>
  );
};
