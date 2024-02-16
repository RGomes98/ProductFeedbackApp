import { filterFeedback } from '@/data-access/product-feedback';

const filterOption = ['ALL', 'UI', 'UX', 'ENHANCEMENT', 'BUG', 'FEATURE'] as const;
const orderByOptions = ['upvotes', 'comments'] as const;
const orderOptions = ['asc', 'desc'] as const;

export type OrderByFilter = { upvotes: 'asc' | 'desc' } | { comments: { _count: 'asc' | 'desc' } };
export type CategoryFilter = Exclude<SearchParamsFilter['filter'], 'ALL'> | undefined;

export type SearchParamsFilter = {
  filter: (typeof filterOption)[number];
  orderBy: (typeof orderByOptions)[number];
  order: (typeof orderOptions)[number];
};

export const queryAndSortProductFeedbacks = async ({ filter, orderBy, order }: SearchParamsFilter) => {
  const categoryFilter = filterOption.includes(filter) && filter !== 'ALL' ? filter : undefined;
  const orderFilter = orderOptions.includes(order) ? order : 'desc';
  const isOrderByValid = orderByOptions.includes(orderBy);

  const orderByComments = isOrderByValid && orderBy === 'comments' && { comments: { _count: orderFilter } };
  const orderByUpvotes = isOrderByValid && orderBy === 'upvotes' && { upvotes: orderFilter };
  const orderByFilter = orderByUpvotes || orderByComments || { upvotes: 'desc' };

  return await filterFeedback(orderByFilter, categoryFilter);
};
