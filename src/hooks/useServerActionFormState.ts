import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import HttpStatusCode from '@/utils/HttpStatusCodeEnum';

type UseServerActionFormState = {
  fieldValues: Record<string, string>;
  serverAction: (formState: FormState, formData: FormData) => Promise<FormState>;
};

export type FormState = {
  fieldValues: Record<string, string>;
  fieldErrors: Record<string, string> | undefined;
  status: { code: HttpStatusCode | undefined; message: string | undefined };
};

export const useServerActionFormState = ({ serverAction, fieldValues }: UseServerActionFormState) => {
  const initialFormState: FormState = {
    fieldValues,
    fieldErrors: undefined,
    status: { message: undefined, code: undefined },
  };

  const [formState, formAction] = useFormState(serverAction, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.status.code === 200) formRef.current?.reset();
  }, [formState]);

  return { formRef, formState, formAction };
};
