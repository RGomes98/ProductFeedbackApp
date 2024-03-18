import { Status } from '@/components/UpdateFeedbackPage/UpdateFeedbackPage';
import { RoadmapPage } from '@/components/RoadmapPage/RoadmapPage';

export default async function Page({ searchParams: { status } }: { searchParams: { status: Status } }) {
  return <RoadmapPage status={status} />;
}
