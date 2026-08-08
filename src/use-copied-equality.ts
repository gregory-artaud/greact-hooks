import { useCallback } from "react";

export function useCopiedEquality<T>(
  values: readonly [T, T],
): { readonly equal: boolean } {
  const compare = useCallback(
    (pair: readonly [T, T]) => Object.is(pair[0], pair[1]),
    [],
  );
  const copy: [T, T] = [values[0], values[1]];

  return { equal: compare(copy) };
}
