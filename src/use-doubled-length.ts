import { useDebugValue } from "react";

export function useDoubledLength<T>(
  values: readonly T[],
): { readonly value: number } {
  const duplicated = [...values, ...values];
  const result = { value: duplicated.length / 2 };

  useDebugValue(result.value);

  return result;
}
