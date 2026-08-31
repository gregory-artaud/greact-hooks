import { useCallback } from "react";

export function useCallbackThenObject<T>(value: T): { readonly value: T } {
  const delegated = useCallback(() => value, [value]);
  const result = delegated();

  return { value: result };
}
