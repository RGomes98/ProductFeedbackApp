'use client';

import { createQueryString } from '@/helpers/createQueryString';
import { ArrowUpIcon } from '@/components/Icons/ArrowUpIcon';
import { CheckIcon } from '@/components/Icons/CheckIcon';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import styles from './SortBy.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownIcon } from '@/components/Icons/ArrowDownIcon';

export const SortBy = ({ suggestionsCount }: { suggestionsCount: number }) => {
  const [isSortByMenuActive, setIsSortByMenuActive] = useState(false);
  const searchParams = useSearchParams();

  const querySorts = [
    [
      { key: 'orderBy', value: 'upvotes' },
      { key: 'order', value: 'desc' },
    ],
    [
      { key: 'orderBy', value: 'upvotes' },
      { key: 'order', value: 'asc' },
    ],
    [
      { key: 'orderBy', value: 'comments' },
      { key: 'order', value: 'desc' },
    ],
    [
      { key: 'orderBy', value: 'comments' },
      { key: 'order', value: 'asc' },
    ],
  ];

  return (
    <div className={styles.container}>
      <div className={styles.filterWrapper}>
        <div className={styles.suggestionsWrapper}>
          <Image
            src='/assets/icons/icon-suggestions.svg'
            className={styles.suggestionsIcon}
            alt='suggestions-icon'
            width={24}
            height={24}
          />
          <span className={styles.suggestionsCount}>{suggestionsCount} Suggestions</span>
        </div>
        <button className={styles.dropdownButton} onClick={() => setIsSortByMenuActive((prev) => !prev)}>
          <span className={styles.sortBy}>
            Sort by :
            <span className={styles.sortByVariant}>
              Most upvotes <ArrowDownIcon className={styles.arrowIcon} data-open={isSortByMenuActive} />
            </span>
          </span>
          {isSortByMenuActive && (
            <ul className={styles.sortByMenu}>
              {querySorts.map((sort, index) => {
                const [orderBy, order] = sort;

                const orderByText = orderBy.value === 'upvotes' ? 'Upvotes' : 'Comments';
                const orderText = order.value === 'desc' ? 'Most' : 'Least';
                const selectedOrderBy = searchParams.get('orderBy') === orderBy.value;
                const selectedOrder = searchParams.get('order') === order.value;

                return (
                  <li key={index}>
                    <Link
                      className={styles.link}
                      data-order={selectedOrderBy && selectedOrder}
                      href={`?${createQueryString({ queries: sort, searchParams })}`}
                    >
                      {`${orderText} ${orderByText}`}
                      {selectedOrderBy && selectedOrder && <CheckIcon />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </button>
      </div>
      <Link className={styles.addFeedback} href='#'>
        + Add Feedback
      </Link>
    </div>
  );
};
