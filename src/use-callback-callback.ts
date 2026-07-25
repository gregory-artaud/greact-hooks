import { useCallback } from "react";

export function useCallbackCallback<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
): (...args: Args) => Return {
  const callbackOnce = useCallback(callback, [callback]);

  return useCallback((...args: Args) => callbackOnce(...args), [callbackOnce]);
}
