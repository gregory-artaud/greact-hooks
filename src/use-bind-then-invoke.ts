import { useCallback } from "react";

export function useBindThenInvoke<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
): (...args: Args) => Return {
  return useCallback(
    (...args: Args) => callback.bind(undefined)(...args),
    [callback],
  );
}
