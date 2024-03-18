import { Status } from '@/components/UpdateFeedbackPage/UpdateFeedbackPage';
import { queryFeedbacksByStatus } from '@/helpers/queryFeedbacksByStatus';
import { RoadmapFeedback } from '../RoadmapFeedback/RoadmapFeedback';
import { getFeedbackStatusesCount } from '@/data-access/feedback';
import { formatStatusName } from '@/utils/formatStatusName';

import styles from './DesktopFeedbackContainer.module.scss';

export const DesktopFeedbackContainer = async () => {
  const feedbacks = await queryFeedbacksByStatus();
  const statusesCount = await getFeedbackStatusesCount();

  return (
    <div className={styles.container}>
      {(Object.keys(feedbacks) as Status[]).map((status) => {
        const statusCount = statusesCount.find((statusValue) => statusValue.status === status)?._count.status;

        return (
          <div className={styles.column} key={status}>
            <div className={styles.statusHeadingWrapper}>
              <span className={styles.statusHeading}>
                {formatStatusName(status)} ({statusCount})
              </span>
              {status === 'PLANNED' && (
                <span className={styles.description}>Ideas prioritized for research</span>
              )}
              {status === 'IN_PROGRESS' && (
                <span className={styles.description}>Currently being developed</span>
              )}
              {status === 'LIVE' && <span className={styles.description}>Released features</span>}
            </div>
            {feedbacks[status].map((feedback) => (
              <RoadmapFeedback key={feedback.id} {...feedback} />
            ))}
          </div>
        );
      })}
    </div>
  );
};
