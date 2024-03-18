import { queryAndFilterProductFeedbackByStatus } from '@/helpers/queryAndFilterProductFeedbackByStatus';
import { Status } from '@/components/UpdateFeedbackPage/UpdateFeedbackPage';
import { RoadmapFeedback } from '../RoadmapFeedback/RoadmapFeedback';
import { getFeedbackStatusesCount } from '@/data-access/feedback';
import { formatStatusName } from '@/utils/formatStatusName';

import styles from './MobileFeedbackContainer.module.scss';

export const MobileFeedbackContainer = async ({ status }: { status: Status }) => {
  const feedbacks = await queryAndFilterProductFeedbackByStatus(status);
  const statusesCount = await getFeedbackStatusesCount();
  const statusCount = statusesCount.find((statusValue) => statusValue.status === status)?._count.status;

  return (
    <div className={styles.container}>
      <div className={styles.statusHeadingWrapper}>
        <span className={styles.statusHeading}>
          {formatStatusName(status)} ({statusCount})
        </span>
        {status === 'PLANNED' && <span className={styles.description}>Ideas prioritized for research</span>}
        {status === 'IN_PROGRESS' && <span className={styles.description}>Currently being developed</span>}
        {status === 'LIVE' && <span className={styles.description}>Released features</span>}
      </div>
      {feedbacks.map((feedback) => (
        <RoadmapFeedback key={feedback.id} {...feedback} />
      ))}
    </div>
  );
};
