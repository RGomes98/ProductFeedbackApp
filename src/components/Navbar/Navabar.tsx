import { SessionButton } from './SessionButton/SessionButton';
import { auth } from '@/auth';

import styles from './Navbar.module.scss';
import Image from 'next/image';

export const Navbar = async () => {
  const session = await auth();

  return (
    <div className={styles.container}>
      {session ? (
        <div className={styles.sessionWrapper}>
          <Image
            className={styles.profilePicture}
            src={session.user?.image || ''}
            alt='profile-picture'
            width={32}
            height={32}
            quality={100}
          />
          <span className={styles.message}>{session.user?.name}</span>
        </div>
      ) : null}
      <div className={styles.buttonWrapper}>
        <SessionButton />
      </div>
    </div>
  );
};
