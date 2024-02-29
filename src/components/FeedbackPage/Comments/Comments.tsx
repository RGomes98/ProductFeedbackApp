'use client';

import { createFeedbackReplyAction } from '@/server-actions/create-feedback-reply-action';
import { useServerActionFormState } from '@/hooks/useServerActionFormState';
import { SubmitButton } from '@/components/SubmitButton/SubmitButton';
import type { FeedbackComment } from '@/helpers/queryComments';
import { Error } from '@/components/Error/Error';
import { Replies } from '../Replies/Replies';
import { Fragment, useState } from 'react';

import styles from './Comments.module.scss';
import Image from 'next/image';

export const Comments = ({
  id,
  user,
  content,
  replies,
  feedbackId,
}: FeedbackComment & { feedbackId: number }) => {
  const [isCommentReplyActive, setIsCommentReplyActive] = useState(false);

  const { formRef, formState, formAction } = useServerActionFormState({
    fieldValues: { path: '', content: '', repliedTo: '', commentId: '' },
    onSuccessActions: [() => setIsCommentReplyActive(false)],
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
      <div className={styles.commentWrapper} data-hascomments={replies.length > 0}>
        <div className={styles.desktopBar}>
          <div className={styles.barContainer}>
            <span className={styles.bar} data-hascomments={replies.length > 0} />
          </div>
        </div>
        <div className={styles.mobileContent}>
          <p className={styles.comment}>{content}</p>
          {isCommentReplyActive && (
            <Fragment>
              <form className={styles.form} action={formAction}>
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

        <div className={styles.replyWrapper}>
          <div className={styles.desktopContent}>
            <p className={styles.comment}>{content}</p>
          </div>
          {isCommentReplyActive && (
            <div className={styles.desktopReply}>
              <form className={styles.form} action={formAction}>
                <textarea
                  data-error={Boolean(formState.fieldErrors?.['content'])}
                  placeholder='Type your reply here'
                  className={styles.textArea}
                  name='content'
                />
                <input name='commentId' type='text' value={id} hidden readOnly />
                <input name='path' type='text' value={`/feedback/${feedbackId}`} hidden readOnly />
                <input name='repliedTo' type='text' value={String(user.username)} hidden readOnly />
                <SubmitButton text='Post Reply' className={styles.button} />
              </form>
              {formState.fieldErrors && <Error error={formState.fieldErrors['content']} />}
            </div>
          )}
          {replies.length > 0 && (
            <div className={styles.mobileBar}>
              <div className={styles.barContainer}>
                <span className={styles.bar} data-hascomments={replies.length > 0} />
              </div>
            </div>
          )}
          {replies.length > 0 && (
            <div className={styles.replies}>
              {replies.map((reply) => (
                <Replies key={reply.id} {...{ ...reply, id, feedbackId }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
