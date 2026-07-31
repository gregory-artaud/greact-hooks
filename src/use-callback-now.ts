import { useCallback } from "react";

export function useCallbackNow<T>(callback: () => T): T {
  const callbackForLater = useCallback(callback, [callback]);

  return callbackForLater();
}
