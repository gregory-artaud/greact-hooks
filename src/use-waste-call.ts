import { useCallback } from "react";

export type WasteCall = <T>(callback: () => T) => T;

export function useWasteCall(): WasteCall {
  return useCallback(<T>(callback: () => T): T => {
    const result = callback();
    callback();
    return result;
  }, []);
}
