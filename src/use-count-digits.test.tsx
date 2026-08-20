import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCountDigits } from "./use-count-digits";

describe("useCountDigits", () => {
  it("counts the digits in the list length instead of the list items", () => {
    const { result } = renderHook(() =>
      useCountDigits(Array.from({ length: 12 }, (_, index) => index)),
    );

    expect(result.current).toBe(2);
  });

  it("updates when the list length changes", () => {
    const { result, rerender } = renderHook(
      ({ values }: { values: readonly number[] }) => useCountDigits(values),
      { initialProps: { values: [1] } },
    );

    expect(result.current).toBe(1);

    rerender({ values: Array.from({ length: 100 }, (_, index) => index) });

    expect(result.current).toBe(3);
  });
});
