'use client';

import { updateFeedbackUpvoteAction } from '@/server-actions/update-feedback-upvote-action';
import { useServerActionFormState } from '@/hooks/useServerActionFormState';
import { LoadingSpinnerIcon } from '@/components/Icons/LoadingSpinnerIcon';
import { ArrowUpIcon } from '@/components/Icons/ArrowUpIcon';
import { useFormStatus } from 'react-dom';

import styles from './UpvoteForm.module.scss';

export const UpvoteForm = ({
  id,
  upvotes,
  isUpvotedByUser,
}: {
  id: number;
  upvotes: number;
  isUpvotedByUser: boolean;
}) => {
  const { formRef, formState, formAction } = useServerActionFormState({
    fieldValues: { path: '', feedbackId: '' },
    serverAction: updateFeedbackUpvoteAction,
  });

  return (
    <form className={styles.container} data-upvote={isUpvotedByUser} ref={formRef} action={formAction}>
      <ArrowUpIcon className={styles.icon} />
      <span className={styles.count}>{upvotes}</span>
      <input value={id} name='feedbackId' type='text' readOnly hidden />
      <input value='/' name='path' type='text' readOnly hidden />
      <SubmitButton />
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      data-loading={pending}
      className={styles.button}
      onClick={(event) => event.stopPropagation()}
    >
      <LoadingSpinnerIcon className={styles.spinner} data-loading={pending} />
    </button>
  );
};
