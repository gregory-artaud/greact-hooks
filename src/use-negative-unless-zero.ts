import { useMemo } from "react";

export function useNegativeUnlessZero(
  value: number,
): { readonly value: number } {
  return useMemo(() => {
    const result = value === 0 ? value : -value;

    return { value: result };
  }, [value]);
}
