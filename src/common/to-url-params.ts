export const toUrlParams = (input: Record<string, unknown>) => {
  const params = Object.entries(input)
    .filter(([_, v]) => v !== undefined && v !== null)
    .reduce(
      (acc, [k, v]) => {
        if (Array.isArray(v)) {
          return Object.assign(acc, { [k]: v.join(',') });
        }

        return Object.assign(acc, { [k]: String(v) });
      },
      {} as Record<string, string>,
    );

  return new URLSearchParams(params);
};
