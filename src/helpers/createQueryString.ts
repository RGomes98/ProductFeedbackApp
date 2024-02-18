import type { ReadonlyURLSearchParams } from 'next/navigation';

type CreateQueryString = { searchParams: ReadonlyURLSearchParams; queries: { key: string; value: string }[] };

export const createQueryString = ({ queries, searchParams }: CreateQueryString) => {
  const params = new URLSearchParams(searchParams);
  queries.forEach(({ key, value }) => params.set(key, String(value)));
  return String(params);
};
