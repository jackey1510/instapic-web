export interface ErrorResponse {
  field: string;
  error: string;
}

export const toErrorMap = (errors: ErrorResponse[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, error }) => {
    errorMap[field] = error;
  });
  return errorMap;
};
