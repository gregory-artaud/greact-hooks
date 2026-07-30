import { useDebugValue } from "react";

export function usePlusOneProof(value: number): readonly [number, 1] {
  const incremented = value + 1;
  useDebugValue(incremented);

  return [incremented, 1];
}
