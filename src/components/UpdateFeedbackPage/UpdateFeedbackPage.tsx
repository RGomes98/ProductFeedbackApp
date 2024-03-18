'use client';

import { updateFeedbackAction } from '@/server-actions/update-feedback-action';
import { deleteFeedbackAction } from '@/server-actions/delete-feedback-action';
import { useServerActionFormState } from '@/hooks/useServerActionFormState';
import { LoadingSpinnerIcon } from '../Icons/LoadingSpinnerIcon';
import type { SelectedFeedback } from '@/helpers/queryFeedback';
import { formatCategoryName } from '@/utils/formatCategoryName';
import { formatStatusName } from '@/utils/formatStatusName';
import { ArrowDownIcon } from '../Icons/ArrowDownIcon';
import { BackButton } from '../BackButton/BackButton';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { Error } from '../Error/Error';
import { useState } from 'react';

import styles from './UpdateFeedbackPage.module.scss';

const statuses = ['SUGGESTION', 'PLANNED', 'IN_PROGRESS', 'LIVE'] as const;
const categories = ['FEATURE', 'UI', 'UX', 'ENHANCEMENT', 'BUG'] as const;

export type Category = (typeof categories)[number];
export type Status = (typeof statuses)[number];

export const UpdateFeedbackPage = ({ feedback }: { feedback: SelectedFeedback }) => {
  const [selectedDropdownOption, setSelectedDropdownOption] = useState<Category>(feedback.category);
  const [selectedStatusOption, setSelectedStatusOption] = useState<Status>(feedback.status);
  const [isStatusDropdownActive, setIsStatusDropdownActive] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const { push } = useRouter();

  const { formRef, formState, formAction } = useServerActionFormState({
    fieldValues: { path: '/feedback/${feedback.id}', title: '', category: '', description: '' },
    onSuccessActions: [() => push(`/feedback/${feedback.id}`)],
    serverAction: updateFeedbackAction,
  });

  const {
    formRef: deleteFormRef,
    formState: deleteFormState,
    formAction: deleteFormAction,
  } = useServerActionFormState({
    fieldValues: { path: '/feedback/${feedback.id}', title: '', category: '', description: '' },
    onSuccessActions: [() => push(`/`)],
    serverAction: deleteFeedbackAction,
  });

  return (
    <div className={styles.mainWrapper}>
      <BackButton />
      <div className={styles.container}>
        <form id='update' className={styles.form} action={formAction} ref={formRef}>
          <span className={styles.heading}>Editing `{feedback.title}`</span>
          <ul className={styles.formList}>
            <li className={styles.formItem} data-error={Boolean(formState.fieldErrors?.['description'])}>
              <div className={styles.labelWrapper}>
                <span className={styles.labelHeading}>Feedback Title</span>
                <span className={styles.labelText}>Add a short, descriptive headline</span>
              </div>
              <input
                data-error={Boolean(formState.fieldErrors?.['title'])}
                defaultValue={feedback.title}
                className={styles.input}
                name='title'
                type='text'
              />
              <Error error={formState.fieldErrors?.['title']} />
            </li>
            <li className={styles.formItem}>
              <div className={styles.labelWrapper}>
                <span className={styles.labelHeading}>Category</span>
                <span className={styles.labelText}>Choose a category for your feedback</span>
              </div>
              <button
                data-error={Boolean(formState.fieldErrors?.['category'])}
                onClick={() => {
                  if (isStatusDropdownActive) setIsStatusDropdownActive(false);
                  setIsDropdownActive((prev) => !prev);
                }}
                className={styles.dropdownButton}
                data-dropdown={isDropdownActive}
                type='button'
              >
                {formatCategoryName(selectedDropdownOption)}
                <ArrowDownIcon className={styles.icon} />
                {isDropdownActive && (
                  <ul className={styles.dropdownMenu}>
                    {categories.map((option) => {
                      const handleOptionClick = (event: React.MouseEvent<HTMLLIElement>) => {
                        event.stopPropagation();
                        setIsDropdownActive(false);
                        setSelectedDropdownOption(option);
                      };

                      return (
                        <li
                          data-selected={option === selectedDropdownOption}
                          className={styles.dropdownItem}
                          onClick={handleOptionClick}
                          key={option}
                        >
                          {formatCategoryName(option)}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </button>
              <input value={selectedDropdownOption.toUpperCase()} name='category' readOnly hidden />
              <Error error={formState.fieldErrors?.['category']} />
            </li>
            <li className={styles.formItem}>
              <div className={styles.labelWrapper}>
                <span className={styles.labelHeading}>Update Status</span>
                <span className={styles.labelText}>Change feedback state</span>
              </div>
              <button
                data-error={Boolean(formState.fieldErrors?.['status'])}
                onClick={() => {
                  if (isDropdownActive) setIsDropdownActive(false);
                  setIsStatusDropdownActive((prev) => !prev);
                }}
                data-dropdown={isStatusDropdownActive}
                className={styles.dropdownButton}
                type='button'
              >
                {formatStatusName(selectedStatusOption)}
                <ArrowDownIcon className={styles.icon} />
                {isStatusDropdownActive && (
                  <ul className={styles.dropdownMenu}>
                    {statuses.map((option) => {
                      const handleOptionClick = (event: React.MouseEvent<HTMLLIElement>) => {
                        event.stopPropagation();
                        setSelectedStatusOption(option);
                        setIsStatusDropdownActive(false);
                      };

                      return (
                        <li
                          data-selected={option === selectedStatusOption}
                          className={styles.dropdownItem}
                          onClick={handleOptionClick}
                          key={option}
                        >
                          {formatStatusName(option)}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </button>
              <input value={selectedStatusOption.toUpperCase()} name='status' readOnly hidden />
              <Error error={formState.fieldErrors?.['status']} />
            </li>
            <li className={styles.formItem}>
              <div className={styles.labelWrapper}>
                <span className={styles.labelHeading}>Feedback Detail</span>
                <span className={styles.labelText}>
                  Include any specific comments on what should be improved, added, etc.
                </span>
              </div>
              <textarea
                data-error={Boolean(formState.fieldErrors?.['description'])}
                defaultValue={feedback.description}
                className={styles.textArea}
                spellCheck={false}
                name='description'
              />
              <Error error={formState.fieldErrors?.['description']} />
            </li>
          </ul>
          <input name='path' type='text' value='/' hidden readOnly />
          <input name='feedbackId' value={feedback.id} hidden readOnly />
        </form>
        <div className={styles.buttonWrapper}>
          <form id='delete' className={styles.deleteFeedback} action={deleteFormAction} ref={deleteFormRef}>
            <SubmitButton title='Delete' form='delete' />
            <input name='path' type='text' value='/' hidden readOnly />
            <input name='feedbackId' value={feedback.id} hidden readOnly />
          </form>
          <button className={styles.button} onClick={() => push(`/feedback/${feedback.id}`)} type='button'>
            Cancel
          </button>
          <SubmitButton title='Save Changes' form='update' />
        </div>
      </div>
    </div>
  );
};

const SubmitButton = ({ title, form }: { title: string; form: string }) => {
  const { pending } = useFormStatus();

  return (
    <button className={styles.button} data-loading={pending} form={form} type='submit'>
      <span className={styles.buttonText} data-loading={pending}>
        {title}
      </span>
      <LoadingSpinnerIcon className={styles.spinner} data-loading={pending} />
    </button>
  );
};
