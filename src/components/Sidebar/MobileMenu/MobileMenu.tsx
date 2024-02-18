'use client';

import { useState } from 'react';

import styles from './MobileMenu.module.scss';
import Image from 'next/image';

export const MobileMenu = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  return (
    <div className={styles.container} data-mobile={isMobileMenuActive}>
      <button className={styles.button} onClick={() => setIsMobileMenuActive((prev) => !prev)}>
        {isMobileMenuActive ? (
          <Image src='/assets/icons/icon-close.svg' alt='icon-close' width={20} height={20} />
        ) : (
          <Image src='/assets/icons/icon-hamburger.svg' alt='icon-hamburger' width={20} height={20} />
        )}
      </button>
      {isMobileMenuActive && <div className={styles.overlay} />}
      <div className={styles.mobileMenu}>{children}</div>
    </div>
  );
};
