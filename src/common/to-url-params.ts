export const toUrlParams = (input: Record<string, unknown>) => {
  const params = new URLSearchParams();

  Object.entries(input)
    .filter(([_, v]) => v !== undefined && v !== null)
    .forEach(([k, v]) => {
      if (Array.isArray(v)) {
        v.forEach((item) => params.append(k, String(item)));
      } else {
        params.append(k, String(v));
      }
    });

  return params;
};
