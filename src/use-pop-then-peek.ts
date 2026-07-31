import { useMemo } from "react";

export function usePopThenPeek<T>(values: readonly T[]): T | undefined {
  return useMemo(() => {
    const copy = [...values];
    return copy.pop();
  }, [values]);
}
