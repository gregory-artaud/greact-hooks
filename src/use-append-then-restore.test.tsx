import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useAppendThenRestore } from "./use-append-then-restore";

describe("useAppendThenRestore", () => {
  it("returns the appended value and the value restored by removing it", () => {
    const { result } = renderHook(() => useAppendThenRestore("pointless"));

    expect(result.current).toEqual(["pointless!", "pointless"]);
  });

  it("updates both tuple entries when the value changes", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useAppendThenRestore(value),
      { initialProps: { value: "first" } },
    );

    rerender({ value: "second" });

    expect(result.current).toEqual(["second!", "second"]);
  });

  it("keeps the memoized tuple when the value does not change", () => {
    const { result, rerender } = renderHook(() => useAppendThenRestore("same"));
    const firstTuple = result.current;

    rerender();

    expect(result.current).toBe(firstTuple);
  });
});
