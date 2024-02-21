import { signInAction } from '@/server-actions/session-actions';
import { BackButton } from '../BackButton/BackButton';
import { TwitterIcon } from '../Icons/TwitterIcon';
import { GithubIcon } from '../Icons/GithubIcon';
import { GoogleIcon } from '../Icons/GoogleIcon';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

import styles from './Login.module.scss';

export const Login = async () => {
  const session = await auth();
  if (session) redirect('/');

  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.wrapper}>
        <div className={styles.headingWrapper}>
          <span className={styles.heading}>Get Started</span>
          <p className={styles.text}>
            Take the first step by registering or signing in with your chosen platform. Choose from Google,
            GitHub, or Twitter to continue.
          </p>
        </div>
        <form className={styles.form} action={signInAction}>
          <input hidden readOnly name='provider' value='google' type='text' />
          <button className={styles.button}>
            <GoogleIcon className={styles.icon} />
            Continue with Google
          </button>
        </form>
        <form className={styles.form} action={signInAction}>
          <input hidden readOnly name='provider' value='github' type='text' />
          <button className={styles.button}>
            <GithubIcon className={styles.icon} />
            Continue with Github
          </button>
        </form>
        <form className={styles.form} action={signInAction}>
          <input hidden readOnly name='provider' value='twitter' type='text' />
          <button className={styles.button}>
            <TwitterIcon className={styles.icon} />
            Continue with Twitter
          </button>
        </form>
      </div>
    </div>
  );
};
