import { DesktopFeedbackContainer } from './DesktopFeedbackContainer/DesktopFeedbackContainer';
import { MobileFeedbackContainer } from './MobileFeedbackContainer/MobileFeedbackContainer';
import { StatusMobileMenu } from './StatusMobileMenu/StatusMobileMenu';
import { Status } from '../UpdateFeedbackPage/UpdateFeedbackPage';
import { getFeedbackStatusesCount } from '@/data-access/feedback';
import { RoadmapMenu } from './RoadmapMenu/RoadmapMenu';
import { redirect } from 'next/navigation';

import styles from './RoadmapPage.module.scss';

export const RoadmapPage = async ({ status }: { status: Status }) => {
  let statusesCount: Awaited<ReturnType<typeof getFeedbackStatusesCount>>;

  try {
    statusesCount = await getFeedbackStatusesCount();
  } catch (error) {
    redirect('/');
  }

  return (
    <div className={styles.container}>
      <RoadmapMenu />
      <StatusMobileMenu statusesCount={statusesCount} />
      <DesktopFeedbackContainer />
      <MobileFeedbackContainer status={status} />
    </div>
  );
};
