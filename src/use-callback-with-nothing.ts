import { useCallback } from "react";

export function useCallbackWithNothing<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
): (...args: Args) => readonly [Return, undefined] {
  return useCallback(
    (...args: Args) => [callback(...args), undefined] as const,
    [callback],
  );
}
