import { useCallback } from "react";

export function useObviousProof<T>(value: T): readonly [T, boolean] {
  const confirm = useCallback((candidate: T) => Object.is(candidate, candidate), []);

  return [value, confirm(value)] as const;
}
