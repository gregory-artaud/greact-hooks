import { useMemo } from "react";

export function useTrueTrue(): boolean {
  return useMemo(() => true, []);
}
