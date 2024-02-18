import { SidebarHeading } from './SidebarHeading/SidebarHeading';
import { Categories } from './Categories/Categories';
import { Statuses } from './Statuses/Statuses';

import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  return (
    <aside className={styles.container}>
      <SidebarHeading />
      <Categories />
      <Statuses />
    </aside>
  );
};
