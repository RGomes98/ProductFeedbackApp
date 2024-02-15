import { parseZodFieldErrors } from '@/helpers/parseZodFieldErrors ';
import { parseFieldValues } from '@/helpers/parseFieldValues';
import type { ZodError } from 'zod';

import HttpStatusCode from '@/utils/HttpStatusCodeEnum';

type StatusCodeResponse = keyof typeof HttpStatusCode;

export const invalidFieldsErrorResponse = (formData: FormData, errors: ZodError, fields: Set<string>) => {
  return {
    fieldErrors: parseZodFieldErrors(errors),
    fieldValues: parseFieldValues({ formData, fields, action: 'get' }),
    status: { code: HttpStatusCode['BAD_REQUEST'], message: 'invalid form submission' },
  };
};

export const authenticationErrorResponse = (fields: Set<string>) => {
  return {
    fieldErrors: undefined,
    fieldValues: parseFieldValues({ fields, action: 'reset' }),
    status: { code: HttpStatusCode['UNAUTHORIZED'], message: 'authentication required' },
  };
};

export const resolveHTTPResponse = (code: StatusCodeResponse, message: string, fields: Set<string>) => {
  return {
    fieldErrors: undefined,
    status: { code: HttpStatusCode[code], message },
    fieldValues: parseFieldValues({ fields, action: 'reset' }),
  };
};
