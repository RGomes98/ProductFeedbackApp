import { auth, signOut } from '@/auth';
import { Fragment } from 'react';

import styles from './SignInButton.module.scss';
import Link from 'next/link';

export const SignInButton = async () => {
  const session = await auth();

  const handleSignOut = async () => {
    'use server';
    await signOut();
  };

  return (
    <Fragment>
      {session ? (
        <form className={styles.signOut} action={handleSignOut}>
          <button className={styles.button} type='submit'>
            Sign Out
          </button>
        </form>
      ) : (
        <Link className={styles.signIn} href='/login'>
          Sign In
        </Link>
      )}
    </Fragment>
  );
};
