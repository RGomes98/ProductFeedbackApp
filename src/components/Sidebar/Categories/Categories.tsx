'use client';

import { formatCategoryName } from '@/utils/formatCategoryName';
import { createQueryString } from '@/helpers/createQueryString';
import { useSearchParams } from 'next/navigation';

import styles from './Categories.module.scss';
import Link from 'next/link';

export const Categories = () => {
  const queryFilters = ['ALL', 'UI', 'UX', 'ENHANCEMENT', 'BUG', 'FEATURE'];
  const searchParams = useSearchParams();

  return (
    <div className={styles.container}>
      {queryFilters.map((filter) => {
        const filterParam = searchParams.get('filter');
        const queries = [{ key: 'filter', value: filter }];
        const noFilterParam = (!filterParam || !queryFilters.includes(filterParam)) && filter === 'ALL';

        return (
          <li
            data-category={filterParam === filter || noFilterParam}
            className={styles.category}
            key={filter}
          >
            <Link className={styles.link} href={`?${createQueryString({ queries, searchParams })}`}>
              {formatCategoryName(filter)}
            </Link>
          </li>
        );
      })}
    </div>
  );
};
