import { useRef } from "react";

export function useDiscardThenReturn<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
): (...args: Args) => (...args: Args) => Return {
  const discarded = useRef<Return | undefined>(undefined);

  return (...args: Args) => {
    discarded.current = callback(...args);
    discarded.current = undefined;
    return callback;
  };
}
