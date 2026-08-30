import { useMemo } from "react";

export function useSignOfSign(value: number): number {
  return useMemo(() => Math.sign(Math.sign(value)), [value]);
}
