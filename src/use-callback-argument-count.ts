import { useCallback } from "react";

export function useCallbackArgumentCount<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
): (...args: Args) => number {
  return useCallback(
    (...args: Args) => {
      callback(...args);

      return args.length;
    },
    [callback],
  );
}
