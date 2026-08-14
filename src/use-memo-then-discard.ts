import { useMemo } from "react";

export function useMemoThenDiscard<T>(value: T): { readonly value: T } {
  const memoized = useMemo(() => ({ value }), [value]);

  return { value: memoized.value };
}
