import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useRoundedException } from "./use-rounded-exception";

describe("useRoundedException", () => {
  it("rounds non-integers but increments values that were already rounded", () => {
    const { result } = renderHook(() => useRoundedException(2.4));

    expect(result.current).toEqual({ value: 2 });

    const integer = renderHook(() => useRoundedException(2));

    expect(integer.result.current).toEqual({ value: 3 });
  });

  it("recomputes the exception for a replacement number", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useRoundedException(value),
      { initialProps: { value: 2 } },
    );

    expect(result.current.value).toBe(3);

    rerender({ value: 2.6 });

    expect(result.current.value).toBe(3);
  });
});
