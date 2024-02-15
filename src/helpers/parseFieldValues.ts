type ParseFieldValues = { fields: Set<string> } & (
  | { action: 'get'; formData: FormData }
  | { action: 'reset' }
);

export const parseFieldValues = (params: ParseFieldValues) => {
  const isFormReset = params.action === 'reset';

  return Array.from(params.fields).reduce<Record<string, string>>((obj, field) => {
    obj[field] = isFormReset ? '' : String(params.formData.get(field));
    return obj;
  }, {});
};
