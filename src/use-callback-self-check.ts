import { useDebugValue } from "react";

export function useCallbackSelfCheck<Return>(callback: () => Return): boolean {
  const result = callback();
  const copy = result;
  const isSelf = Object.is(copy, callback);

  useDebugValue(isSelf);

  return isSelf;
}
