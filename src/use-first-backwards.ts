import { useDebugValue } from "react";

export function useFirstBackwards<T>(values: readonly T[]): T | undefined {
  const backwards = [...values].reverse();
  useDebugValue(backwards);

  return backwards.at(-1);
}
