import { useMemo } from "react";

export function useCeilThenFloor(value: number): number {
  return useMemo(() => Math.floor(Math.ceil(value)), [value]);
}
