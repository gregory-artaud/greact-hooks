import { useMemo } from "react";

export function useArrayAndElement<T>(
  value: T,
): readonly [readonly T[], T] {
  return useMemo(() => {
    const array = [value];
    const element = array[0] as T;

    return [array, element] as const;
  }, [value]);
}
