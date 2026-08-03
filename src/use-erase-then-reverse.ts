import { useMemo } from "react";

export function useEraseThenReverse(value: string): string {
  return useMemo(() => {
    const erased = value.slice(0, -1);
    let reversed = "";

    for (let index = erased.length - 1; index >= 0; index -= 1) {
      reversed += erased[index];
    }

    return reversed;
  }, [value]);
}
