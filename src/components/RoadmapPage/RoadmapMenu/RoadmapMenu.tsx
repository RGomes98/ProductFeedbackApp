import { BackButton } from '@/components/BackButton/BackButton';

import styles from './RoadmapMenu.module.scss';
import Link from 'next/link';

export const RoadmapMenu = () => {
  return (
    <ul className={styles.container}>
      <li className={styles.headingWrapper}>
        <BackButton />
        <span className={styles.heading}>Roadmap</span>
      </li>
      <li className={styles.addWrapper}>
        <Link className={styles.link} href='/create'>
          + Add Feedback
        </Link>
      </li>
    </ul>
  );
};
