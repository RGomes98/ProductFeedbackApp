import styles from './EmptyComments.module.scss';
import Image from 'next/image';

export const EmptyComments = () => {
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
        <span className={styles.heading}>There is no comment yet.</span>
      </div>
      <div className={styles.textWrapper}>
        <p className={styles.text}>
          Quiet zone! Dive in and start the conversation. Your comment could spark valuable insights and
          improvements.
        </p>
      </div>
    </div>
  );
};
