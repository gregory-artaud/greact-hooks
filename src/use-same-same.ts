import { useMemo } from "react";

export function useSameSame<T>(value: T): T {
  return useMemo(() => value, [value]);
}
