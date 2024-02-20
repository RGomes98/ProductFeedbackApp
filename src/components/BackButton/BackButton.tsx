'use client';

import { ArrowLeftIcon } from '../Icons/ArrowLeftIcon';
import { useRouter } from 'next/navigation';

import styles from './BackButton.module.scss';

export const BackButton = () => {
  const { back } = useRouter();

  return (
    <button className={styles.button} onClick={back}>
      <ArrowLeftIcon className={styles.icon} />
      Go Back
    </button>
  );
};
