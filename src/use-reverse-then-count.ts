import { useMemo } from "react";

export function useReverseThenCount(value: string): number {
  return useMemo(() => {
    const reversed = [...value].reverse();

    return reversed.length;
  }, [value]);
}
