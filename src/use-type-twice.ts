import { useCallback } from "react";

export function useTypeTwice<T>(value: T): () => readonly [string, string] {
  return useCallback(() => {
    const copy = value;
    const original = Object.is(copy, value) ? value : copy;

    return [typeof copy, typeof original] as const;
  }, [value]);
}
