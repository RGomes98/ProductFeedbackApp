import { queryProductFeedbackStatusesCount } from '@/helpers/queryProductFeedbackStatusesCount';

import styles from './Statuses.module.scss';
import Link from 'next/link';

export const Statuses = async () => {
  const statuses = await queryProductFeedbackStatusesCount();

  return (
    <div className={styles.container}>
      <div className={styles.headingWrapper}>
        <span className={styles.heading}>Roadmap</span>
        <Link className={styles.link} href='/roadmap'>
          View
        </Link>
      </div>
      <ul className={styles.statusList}>
        <li className={styles.statusItem}>
          <div className={styles.statusWrapper}>
            <div className={styles.statusColor} />
            <span className={styles.status}>Planned</span>
          </div>
          <span className={styles.count}>{statuses.PLANNED ?? 0}</span>
        </li>
        <li className={styles.statusItem}>
          <div className={styles.statusWrapper}>
            <div className={styles.statusColor} />
            <span className={styles.status}>In-Progress</span>
          </div>
          <span className={styles.count}>{statuses.IN_PROGRESS ?? 0}</span>
        </li>
        <li className={styles.statusItem}>
          <div className={styles.statusWrapper}>
            <div className={styles.statusColor} />
            <span className={styles.status}>Live</span>
          </div>
          <span className={styles.count}>{statuses.LIVE ?? 0}</span>
        </li>
      </ul>
    </div>
  );
};
