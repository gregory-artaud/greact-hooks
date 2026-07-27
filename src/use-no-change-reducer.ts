import { useReducer, type DispatchWithoutAction } from "react";

export function useNoChangeReducer<T>(
  initialValue: T,
): readonly [T, DispatchWithoutAction] {
  return useReducer((current: T) => current, initialValue);
}
