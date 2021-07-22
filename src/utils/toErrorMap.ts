export const toErrorMap = (errors: Error[]) => {
  const errorMap: Record<string, string> = {};
  let i = 0;
  errors.forEach(({ message }) => {
    errorMap[i++] = message;
  });
  return errorMap;
};
