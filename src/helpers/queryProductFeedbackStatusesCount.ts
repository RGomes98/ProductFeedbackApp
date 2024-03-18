import { getFeedbackStatusesCount } from '@/data-access/feedback';
import { Status } from '@prisma/client';

export type StatusesCount = Awaited<ReturnType<typeof getFeedbackStatusesCount>>;

export const queryProductFeedbackStatusesCount = async () => {
  return (await getFeedbackStatusesCount()).reduce((obj, { status, _count }) => {
    obj[status] = _count.status;
    return obj;
  }, {} as Record<Status, number>);
};
