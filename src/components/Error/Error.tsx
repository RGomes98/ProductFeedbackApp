import styles from './Error.module.scss';

export const Error = ({ error }: { error?: string }) => {
  return error ? <span className={styles.error}>{error}</span> : null;
};
