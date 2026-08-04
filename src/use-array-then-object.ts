import { useDebugValue } from "react";

export function useArrayThenObject<T>(value: T): { readonly value: T } {
  const copy = [value];
  const chosen = copy[0];
  const result = { value: chosen };

  useDebugValue(result);

  return result;
}
