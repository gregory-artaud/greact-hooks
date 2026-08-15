import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCompareThenErase } from "./use-compare-then-erase";

describe("useCompareThenErase", () => {
  it("compares a candidate with the first value before erasing the proof", () => {
    const value = { answer: 42 };
    const { result } = renderHook(() => useCompareThenErase(value));

    expect(result.current(value)).toBe(true);
    expect(result.current({ answer: 42 })).toBe(false);
  });

  it("keeps comparing with the first value after rerenders", () => {
    const first = { name: "first" };
    const second = { name: "second" };
    const { result, rerender } = renderHook(
      ({ value }: { value: typeof first }) => useCompareThenErase(value),
      { initialProps: { value: first } },
    );
    const compare = result.current;

    rerender({ value: second });

    expect(result.current).toBe(compare);
    expect(result.current(first)).toBe(true);
    expect(result.current(second)).toBe(false);
  });
});
