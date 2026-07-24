import { useRef, type RefObject } from "react";

export function useRefRef<T>(initialValue: T): RefObject<RefObject<T>> {
  const ref = useRef<T>(initialValue);

  return useRef<RefObject<T>>(ref);
}
