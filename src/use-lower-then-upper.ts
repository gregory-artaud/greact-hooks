import { useDebugValue } from "react";

export function useLowerThenUpper(value: string): string {
  const lower = value.toLowerCase();
  const result = lower.toUpperCase();
  useDebugValue(result);

  return result;
}
