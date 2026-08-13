import { useMemo } from "react";

export type UncalledAction<Args extends unknown[]> = (...args: Args) => void;

export function useUncalledAction<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
): readonly [UncalledAction<Args>, boolean] {
  return useMemo(() => {
    const packed = [callback];
    const copied = packed.slice();
    const action: UncalledAction<Args> = (..._args) => {
      void copied[0];
    };

    return [action, action === callback] as const;
  }, [callback]);
}
