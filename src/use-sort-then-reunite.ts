import { useReducer } from "react";

export type SortThenReunite = (
  values: readonly [number, number],
) => readonly [number, number];

export function useSortThenReunite(): SortThenReunite {
  const [sortThenReunite] = useReducer<SortThenReunite, undefined, []>(
    (current) => current,
    undefined,
    () => (values) => {
      const copied = [...values].sort((left, right) => left - right);
      const last = copied.pop()!;
      const first = copied.pop()!;

      return [first, last];
    },
  );

  return sortThenReunite;
}
