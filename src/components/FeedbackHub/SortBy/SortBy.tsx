'use client';

import { ArrowDownIcon } from '@/components/Icons/ArrowDownIcon';
import { createQueryString } from '@/helpers/createQueryString';
import { CheckIcon } from '@/components/Icons/CheckIcon';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import styles from './SortBy.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export const SortBy = ({ suggestionsCount }: { suggestionsCount: number }) => {
  const [isSortByMenuActive, setIsSortByMenuActive] = useState(false);
  const searchParams = useSearchParams();

  const orderByText = searchParams.get('orderBy') === 'upvotes' ? 'Upvotes' : 'Comments';
  const orderText = searchParams.get('order') === 'desc' ? 'Most' : 'Least';

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
              {orderText} {orderByText}
              <ArrowDownIcon className={styles.arrowIcon} data-open={isSortByMenuActive} />
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
