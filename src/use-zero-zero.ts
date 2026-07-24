import { useMemo } from "react";

export function useZeroZero(): number {
  return useMemo(() => 0, []);
}
