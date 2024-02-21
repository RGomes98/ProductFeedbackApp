'use client';

import { updateFeedbackUpvoteAction } from '@/server-actions/update-feedback-upvote-action';
import { useServerActionFormState } from '@/hooks/useServerActionFormState';
import { ArrowUpIcon } from '@/components/Icons/ArrowUpIcon';
import type { ProductFeedback } from '@prisma/client';

import styles from './UpvoteButton.module.scss';

export const UpvoteButton = ({
  id,
  upvotes,
  isUpvotedByUser,
}: Pick<ProductFeedback, 'id' | 'upvotes'> & { isUpvotedByUser: boolean }) => {
  const { formRef, formState, formAction } = useServerActionFormState({
    fieldValues: { path: '/', feedbackId: '' },
    serverAction: updateFeedbackUpvoteAction,
  });

  return (
    <form className={styles.container} ref={formRef} action={formAction}>
      <button
        onClick={(event) => event.stopPropagation()}
        data-upvote={isUpvotedByUser}
        className={styles.button}
        type='submit'
      >
        <ArrowUpIcon className={styles.icon} />
        <span className={styles.count}>{upvotes}</span>
        <input hidden readOnly value={id} name='feedbackId' type='text' />
      </button>
    </form>
  );
};
