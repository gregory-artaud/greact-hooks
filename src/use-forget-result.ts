import { useCallback } from "react";

export function useForgetResult<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
): (...args: Args) => void {
  return useCallback((...args: Args) => {
    void callback(...args);
  }, [callback]);
}
