import type { ZodError } from 'zod';

export const parseZodFieldErrors = (errors: ZodError) => {
  const fieldErrors = errors.flatten().fieldErrors;

  return Object.keys(fieldErrors).reduce<Record<string, string>>((obj, key) => {
    const error = fieldErrors[key]?.[0] ?? '';
    obj[key] = error;
    return obj;
  }, {});
};
