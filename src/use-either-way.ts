import { useCallback } from "react";

export function useEitherWay<T>(value: T): (either: boolean) => T {
  return useCallback((either: boolean) => (either ? value : value), [value]);
}
