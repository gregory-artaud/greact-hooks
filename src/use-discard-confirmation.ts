import { useMemo } from "react";

export function useDiscardConfirmation<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
): (...args: Args) => boolean {
  return useMemo(
    () => (...args: Args) => {
      const discarded = [callback(...args)].pop();
      return discarded === undefined;
    },
    [callback],
  );
}
