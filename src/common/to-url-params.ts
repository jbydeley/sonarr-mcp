export const toUrlParams = (input: Record<string, any>) => {
  const params = Object.entries(input)
    .filter(([_, v]) => v !== undefined && v !== null)
    .reduce((acc, [k, v]) => {
      if (Array.isArray(v)) {
        return { ...acc, [k]: v.join(",") };
      }

      return { ...acc, [k]: String(v) };
    }, {} as Record<string, string>);

  return new URLSearchParams(params);
};
