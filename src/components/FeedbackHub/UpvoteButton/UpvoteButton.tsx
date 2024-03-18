import { FilteredFeedbacks } from '@/helpers/queryAndSortProductFeedbacks';
import { UpvoteForm } from '../UpvoteForm/UpvoteForm';
import { auth } from '@/auth';

export const UpvoteButton = async ({ feedback }: { feedback: FilteredFeedbacks }) => {
  const sessionId = (await auth())?.user?.id;
  const isUpvotedByUser = feedback.Upvote.some(({ userId }) => userId === sessionId);
  return <UpvoteForm id={feedback.id} upvotes={feedback.upvotes} isUpvotedByUser={isUpvotedByUser} />;
};
