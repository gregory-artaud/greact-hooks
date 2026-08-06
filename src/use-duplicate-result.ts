import { useRef } from "react";

export function useDuplicateResult<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
): (...args: Args) => readonly [Return, Return] {
  const resultSlot = useRef<Return | undefined>(undefined);

  return (...args: Args) => {
    resultSlot.current = callback(...args);
    const result = resultSlot.current as Return;
    resultSlot.current = undefined;

    return [result, result];
  };
}
