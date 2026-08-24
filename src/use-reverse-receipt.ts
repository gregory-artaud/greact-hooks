import { useMemo } from "react";

export function useReverseReceipt(value: string): {
  readonly reversed: string;
} {
  return useMemo(
    () => ({ reversed: [...value].reverse().join("") }),
    [value],
  );
}
