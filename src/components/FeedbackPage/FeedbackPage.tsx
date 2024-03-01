import { getFeedbackTotalComments } from '@/utils/getFeedbackTotalComments';
import type { SelectedFeedback } from '@/helpers/queryFeedback';
import { EmptyComments } from './EmptyComments/EmptyComments';
import { CreateComment } from './CreateComment/CreateComment';
import { Feedback } from '../FeedbackHub/Feedback/Feedback';
import { queryComments } from '@/helpers/queryComments';
import { BackButton } from '../BackButton/BackButton';
import { Comments } from './Comments/Comments';
import { Fragment } from 'react';

import styles from './FeedbackPage.module.scss';
import Link from 'next/link';

export const FeedbackPage = async (feedback: SelectedFeedback) => {
  const comments = await queryComments(feedback.id);
  const countMessage = getFeedbackTotalComments(feedback) > 1 ? 'Comments' : 'Comment';

  return (
    <div className={styles.container}>
      <div className={styles.actionsWrapper}>
        <div className={styles.feedbackActions}>
          <BackButton />
          <Link className={styles.editFeedback} href='#'>
            Edit Feedback
          </Link>
        </div>
        <Feedback {...feedback} />
      </div>
      <div className={styles.feedbackComments}>
        {comments.length > 0 ? (
          <Fragment>
            <span className={styles.commentsCount}>
              {getFeedbackTotalComments(feedback)} {countMessage}
            </span>
            <div className={styles.commentWrapper}>
              {comments.map((comment) => (
                <Comments key={comment.id} {...{ ...comment, feedbackId: feedback.id }} />
              ))}
            </div>
          </Fragment>
        ) : (
          <EmptyComments />
        )}
      </div>
      <CreateComment feedbackId={feedback.id} />
    </div>
  );
};
