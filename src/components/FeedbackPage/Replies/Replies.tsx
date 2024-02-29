'use client';

import { createFeedbackReplyAction } from '@/server-actions/create-feedback-reply-action';
import { useServerActionFormState } from '@/hooks/useServerActionFormState';
import { SubmitButton } from '@/components/SubmitButton/SubmitButton';
import { FeedbackReplies } from '@/helpers/queryComments';
import { Error } from '@/components/Error/Error';
import { Fragment, useState } from 'react';

import styles from './Replies.module.scss';
import Image from 'next/image';

export const Replies = ({
  id,
  user,
  repliedTo,
  content,
  feedbackId,
}: FeedbackReplies & { feedbackId: number }) => {
  const [isCommentReplyActive, setIsCommentReplyActive] = useState(false);

  const { formRef, formState, formAction } = useServerActionFormState({
    fieldValues: { content: '', repliedTo: '', commentId: '' },
    onSuccessActions: [
      () => {
        setIsCommentReplyActive(false);
        formState.status.code = undefined;
      },
    ],
    serverAction: createFeedbackReplyAction,
  });

  return (
    <div className={styles.container}>
      <div className={styles.profileWrapper}>
        <Image
          className={styles.profilePicture}
          src={String(user.image)}
          alt='profile-picture'
          height={40}
          width={40}
        />
        <div className={styles.nameWrapper}>
          <span className={styles.name}>{user.name}</span>
          <span className={styles.username}>@{user.username}</span>
        </div>
        <button className={styles.replyButton} onClick={() => setIsCommentReplyActive((prev) => !prev)}>
          Reply
        </button>
      </div>
      <div className={styles.replyWrapper}>
        <p className={styles.comment}>
          <span className={styles.variant}>@{repliedTo}</span> {content}
        </p>
        {isCommentReplyActive && (
          <Fragment>
            <form className={styles.form} ref={formRef} action={formAction}>
              <textarea
                data-error={Boolean(formState.fieldErrors?.['content'])}
                placeholder='Type your reply here'
                className={styles.textArea}
                name='content'
              />
              <input name='commentId' type='text' value={id} hidden readOnly />
              <input name='path' type='text' value={`/feedback/${feedbackId}`} hidden readOnly />
              <input name='repliedTo' type='text' value={String(user.username)} hidden readOnly />
              <div className={styles.mobileError}>
                {formState.fieldErrors && <Error error={formState.fieldErrors['content']} />}
              </div>
              <SubmitButton text='Post Reply' className={styles.button} />
            </form>
            <div className={styles.desktopError}>
              {formState.fieldErrors && <Error error={formState.fieldErrors['content']} />}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};
