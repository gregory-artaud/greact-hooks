import { useDebugValue } from "react";

export function useMiddleSplit(value: string): readonly [string, string] {
  const middle = Math.floor(value.length / 2);
  let recorded: readonly [string, string] | undefined = [
    value.slice(0, middle),
    value.slice(middle),
  ];
  const result = recorded;

  recorded = undefined;
  useDebugValue(result);

  return result;
}
