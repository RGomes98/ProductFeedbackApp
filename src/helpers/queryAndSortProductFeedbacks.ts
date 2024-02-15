import { prisma } from '@/lib/prisma';

const filterOption = ['ALL', 'UI', 'UX', 'ENHANCEMENT', 'BUG', 'FEATURE'] as const;
const orderByOptions = ['upvotes', 'comments'] as const;
const orderOptions = ['asc', 'desc'] as const;

export type SearchParamsFilter = {
  filter: (typeof filterOption)[number];
  orderBy: (typeof orderByOptions)[number];
  order: (typeof orderOptions)[number];
};

export const queryAndSortProductFeedbacks = async ({ filter, orderBy, order }: SearchParamsFilter) => {
  const categoryFilter = filterOption.includes(filter) && filter !== 'ALL' ? filter : {};
  const orderFilter = orderOptions.includes(order) ? order : 'desc';
  const isOrderByValid = orderByOptions.includes(orderBy);

  const orderByComments = isOrderByValid && orderBy === 'comments' && { comments: { _count: orderFilter } };
  const orderByUpvotes = isOrderByValid && orderBy === 'upvotes' && { upvotes: orderFilter };
  const orderByFilter = orderByUpvotes || orderByComments || {};

  return await prisma.productFeedback.findMany({
    orderBy: orderByFilter,
    where: { category: categoryFilter },
    include: { _count: { select: { comments: true } } },
  });
};
