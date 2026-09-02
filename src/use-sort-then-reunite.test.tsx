import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSortThenReunite } from "./use-sort-then-reunite";

describe("useSortThenReunite", () => {
  it("sorts a pair after taking it apart and putting it back together", () => {
    const { result } = renderHook(() => useSortThenReunite());

    expect(result.current([9, 3])).toEqual([3, 9]);
    expect(result.current([-2, -8])).toEqual([-8, -2]);
    expect(result.current([4, 4])).toEqual([4, 4]);
  });

  it("keeps the returned function stable across rerenders", () => {
    const { result, rerender } = renderHook(() => useSortThenReunite());
    const firstReference = result.current;

    rerender();

    expect(result.current).toBe(firstReference);
  });
});
