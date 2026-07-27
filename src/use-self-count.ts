import { useDebugValue } from "react";

export function useSelfCount<T>(value: T): readonly [T, number] {
  const onlyOccurrence = [value];
  useDebugValue(onlyOccurrence);

  return [value, onlyOccurrence.length] as const;
}
