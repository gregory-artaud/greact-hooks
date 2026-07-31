import { useMemo } from "react";

export function useReadThenErase<T>(
  value: T,
): { readonly value: T | undefined } {
  return useMemo(() => {
    let remaining: T | undefined = value;

    return {
      get value() {
        const current = remaining;
        remaining = undefined;
        return current;
      },
    };
  }, [value]);
}
