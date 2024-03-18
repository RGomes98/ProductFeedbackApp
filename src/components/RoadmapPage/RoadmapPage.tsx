import { DesktopFeedbackContainer } from './DesktopFeedbackContainer/DesktopFeedbackContainer';
import { MobileFeedbackContainer } from './MobileFeedbackContainer/MobileFeedbackContainer';
import { StatusMobileMenu } from './StatusMobileMenu/StatusMobileMenu';
import { Status } from '../UpdateFeedbackPage/UpdateFeedbackPage';
import { getFeedbackStatusesCount } from '@/data-access/feedback';
import { RoadmapMenu } from './RoadmapMenu/RoadmapMenu';

import styles from './RoadmapPage.module.scss';

export const RoadmapPage = async ({ status }: { status: Status }) => {
  const statusesCount = await getFeedbackStatusesCount();

  return (
    <div className={styles.container}>
      <RoadmapMenu />
      <StatusMobileMenu statusesCount={statusesCount} />
      <DesktopFeedbackContainer />
      <MobileFeedbackContainer status={status} />
    </div>
  );
};
