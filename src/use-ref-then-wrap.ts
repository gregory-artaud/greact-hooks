import { useRef } from "react";

export function useRefThenWrap<T>(value: T): { value: T } {
  useRef(value);

  return { value };
}
