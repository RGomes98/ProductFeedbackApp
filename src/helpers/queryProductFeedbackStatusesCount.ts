import { getFeedbackStatusesCount } from '@/data-access/feedback';

export type StatusesCount = Awaited<ReturnType<typeof getFeedbackStatusesCount>>;

export const queryProductFeedbackStatusesCount = async () => {
  try {
    return (await getFeedbackStatusesCount()).reduce<Record<string, number>>((obj, { status, _count }) => {
      obj[String(status)] = _count.status;
      return obj;
    }, {});
  } catch (error) {
    return {};
  }
};
