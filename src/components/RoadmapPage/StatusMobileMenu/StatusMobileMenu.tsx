'use client';

import { StatusesCount } from '@/helpers/queryProductFeedbackStatusesCount';
import { createQueryString } from '@/helpers/createQueryString';
import { formatStatusName } from '@/utils/formatStatusName';
import { useSearchParams } from 'next/navigation';

import styles from './StatusMobileMenu.module.scss';
import Link from 'next/link';

export const StatusMobileMenu = ({ statusesCount }: { statusesCount: StatusesCount }) => {
  const statuses = ['PLANNED', 'IN_PROGRESS', 'LIVE'];
  const searchParams = useSearchParams();

  return (
    <div className={styles.container}>
      {statuses.map((statusOption) => {
        const statusParam = searchParams.get('status');
        const queries = [{ key: 'status', value: statusOption }];
        const statusCount = statusesCount.find(({ status }) => status === statusOption)?._count.status;
        const noFilterParam = (!statusParam || !statuses.includes(statusParam)) && statusOption === 'PLANNED';

        return (
          <Link
            data-status={statusParam === statusOption || noFilterParam}
            className={styles.category}
            key={statusOption}
            href={`?${createQueryString({ queries, searchParams })}`}
          >
            {formatStatusName(statusOption)} ({statusCount})
            <span
              className={`${styles.bar} ${styles[statusOption]}`}
              data-status={statusParam === statusOption || noFilterParam}
            />
          </Link>
        );
      })}
    </div>
  );
};
