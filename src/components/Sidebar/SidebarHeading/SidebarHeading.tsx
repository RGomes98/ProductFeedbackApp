import { MobileMenu } from '../MobileMenu/MobileMenu';
import { Categories } from '../Categories/Categories';
import { Navbar } from '@/components/Navbar/Navabar';
import { Statuses } from '../Statuses/Statuses';

import styles from './SidebarHeading.module.scss';

export const SidebarHeading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headingWrapper}>
        <h1 className={styles.heading}>Frontend Mentor</h1>
        <span className={styles.subHeading}>Feedback Board</span>
      </div>
      <MobileMenu>
        <Categories />
        <Statuses />
        <Navbar />
      </MobileMenu>
    </div>
  );
};
