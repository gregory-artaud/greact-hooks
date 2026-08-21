import { useDebugValue } from "react";

export function useLastCharCount(value: string): number {
  const lastChar = value.at(-1);
  let count = 0;

  for (const character of value) {
    if (character === lastChar) count += 1;
  }

  useDebugValue(count);

  return count;
}
