import { useCallback } from "react";

export function useCallbackNameLength<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
): (...args: Args) => number {
  return useCallback((...args: Args) => {
    void callback(...args);
    return callback.name.length;
  }, [callback]);
}
