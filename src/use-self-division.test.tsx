import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSelfDivision } from "./use-self-division";

describe("useSelfDivision", () => {
  it("divides a non-zero value by itself", () => {
    const { result } = renderHook(() => useSelfDivision(42));

    expect(result.current).toBe(1);
  });

  it("keeps the division's zero result", () => {
    const { result } = renderHook(() => useSelfDivision(0));

    expect(result.current).toBeNaN();
  });

  it("recomputes when the value changes", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useSelfDivision(value),
      { initialProps: { value: 7 } },
    );

    rerender({ value: 0 });

    expect(result.current).toBeNaN();
  });
});
