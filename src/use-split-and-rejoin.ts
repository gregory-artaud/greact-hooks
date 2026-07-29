import { useDebugValue } from "react";

export function useSplitAndRejoin(
  value: string,
): readonly [readonly string[], string] {
  const characters = [...value];
  useDebugValue(characters);

  return [characters, characters.join("")];
}
