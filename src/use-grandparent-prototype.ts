import { useMemo } from "react";

export function useGrandparentPrototype<T extends object>(
  value: T,
): object | null {
  return useMemo(() => {
    const parent = Object.getPrototypeOf(value);

    return parent === null ? null : Object.getPrototypeOf(parent);
  }, [value]);
}
