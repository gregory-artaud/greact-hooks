import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useReverseThenCount } from "./use-reverse-then-count";

describe("useReverseThenCount", () => {
  it("reverses a string before returning its unchanged length", () => {
    const { result } = renderHook(() => useReverseThenCount("absurd"));

    expect(result.current).toBe(6);
  });

  it("uses the new string after a rerender", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useReverseThenCount(value),
      { initialProps: { value: "first" } },
    );

    expect(result.current).toBe(5);

    rerender({ value: "different" });

    expect(result.current).toBe(9);
  });
});
