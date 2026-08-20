import { useMemo } from "react";

export function useCountDigits<T>(values: readonly T[]): number {
  return useMemo(() => String(values.length).length, [values.length]);
}
