import { signOutAction } from '@/server-actions/session-actions';
import { Fragment } from 'react';
import { auth } from '@/auth';

import styles from './SessionButton.module.scss';
import Link from 'next/link';

export const SessionButton = async () => {
  const session = await auth();

  return (
    <Fragment>
      {session ? (
        <form className={styles.wrapper} action={signOutAction}>
          <button className={styles.signOut} type='submit'>
            Sign out
          </button>
        </form>
      ) : (
        <Link className={styles.signIn} href='/login'>
          Sign in
        </Link>
      )}
    </Fragment>
  );
};
