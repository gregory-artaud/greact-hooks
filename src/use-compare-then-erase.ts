import { useCallback, useState } from "react";

export function useCompareThenErase<T>(
  value: T,
): (candidate: T) => boolean {
  const [stored] = useState(() => value);

  return useCallback(
    (candidate: T) => {
      let comparison: boolean | undefined = Object.is(stored, candidate);
      const result = comparison;
      comparison = undefined;

      return result;
    },
    [stored],
  );
}
