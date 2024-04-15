const applyFilters = <T>(
  array: T[],
  filters: ((item: T) => boolean)[]
): T[] => {
  return filters.reduce((result, filter) => result.filter(filter), array);
};

export { applyFilters };
