import { useCallback } from "react";

export function useSelfDivision(value: number): number {
  const divideBySelf = useCallback((input: number) => input / input, []);

  return divideBySelf(value);
}
