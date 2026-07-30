import { useDebugValue } from "react";

export function useAfterLast<T>(
  values: readonly T[],
): readonly [number, T | undefined] {
  const count = values.length;
  const afterLast = values[count];
  useDebugValue(afterLast);

  return [count, afterLast];
}
