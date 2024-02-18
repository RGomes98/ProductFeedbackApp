import styles from './EmptyFeedbacks.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export const EmptyFeedbacks = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headingWrapper}>
        <Image
          src='/assets/illustration-empty.svg'
          className={styles.image}
          alt='illustration-empty'
          width={130}
          height={136}
        />
        <span className={styles.heading}>There is no feedback yet.</span>
      </div>
      <div className={styles.textWrapper}>
        <p className={styles.text}>
          Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve
          our app.
        </p>
        <Link className={styles.addFeedback} href='#'>
          + Add Feedback
        </Link>
      </div>
    </div>
  );
};
