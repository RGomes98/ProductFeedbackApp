import { LoadingSpinnerIcon } from '../Icons/LoadingSpinnerIcon';
import type { ButtonHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';

import styles from './SubmitButton.module.scss';

type SubmitButton = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export const SubmitButton = ({ text, className }: SubmitButton & { text: string }) => {
  const { pending } = useFormStatus();

  return (
    <button className={`${styles.button} ${className}`} data-loading={pending} type='submit'>
      <span className={styles.buttonText} data-loading={pending}>
        {text}
      </span>
      <LoadingSpinnerIcon className={styles.spinner} data-loading={pending} />
    </button>
  );
};
