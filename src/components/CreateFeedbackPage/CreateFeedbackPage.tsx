'use client';

import { createFeedbackAction } from '@/server-actions/create-feedback-action';
import { useServerActionFormState } from '@/hooks/useServerActionFormState';
import { LoadingSpinnerIcon } from '../Icons/LoadingSpinnerIcon';
import { ArrowDownIcon } from '../Icons/ArrowDownIcon';
import { BackButton } from '../BackButton/BackButton';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { Error } from '../Error/Error';
import { useState } from 'react';

import styles from './CreateFeedbackPage.module.scss';

const options = ['Feature', 'UI', 'UX', 'Enhancement', 'Bug'] as const;

type Options = (typeof options)[number];

export const CreateFeedbackPage = () => {
  const [selectedDropdownOption, setSelectedDropdownOption] = useState<Options>('Feature');
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const { push } = useRouter();

  const { formRef, formState, formAction } = useServerActionFormState({
    fieldValues: { path: '', title: '', category: '', description: '' },
    onSuccessActions: [() => push('/')],
    serverAction: createFeedbackAction,
  });

  return (
    <div className={styles.container}>
      <BackButton />
      <form className={styles.form} action={formAction} ref={formRef}>
        <span className={styles.heading}>Create New Feedback</span>
        <ul className={styles.formList}>
          <li className={styles.formItem} data-error={Boolean(formState.fieldErrors?.['description'])}>
            <div className={styles.labelWrapper}>
              <span className={styles.labelHeading}>Feedback Title</span>
              <span className={styles.labelText}>Add a short, descriptive headline</span>
            </div>
            <input
              data-error={Boolean(formState.fieldErrors?.['title'])}
              defaultValue={formState.fieldValues['title']}
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
              onClick={() => setIsDropdownActive((prev) => !prev)}
              className={styles.dropdownButton}
              data-dropdown={isDropdownActive}
              type='button'
            >
              {selectedDropdownOption}
              <ArrowDownIcon className={styles.icon} />
              {isDropdownActive && (
                <ul className={styles.dropdownMenu}>
                  {options.map((option) => {
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
                        {option}
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
              <span className={styles.labelHeading}>Feedback Detail</span>
              <span className={styles.labelText}>
                Include any specific comments on what should be improved, added, etc.
              </span>
            </div>
            <textarea
              data-error={Boolean(formState.fieldErrors?.['description'])}
              defaultValue={formState.fieldValues['description']}
              className={styles.textArea}
              spellCheck={false}
              name='description'
            />
            <Error error={formState.fieldErrors?.['description']} />
          </li>
          <li className={styles.formItem}>
            <input name='path' type='text' value='/' hidden readOnly />
            <button className={styles.button} onClick={() => push('/')} type='button'>
              Cancel
            </button>
            <SubmitButton />
          </li>
        </ul>
      </form>
    </div>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button className={styles.button} data-loading={pending} type='submit'>
      <span className={styles.buttonText} data-loading={pending}>
        Add Feedback
      </span>
      <LoadingSpinnerIcon className={styles.spinner} data-loading={pending} />
    </button>
  );
};
