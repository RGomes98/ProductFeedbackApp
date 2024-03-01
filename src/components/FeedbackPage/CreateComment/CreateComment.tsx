'use client';

import { createFeedbackCommentAction } from '@/server-actions/create-feedback-comment-action';
import { useServerActionFormState } from '@/hooks/useServerActionFormState';
import { SubmitButton } from '@/components/SubmitButton/SubmitButton';
import { Error } from '@/components/Error/Error';
import { useState } from 'react';

import styles from './CreateComment.module.scss';

export const CreateComment = ({ feedbackId }: { feedbackId: number }) => {
  const { formRef, formState, formAction } = useServerActionFormState({
    fieldValues: { path: '', content: '', feedbackId: '' },
    onSuccessActions: [() => setInputCount(0)],
    serverAction: createFeedbackCommentAction,
  });

  const [inputCount, setInputCount] = useState(0);

  return (
    <div className={styles.container}>
      <span className={styles.heading}>Add Comment</span>
      <form id='create' className={styles.form} ref={formRef} action={formAction}>
        <textarea
          data-error={Boolean(formState.fieldErrors?.['content'])}
          onChange={(event) => setInputCount(event.target.value.length)}
          className={styles.textarea}
          placeholder='Type your comment here'
          name='content'
        />
        <input name='feedbackId' value={feedbackId} type='text' readOnly hidden />
        <input name='path' value={`/feedback/${feedbackId}`} type='text' readOnly hidden />
        {formState.fieldErrors && <Error error={formState.fieldErrors['content']} />}
        <div className={styles.wrapper}>
          <span data-limit={inputCount > 250} className={styles.count}>
            {250 - inputCount} characters left
          </span>
          <SubmitButton text='Post Comment' className={styles.button} />
        </div>
      </form>
    </div>
  );
};
