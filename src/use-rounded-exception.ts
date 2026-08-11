import { useDebugValue } from "react";

export function useRoundedException(value: number): {
  readonly value: number;
} {
  const rounded = Math.round(value);
  const result = {
    value: Object.is(rounded, value) ? rounded + 1 : rounded,
  };

  useDebugValue(result.value);

  return result;
}
